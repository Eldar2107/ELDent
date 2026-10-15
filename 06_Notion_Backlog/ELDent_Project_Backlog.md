# ELDent — Layihə Backlog (Engineering Manager)

> **Məkan:** Engineering Manager / ELDent Product Management  
> **Status:** Aktiv İnkişaf Mərhələsində  
> **Məqsəd:** ELDent Stomatoloji Rezervasiya Sisteminin bütün mühəndislik epikləri, texniki tapşırıqları və risklərin idarə olunması.

---

## 1. Epic Cədvəli (7 Əsas Epik)

| Epic ID | Epik Adı | Sahə | Cavabdeh Rol | Status |
| :--- | :--- | :--- | :--- | :--- |
| **EPIC-01** | Tələblərin Toplanması və Analiz | Biznes Analiz | ITBA | **Tamamlandı (Done)** |
| **EPIC-02** | UI/UX Dizayn Sistemi & Komponentlər | Dizayn | UX/UI Dizayner | **Tamamlandı (Done)** |
| **EPIC-03** | FastAPI Core Arxitekturası & DB | Backend | Backend Mühəndis | **Tamamlandı (Done)** |
| **EPIC-04** | Rezervasiya Mühərriki & Conflict Prevention | Backend | Backend Mühəndis | **Tamamlandı (Done)** |
| **EPIC-05** | Pasiyent Veb Portalı (React 18) | Frontend | Frontend Mühəndis | **Tamamlandı (Done)** |
| **EPIC-06** | Admin Qəbul & İdarəetmə Paneli | Frontend | Frontend Mühəndis | **Tamamlandı (Done)** |
| **EPIC-07** | QA Test Suite & Dockerlaşdırma | DevOps & QA | QA Mühəndis / DevOps | **Tamamlandı (Done)** |

---

## 2. Tapşırıqlar Cədvəli (Tasks & Subtasks)

| Task ID | Əlaqəli Epic | Tapşırıq Təsviri | Prioritet | Təxmini Müddət | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-101** | EPIC-01 | Maraqlı tərəflərlə görüş və FR/NFR spesifikasiyası | Yüksək | 3 gün | Tamamlandı |
| **TSK-102** | EPIC-01 | Gherkin formatında qəbul kriteriyalarının yazılması | Yüksək | 2 gün | Tamamlandı |
| **TSK-103** | EPIC-01 | Rəsmi `ITBA_Analysis.pdf` analitika hesabatının tərtibi | Orta | 2 gün | Tamamlandı |
| **TSK-201** | EPIC-02 | Tibbi rəng paleti və tipoqrafiya qaydaları (`style_guide.md`) | Orta | 2 gün | Tamamlandı |
| **TSK-202** | EPIC-02 | DatePicker, DoctorCard, ServiceCard dizayn spesifikasiyası | Yüksək | 3 gün | Tamamlandı |
| **TSK-203** | EPIC-02 | Responsive layout və Tailwind dizayn tokenləri | Orta | 2 gün | Tamamlandı |
| **TSK-301** | EPIC-03 | PostgreSQL relational model sxemləri (User, Doctor, Service, Appointment) | Kritik | 3 gün | Tamamlandı |
| **TSK-302** | EPIC-03 | Alembic ilkin miqrasiyaların və seeder funksiyasının yazılması | Yüksək | 2 gün | Tamamlandı |
| **TSK-303** | EPIC-03 | JWT token əsaslı OAuth2 autentifikasiya və bcrypt şifrələməsi | Kritik | 3 gün | Tamamlandı |
| **TSK-304** | EPIC-03 | OpenAPI `swagger.yaml` sənədləşməsinin hazırlanması | Orta | 2 gün | Tamamlandı |
| **TSK-401** | EPIC-04 | Həkim və tarix üzrə məşğul slotları təyin edən alqoritm | Kritik | 3 gün | Tamamlandı |
| **TSK-402** | EPIC-04 | Eyni saata ikiqat rezervasiyanın qarşısını alan toqquşma yoxlaması | Kritik | 2 gün | Tamamlandı |
| **TSK-403** | EPIC-04 | Pasiyentin öz randevusunu ləğv etməsi endpointi | Yüksək | 2 gün | Tamamlandı |
| **TSK-501** | EPIC-05 | Tailwind CSS və Lucide ikonları ilə müasir Landing Page | Yüksək | 4 gün | Tamamlandı |
| **TSK-502** | EPIC-05 | Həkim və Xidmət kataloqları (filtrasiya və axtarış) | Yüksək | 3 gün | Tamamlandı |
| **TSK-503** | EPIC-05 | İnteraktiv Date & Time Slot seçimi ilə Rezervasiya formu | Kritik | 4 gün | Tamamlandı |
| **TSK-504** | EPIC-05 | Pasiyent Şəxsi Kabineti və randevu status izləməsi | Yüksək | 3 gün | Tamamlandı |
| **TSK-601** | EPIC-06 | Gəlir və pasiyent statistikasını əks etdirən Admin Dashboard | Yüksək | 3 gün | Tamamlandı |
| **TSK-602** | EPIC-06 | Randevuların təsdiqi və status tənzimləmə modulu | Kritik | 3 gün | Tamamlandı |
| **TSK-603** | EPIC-06 | Həkimlərin CRUD idarəetmə cədvəli və modal forması | Yüksək | 2 gün | Tamamlandı |
| **TSK-604** | EPIC-06 | Stomatoloji xidmət və qiymət tariflərinin idarəsi | Yüksək | 2 gün | Tamamlandı |
| **TSK-701** | EPIC-07 | FastAPI üçün Dockerfile və optimizasiya | Yüksək | 2 gün | Tamamlandı |
| **TSK-702** | EPIC-07 | React tətbiqləri üçün multi-stage Nginx Dockerfile | Yüksək | 2 gün | Tamamlandı |
| **TSK-703** | EPIC-07 | 4 servisi birləşdirən `docker-compose.yml` mühiti | Kritik | 2 gün | Tamamlandı |
| **TSK-704** | EPIC-07 | Ətraflı QA test ssenariləri və `Test_Scenarios.pdf` hesabatı | Yüksək | 3 gün | Tamamlandı |

---

## 3. Risklər və Qarşısının Alınması Bölməsi (Risk Management)

| Risk ID | Risk Təsviri | Təsir Dərəcəsi | Ehtimal | Mitigasiya (Həll Yolu) |
| :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | **Eyni saata ikiqat rezervasiya (Race Condition):** Eyni saniyədə 2 xəstə eyni saatı kliklədikdə toqquşma. | Kritik | Orta | Verilənlər bazası səviyyəsində unikal indeks və backend tranzaksiya yoxlaması ilə 1-ci istifadəçi qeydə alınır, 2-ciyə 409 Conflict qaytarılır. |
| **RSK-02** | **Xəstənin vaxtında gəlməməsi (No-Show):** Rezervasiya götürüb klinikaya yaxınlaşmamaq. | Yüksək | Yüksək | Randevudan 24 saat və 2 saat əvvəl avtomatlaşdırılmış SMS/E-poçt xatırlatması və öncədən zənglə təsdiq prosesi. |
| **RSK-03** | **Yetkisiz məlumat dəyişikliyi (Security Breach):** Bir istifadəçinin başqasının qəbulunu görməsi və ya ləğv etməsi. | Kritik | Aşağı | JWT Bearer token yoxlaması; endpoint daxilində `current_user.id == appointment.user_id` şərti yoxlanılır. |
| **RSK-04** | **Verilənlər Bazasının Sıradan Çıxması:** Rezervasiya məlumatlarının itməsi. | Kritik | Aşağı | Docker volume vasitəsilə daimi yaddaş (persistent storage) və gündəlik avtomatik PostgreSQL dump nüsxələnməsi. |
