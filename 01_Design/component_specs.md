# ELDent — UI Component Specifications

Bu sənəd sistemdə istifadə olunan əsas vizual komponentlərin arxitekturasını, prop-larını, vizual variantlarını və davranış qaydalarını müəyyən edir.

---

## 1. Button Komponenti
**Məqsəd:** İstifadəçi əməliyyatlarını tətikləmək (forma göndərmə, modalları açma, təsdiq).

- **Variantlar:**
  - `primary`: Fon `#0284c7`, mətn `#ffffff`, hover `#0369a1`. Əsas əməliyyatlar (Rezervasiya et, Giriş).
  - `secondary`: Fon `#e0f2fe`, mətn `#0369a1`, hover `#bae6fd`. İkinci dərəcəli əməliyyatlar (Filter, Geri).
  - `danger`: Fon `#ef4444`, mətn `#ffffff`, hover `#dc2626`. Ləğv etmə, silmə.
  - `outline`: Şəffaf fon, haşiyə `#0284c7`, mətn `#0284c7`.
- **Ölçülər:**
  - `sm`: h: 32px, px: 12px, text: 12px
  - `md`: h: 42px, px: 16px, text: 14px (Standart)
  - `lg`: h: 50px, px: 24px, text: 16px
- **Vəziyyətlər (States):** Default, Hover, Active, Disabled (`opacity-50`, `cursor-not-allowed`), Loading (spinner animasiyası ilə).

---

## 2. Input Komponenti
**Məqsəd:** Mətn, e-poçt, telefon və şifrə daxil etmə sahəsi.

- **Elementlər:**
  - `Label`: Şrift 14px medium, rəng `#0f172a`.
  - `Field`: Hündürlük 42px, haşiyə 1px `#e2e8f0`, fon `#ffffff`, padding 12px.
  - `Focus State`: Haşiyə rəngi `#0284c7`, xarici zərif kölgə `ring-2 ring-sky-100`.
  - `Error State`: Haşiyə `#ef4444`, fokusda `ring-2 ring-red-100`.
  - `Helper / Error Text`: 12px mətn sahənin aşağısında (xəta halında qırmızı rəngdə).
  - `Prefix/Suffix Icon`: İxtiyari axtarış və ya göz (şifrəni göstər) ikonu.

---

## 3. Card Komponenti
**Məqsəd:** Məlumat bloklarını səliqəli və qruplaşdırılmış şəkildə göstərmək.

- **Struktur:** Fon `#ffffff`, haşiyə radiusu `12px` (`rounded-xl`), zərif haşiyə `1px solid #e2e8f0`, baza kölgəsi `shadow-sm`.
- **Daxili Bölmələr:**
  - `CardHeader`: Başlıq və hərəkət düyməsi üçün yer.
  - `CardBody`: Əsas məzmun (padding 20px).
  - `CardFooter`: Əlaqəli düymələr və ya qeydlər.
- **Hover Effekti:** İnteraktiv kartlar üçün `hover:shadow-md hover:border-sky-300 transition-all`.

---

## 4. Modal (Dialog) Komponenti
**Məqsəd:** İstifadəçini mövcud axından ayırmadan vacib əməliyyatları (məs. rezervasiyanın təsdiqi, yeni həkim əlavəsi) icra etmək.

- **Overlay:** Fon `rgba(15, 23, 42, 0.5)` fon blur effekti (`backdrop-blur-sm`).
- **Modal Box:** Maksimal en 540px (standart), mərkəzdə yerləşmə, fon `#ffffff`, radius 16px, kölgə `shadow-2xl`.
- **Animasiya:** Açılışda miqyas və şəffaflıq animasiyası (`scale-95 opacity-0` -> `scale-100 opacity-100`).
- **İdarəetmə:** Kənar klik və ya `Esc` düyməsi ilə bağlanma, yuxarı sağ küncdə `X` ikonu.

---

## 5. DoctorCard Komponenti
**Məqsəd:** Stomatoloqun profil xülasəsini vizual cəlbedici şəkildə təqdim etmək.

- **Elementlər:**
  - `Avatar`: 80x80px dairəvi şəkil (`rounded-full ring-4 ring-sky-50`).
  - `Name & Title`: Həkimin adı (16px bold) və ixtisası (məs. *Ortodontist*, 13px medium `#0284c7`).
  - `Experience & Rating`: Təcrübə ili (məs. *8 il təcrübə*) və reytinq ulduzu (★ 4.9).
  - `Action Button`: Birbaşa "Randevu Götür" düyməsi (ölçü: `sm`, variant: `primary`).

---

## 6. ServiceCard Komponenti
**Məqsəd:** Klinikanın təklif etdiyi stomatoloji xidmətləri (Müayinə, Plomb, İmplant, Diş təmizlənməsi və s.) nümayiş etdirmək.

- **Elementlər:**
  - `Service Icon`: Mövzuya uyğun dairəvi fonda diş və ya tibbi tibbi ikon (fon: `#e0f2fe`, ikon: `#0284c7`).
  - `Title`: Xidmətin adı (16px semi-bold).
  - `Description`: Xidmətin qısa izahı (13px, rəng `#64748b`).
  - `Duration & Price`: Müddət (məs. *45 dəqiqə*) və qiymət etiketi (məs. *AZN 50-dən başlayaraq*, qalın yaşıl vurğu `#10b981`).
  - `Selectable State`: Randevu formunda seçildikdə göy haşiyə və checkmark işarəsi.

---

## 7. DatePicker & TimeSlotPicker Komponenti
**Məqsəd:** Xəstənin rezervasiya üçün təqvimdən gün və həkimin boş saatını rahatlıqla seçməsi.

- **Təqvim Görünüşü (Calendar View):**
  - Cari ay/il naviqasiyası (< və > oxları ilə).
  - Keçmiş tarixlər deaktiv (`disabled`, boz rəng).
  - Qeyri-iş günləri (bazar günləri) xüsusi qeyd.
  - Seçilmiş gün: fon `#0284c7`, mətn ağ.
- **Vaxt Slotları Qridi (Time Slots Grid):**
  - 30 dəqiqə və ya 1 saatlıq pəncərələr: `09:00`, `10:00`, `11:00`, `14:00`, `15:00`, `16:00` və s.
  - **Status Rəngləri:**
    - *Boş saat:* Haşiyə `#e2e8f0`, fon ağ, hoverdə `#e0f2fe`.
    - *Dolu saat:* Fon `#f1f5f9`, mətn `#94a3b8`, deaktiv və xətt çəkilmiş.
    - *Seçilmiş saat:* Fon `#10b981` (yaşıl), mətn ağ, zərif qalxma animasiyası.
