# Temporal Odyssey — Hướng dẫn Assets

## Cấu trúc thư mục

```
static/assets/
├── images/
│   ├── backgrounds/   ← Ảnh nền toàn màn hình
│   ├── logos/         ← Logo, brand mark
│   ├── screens/       ← Screenshot/demo màn hình
│   ├── icons/         ← Icon UI (favicon, PWA icons)
│   └── thumbnails/    ← Ảnh thumbnail cho quiz, category
├── videos/
│   ├── intro/         ← Video intro/splash (autoplay, muted)
│   ├── demo/          ← Video demo gameplay
│   └── backgrounds/   ← Video nền vòng lặp (looping bg)
└── fonts/             ← Custom fonts (woff2)
```

---

## Chuẩn kích thước ảnh

### backgrounds/
| Tên file gợi ý | Kích thước | Dùng cho | Format |
|---|---|---|---|
| `bg-landing.webp` | 1920×1080 | Màn hình chờ / landing | WebP |
| `bg-landing-mobile.webp` | 768×1024 | Mobile portrait | WebP |
| `bg-quiz.webp` | 1920×1080 | Nền màn quiz | WebP |
| `bg-map.webp` | 1920×1080 | Màn bản đồ lịch sử | WebP |
| `bg-blur.webp` | 800×600 | Nền mờ overlay | WebP |

> **Quy tắc:** Max file size 300KB/ảnh (dùng [squoosh.app](https://squoosh.app) để nén)

### logos/
| Tên file | Kích thước | Dùng cho |
|---|---|---|
| `logo.svg` | Vector | Dùng mọi nơi — ưu tiên SVG |
| `logo-192.png` | 192×192 | PWA icon |
| `logo-512.png` | 512×512 | PWA splash |
| `favicon.ico` | 32×32 | Tab browser |
| `logo-dark.png` | 400×120 | Navbar (nền tối) |
| `logo-light.png` | 400×120 | Navbar (nền sáng) |

### screens/ (Demo màn hình)
| Tên file | Kích thước | Dùng cho |
|---|---|---|
| `screen-home.webp` | 1280×720 | Screenshot màn chính |
| `screen-quiz.webp` | 1280×720 | Screenshot màn quiz |
| `screen-map.webp` | 1280×720 | Screenshot bản đồ |
| `screen-mobile.webp` | 390×844 | Screenshot mobile |

### thumbnails/
| Tên file | Kích thước | Dùng cho |
|---|---|---|
| `thumb-myth.webp` | 400×300 | Category Huyền Thoại |
| `thumb-battle.webp` | 400×300 | Category Chiến Trận |
| `thumb-dynasty.webp` | 400×300 | Category Triều Đại |

### icons/
| Tên file | Kích thước | Dùng cho |
|---|---|---|
| `icon-xp.svg` | 24×24 | XP badge |
| `icon-star.svg` | 24×24 | Star/rating |
| `icon-trophy.svg` | 48×48 | Kết quả |

---

## Chuẩn kích thước video

### intro/
| Tên file | Độ phân giải | Duration | Format | Dung lượng max |
|---|---|---|---|---|
| `intro.mp4` | 1280×720 | 5–10 giây | MP4 H.264 | 5MB |
| `intro-mobile.mp4` | 720×1280 | 5–10 giây | MP4 H.264 | 3MB |

### backgrounds/ (video nền loop)
| Tên file | Độ phân giải | Format | Lưu ý |
|---|---|---|---|
| `bg-loop.mp4` | 1280×720 | MP4 H.264 | Muted, loop, autoplay |
| `bg-loop.webm` | 1280×720 | WebM VP9 | Fallback cho Chrome |

> **Quy tắc video nền:** Loại bỏ audio track (`ffmpeg -an`), nén xuống ~2MB, framerate 24fps

### demo/
| Tên file | Độ phân giải | Duration | Dùng cho |
|---|---|---|---|
| `demo-gameplay.mp4` | 1280×720 | 30–60 giây | Trang landing / marketing |
| `demo-quiz.mp4` | 1280×720 | 20–30 giây | Giới thiệu quiz |

---

## Cách gọi ảnh trong HTML/CSS

### CSS background:
```css
.screen-landing {
  background-image: url('/static/assets/images/backgrounds/bg-landing.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Responsive: đổi ảnh trên mobile */
@media (max-width: 768px) {
  .screen-landing {
    background-image: url('/static/assets/images/backgrounds/bg-landing-mobile.webp');
  }
}
```

### Logo trong HTML:
```html
<img src="/static/assets/images/logos/logo.svg" 
     alt="Temporal Odyssey" 
     width="160" height="48"
     loading="eager">
```

### Video nền loop:
```html
<video class="bg-video" autoplay muted loop playsinline>
  <source src="/static/assets/videos/backgrounds/bg-loop.webm" type="video/webm">
  <source src="/static/assets/videos/backgrounds/bg-loop.mp4" type="video/mp4">
</video>
```

```css
.bg-video {
  position: fixed;
  top: 50%; left: 50%;
  min-width: 100%; min-height: 100%;
  transform: translate(-50%, -50%);
  z-index: -1;
  object-fit: cover;
  opacity: 0.25; /* giảm opacity để không lấn át nội dung */
}
```

### Thumbnail category:
```html
<img src="/static/assets/images/thumbnails/thumb-myth.webp"
     alt="Huyền Thoại"
     width="400" height="300"
     loading="lazy">
```

---

## Công cụ tạo & tối ưu

| Công cụ | Dùng để | Link |
|---|---|---|
| Squoosh | Nén ảnh WebP | squoosh.app |
| FFmpeg | Xử lý video | ffmpeg.org |
| SVGOMG | Tối ưu SVG | jakearchibald.github.io/svgomg |
| Remove.bg | Xóa nền ảnh logo | remove.bg |
| Canva | Tạo banner/screen demo | canva.com |

---

## Naming convention

- Dùng **kebab-case**: `bg-landing.webp` ✓ / `BgLanding.webp` ✗
- Prefix theo loại: `bg-`, `logo-`, `screen-`, `thumb-`, `icon-`
- Đuôi file: ưu tiên `.webp` cho ảnh, `.svg` cho icon, `.mp4` cho video
