from app.routers.auth import router as auth_router
from app.routers.doctors import router as doctors_router
from app.routers.services import router as services_router
from app.routers.appointments import router as appointments_router
from app.routers.admin import router as admin_router

__all__ = ["auth_router", "doctors_router", "services_router", "appointments_router", "admin_router"]
