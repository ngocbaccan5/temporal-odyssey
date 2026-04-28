# Myth Screen

Route: `/map/myth`

Scope:
- Story-mode nodes, myth timeline layout, node icon rendering.
- Primary background: `/static/assets/images/backgrounds/cacman.jpg`
- Shared icon: `/static/assets/images/icons/icon1.jpg`

Current source of truth:
- Data: `static/js/app.js`, category key `myth`
- UI override: `static/cleanup.js`
- Styles: `static/css/map.css`, `static/css/chatbot.css`, `static/redesign.css`

Production checks:
- Vietnamese text must render without mojibake.
- There must be only one chatbot greeting.
- Node icons must remain centered and large enough on the map.
