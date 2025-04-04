import React from "react";

interface ModuleDescriptionProps {
  title: string;
  description: string;
}

export function ModuleDescription({ title, description }: ModuleDescriptionProps) {
  return (
    <div className="bg-neutral-200 p-5 rounded-xl shadow-md ">
      <h3 className="text-xl font-semibold text-black mb-3">{title}</h3>
      <p className="text-neutral-800 leading-relaxed">{description}</p>
    </div>
  );
}
