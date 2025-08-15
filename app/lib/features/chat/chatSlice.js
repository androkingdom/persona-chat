import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({
        id: crypto.randomUUID(),
        botId: action.payload.botId,
        sender: action.payload.sender,
        text: action.payload.text,
        isLoading: action.payload.isLoading || false,
        timestamp: Date.now(),
      });
    },

    clearMessages: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg.botId !== action.payload.botId
      );
    },
    updateLastBotMessage: (state, action) => {
      // find last bot message for this bot
      const lastBotIndex = [...state.messages]
        .reverse()
        .findIndex(
          (m) => m.botId === action.payload.botId && m.sender === "bot"
        );

      if (lastBotIndex >= 0) {
        const index = state.messages.length - 1 - lastBotIndex;
        state.messages[index].text = action.payload.text;
        state.messages[index].isLoading = action.payload.isLoading ?? false;
      }
    },
  },
});

export const { addMessage, clearMessages, updateLastBotMessage } =
  chatSlice.actions;
export default chatSlice.reducer;
