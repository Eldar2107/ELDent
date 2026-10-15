# ELDent — Design Style Guide

## 1. Rəng Paleti (Color Palette - Medical Theme)

ELDent vizual identikliyi təmizlik, güvən, peşəkarlıq və tibbi gigiyenanı əks etdirən ağ, dəniz mavisi və şəfaverici zümrüd yaşılı tonları üzərində qurulmuşdur.

### Əsas Rənglər (Primary & Secondary)
| Rəng Adı | HEX Kodu | Tailwind Class | Təsvir / İstifadə Yeri |
| :--- | :--- | :--- | :--- |
| **Medical Blue (Primary)** | `#0284c7` | `sky-600` | Əsas CTA düymələri, loqo vurğusu, aktiv naviqasiya |
| **Deep Blue (Dark Accent)** | `#0369a1` | `sky-700` | Hover vəziyyətləri, başlıqlar, önəmli ikonlar |
| **Clinical Cyan (Light)** | `#e0f2fe` | `sky-100` | Kart arxa fonları, seçilmiş cədvəl sətirləri |
| **Health Green (Success)** | `#10b981` | `emerald-500`| Rezervasiya təsdiqi, uğurlu əməliyyatlar, boş saatlar |
| **Soft Mint (Success Light)**| `#ecfdf5` | `emerald-50` | Status becləri arxa fonu, müsbət bildirişlər |
| **Urgent Amber (Warning)** | `#f59e0b` | `amber-500`  | Gözləmədə olan randevular, xəbərdarlıqlar |
| **Clinical Red (Danger)** | `#ef4444` | `red-500`    | Ləğv olunmuş randevular, xəta mesajları |

### Neytral Rənglər (Neutrals & Backgrounds)
| Rəng Adı | HEX Kodu | Tailwind Class | Təsvir / İstifadə Yeri |
| :--- | :--- | :--- | :--- |
| **Pure White** | `#ffffff` | `white` | Əsas səhifə fonu, kartlar, modal pəncərələr |
| **Soft Clinic Gray** | `#f8fafc` | `slate-50` | Tətbiq daxili ikinci dərəcəli fon |
| **Border Gray** | `#e2e8f0` | `slate-200` | İnput sərhədləri, cədvəl xətləri, ayırıcılar |
| **Muted Text** | `#64748b` | `slate-500` | Alt yazılar, köməkçi təsvirlər, tarix formatları |
| **Heading Charcoal** | `#0f172a` | `slate-900` | Əsas mətnlər və böyük başlıqlar |

---

## 2. Tipoqrafiya (Typography)

Tətbiqdə oxunaqlığı və müasir interfeys estetikasını təmin etmək üçün **Inter** (bədən mətnləri, interfeys elementləri) və **Poppins** (başlıqlar və bannerlər) şriftləri seçilmişdir.

- **Primary Font:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Heading Font:** `'Poppins', sans-serif`

### Şrift Miqyası (Type Scale)
| Səviyyə | Ölçü (px / rem) | Çəki (Font Weight) | Line Height | Nümunə İstifadə |
| :--- | :--- | :--- | :--- | :--- |
| **Display H1** | 36px / 2.25rem | 700 (Bold) | 2.5rem | Landing Page Hero Başlığı |
| **Page H2** | 28px / 1.75rem | 600 (Semi-bold) | 2rem | Səhifə Başlıqları (Həkimlərimiz, Xidmətlər) |
| **Section H3**| 20px / 1.25rem | 600 (Semi-bold) | 1.75rem | Kart başlıqları, Modal başlıqları |
| **Subtitle** | 16px / 1rem | 500 (Medium) | 1.5rem | Alt başlıqlar, forma etiketləri (labels) |
| **Body (Default)**| 14px / 0.875rem | 400 (Regular) | 1.25rem | Əsas paraqraflar, cədvəl hüceyrələri |
| **Caption / Small**| 12px / 0.75rem | 500 (Medium) | 1rem | Beclər, statuslar, input xəta mesajları |

---

## 3. Boşluq və Qrid Sistemi (Spacing & Layout Grid)

8px baza addımına (8-point grid system) əsaslanır.

| Token | Dəyər (px) | Tailwind Class | İstifadə Yeri |
| :--- | :--- | :--- | :--- |
| `space-1` | 4px | `p-1`, `m-1` | İkon və mətn arası mikro boşluq |
| `space-2` | 8px | `p-2`, `m-2` | Düymə daxili şaquli padding, badge kənarları |
| `space-3` | 12px | `p-3`, `m-3` | İnput sahələri daxili boşluq |
| `space-4` | 16px | `p-4`, `m-4` | Kartların daxili padding-i, forma qrupları arası |
| `space-6` | 24px | `p-6`, `m-6` | Səhifə bölmələri arası məsafə, modalların kənarları |
| `space-8` | 32px | `p-8`, `m-8` | Dashboard qrup blokları |
| `space-12` | 48px | `py-12` | Landing page bölmələri arası şaquli məsafə |

### Radius və Kölgə Sistemi (Border Radius & Shadows)
- **Border Radius:**
  - `rounded-md` (6px): İnputlar, düymələr, beclər
  - `rounded-xl` (12px): Kartlar, modal qutuları, həkim profil qutuları
  - `rounded-full`: Avatar şəkilləri, pill düymələr
- **Elevation (Box Shadows):**
  - `shadow-sm`: Standart kartlar və input fokus vəziyyətləri
  - `shadow-md`: Hover edilən kartlar (DoctorCard, ServiceCard)
  - `shadow-xl`: Modal pəncərələr və açılan menyular (Dropdowns)
