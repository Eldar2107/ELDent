import streamlit as st
import pandas as pd
from datetime import datetime, date

st.set_page_config(
    page_title="ELDent — Stomatoloji Rezervasiya Sistemi",
    page_icon="🦷",
    layout="wide"
)

# Custom Styling
st.markdown("""
<style>
    .main-title {
        font-size: 2.2rem;
        font-weight: 700;
        color: #0284c7;
    }
    .sub-title {
        font-size: 1rem;
        color: #64748b;
        margin-bottom: 2rem;
    }
    .metric-card {
        background-color: #f8fafc;
        border-radius: 12px;
        padding: 1.2rem;
        border: 1px solid #e2e8f0;
    }
</style>
""", unsafe_allow_html=True)

# Sample In-Memory Data for Streamlit Cloud Live Showcase
if "appointments" not in st.session_state:
    st.session_state.appointments = [
        {"ID": 101, "Pasiyent": "Leyla Əliyeva", "Həkim": "Dr. Elmir Qasımov (İmplantoloq)", "Xidmət": "Premium Dental İmplantasiya", "Tarix": "2026-10-20", "Saat": "14:00", "Status": "Təsdiqləndi"},
        {"ID": 102, "Pasiyent": "Rəşad Vəliyev", "Həkim": "Dr. Nərmin Hüseynova (Ortodontist)", "Xidmət": "Breket Müayinəsi & Planlama", "Tarix": "2026-10-21", "Saat": "11:00", "Status": "Gözləmədə"},
        {"ID": 103, "Pasiyent": "Aygün Məmmədova", "Həkim": "Dr. Rauf Məmmədov (Terapevt)", "Xidmət": "İşıqla Bərkiyən Estetik Plomb", "Tarix": "2026-10-21", "Saat": "15:00", "Status": "Tamamlandı"},
    ]

# Sidebar Navigation
st.sidebar.image("https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80", use_container_width=True)
st.sidebar.title("🦷 ELDent Menyu")
menu = st.sidebar.radio("Bölməni seçin:", ["Ana Səhifə & Rezervasiya", "Həkimlərimiz & Xidmətlər", "Admin Dashboard"])

# 1. Ana Səhifə & Rezervasiya
if menu == "Ana Səhifə & Rezervasiya":
    st.markdown('<div class="main-title">ELDent Stomatoloji Rezervasiya Sistemi</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-title">Müasir avadanlıqlar, peşəkar həkimlər və rahat onlayn randevu götürmə portalı.</div>', unsafe_allow_html=True)

    col1, col2 = st.columns([1.5, 1])

    with col1:
        st.subheader("🗓️ Yeni Randevu Rezervasiyası")
        with st.form("booking_form"):
            name = st.text_input("Ad və Soyadınız *", placeholder="Məs. Nurlan Məmmədov")
            phone = st.text_input("Əlaqə Nömrəniz *", placeholder="+994 50 123 45 67")
            
            doctor = st.selectbox("Həkim seçin *", [
                "Dr. Elmir Qasımov — Baş Stomatoloq & İmplantoloq (12 il təcrübə)",
                "Dr. Nərmin Hüseynova — Ortodontist (Breket mütəxəssisi)",
                "Dr. Rauf Məmmədov — Terapevt-Stomatoloq (Kanal müalicəsi)",
                "Dr. Aysel Kərimova — Estetik Stomatologiya & Ağartma"
            ])

            service = st.selectbox("Xidmət növü *", [
                "İlkin Stomatoloji Müayinə & Konsultasiya (25 AZN)",
                "İşıqla Bərkiyən Estetik Plomb (60 AZN)",
                "Diş Daşlarının Ultrasəslə Təmizlənməsi & Air-Flow (50 AZN)",
                "Laser Diş Ağartma - Zoom 4 (200 AZN)",
                "Premium Dental İmplantasiya - Straumann (650 AZN)"
            ])

            col_d, col_t = st.columns(2)
            with col_d:
                appt_date = st.date_input("Münasib Tarix", min_value=date.today())
            with col_t:
                appt_time = st.selectbox("Müsait Saat Slotu", ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"])

            notes = st.text_area("Şikayətiniz və ya əlavə qeydlər", placeholder="Məs. Sol üst dişimdə soyuğa həssaslıq var...")

            submit = st.form_submit_button("Randevunu Təsdiqlə 🚀", use_container_width=True)

            if submit:
                if not name or not phone:
                    st.error("Zəhmət olmasa ad və əlaqə nömrənizi daxil edin!")
                else:
                    new_id = len(st.session_state.appointments) + 101
                    st.session_state.appointments.append({
                        "ID": new_id,
                        "Pasiyent": name,
                        "Həkim": doctor.split(" — ")[0],
                        "Xidmət": service.split(" (")[0],
                        "Tarix": str(appt_date),
                        "Saat": appt_time,
                        "Status": "Gözləmədə"
                    })
                    st.success(f"Təbriklər, {name}! Randevunuz #{new_id} kodu ilə qeydə alındı. Tezliklə təsdiq zəngi alacaqsınız.")

    with col2:
        st.subheader("ℹ️ Klinika Haqqında")
        st.info("""
        📍 **Ünvan:** Bakı şəh., Nizami küç. 142  
        📞 **Əlaqə:** +994 (12) 490 00 00  
        ⏰ **İş Saatları:** B.e - Cümə: 09:00 - 20:00  
        ⭐ **Google Reytinqi:** 4.9 / 5.0 (1,200+ rəy)
        """)
        st.image("https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80", caption="ELDent Sterilizasiya & Qəbul Şöbəsi", use_container_width=True)

# 2. Həkimlər & Xidmətlər
elif menu == "Həkimlərimiz & Xidmətlər":
    st.markdown('<div class="main-title">Həkim Komandamız və Tariflər</div>', unsafe_allow_html=True)
    
    tab1, tab2 = st.tabs(["👨‍⚕️ Həkimlər", "📋 Xidmətlər Kataloqu"])

    with tab1:
        c1, c2 = st.columns(2)
        with c1:
            st.image("https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80", width=180)
            st.markdown("### Dr. Elmir Qasımov\n**İmplantoloq-Cərrah** &bull; 12 il təcrübə &bull; ⭐ 4.9")
            st.write("Almaniya təhsilli implantologiya üzrə baş həkim.")
            st.divider()

            st.image("https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80", width=180)
            st.markdown("### Dr. Rauf Məmmədov\n**Terapevt-Stomatoloq** &bull; 10 il təcrübə &bull; ⭐ 4.7")
            st.write("Mikroskop altında kanal müalicəsi və bədii bərpa mütəxəssisi.")

        with c2:
            st.image("https://images.unsplash.com/photo-1594824813580-044eb98522e8?auto=format&fit=crop&w=400&q=80", width=180)
            st.markdown("### Dr. Nərmin Hüseynova\n**Ortodontist** &bull; 8 il təcrübə &bull; ⭐ 4.8")
            st.write("Şəffaf qapaqlar (invisalign) və estetik breketlər üzrə ekspert.")
            st.divider()

            st.image("https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80", width=180)
            st.markdown("### Dr. Aysel Kərimova\n**Estetik Stomatologiya** &bull; 6 il təcrübə &bull; ⭐ 5.0")
            st.write("Hollywood Smile, zirkon örtüklər və lazerlə diş ağartma.")

    with tab2:
        df_services = pd.DataFrame([
            {"Xidmət": "İlkin Müayinə & Konsultasiya", "Kateqoriya": "Müayinə", "Müddət": "30 dəq", "Qiymət": "25 AZN"},
            {"Xidmət": "İşıqla Bərkiyən Alman Plomb", "Kateqoriya": "Terapevtik", "Müddət": "45 dəq", "Qiymət": "60 AZN"},
            {"Xidmət": "Ultrasəs Təmizlənmə & Air-Flow", "Kateqoriya": "Gigiyena", "Müddət": "40 dəq", "Qiymət": "50 AZN"},
            {"Xidmət": "Laser Diş Ağartma (Zoom 4)", "Kateqoriya": "Estetik", "Müddət": "60 dəq", "Qiymət": "200 AZN"},
            {"Xidmət": "Straumann Dental İmplant", "Kateqoriya": "Cərrahiyyə", "Müddət": "60 dəq", "Qiymət": "650 AZN"},
            {"Xidmət": "Ağrısız Diş Çəkilməsi", "Kateqoriya": "Cərrahiyyə", "Müddət": "30 dəq", "Qiymət": "45 AZN"},
        ])
        st.dataframe(df_services, use_container_width=True, hide_index=True)

# 3. Admin Dashboard
elif menu == "Admin Dashboard":
    st.markdown('<div class="main-title">Klinika İdarəetmə Paneli</div>', unsafe_allow_html=True)
    
    # Metrics
    m1, m2, m3, m4 = st.columns(4)
    total_appts = len(st.session_state.appointments)
    pending_appts = sum(1 for a in st.session_state.appointments if a["Status"] == "Gözləmədə")
    confirmed_appts = sum(1 for a in st.session_state.appointments if a["Status"] == "Təsdiqləndi")
    
    m1.metric("Ümumi Randevu", total_appts)
    m2.metric("Gözləmədə Olanlar", pending_appts, delta="Təsdiq gözləyir", delta_color="inverse")
    m3.metric("Təsdiqlənmiş Qəbullar", confirmed_appts)
    m4.metric("Klinika Reytinqi", "4.9 ⭐")

    st.subheader("📋 Daxil Olmuş Randevular Cədvəli")
    df_appts = pd.DataFrame(st.session_state.appointments)
    st.dataframe(df_appts, use_container_width=True, hide_index=True)

    st.subheader("⚡ Randevu Statusunu Yenilə")
    col_sel, col_stat, col_btn = st.columns([2, 2, 1])
    with col_sel:
        appt_ids = [a["ID"] for a in st.session_state.appointments]
        selected_id = st.selectbox("Randevu ID-si", appt_ids)
    with col_stat:
        new_status = st.selectbox("Yeni Status", ["Təsdiqləndi", "Ləğv edildi", "Tamamlandı"])
    with col_btn:
        st.write("")
        st.write("")
        if st.button("Tətbiq Et"):
            for a in st.session_state.appointments:
                if a["ID"] == selected_id:
                    a["Status"] = new_status
            st.success(f"#{selected_id} statusu '{new_status}' olaraq yeniləndi!")
            st.rerun()
