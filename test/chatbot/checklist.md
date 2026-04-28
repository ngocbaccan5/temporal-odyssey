# Chatbot Test Checklist

- Chatbot auto-drafts the greeting in the input once per page load.
- Chatbot message history shows only one initial bot greeting.
- Pressing Send posts to `/api/chat`.
- If Gemini is not configured or unavailable, local fallback still replies.
- User input clears the auto-draft marker.
- Empty messages are not sent.
