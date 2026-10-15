# ELDent — Docker Deploy & İcra Təlimatı

Bu qovluq bütün ELDent sistemini (PostgreSQL verilənlər bazası, FastAPI backend, React Pasiyent Portalı və React Admin İdarəetmə Paneli) vahid komanda ilə konteynerləşdirmək və işə salmaq üçün nəzərdə tutulmuşdur.

---

## 1. İlkin Tələblər
- [Docker](https://www.docker.com/) və Docker Compose (v2.0+)
- Portların boş olması: `5432` (PostgreSQL), `8000` (FastAPI), `3000` (Web), `3001` (Admin)

---

## 2. Sistemi İşə Salma Qaydası

1. Terminalda `04_Deploy` qovluğuna keçid edin:
   ```bash
   cd 04_Deploy
   ```

2. `.env.example` faylından `.env` nüsxəsini yaradın (ixtiyari):
   ```bash
   cp .env.example .env
   ```

3. Bütün 4 servisi qurun və fonda başladın:
   ```bash
   docker-compose up --build -d
   ```

4. Konteynerlərin statusunu yoxlamaq üçün:
   ```bash
   docker-compose ps
   ```

---

## 3. Giriş Ünvanları (Endpoints & UI)

| Xidmət | Ünvan | Təsvir |
| :--- | :--- | :--- |
| **Xəstə Portalı (Web)** | [http://localhost:3000](http://localhost:3000) | Əsas veb sayt, həkim seçimi, randevu götürmə |
| **Admin İdarəetmə Paneli**| [http://localhost:3001](http://localhost:3001) | Həkimlər, xidmətlər və randevu statusları |
| **FastAPI REST API** | [http://localhost:8000](http://localhost:8000) | Əsas backend API servisi |
| **Swagger UI Sənədləşmə**| [http://localhost:8000/docs](http://localhost:8000/docs) | İnteraktiv API test paneli |
| **ReDoc Sənədləşmə** | [http://localhost:8000/redoc](http://localhost:8000/redoc) | Detallı OpenAPI spesifikasiyası |

---

## 4. Standart Test Giriş Məlumatları

Sistem ilk dəfə açıldıqda avtomatik olaraq ilkin məlumatları (seeder) daxil edir:

- **Admin İstifadəçisi:**
  - E-poçt: `admin@eldent.az`
  - Şifrə: `admin12345`
- **Nümunə Pasiyent:**
  - E-poçt: `patient@eldent.az`
  - Şifrə: `patient123`

---

## 5. Sistemi Dayandırmaq
```bash
docker-compose down
```
Verilənlər bazasını tam sıfırlamaq istəsəniz:
```bash
docker-compose down -v
```
