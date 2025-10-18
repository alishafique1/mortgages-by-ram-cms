# 🤖 AI Chatbot Integration

An OpenAI-powered chatbot integrated into your React Router 7 website.

## 🎯 What's Included

### Components
- **ChatWidget** - Beautiful, responsive chat interface
- **API Routes** - Secure server-side OpenAI integration
  - `/api/chat` - Standard chat endpoint
  - `/api/chat-stream` - Streaming responses (for future use)

### Features
- ✅ Real-time AI responses
- ✅ Message history
- ✅ Beautiful UI matching your design system
- ✅ Mobile responsive
- ✅ Secure API key handling (server-side only)
- ✅ Error handling
- ✅ Loading states
- ✅ Clear chat functionality
- ✅ Mortgage-specific context

## 🚀 Setup (3 Steps)

### 1. Get OpenAI API Key
Visit https://platform.openai.com/api-keys and create a new key

### 2. Create `.env` File
```bash
# In the client directory
OPENAI_API_KEY=sk-your-key-here
VITE_STRAPI_BASE_URL=http://localhost:1337
```

### 3. Start Development Server
```bash
npm run dev
```

## 📁 File Structure

```
client/
├── app/
│   ├── components/
│   │   └── custom/
│   │       └── ChatWidget.tsx          # Main chat component
│   ├── routes/
│   │   ├── api.chat.ts                 # API endpoint
│   │   └── api.chat-stream.ts          # Streaming endpoint
│   └── root.tsx                        # ChatWidget integrated here
├── .env                                # Your API keys (not in git)
└── .env.example                        # Template for .env
```

## 🎨 Customization

### Change Welcome Message
```tsx
// In root.tsx
<ChatWidget 
  initialMessage="Your custom welcome message"
/>
```

### Change System Prompt
Edit `app/routes/api.chat.ts`:
```typescript
const systemMessage = {
  role: "system",
  content: `Your custom instructions...`
};
```

### Change AI Model
Edit `app/routes/api.chat.ts`:
```typescript
model: "gpt-4o"  // or "gpt-3.5-turbo"
```

### Change Position
Edit `app/components/custom/ChatWidget.tsx`:
```tsx
// Bottom right (default)
className="fixed bottom-6 right-6"

// Bottom left
className="fixed bottom-6 left-6"
```

## 💰 Costs

**Using gpt-4o-mini (default):**
- ~$0.0004 per message
- 1,000 messages ≈ $0.40
- Very cost-effective!

**Monitor usage:** https://platform.openai.com/usage

## 🔒 Security

✅ **API key is server-side only** - Never exposed to browser
✅ **`.env` in .gitignore** - Won't be committed
✅ **Input validation** - Basic security included

## 🐛 Troubleshooting

### Chat not appearing?
- Check `root.tsx` has `<ChatWidget />`
- Check browser console for errors

### "Invalid API key"?
- Verify key in `.env` file
- Restart dev server

### Slow responses?
- Normal for first request (cold start)
- Consider `gpt-4o-mini` for speed

## 📊 Tech Stack

- **OpenAI API** - GPT-4o-mini
- **React Router 7** - Server-side routes
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - UI components

## 📚 Documentation

- Full guide: See `OPENAI-CHATBOT-SETUP.md` in project root
- Quick start: See `QUICK-START-CHATBOT.md` in project root

## 🚀 Production

1. Add `OPENAI_API_KEY` to your hosting platform (Coolify)
2. Deploy your app
3. Test the chatbot
4. Monitor usage and costs

## 💡 Tips

1. Start with `gpt-4o-mini` (cheaper, faster)
2. Set usage limits in OpenAI dashboard
3. Customize system prompt for your business
4. Monitor costs regularly
5. Test thoroughly before going live

---

**Need help?** Check the full documentation in `OPENAI-CHATBOT-SETUP.md`


