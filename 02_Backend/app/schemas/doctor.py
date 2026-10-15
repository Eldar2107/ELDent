from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class DoctorBase(BaseModel):
    full_name: str
    specialty: str
    experience_years: int = 5
    bio: Optional[str] = None
    rating: float = 5.0
    avatar_url: Optional[str] = None
    is_available: bool = True


class DoctorCreate(DoctorBase):
    pass


class DoctorUpdate(BaseModel):
    full_name: Optional[str] = None
    specialty: Optional[str] = None
    experience_years: Optional[int] = None
    bio: Optional[str] = None
    rating: Optional[float] = None
    avatar_url: Optional[str] = None
    is_available: bool = None


class DoctorOut(DoctorBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
