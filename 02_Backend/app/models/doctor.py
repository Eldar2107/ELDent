from sqlalchemy import Column, Integer, String, Float, Boolean, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    specialty = Column(String(100), nullable=False)  # Terapevt, Ortodontist, Cərrah, Pedodontist
    experience_years = Column(Integer, default=5)
    bio = Column(Text, nullable=True)
    rating = Column(Float, default=5.0)
    avatar_url = Column(String(255), nullable=True)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    appointments = relationship("Appointment", back_populates="doctor", cascade="all, delete-orphan")
