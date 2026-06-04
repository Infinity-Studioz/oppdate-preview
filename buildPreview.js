const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'oppdate-hero-illustration.svg');
const htmlPath = path.join(__dirname, 'oppdate-hero-preview.html');

const rawSvgContent = fs.readFileSync(svgPath, 'utf8');
const svgContent = rawSvgContent.replace(/<\\?xml.*?\\?>/g, '').replace(/<!DOCTYPE.*?>/g, '');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OppDate Hero Preview</title>
    <style>
        body { 
            margin: 0; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            background-color: #111; /* Dark background to frame it well */
        }
        svg { 
            max-height: 90vh; 
            max-width: 100%; 
            box-shadow: 0 10px 40px rgba(0,0,0,0.5); 
            border-radius: 8px;
        }
    </style>
    <!-- Load GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
</head>
<body>

    <!-- SVG INJECTION POINT -->
    ${svgContent}

    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const root = document.querySelector('svg');
        if (!root) {
            console.error('SVG not found!');
            return;
        }

        const q = (id) => root.querySelector(id);

        const wrap = (el) => {
            if (!el) return null;
            const w = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            el.parentNode.insertBefore(w, el);
            w.appendChild(el);
            return w;
        };

        const bg           = q('#bg');
        const ambientGlow  = wrap(q('#ambient-glow'));
        const keyCore      = wrap(q('#key-core'));
        const keySparkle   = wrap(q('#key-sparkle'));
        const supporters   = wrap(q('#supporters'));
        const girlBody     = wrap(q('#girl-body'));
        const girlArm      = wrap(q('#girl-arm'));
        const contactBurst = wrap(q('#contact-burst'));

        // Initial states
        gsap.set(keyCore,      { opacity: 0, scale: 0.85, svgOrigin: "300 200" });
        gsap.set(ambientGlow,  { opacity: 0 });
        gsap.set(keySparkle,   { opacity: 0 });
        gsap.set(supporters,   { opacity: 0, y: 30 });
        gsap.set(girlBody,     { opacity: 0, y: 20 });
        gsap.set(girlArm,      { opacity: 0, y: 20 });
        gsap.set(contactBurst, { opacity: 0 });

        // Build the timeline
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        // Entry sequence
        tl
          .to(keyCore,     { opacity: 1, scale: 1, duration: 0.7 })
          .to(ambientGlow, { opacity: 0.7, duration: 0.6 },       '-=0.4')
          .to(keySparkle,  { opacity: 0.8, duration: 0.5 },       '-=0.3')
          .to(supporters,  { opacity: 1, y: 0, duration: 0.75 },  '-=0.1')
          .to(girlBody,    { opacity: 1, y: 0, duration: 0.7 },   '-=0.4')
          .to(girlArm,     { opacity: 1, y: 0, duration: 0.55 },  '-=0.35');

        // Contact moment
        tl
          .to(contactBurst, { opacity: 0.9, duration: 0.15, ease: 'power3.in' })
          .to(contactBurst, { opacity: 0,   duration: 0.35, ease: 'power2.out' });

        // Idle loops
        tl.add(() => {
          gsap.to(keyCore, { y: -7, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true });
          gsap.to(ambientGlow, { opacity: 1, duration: 2.8, ease: 'sine.inOut', repeat: -1, yoyo: true });
          gsap.to(keySparkle, { opacity: 0.4, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.4 });
          gsap.to(girlArm, { y: -4, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.3 });
        });
      });
    </script>
</body>
</html>`;

fs.writeFileSync(htmlPath, htmlContent);
console.log('Successfully created oppdate-hero-preview.html');
