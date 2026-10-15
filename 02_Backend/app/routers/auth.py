from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserOut, Token, UserLogin, UserUpdate
from app.core.security import verify_password, get_password_hash, create_access_token
from app.routers.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["Autentifikasiya"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """Yeni xəstə istifadəçi qeydiyyatı"""
    existing_user = db.query(User).filter(User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu e-poçt ünvanı ilə artıq qeydiyyat mövcuddur"
        )
    
    # Əgər ilk istifadəçidirsə admin ola bilər və ya adi istifadəçi
    user_count = db.query(User).count()
    is_admin = True if user_count == 0 else False

    user = User(
        email=user_in.email,
        full_name=user_in.full_name,
        phone_number=user_in.phone_number,
        hashed_password=get_password_hash(user_in.password),
        is_active=True,
        is_admin=is_admin
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """OAuth2 uyğun giriş (Swagger və standard forma)"""
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-poçt və ya şifrə yanlışdır",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=400, detail="İstifadəçi hesabı qeyri-aktivdir")
    
    access_token = create_access_token(subject=user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


@router.post("/login-json", response_model=Token)
def login_json(credentials: UserLogin, db: Session = Depends(get_db)):
    """Frontend üçün rahat JSON formatında giriş"""
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-poçt və ya şifrə yanlışdır"
        )
    if not user.is_active:
        raise HTTPException(status_code=400, detail="İstifadəçi hesabı qeyri-aktivdir")
    
    access_token = create_access_token(subject=user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }


@router.get("/me", response_model=UserOut)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Cari daxil olmuş istifadəçinin profil məlumatları"""
    return current_user


@router.put("/me", response_model=UserOut)
def update_profile(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cari istifadəçinin profil məlumatlarını yeniləmək"""
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    if user_update.phone_number is not None:
        current_user.phone_number = user_update.phone_number
    if user_update.password:
        current_user.hashed_password = get_password_hash(user_update.password)
        
    db.commit()
    db.refresh(current_user)
    return current_user
