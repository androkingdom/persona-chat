import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PersonaCard({ persona }) {
  return (
    <div
      key={persona.id}
      className="bg-gray-900/80 border border-gray-800 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:border-indigo-500/50 transition-all duration-300 min-h-[420px]"
    >
      {/* Avatar */}
      <div className="relative">
        <Image
          src={persona.avatar}
          alt={persona.name}
          width={96} // 24 * 4px = 96px
          height={96}
          className="rounded-full border-2 border-indigo-500 shadow-md mb-4 object-cover"
        />
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></span>
      </div>

      {/* Name */}
      <h2 className="text-xl font-semibold">{persona.name}</h2>

      {/* Tagline */}
      <p className="text-indigo-400 text-sm mb-2 italic">{persona.tagline}</p>

      {/* Bio */}
      <p className="text-gray-300 text-sm mb-4">{persona.bio}</p>

      {/* Expertise */}
      {persona.expertise && persona.expertise.length > 0 && (
        <ul className="text-gray-400 text-sm mb-4 space-y-1 w-full max-w-xs">
          {persona.expertise.map((skill, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 justify-center bg-gray-800/50 px-3 py-1 rounded-full text-xs"
            >
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              {skill}
            </li>
          ))}
        </ul>
      )}

      {/* Stats */}
      {persona.stats && (
        <div className="flex gap-4 text-gray-400 text-xs mb-4">
          {Object.entries(persona.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <p className="font-bold text-gray-100">{value}</p>
              <p className="capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <Link
        href={`/chat/${persona.id}`}
        className="mt-auto inline-block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-5 py-2 rounded-lg shadow-lg transition-all duration-300"
      >
        Chat Now
      </Link>
    </div>
  );
}
