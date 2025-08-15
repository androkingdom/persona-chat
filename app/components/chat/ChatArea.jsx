"use client";

import React from "react";
import { useSelector } from "react-redux";
import ChatBubble from "@/app/components/chat/ChatBubble";
import Image from "next/image";

export default function ChatArea({ persona }) {
  const messages = useSelector((state) => state.chat.messages).filter(
    (msg) => msg.botId === persona.id
  );

  console;
  return (
    <div className="flex flex-col gap-2 p-4">
      {/* Initial Greeting */}
      <div className="flex gap-3">
        <div className="flex items-end">
          <Image
            src={persona.avatar}
            alt={persona.name}
            width={48}
            height={48}
            className="rounded-full border border-gray-700 shadow-md"
          />
        </div>
        <ChatBubble
          role="bot"
          content={
            persona.name === "Hitesh Choudhary"
              ? `Haanji, kaise ho bhai? Main ${persona.name} hoon. Chai lekar aao, code hum krwa denge! Batao, coding mein kya help chahiye?`
              : persona.name === "Piyush Garg"
              ? `Hello! Main ${persona.name} hoon. Kya problem hai? Bol, milkar solve karte hain 👍`
              : `Hey! I’m ${persona.name}. How can I help you today?`
          }
        />
      </div>

      {/* Messages */}
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${
            message.sender === "user" ? "justify-end" : ""
          }`}
        >
          <div className="flex items-end">
            {message.sender === "bot" && (
              <Image
                src={persona.avatar}
                alt={persona.name}
                width={48}
                height={48}
                className="rounded-full border-gray-700 shadow-md"
              />
            )}
          </div>
          <ChatBubble
            role={message.sender}
            content={message.text}
            isLoading={message.isLoading}
          />
        </div>
      ))}
    </div>
  );
}
