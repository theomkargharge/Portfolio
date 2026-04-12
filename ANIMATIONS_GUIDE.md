# 🎨 Scroll Animations Guide

Your website now has comprehensive scroll animations with multiple aesthetic styles. Here's everything available:

## 📊 Reveal Animation Types

### **Basic Reveals**
- `.reveal` - **Fade Up**: Slides up 28px with fade
- `.reveal-scale` - **Scale In**: Scales from 92% to 100% with fade
- `.reveal-fast` - **Fast Fade Up**: Quick version (0.5s)
- `.reveal-fastest` - **Extra Fast**: Very quick (0.4s)

### **Directional Slides**
- `.reveal-left` - **Slide from Left**: Enters from left with 3D perspective, 40px travel
- `.reveal-right` - **Slide from Right**: Enters from right with 3D perspective, 40px travel
- `.reveal-top` - **Slide from Top**: Enters from top, 40px travel
- `.reveal-bottom` - **Slide from Bottom**: Enters from bottom, 40px travel

### **Advanced Effects**
- `.reveal-zoom` - **Zoom In**: Scales from 85% with fade and Y translation
- `.reveal-rotate` - **Rotate In**: Rotates -8° while scaling up, 0.7s smooth easing
- `.reveal-blur` - **Blur In**: Enters with blur effect, glassmorphic feel (0.8s)
- `.reveal-bounce` - **Bounce In**: Bounces with elastic easing (0.8s)
- `.reveal-pop` - **Pop In**: Scales from 0 with elastic bounce, modal-like effect (0.6s)

## ⏱️ Stagger Delays

Available stagger delays for cascading animations:
- `.reveal-delay-1` through `.reveal-delay-12`
- Each adds 0.1s to 1.2s delay respectively
- Perfect for list items, cards, and multi-element sections

**Example**: 
```html
<div class="reveal-zoom reveal-delay-1">Item 1</div>
<div class="reveal-zoom reveal-delay-2">Item 2</div>
<div class="reveal-zoom reveal-delay-3">Item 3</div>
```

## 🎬 Current Component Animations

### About Section
- **Image**: `.reveal-left` - Slides from left with 3D rotation
- **Content**: `.reveal-right delay-2` - Slides from right
- **Pills**: `.reveal-delay-3` to `.reveal-delay-7` - Cascade effect

### Skills Section
- **Cards**: `.reveal-zoom` with stagger delays
- Creates smooth scaling cascade as you scroll

### Projects Section
- **Cards**: Alternating `.reveal-left` and `.reveal-right`
- Zigzag pattern for visual interest
- With `.reveal-delay-1` to `.reveal-delay-4`

### Experience Section
- **Timeline items**: Alternating left/right animations
- Even items slide from left, odd from right
- Creates natural flow along timeline

### Contact Section
- **Main box**: `.reveal-blur` - Enters with glassmorphic blur effect
- **Links**: `.reveal-pop` - Pop in with bounce
- **Info items**: `.reveal-bottom` - Slide up from bottom
- Cascading delays create wave effect

### Footer
- `.reveal-top` - Slides down from top as closing element

## 🎨 Animation Timing

All animations use cubic-bezier(0.22, 1, 0.36, 1) for smooth, modern feel:
- **Default**: 0.7s
- **Fast**: 0.5s
- **Fastest**: 0.4s
- **Blur effect**: 0.8s
- **Bounce**: 0.8s with elastic easing
- **Pop**: 0.6s with bounce easing

## 🔧 How It Works

1. **IntersectionObserver** in `App.tsx` watches viewport
2. Elements with reveal classes start with `opacity: 0` and transformed position
3. When entering viewport, they get the `in-view` class
4. CSS transitions smoothly animate to final state
5. Stagger delays create waterfall effects

## 💡 Tips for Best Results

1. **Mix animations** - Use different animations in different sections for visual variety
2. **Respect hierarchy** - Headings/main content before details
3. **Consistent pacing** - Keep delay increments uniform (0.1s steps)
4. **Performance** - Transforms and opacity are GPU-accelerated ✅

## 🚀 Advanced Usage Examples

### Alternating Pattern (Projects)
```jsx
<div class={`reveal-${i % 2 === 0 ? 'left' : 'right'}`}>
```

### Grid with Stagger
```jsx
{items.map((item, i) => (
  <div class={`reveal-zoom reveal-delay-${Math.min(i + 1, 12)}`}>
    {item}
  </div>
))}
```

### Sequential Entry
```jsx
<div class="reveal-left reveal-delay-1">First</div>
<div class="reveal-pop reveal-delay-2">Second</div>
<div class="reveal-bottom reveal-delay-3">Third</div>
```

---

**Enjoy your smooth, professional scroll animations! 🎉**
