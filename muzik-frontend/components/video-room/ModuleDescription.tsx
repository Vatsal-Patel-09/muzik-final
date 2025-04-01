import React from "react";

interface ModuleDescriptionProps {
  title: string;
  description: string;
}

export function ModuleDescription({ title, description }: ModuleDescriptionProps) {
  return (
    <div className="bg-neutral-900/60 p-5 rounded-xl">
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}
