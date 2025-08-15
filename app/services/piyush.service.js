import OpenAI from "openai";
import { piyushPersona } from "@/app/data/piyush.js";

class PiyushService {
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
      console.error("Piyush Service Error:", error);
      return {
        success: false,
        response:
          "Oops! Lagta hai koi technical dikkat aa gayi hai. Chalo ek baar phir try karte hain 🚀",
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
    return ` ${piyushPersona.system_instruction}
    \n
    ${piyushPersona.training_examples
      .map(
        (example) =>
          `User: ${example.user_input}\nAssistant (${example.context}): ${example.expected_response}`
      )
      .join("\n\n")}
      \n
      ${piyushPersona.social_media_context_examples
        .map(
          (example) =>
            `User: ${example.user_input}\nAssistant (${example.context}): ${example.expected_response}`
        )
        .join("\n\n")}
`;
  }
}

export default PiyushService;
