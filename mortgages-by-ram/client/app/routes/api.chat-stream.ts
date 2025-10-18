import OpenAI from "openai";

// Initialize OpenAI client
const getOpenAIClient = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }
  
  return new OpenAI({
    apiKey: apiKey,
  });
};

export async function action({ request }: { request: Request }) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await request.json();
    const { messages, model = "gpt-4o-mini" } = body;

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request: messages array is required", {
        status: 400,
      });
    }

    // Initialize OpenAI client
    const openai = getOpenAIClient();

    // Add system message for mortgage business context
    const systemMessage = {
      role: "system",
      content: `You are a helpful AI assistant for Mortgages by Ram, a professional mortgage services company in Toronto. 
You help clients with questions about mortgages, home buying, refinancing, and related financial topics. 
Be professional, friendly, and informative. If you're unsure about specific rates or need to provide personalized advice, 
suggest that the client contact Ram Singh directly for detailed consultation.`
    };

    // Create streaming chat completion
    const stream = await openai.chat.completions.create({
      model: model,
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    });

    // Create a readable stream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);

    // Handle specific OpenAI errors
    if (error?.status === 401) {
      return new Response("Invalid API key", { status: 500 });
    }

    if (error?.status === 429) {
      return new Response("Rate limit exceeded. Please try again later.", {
        status: 429,
      });
    }

    return new Response("Failed to process chat request", { status: 500 });
  }
}

