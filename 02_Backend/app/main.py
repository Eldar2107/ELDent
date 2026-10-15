import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app.models import User, Doctor, Service, Appointment
from app.core.security import get_password_hash
from app.core.config import settings
from app.routers import (
    auth_router,
    doctors_router,
    services_router,
    appointments_router,
    admin_router,
)

# Cədvəlləri avtomatik yarat (Alembic ilə yanaşı development rahatlığı üçün)
Base.metadata.create_all(bind=engine)


def seed_initial_data():
    """Sistem ilk dəfə işə düşdükdə nümunə məlumatları (Admin, Həkimlər, Xidmətlər) təmin edir"""
    db = SessionLocal()
    try:
        # 1. Admin istifadəçi yoxdursa yarat
        admin = db.query(User).filter(User.email == "admin@eldent.az").first()
        if not admin:
            admin = User(
                email="admin@eldent.az",
                full_name="Baş Administrator (ELDent)",
                phone_number="+994501234567",
                hashed_password=get_password_hash("admin12345"),
                is_active=True,
                is_admin=True,
            )
            db.add(admin)

        # 2. Xəstə test istifadəçisi
        patient = db.query(User).filter(User.email == "patient@eldent.az").first()
        if not patient:
            patient = User(
                email="patient@eldent.az",
                full_name="Leyla Əliyeva",
                phone_number="+994559876543",
                hashed_password=get_password_hash("patient123"),
                is_active=True,
                is_admin=False,
            )
            db.add(patient)

        # 3. Nümunə Həkimlər
        if db.query(Doctor).count() == 0:
            doctors = [
                Doctor(
                    full_name="Dr. Elmir Qasımov",
                    specialty="Baş Stomatoloq & İmplantoloq",
                    experience_years=12,
                    bio="Almaniyada ixtisaslaşmış implantasiya və cərrahiyyə mütəxəssisi.",
                    rating=4.9,
                    avatar_url="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
                    is_available=True
                ),
                Doctor(
                    full_name="Dr. Nərmin Hüseynova",
                    specialty="Ortodontist (Breket mütəxəssisi)",
                    experience_years=8,
                    bio="Estetik diş düzümü və uşaq ortodontiyası üzrə beynəlxalq sertifikatlı həkim.",
                    rating=4.8,
                    avatar_url="https://images.unsplash.com/photo-1594824813580-044eb98522e8?auto=format&fit=crop&w=600&q=80",
                    is_available=True
                ),
                Doctor(
                    full_name="Dr. Rauf Məmmədov",
                    specialty="Terapevt-Stomatoloq",
                    experience_years=10,
                    bio="Ağrısız kanal müalicəsi, kompozit bərpa və estetik plomblar.",
                    rating=4.7,
                    avatar_url="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80",
                    is_available=True
                ),
                Doctor(
                    full_name="Dr. Aysel Kərimova",
                    specialty="Estetik Stomatologiya & Ağartma",
                    experience_years=6,
                    bio="Hollywood təbəssümü, vinirlər və müasir diş ağartma texnologiyaları.",
                    rating=5.0,
                    avatar_url="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
                    is_available=True
                )
            ]
            db.add_all(doctors)

        # 4. Nümunə Xidmətlər
        if db.query(Service).count() == 0:
            services = [
                Service(
                    title="İlkin Stomatoloji Müayinə & Konsultasiya",
                    description="Rəqəmsal rentgen və fərdi müalicə planının hazırlanması.",
                    price=25.0,
                    duration_minutes=30,
                    category="Müayinə"
                ),
                Service(
                    title="İşıqla Bərkiyən Estetik Plomb",
                    description="Yüksək keyfiyyətli Alman kompozit materialı ilə təbii diş bərpası.",
                    price=60.0,
                    duration_minutes=45,
                    category="Terapevtik"
                ),
                Service(
                    title="Diş Daşlarının Ultrasəslə Təmizlənməsi & Air-Flow",
                    description="Diş ərpi və daşlarının dərindən təmizlənməsi, cilalanması.",
                    price=50.0,
                    duration_minutes=40,
                    category="Gigiyena"
                ),
                Service(
                    title="Premium Dental İmplantasiya (Straumann / Osstem)",
                    description="Ömürlük zəmanətli titanyum implant və zirkon tac qoyulması.",
                    price=650.0,
                    duration_minutes=60,
                    category="Cərrahiyyə"
                ),
                Service(
                    title="Laser Diş Ağartma (Zoom 4)",
                    description="Dişlərin rənginin 6-8 tonadək zərərsiz açılması.",
                    price=200.0,
                    duration_minutes=60,
                    category="Estetik"
                ),
                Service(
                    title="Ağrısız Diş Çəkilməsi (Sadə və Retinə olunmuş)",
                    description="Yerli anesteziya ilə tamamilə ağrısız və travmasız ekstraksiya.",
                    price=45.0,
                    duration_minutes=30,
                    category="Cərrahiyyə"
                )
            ]
            db.add_all(services)

        db.commit()
    except Exception as e:
        print(f"Seed data error: {e}")
        db.rollback()
    finally:
        db.close()


seed_initial_data()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="ELDent Stomatoloji Klinika Rezervasiya Sistemi REST API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# CORS Siyasəti
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router-lər
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(doctors_router, prefix=settings.API_V1_STR)
app.include_router(services_router, prefix=settings.API_V1_STR)
app.include_router(appointments_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)


@app.get("/", tags=["Sağlamlıq"])
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "docs": "/docs",
        "version": "1.0.0"
    }
