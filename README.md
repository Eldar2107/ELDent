# 🦷 ELDent — Stomatoloji Rezervasiya və Klinika İdarəetmə Sistemi

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61dafb.svg)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ed.svg)](https://www.docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791.svg)](https://www.postgresql.org/)
[![Streamlit](https://img.shields.io/badge/Streamlit-App-FF4B4B.svg)](https://streamlit.io/)

> **ELDent** — stomatoloji klinikalar üçün nəzərdə tutulmuş, pasiyentlərin həkim seçərək onlayn randevu götürməsini, klinik heyətinin isə qəbul qrafikini və maliyyə göstəricilərini vahid mərkəzdən idarə etməsini təmin edən müasir, end-to-end platformadır.

---

## 🌟 Əsas Funksionallıqlar

- 🔐 **Autentifikasiya & Təhlükəsizlik:** JWT Bearer Token, Bcrypt şifrələmə, Xəstə və Admin rol əsaslı icazələr (RBAC).
- 👨‍⚕️ **Həkimlər Kataloqu:** İxtisas, reytinq, iş təcrübəsi və aktivlik statusuna görə süzgəcləmə.
- 📋 **Xidmətlər & Tariflər:** Kateqoriyalar üzrə stomatoloji prosedurlar, müddət və qiymət cədvəli.
- 📅 **Ağıllı Rezervasiya (Booking):** Dinamik tarix və vaxt slotları, eyni saata ikiqat qeydiyyatın (race condition/conflict) qarşısının alınması.
- 👤 **Pasiyent Şəxsi Kabineti:** Aktiv və keçmiş randevuları izləmə, zərurət olduqda bir toxunuşla ləğv etmə.
- 📊 **Admin İdarəetmə Paneli:** Gəlir hesabatı, pasiyent statistikası, qəbul sorğularının təsdiqi və həkim/xidmət CRUD modulları.

---

## 🏗️ Layihə Arxitekturası & Texnologiyalar

| Sahə | Texnologiya | Təsvir |
| :--- | :--- | :--- |
| **Backend** | Python 3.11, FastAPI, SQLAlchemy, Pydantic | Yüksək sürətli Asinxron REST API |
| **Database** | PostgreSQL 15, Alembic | Əlaqəli verilənlər bazası və miqrasiyalar |
| **Web Frontend** | React 18, React Router, Axios, Tailwind CSS | Pasiyentlər üçün cəlbedici istifadəçi portalı |
| **Admin Panel** | React 18, Tailwind CSS, Lucide Icons | Klinika rəhbərliyi üçün idarəetmə paneli |
| **Canlı Demo** | Streamlit Cloud | Bulud üzərində 7/24 dərhal baxış və interaktiv nümayiş |
| **Deployment** | Docker & Docker Compose, Nginx Reverse Proxy | 4 servisin tək komanda ilə orkestrasiyası |

---

## 📁 Qovluq Strukturu

```text
ELDent/
├── 00_Requirements/          # ITBA Biznes Analiz və Funksional Tələblər (PDF)
├── 01_Design/                # UI/UX Stil Bələdçisi və Komponent Spesifikasiyaları
├── 02_Backend/               # FastAPI REST API, SQLAlchemy Modelləri, Routers & Swagger
├── 03_Frontend/
│   ├── web/                  # Xəstə Portalı (React 18 SPA)
│   └── admin/                # Admin İdarəetmə Paneli (React 18 SPA)
├── 04_Deploy/                # Dockerfile-lar, docker-compose.yml və Nginx konfiqurasiyası
├── 05_QA/                    # Keyfiyyət Təminatı və Test Ssenariləri (PDF)
├── 06_Notion_Backlog/        # Layihə Backlog-u, Epiklər və Risklər Cədvəli
├── streamlit_app.py          # Streamlit Cloud üçün canlı portal
└── requirements.txt          # Streamlit bulud asılılıqları
```

---

## ⚡ Sistemi İşə Salma Qaydası

### Variant 1: Docker ilə (Tövsiyə olunan — Tək komanda ilə)

1. `04_Deploy` qovluğuna keçin:
   ```bash
   cd 04_Deploy
   ```
2. Bütün 4 servisi qurun və işə salın:
   ```bash
   docker-compose up -d
   ```

**Giriş Linkləri:**
- 🌐 **Xəstə Portalı:** [http://localhost:3000](http://localhost:3000)
- ⚙️ **Admin Paneli:** [http://localhost:3001](http://localhost:3001)
- 🔌 **FastAPI Swagger Sənədləşməsi:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Variant 2: Streamlit ilə Canlı İcra

```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```

---

## 🔑 Standart Test Hesabları

Sistem ilk işə düşdükdə avtomatik olaraq ilkin nümunə məlumatları yaradır:

- **Admin Girişi:**  
  - E-poçt: `admin@eldent.az`  
  - Şifrə: `admin12345`
- **Pasiyent Girişi:**  
  - E-poçt: `patient@eldent.az`  
  - Şifrə: `patient123`

---

## 📄 Lisenziya
Bu layihə MIT lisenziyası altında sərbəst paylanılır.
