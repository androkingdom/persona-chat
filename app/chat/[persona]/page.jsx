import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import personas from "@/app/data/personas.js";
import { ChatInput } from "./ChatInput.jsx";
import ChatArea from "@/app/components/chat/ChatArea.jsx";
import Image from "next/image";

export default async function ChatPage({ params }) {
  const { persona: id } = await params;
  const persona = personas.find((p) => p.id === id);
  if (!persona) return notFound();

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 p-4 flex items-center gap-4">
        <div>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </div>
        <div className="flex items-end">
          <Image
            src={persona.avatar}
            alt={persona.name}
            width={48}
            height={48}
            className="rounded-full border border-gray-700 shadow-md"
            priority // optional: loads instantly for critical avatars
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold">{persona.name}</h1>
          <p className="text-gray-400 text-sm">{persona.tagline}</p>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 p-4 overflow-y-auto space-y-4 pb-28">
        <ChatArea persona={persona} />
      </main>

      {/* Fixed Input */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-gray-800 p-4 bg-black z-50">
        <ChatInput personaId={persona.id} />
      </footer>
    </div>
  );
}
