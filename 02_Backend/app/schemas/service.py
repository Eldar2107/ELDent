from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class ServiceBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    duration_minutes: int = 30
    is_active: bool = True
    category: str = "Ümumi"


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    duration_minutes: Optional[int] = None
    is_active: Optional[bool] = None
    category: Optional[str] = None


class ServiceOut(ServiceBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
