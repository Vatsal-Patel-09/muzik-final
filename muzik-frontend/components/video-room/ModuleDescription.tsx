import React from "react";

interface ModuleDescriptionProps {
  title: string;
  description: string;
}

export function ModuleDescription({ title, description }: ModuleDescriptionProps) {
  // Split the description into paragraphs for better display.
  const paragraphs = description.split("\n").filter(p => p.trim().length > 0);

  return (
    <div className="bg-neutral-200 p-5 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-black mb-3 truncate">{title}</h3>
      <div className="text-neutral-800 leading-relaxed space-y-2">
        {paragraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>
    </div>
  );
}
