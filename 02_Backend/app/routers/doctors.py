from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.doctor import Doctor
from app.schemas.doctor import DoctorCreate, DoctorUpdate, DoctorOut
from app.routers.deps import get_current_admin

router = APIRouter(prefix="/doctors", tags=["Həkimlər"])


@router.get("/", response_model=List[DoctorOut])
def get_all_doctors(
    specialty: Optional[str] = Query(None, description="İxtisas üzrə filtr"),
    available_only: bool = Query(False, description="Yalnız qəbulda olan həkimlər"),
    db: Session = Depends(get_db)
):
    """Bütün həkimlərin siyahısı və filtrlənməsi"""
    query = db.query(Doctor)
    if specialty:
        query = query.filter(Doctor.specialty.ilike(f"%{specialty}%"))
    if available_only:
        query = query.filter(Doctor.is_available == True)
    return query.order_by(Doctor.rating.desc()).all()


@router.get("/{doctor_id}", response_model=DoctorOut)
def get_doctor_by_id(doctor_id: int, db: Session = Depends(get_db)):
    """ID üzrə həkim məlumatı"""
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Həkim tapılmadı")
    return doctor


@router.post("/", response_model=DoctorOut, status_code=status.HTTP_201_CREATED)
def create_doctor(
    doctor_in: DoctorCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Yeni həkim əlavə etmək (Yalnız Admin)"""
    doctor = Doctor(**doctor_in.model_dump())
    db.add(doctor)
    db.commit()
    db.refresh(doctor)
    return doctor


@router.put("/{doctor_id}", response_model=DoctorOut)
def update_doctor(
    doctor_id: int,
    doctor_update: DoctorUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Həkim məlumatlarını yeniləmək (Yalnız Admin)"""
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Həkim tapılmadı")
    
    update_data = doctor_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(doctor, field, value)
        
    db.commit()
    db.refresh(doctor)
    return doctor


@router.delete("/{doctor_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Həkimi sistemdən silmək (Yalnız Admin)"""
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Həkim tapılmadı")
    
    db.delete(doctor)
    db.commit()
    return None
