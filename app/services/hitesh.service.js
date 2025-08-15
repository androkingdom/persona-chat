import OpenAI from "openai";
import { hiteshPersona } from "@/app/data/hitesh.js";

class HiteshService {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });

    this.conversations = [{ role: "system", content: this._getSystemPrompt() }];
  }

  async getResponse(userInput) {
    this.conversations.push({ role: "user", content: userInput });

    try {
      const response = await this._callApi(this.conversations);

      const assistantResponse = response.choices[0].message.content;

      // Add assistant response to history
      this.conversations.push({
        role: "assistant",
        content: assistantResponse,
      });

      return {
        success: true,
        response: assistantResponse,
        tokensUsed: response.usage?.total_tokens || 0,
      };
    } catch (error) {
      console.error("Hitesh Service Error:", error);
      return {
        success: false,
        response:
          "Arre yaar, kuch technical problem hai! Chai break leke phir try karte hain 🍵",
      };
    }
  }

  async _callApi(messages) {
    try {
      return await this.client.chat.completions.create({
        model: "gemini-2.5-flash-lite",
        messages,
      });
    } catch (err) {
      console.error("OpenAI API Error:", err);
      throw err;
    }
  }

  _getSystemPrompt() {
    return ` ${hiteshPersona.system_instruction}
    \n
    ${hiteshPersona.training_examples
      .map(
        (example) =>
          `User: ${example.user_input}\nAssistant (${example.context}): ${example.expected_response}`
      )
      .join("\n\n")}
      \n
      ${hiteshPersona.social_media_context_examples
        .map(
          (example) =>
            `User: ${example.user_input}\nAssistant (${example.context}): ${example.expected_response}`
        )
        .join("\n\n")}
`;
  }
}

export default HiteshService;
