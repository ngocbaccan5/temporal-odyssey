# Dynasty Screen

Route: `/map/dynasty`

Scope:
- Timeline ordering gameplay, dynasty category map, progression checks.
- Primary thumbnail: `/static/assets/images/thumbnails/thumb-dynasty.webp`
- Available local image: `/static/assets/images/thumbnails/trieudai.jpg`

Current source of truth:
- Data: `static/js/app.js`, category key `dynasty`
- UI override: `static/cleanup.js`
- Styles: `static/css/map.css`, `static/redesign.css`

Production checks:
- Timeline answers must validate server-side before rewarding XP.
- Drag/order UI must work on desktop and touch screens.
- Vietnamese text must render without mojibake.
