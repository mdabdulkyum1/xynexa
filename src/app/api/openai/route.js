import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { initialMessages } from "@/lib/data";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  compatibility: "strict",
});

export const runtime = "edge";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Log the received messages for debugging
    console.log("Received messages:", messages);

    // Basic input validation on the server-side
    const lastMessageContent = messages[messages.length - 1]?.content;
    if (lastMessageContent?.trim() === "{}" || lastMessageContent?.trim() === "") {
      console.log("Rejected invalid input: Empty object or empty string");
      return new Response("Invalid input. Please enter a meaningful message.", {
        status: 400,
      });
    }

    // Prepare the messages for OpenAI API
    const combinedMessages = [
      { role: "system", content: initialMessages.content },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content || m.text || "",
      })),
    ];

    console.log("Sending to OpenAI:", combinedMessages);

    const stream = await streamText({
      model: "gpt-3.5-turbo",
      messages: combinedMessages,
      temperature: 1,
    });

    // Return the response from OpenAI to the client
    return new Response(stream);
  } catch (error) {
    console.error("Error in OpenAI API:", error);
    return new Response("Error processing your request.", { status: 500 });
  }
}