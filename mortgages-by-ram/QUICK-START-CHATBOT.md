# 🤖 Quick Start: OpenAI Chatbot

Get your AI chatbot running in 3 minutes!

## Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click **"Create new secret key"**
4. Copy the key (starts with `sk-`)

## Step 2: Add API Key

Create `.env` file in the `client` folder:

```bash
cd client
echo "OPENAI_API_KEY=sk-your-key-here" > .env
echo "VITE_STRAPI_BASE_URL=http://localhost:1337" >> .env
```

Or manually create `client/.env` with:

```env
OPENAI_API_KEY=sk-your-actual-key-here
VITE_STRAPI_BASE_URL=http://localhost:1337
```

## Step 3: Start the Server

```bash
cd client
npm run dev
```

## Step 4: Test It!

1. Open your website (usually http://localhost:5173)
2. Look for the chat button in the bottom-right corner
3. Click it and start chatting!

## ✅ That's It!

Your AI chatbot is now live on your website!

---

## 🔥 Quick Tips

- **Model**: Uses `gpt-4o-mini` (fast & cheap: ~$0.0004 per message)
- **Cost**: Monitor at https://platform.openai.com/usage
- **Custom**: Edit system prompt in `client/app/routes/api.chat.ts`

## 🚨 Troubleshooting

**Chat button not showing?**
- Check browser console for errors
- Verify `.env` file is in `client` folder
- Restart dev server

**"Invalid API key" error?**
- Double-check your API key
- Make sure it starts with `sk-`
- Verify it's active in OpenAI dashboard

**Need help?**
- Read full guide: `OPENAI-CHATBOT-SETUP.md`
- Check OpenAI docs: https://platform.openai.com/docs

---

**Ready for production?** See `OPENAI-CHATBOT-SETUP.md` for deployment instructions.


