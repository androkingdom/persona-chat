"use client";

import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  addMessage,
  updateLastBotMessage,
} from "@/app/lib/features/chat/chatSlice.js";

export function ChatInput({ personaId }) {
  const { register, handleSubmit, reset } = useForm();
  const message = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  console.log(message);

  const onSubmit = (data) => {
    if (!data.message.trim()) return;

    // 1️⃣ Dispatch user message
    dispatch(
      addMessage({
        botId: personaId,
        sender: "user",
        text: data.message,
      })
    );

    // 2️⃣ Dispatch placeholder bot message with loading state
    dispatch(
      addMessage({
        botId: personaId,
        sender: "bot",
        text: "",
        isLoading: true,
      })
    );

    reset(); // clear input

    // 3️⃣ Async API call
    (async () => {
      try {
        const res = await fetch(`/api/${personaId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: data.message }),
        });

        const result = await res.json();
        const botReply =
          result.data.response || "Sorry, I didn't understand that.";

        // 4️⃣ Replace the loading bot message with actual text
        dispatch(
          updateLastBotMessage({
            botId: personaId,
            text: botReply,
            isLoading: false,
          })
        );
      } catch (error) {
        console.error("Bot API error:", error);
        dispatch(
          updateLastBotMessage({
            botId: personaId,
            text: "Oops! Something went wrong.",
            isLoading: false,
          })
        );
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
      <input
        autoComplete="off"
        type="text"
        placeholder={`Ask ${personaId}...`}
        {...register("message")}
        className="flex-1 bg-gray-800 text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg"
      >
        Send
      </button>
    </form>
  );
}
