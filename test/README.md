# Test Workspace

This folder keeps manual and automated test notes grouped by product area.

Folders:
- `myth/`: `/map/myth` rendering, map nodes, Vietnamese text, asset placement.
- `battle/`: `/map/battle` quiz/timer checks.
- `dynasty/`: `/map/dynasty` timeline checks.
- `chatbot/`: greeting, dedupe, send/receive, fallback behavior.
- `security/`: production-readiness checks.

Recommended smoke test before deploy:
- `python -m py_compile main.py auth.py database.py schemas.py`
- Open `/map/myth`, `/map/battle`, `/map/dynasty`.
- Send one chatbot message with and without `GEMINI_API_KEY`.
- Confirm no mojibake in visible Vietnamese labels.
