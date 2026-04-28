# Screen Modules

This folder is the migration boundary for the three main gameplay screens.

Current runtime status:
- The SPA still boots from `static/index.html`.
- Shared screen data and routing still live in `static/js/app.js`.
- Compatibility fixes and asset overrides live in `static/cleanup.js`.

Target split:
- `myth/`: Huyen Thoai route and story-mode rules.
- `battle/`: Chien Tran route and timed quiz rules.
- `dynasty/`: Trieu Dai route and timeline ordering rules.

Do not move runtime code out of `static/js/app.js` until imports, route loading,
and browser cache versions are updated together. The current files have backups
under `backups/`.
