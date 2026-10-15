from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.appointment import Appointment, AppointmentStatus
from app.models.doctor import Doctor
from app.models.service import Service
from app.models.user import User
from app.schemas.appointment import AppointmentOut, AppointmentStatusUpdate
from app.routers.deps import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin İdarəetmə"])


@router.get("/dashboard-stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Admin Dashboard üçün əsas analitika və statistika göstəriciləri"""
    total_users = db.query(User).filter(User.is_admin == False).count()
    total_doctors = db.query(Doctor).count()
    total_services = db.query(Service).count()
    total_appointments = db.query(Appointment).count()
    
    pending_appointments = db.query(Appointment).filter(Appointment.status == AppointmentStatus.PENDING).count()
    confirmed_appointments = db.query(Appointment).filter(Appointment.status == AppointmentStatus.CONFIRMED).count()
    cancelled_appointments = db.query(Appointment).filter(Appointment.status == AppointmentStatus.CANCELLED).count()
    completed_appointments = db.query(Appointment).filter(Appointment.status == AppointmentStatus.COMPLETED).count()

    # Təxmini gəlir (təsdiqlənmiş və tamamlanmış xidmətlər üzrə)
    revenue = (
        db.query(func.sum(Service.price))
        .join(Appointment, Appointment.service_id == Service.id)
        .filter(Appointment.status.in_([AppointmentStatus.CONFIRMED, AppointmentStatus.COMPLETED]))
        .scalar()
    ) or 0.0

    return {
        "total_patients": total_users,
        "total_doctors": total_doctors,
        "total_services": total_services,
        "total_appointments": total_appointments,
        "pending_count": pending_appointments,
        "confirmed_count": confirmed_appointments,
        "cancelled_count": cancelled_appointments,
        "completed_count": completed_appointments,
        "estimated_revenue_azn": round(revenue, 2)
    }


@router.get("/appointments", response_model=List[AppointmentOut])
def get_all_appointments_admin(
    status_filter: Optional[AppointmentStatus] = Query(None, description="Status üzrə süzgəc"),
    doctor_id: Optional[int] = Query(None, description="Həkim ID üzrə süzgəc"),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Bütün randevuların idarəetmə siyahısı"""
    query = db.query(Appointment)
    if status_filter:
        query = query.filter(Appointment.status == status_filter)
    if doctor_id:
        query = query.filter(Appointment.doctor_id == doctor_id)
        
    return query.order_by(Appointment.appointment_date.desc(), Appointment.appointment_time.asc()).all()


@router.patch("/appointments/{appointment_id}/status", response_model=AppointmentOut)
def update_appointment_status(
    appointment_id: int,
    status_in: AppointmentStatusUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """Randevunun statusunu dəyişmək (Təsdiqlə / İmtina et / Tamamla)"""
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Randevu tapılmadı")

    appointment.status = status_in.status
    db.commit()
    db.refresh(appointment)
    return appointment
