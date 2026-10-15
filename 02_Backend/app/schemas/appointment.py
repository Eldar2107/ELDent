from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from app.models.appointment import AppointmentStatus
from app.schemas.user import UserOut
from app.schemas.doctor import DoctorOut
from app.schemas.service import ServiceOut


class AppointmentBase(BaseModel):
    doctor_id: int
    service_id: int
    appointment_date: str  # YYYY-MM-DD
    appointment_time: str  # HH:MM
    notes: Optional[str] = None


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentStatusUpdate(BaseModel):
    status: AppointmentStatus


class AppointmentOut(AppointmentBase):
    id: int
    user_id: int
    status: AppointmentStatus
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    user: Optional[UserOut] = None
    doctor: Optional[DoctorOut] = None
    service: Optional[ServiceOut] = None

    class Config:
        from_attributes = True
