from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.appointment import Appointment, AppointmentStatus
from app.models.doctor import Doctor
from app.models.service import Service
from app.models.user import User
from app.schemas.appointment import AppointmentCreate, AppointmentOut
from app.routers.deps import get_current_user

router = APIRouter(prefix="/appointments", tags=["Randevular"])


@router.get("/booked-slots", response_model=List[str])
def get_booked_slots(
    doctor_id: int = Query(..., description="Həkimin ID-si"),
    date: str = Query(..., description="Tarix formatı: YYYY-MM-DD"),
    db: Session = Depends(get_db)
):
    """Müəyyən həkim və tarix üçün artıq tutulmuş saatların siyahısı"""
    appointments = db.query(Appointment).filter(
        Appointment.doctor_id == doctor_id,
        Appointment.appointment_date == date,
        Appointment.status != AppointmentStatus.CANCELLED
    ).all()
    
    return [appt.appointment_time for appt in appointments]


@router.post("/", response_model=AppointmentOut, status_code=status.HTTP_201_CREATED)
def create_appointment(
    appt_in: AppointmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Yeni randevu rezervasiya etmək"""
    # 1. Həkimin mövcudluğunu yoxla
    doctor = db.query(Doctor).filter(Doctor.id == appt_in.doctor_id).first()
    if not doctor or not doctor.is_available:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Seçilmiş həkim hazırda qəbul üçün əlçatan deyil"
        )

    # 2. Xidmətin mövcudluğunu yoxla
    service = db.query(Service).filter(Service.id == appt_in.service_id).first()
    if not service or not service.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Seçilmiş xidmət aktiv deyil"
        )

    # 3. Vaxt toqquşmasını yoxla (Conflict check)
    existing_slot = db.query(Appointment).filter(
        Appointment.doctor_id == appt_in.doctor_id,
        Appointment.appointment_date == appt_in.appointment_date,
        Appointment.appointment_time == appt_in.appointment_time,
        Appointment.status != AppointmentStatus.CANCELLED
    ).first()

    if existing_slot:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Seçilmiş saat artıq başqa bir xəstə tərəfindən rezervasiya edilib"
        )

    # 4. Randevu yarat
    new_appointment = Appointment(
        user_id=current_user.id,
        doctor_id=appt_in.doctor_id,
        service_id=appt_in.service_id,
        appointment_date=appt_in.appointment_date,
        appointment_time=appt_in.appointment_time,
        notes=appt_in.notes,
        status=AppointmentStatus.PENDING
    )
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)
    return new_appointment


@router.get("/my", response_model=List[AppointmentOut])
def get_my_appointments(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cari daxil olmuş xəstənin bütün randevuları"""
    appointments = db.query(Appointment).filter(
        Appointment.user_id == current_user.id
    ).order_by(Appointment.created_at.desc()).all()
    return appointments


@router.patch("/{appointment_id}/cancel", response_model=AppointmentOut)
def cancel_appointment(
    appointment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Xəstənin öz randevusunu ləğv etməsi"""
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Randevu tapılmadı")

    # Yalnız öz randevusunu və ya admin ləğv edə bilər
    if appointment.user_id != current_user.id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bu randevunu ləğv etmək hüququnuz yoxdur"
        )

    appointment.status = AppointmentStatus.CANCELLED
    db.commit()
    db.refresh(appointment)
    return appointment
