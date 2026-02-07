# Mat Voyce Scroll Animation

A stunning 3D scroll-based animation inspired by [Mat Voyce's](https://matvoyce.com/) creative portfolio. This project features smooth parallax text effects and dynamic image cards that fly towards the viewer as you scroll.


<img width="1920" height="1080" alt="Screenshot (258)" src="https://github.com/user-attachments/assets/b51dfc51-f5ce-4d6e-8bdb-3b16008b9563" />

---

## ✨ Features

- **3D Image Cards** - Images fly from deep in the 3D space towards the viewer with perspective transforms
- **Parallax Text Layers** - Three-layer text effect with velocity-based offset for dynamic depth
- **Smooth Scrolling** - Powered by [Lenis](https://lenis.studiofreight.com/) for buttery-smooth scroll experience
- **Scroll-Triggered Animations** - All animations tied to scroll progress via GSAP ScrollTrigger
- **Pinned Sticky Section** - The main animation section stays pinned while content scrolls through

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic structure |
| **CSS3** | Styling, 3D transforms, GPU acceleration |
| **JavaScript (ES6+)** | Animation logic and DOM manipulation |
| **[GSAP 3.12](https://greensock.com/gsap/)** | Animation engine |
| **[ScrollTrigger](https://greensock.com/scrolltrigger/)** | Scroll-based animation triggers |
| **[Lenis](https://lenis.studiofreight.com/)** | Smooth scroll library |

---

## 📁 Project Structure

```
Mat voyce/
├── index.html          # Main HTML file
├── styles.css          # All styling and animations
├── script.js           # Animation logic
├── README.md           # This file
├── fonts/
│   └── F37Judge-RegularCompressed.ttf
└── assets/
    ├── img1.jpg
    ├── img2.jpg
    ├── img3.jpg
    ├── img4.jpg
    ├── img5.jpg
    ├── img6.jpg
    ├── img7.jpg
    ├── img8.jpg
    ├── img9.jpg
    └── img10.jpg
```

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local development server (recommended)

### Installation

1. **Clone or download** this repository
2. **Open with Live Server** (VS Code extension recommended)
   ```bash
   # Or use any static server
   npx serve .
   ```
3. **Navigate** to `http://localhost:5500` (or your server's port)

> ⚠️ **Note**: Opening `index.html` directly via `file://` may cause CORS issues with fonts.

---

## 🎬 How It Works

### Section Layout

The page consists of three sections:

1. **Hero Section** - Entry point with "(Scroll if you dare)" text
2. **Sticky Section** - The main animation area (pinned during scroll)
3. **Outro Section** - Exit point with "(That's a wrap)" text

### Animation Breakdown

#### 1. Titles Animation
```
┌─────────────────────────────────────────────────────────────┐
│  .titles container (400vw wide)                             │
│  ┌──────────┬──────────┬──────────┬──────────┐             │
│  │ Showcase │  Nova    │ Circle   │  Bites   │  ◄── Scrolls│
│  │   Hub    │ Stream   │   30     │ & Banter │     left    │
│  └──────────┴──────────┴──────────┴──────────┘             │
└─────────────────────────────────────────────────────────────┘
```

Each title has **three stacked layers**:
- `.title-1` (Yellow) - Moves fastest based on scroll velocity
- `.title-2` (Cyan) - Moves at medium speed
- `.title-3` (Black) - Stationary, provides anchor

#### 2. Card Animation (3D Depth)

```
Camera/Viewer Position: z = 0
                 │
    ◄────────────┼────────────►
                 │
   z = -50000    │    z = 2000
   (Start)       │    (End)
                 │
Cards fly FROM the distance TOWARDS the viewer
```

| Property | Start Value | End Value | Description |
|----------|-------------|-----------|-------------|
| `z` | `-50000px` | `1500-2000px` | Depth position |
| `scale` | `0` | `1` | Size (invisible → full) |

#### 3. Staggered Timing

Cards appear one after another with a **0.075 progress offset**:
```
Card 1: Starts at progress 0.000
Card 2: Starts at progress 0.075
Card 3: Starts at progress 0.150
...
Card 10: Starts at progress 0.675
```

---

## 📐 CSS 3D Setup

The 3D effect requires proper CSS configuration:

```css
.images {
    position: absolute;
    inset: 0;
    transform-style: preserve-3d;  /* Enable 3D for children */
    perspective: 2000px;           /* Camera distance */
}

.card {
    position: absolute;
    transform-style: preserve-3d;
    will-change: transform;        /* GPU optimization */
    backface-visibility: hidden;   /* Performance boost */
}
```

---

## ⚙️ Configuration Options

### Customize Card Positions

Edit the `cardPositions` array in `script.js`:

```javascript
const cardPositions = [
    { top: "30%", left: "55%" },  // Card 1 position
    { top: "20%", left: "25%" },  // Card 2 position
    // ... add more
];
```

### Adjust Animation Duration

Change the scroll distance in `ScrollTrigger.create()`:

```javascript
end: `+=${window.innerHeight * 5}px`  // 5x viewport height
```

- **Increase** for slower animation
- **Decrease** for faster animation

### Modify Stagger Amount

```javascript
staggers.push(i * 0.075);  // Change 0.075 for different timing
```

- **Higher values** = More delay between cards
- **Lower values** = Cards appear closer together

---

## 🎨 Customization

### Change Title Colors

In `styles.css`:
```css
.title-1 { color: #dafa6c; }  /* Yellow/Lime */
.title-2 { color: #10d0f4; }  /* Cyan */
.title-3 { color: #1f1f1f; }  /* Dark Gray */
```

### Change Background Colors

```css
.hero, .outro { background: #edebde; }  /* Beige */
.sticky { background: #fffef8; }        /* Off-white */
```

### Modify Card Size

```css
.card {
    width: 200px;   /* Card width */
    height: 200px;  /* Card height */
    border-radius: 2em;  /* Corner radius */
}
```

---

## ⚡ Performance Optimizations

This project includes several performance optimizations:

| Optimization | Description |
|--------------|-------------|
| **DOM Caching** | All elements queried once at startup |
| **Pre-calculated Values** | Staggers, distances computed upfront |
| **GPU Acceleration** | `will-change`, `backface-visibility` hints |
| **Lenis Smooth Scroll** | Hardware-accelerated scrolling |

### Performance Tips

1. **Optimize Images** - Keep images under 200KB each
2. **Use WebP Format** - 25-35% smaller than JPEG
3. **Resize Images** - Match the display size (200x200px)

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 88+ | ✅ Full |
| Firefox | 78+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 88+ | ✅ Full |
| IE 11 | - | ❌ None |

---

## 📚 Dependencies (CDN)

```html
<!-- GSAP Core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<!-- ScrollTrigger Plugin -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- Lenis Smooth Scroll -->
<script src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"></script>
```

---

## 🙏 Credits

- **Inspiration**: [Mat Voyce](https://matvoyce.com/)
- **Font**: F37 Judge (Compressed)
- **Animation Library**: [GreenSock (GSAP)](https://greensock.com/)
- **Smooth Scroll**: [Lenis by Studio Freight](https://lenis.studiofreight.com/)

---

## 📄 License

This project is for educational purposes. Please respect the original designer's work.

---

## 👨‍💻 Author

**thakuma.dev**

---

*Happy scrolling! 🚀*
