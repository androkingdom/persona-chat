import PersonaCard from "./components/chat/PersonaCard";
import personas from "@/app/data/personas";
export default function HomePage() {
  return (
    <section className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Headline */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Chat with Expert AI Personas
        </h1>
        <p className="text-gray-400 text-lg">
          Pick a persona, ask questions, and get instant guidance from their
          unique perspective.
        </p>
      </div>

      {/* Persona Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 w-full max-w-5xl">
        {personas.map((persona) => (
          <PersonaCard key={persona.id} persona={persona} />
        ))}
      </div>
    </section>
  );
}
