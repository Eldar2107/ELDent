from sqlalchemy import Column, Integer, String, Float, Text, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(120), nullable=False)  # Müayinə, Plomb, Diş Çəkimi, İmplant
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)  # AZN ilə qiymət
    duration_minutes = Column(Integer, default=30)  # Müayinə müddəti
    is_active = Column(Boolean, default=True)
    category = Column(String(50), default="Ümumi")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    appointments = relationship("Appointment", back_populates="service", cascade="all, delete-orphan")
