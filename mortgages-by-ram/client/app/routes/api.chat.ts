import OpenAI from "openai";

// Initialize OpenAI client
const getOpenAIClient = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  console.log('API Key exists:', !!apiKey); // Debug log
  console.log('API Key length:', apiKey?.length); // Debug log
  
  if (!apiKey) {
    // Return null for development mode - we'll handle this in the action
    console.log('No API key found - using fallback response');
    return null;
  }
  
  return new OpenAI({
    apiKey: apiKey,
  });
};

// Fallback response generator for development mode
const generateFallbackResponse = (userMessage: string) => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm here to help you with mortgage questions. How can I assist you today?";
  }
  
  if (message.includes('loan') || message.includes('mortgage')) {
    return "I'd be happy to help you with mortgage information! For personalized rates and detailed advice, I recommend contacting Ram Singh directly at Mortgages by Ram. He can provide you with current rates and pre-approval options tailored to your specific situation.";
  }
  
  if (message.includes('rate') || message.includes('interest')) {
    return "Mortgage rates change frequently and depend on various factors like your credit score, down payment, and property type. For the most current rates and personalized quotes, I suggest reaching out to Ram Singh, our licensed mortgage agent, who can provide you with up-to-date information.";
  }
  
  if (message.includes('pre-approval') || message.includes('preapproval')) {
    return "Getting pre-approved is a great first step! It helps you understand your budget and shows sellers you're serious. Ram Singh can walk you through the pre-approval process and help you get started. Would you like me to connect you with him?";
  }
  
  if (message.includes('first time') || message.includes('first-time')) {
    return "Congratulations on considering homeownership! First-time buyers have access to special programs and incentives. Ram Singh specializes in helping first-time buyers navigate the process and find the best programs available in Toronto. He can guide you through everything from down payment assistance to government programs.";
  }
  
  if (message.includes('refinance') || message.includes('refinancing')) {
    return "Refinancing can help you get better rates or access equity in your home. The best approach depends on your current situation and goals. Ram Singh can analyze your current mortgage and help determine if refinancing makes sense for you.";
  }
  
  if (message.includes('investment') || message.includes('rental')) {
    return "Investment properties can be a great way to build wealth! There are specific mortgage products and strategies for investment properties. Ram Singh has experience helping investors find the right financing solutions for their investment goals.";
  }
  
  if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
    return "You can reach Ram Singh directly for personalized mortgage advice. He's available to discuss your specific situation and provide detailed guidance. Would you like me to help you get in touch with him?";
  }
  
  // Default response
  return "Thank you for your question! I'm here to help with mortgage-related inquiries. For detailed, personalized advice and current rates, I recommend speaking directly with Ram Singh, our licensed mortgage agent. He can provide you with specific information tailored to your situation. How else can I assist you today?";
};

export async function action({ request }: { request: Request }) {
  // Only allow POST requests
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    console.log('API route called'); // Debug log
    
    // Try to get JSON first, then fallback to form data
    let messages;
    const contentType = request.headers.get("content-type");
    
    if (contentType?.includes("application/json")) {
      const body = await request.json();
      messages = body.messages;
    } else {
      const formData = await request.formData();
      const messagesString = formData.get("messages") as string;
      
      if (!messagesString) {
        return Response.json(
          { error: "Invalid request: messages are required" },
          { status: 400 }
        );
      }
      
      messages = JSON.parse(messagesString);
    }
    
    console.log('Messages:', messages); // Debug log

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    // Initialize OpenAI client
    const openai = getOpenAIClient();

    // If no API key, use fallback response
    if (!openai) {
      const lastMessage = messages[messages.length - 1]?.content || '';
      const fallbackResponse = generateFallbackResponse(lastMessage);
      
      console.log('Using fallback response:', fallbackResponse);
      
      return Response.json({ 
        message: fallbackResponse,
        role: "assistant"
      });
    }

    // Add system message for mortgage business context
    const systemMessage = {
      role: "system",
      content: `You are a helpful AI assistant for Mortgages by Ram, a professional mortgage services company in Toronto. 
You help clients with questions about mortgages, home buying, refinancing, and related financial topics. 
Be professional, friendly, and informative. If you're unsure about specific rates or need to provide personalized advice, 
suggest that the client contact Ram Singh directly for detailed consultation.`
    };

    // Create chat completion
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0].message;

    return Response.json({
      message: assistantMessage.content,
      role: assistantMessage.role,
      usage: completion.usage,
    });

  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    
    // Handle specific OpenAI errors
    if (error?.status === 401) {
      return Response.json(
        { error: "Invalid API key" },
        { status: 500 }
      );
    }
    
    if (error?.status === 429) {
      return Response.json(
        { error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return Response.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}

