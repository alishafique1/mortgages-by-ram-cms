# OpenAI Chatbot Setup Guide

This guide will help you set up an AI-powered chatbot using OpenAI's API in your React Router 7 + Strapi website.

## 🚀 Quick Start

The chatbot has been integrated into your website! Follow these steps to configure it:

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy your API key (it starts with `sk-`)
6. **Important**: Save this key securely - you won't be able to see it again!

### 2. Configure Environment Variables

Create a `.env` file in the `client` directory:

```bash
cd client
touch .env
```

Add your OpenAI API key to the `.env` file:

```env
# Strapi CMS Configuration
VITE_STRAPI_BASE_URL=http://localhost:1337

# OpenAI Configuration (Server-side only)
OPENAI_API_KEY=sk-your-actual-api-key-here

# Optional: Customize OpenAI model (default: gpt-4o-mini)
# OPENAI_MODEL=gpt-4o-mini
```

**Important Security Note**: 
- The `OPENAI_API_KEY` is only accessible on the server-side (not exposed to the browser)
- Never commit your `.env` file to version control
- Make sure `.env` is in your `.gitignore` file

### 3. Test the Installation

Start your development server:

```bash
cd client
npm run dev
```

You should see:
1. A floating chat button in the bottom-right corner of your website
2. Click it to open the chat interface
3. Type a message and press Enter or click Send
4. The AI assistant will respond with helpful information about mortgages

## 📋 What Was Installed

### Components Created

1. **`ChatWidget.tsx`** - Main chat interface component
   - Location: `client/app/components/custom/ChatWidget.tsx`
   - Features:
     - Beautiful, responsive chat UI
     - Message history
     - Loading states
     - Error handling
     - Auto-scroll
     - Clear chat option

2. **API Routes** - Server-side endpoints for OpenAI integration
   - **`api.chat.ts`** - Standard chat endpoint (non-streaming)
   - **`api.chat-stream.ts`** - Streaming chat endpoint (faster responses)
   - Location: `client/app/routes/`

### Package Installed

- **`openai`** - Official OpenAI SDK for Node.js

## 🎨 Customization

### Change the Initial Welcome Message

Edit `client/app/root.tsx`:

```tsx
<ChatWidget 
  initialMessage="Hello! How can I help you with mortgages today?"
/>
```

### Customize the System Prompt

Edit the system message in `client/app/routes/api.chat.ts`:

```typescript
const systemMessage = {
  role: "system",
  content: `Your custom instructions here...`
};
```

### Change the AI Model

By default, the chatbot uses `gpt-4o-mini` (fast and cost-effective).

To use a different model, edit `client/app/routes/api.chat.ts`:

```typescript
const { messages, model = "gpt-4o" } = body; // Use GPT-4o instead
```

**Available Models:**
- `gpt-4o-mini` - Fastest, most cost-effective (recommended)
- `gpt-4o` - Most capable, higher quality responses
- `gpt-3.5-turbo` - Legacy model, good balance

### Change Chat Position

Edit `client/app/components/custom/ChatWidget.tsx`:

```tsx
// Change from bottom-right to bottom-left
<div className={cn("fixed bottom-6 left-6 z-50", className)}>
```

### Customize Colors

The chat widget automatically uses your existing design system colors. To customize:

1. The widget uses these Tailwind classes:
   - `bg-primary` - Main action buttons
   - `bg-muted` - Assistant message background
   - `text-primary-foreground` - Text on primary background

2. Modify these in your `tailwind.config.js` or directly in the component

## 🔧 Advanced Features

### Enable Streaming Responses

For faster, real-time responses, you can switch to the streaming endpoint:

1. Update `ChatWidget.tsx` to use the streaming API:

```typescript
const response = await fetch('/api/chat-stream', {
  method: 'POST',
  // ... rest of the code
});
```

2. Implement streaming message handling (requires additional code)

### Add Conversation Memory

Currently, each chat session maintains its own history. To persist conversations:

1. Store messages in localStorage
2. Or integrate with your Strapi backend to save chat history

### Rate Limiting

To prevent abuse, consider adding rate limiting:

```typescript
// In api.chat.ts
const rateLimitCheck = await checkRateLimit(request);
if (!rateLimitCheck.allowed) {
  return Response.json({ error: "Too many requests" }, { status: 429 });
}
```

## 💰 Cost Management

### Understanding OpenAI Pricing

- **gpt-4o-mini**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **gpt-4o**: ~$2.50 per 1M input tokens, ~$10.00 per 1M output tokens

### Typical Costs

- Average chat message: ~500 tokens (input + output)
- Cost per message with gpt-4o-mini: ~$0.0004 (less than 1 cent)
- 1,000 messages: ~$0.40

### Cost Optimization Tips

1. **Use gpt-4o-mini** - Same quality for most tasks, 80% cheaper
2. **Limit max_tokens** - Set to 500 (already configured)
3. **Add rate limiting** - Prevent abuse
4. **Monitor usage** - Check OpenAI dashboard regularly

### Set Usage Limits

1. Go to [OpenAI Usage Limits](https://platform.openai.com/account/limits)
2. Set monthly budget limits
3. Enable email alerts for usage thresholds

## 🐛 Troubleshooting

### Chat Button Not Appearing

**Solution:**
1. Check that `<ChatWidget />` is added to `root.tsx`
2. Verify the component imports correctly
3. Check browser console for errors

### "Invalid API key" Error

**Solutions:**
1. Verify your API key in `.env` file
2. Make sure the key starts with `sk-`
3. Check that the key is active in your OpenAI account
4. Restart your dev server after adding the `.env` file

### "Rate limit exceeded" Error

**Solutions:**
1. You've hit OpenAI's rate limit
2. Wait a few minutes and try again
3. Upgrade your OpenAI plan if needed
4. Consider implementing request queuing

### Messages Not Sending

**Solutions:**
1. Check browser console for errors
2. Verify the API route is accessible at `/api/chat`
3. Check that your OpenAI account has credits
4. Verify network connection

### Slow Response Times

**Solutions:**
1. Switch to `gpt-4o-mini` model (faster)
2. Reduce `max_tokens` parameter
3. Consider implementing streaming responses
4. Check your internet connection

## 🔒 Security Best Practices

### API Key Security

✅ **DO:**
- Store API key in `.env` file
- Use server-side routes only
- Add `.env` to `.gitignore`
- Rotate keys periodically
- Set up usage alerts

❌ **DON'T:**
- Never expose API key in client-side code
- Never commit `.env` to Git
- Never share your API key
- Never use API key in URLs

### Input Validation

The API routes include basic validation. For production, consider:
- Input sanitization
- Maximum message length
- Rate limiting per user
- Content filtering

### Content Moderation

OpenAI has built-in content filtering, but consider:
- Monitoring chat logs
- Implementing custom filters
- Adding user reporting features

## 🚀 Production Deployment

### Environment Variables

Set these in your hosting platform (Coolify, Vercel, etc.):

```bash
OPENAI_API_KEY=sk-your-production-key
VITE_STRAPI_BASE_URL=https://your-production-domain.com
```

### Coolify Setup

1. Go to your Coolify dashboard
2. Navigate to your app's environment variables
3. Add `OPENAI_API_KEY` with your production API key
4. Redeploy your application

### Performance Optimization

1. **Caching**: Cache common responses
2. **CDN**: Use CDN for static assets
3. **Monitoring**: Set up error tracking (Sentry)
4. **Analytics**: Track chat usage

## 📊 Monitoring

### Track Usage

Monitor your OpenAI usage:
1. [OpenAI Usage Dashboard](https://platform.openai.com/usage)
2. View requests, tokens, and costs
3. Download usage reports

### Application Monitoring

Consider adding:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring (Vercel Analytics)

## 🎯 Features Included

✅ **Currently Implemented:**
- AI-powered responses using OpenAI
- Beautiful chat UI with animations
- Message history within session
- Loading states and error handling
- Mobile-responsive design
- Auto-scroll to latest messages
- Clear chat functionality
- Secure server-side API integration
- Custom system prompt for mortgage context

🔄 **Potential Enhancements:**
- Streaming responses for faster feel
- Persistent chat history
- User authentication
- Multiple chat sessions
- File upload support
- Voice input/output
- Multi-language support
- Chat analytics dashboard

## 📚 Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [React Router 7 Documentation](https://reactrouter.com/en/main)
- [OpenAI Pricing](https://openai.com/api/pricing/)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/production-best-practices)

## 💡 Tips

1. **Start with gpt-4o-mini** - Test with the cheaper model first
2. **Monitor costs** - Set up usage alerts in OpenAI dashboard
3. **Customize the system prompt** - Make it specific to your business
4. **Test thoroughly** - Try various questions to ensure quality
5. **Gather feedback** - Ask users about their chat experience

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review OpenAI's status page: [status.openai.com](https://status.openai.com)
3. Check browser console for error messages
4. Verify environment variables are set correctly

## 📝 Next Steps

1. ✅ Get your OpenAI API key
2. ✅ Add it to `.env` file
3. ✅ Test the chatbot locally
4. ✅ Customize the system prompt
5. ✅ Deploy to production
6. ✅ Monitor usage and costs
7. ✅ Gather user feedback

---

**Ready to go live?** Make sure to:
- Test thoroughly with various questions
- Set usage limits in OpenAI dashboard
- Add environment variables to production
- Monitor costs after launch

**Questions?** The chatbot is ready to use! Just add your OpenAI API key and start testing.

