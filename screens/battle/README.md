# Battle Screen

Route: `/map/battle`

Scope:
- Timed quiz flow, battle category map, locked/unlocked battle nodes.
- Primary thumbnail: `/static/assets/images/thumbnails/thumb-battle.webp`
- Available local image: `/static/assets/images/thumbnails/chientran.jpg`

Current source of truth:
- Data: `static/js/app.js`, category key `battle`
- UI override: `static/cleanup.js`
- Styles: `static/css/map.css`, `static/redesign.css`

Production checks:
- Timer and answer submission must not depend on dev-only globals.
- Locked nodes must not expose answers or rewards client-side beyond UI labels.
- Vietnamese text must render without mojibake.
