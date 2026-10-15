from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceOut
from app.routers.deps import get_current_admin

router = APIRouter(prefix="/services", tags=["Xidmətlər"])


@router.get("/", response_model=List[ServiceOut])
def get_all_services(
    category: Optional[str] = Query(None, description="Kateqoriya üzrə filtr"),
    active_only: bool = Query(True, description="Yalnız aktiv xidmətlər"),
    db: Session = Depends(get_db)
):
    """Bütün stomatoloji xidmətlərin siyahısı"""
    query = db.query(Service)
    if active_only:
        query = query.filter(Service.is_active == True)
    if category:
        query = query.filter(Service.category == category)
    return query.order_by(Service.price.asc()).all()


@router.get("/{service_id}", response_model=ServiceOut)
def get_service_by_id(service_id: int, db: Session = Depends(get_db)):
    """ID üzrə xidmət məlumatı"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Xidmət tapılmadı")
    return service


@router.post("/", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
def create_service(
    service_in: ServiceCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Yeni xidmət əlavə etmək (Yalnız Admin)"""
    service = Service(**service_in.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@router.put("/{service_id}", response_model=ServiceOut)
def update_service(
    service_id: int,
    service_update: ServiceUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Xidməti redaktə etmək (Yalnız Admin)"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Xidmət tapılmadı")
    
    update_data = service_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(service, field, value)
        
    db.commit()
    db.refresh(service)
    return service


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
    service_id: int,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    """Xidməti silmək (Yalnız Admin)"""
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Xidmət tapılmadı")
    
    db.delete(service)
    db.commit()
    return None
