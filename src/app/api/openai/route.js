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

    const lastMessageContent = messages[messages.length - 1]?.content;
    if (lastMessageContent?.trim() === "{}" || lastMessageContent?.trim() === "") {
      return new Response("Invalid input. Please enter a meaningful message.", {
        status: 400,
      });
    }

    const combinedMessages = [
      { role: "system", content: initialMessages.content },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content || m.text || "",
      })),
    ];

    const stream = await streamText({
      model: "gpt-3.5-turbo",
      messages: combinedMessages,
      temperature: 1,
    });

    return new Response(stream);
  } catch (error) {
    console.error("Error in OpenAI API:", error);
    return new Response("Error processing your request.", { status: 500 });
  }
}