"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const PILLAR_ITEMS = [
  { id: "studio", label: "AI Studio", href: "/studio" },
  { id: "editor", label: "Video Editor", href: "/editor/projects" },
  { id: "social", label: "Social Hub", href: "/social" },
  { id: "analytics", label: "Analytics", href: "/analytics" },
] as const;

export function PillarNav() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium transition-colors hover:bg-accent"
      >
        <span>Video Editor</span>
        <ChevronDown
          className={`size-3 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 w-40 rounded-md border border-border bg-popover py-1 shadow-md">
          {PILLAR_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center px-3 py-1.5 text-xs transition-colors ${
                item.id === "editor"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              {item.label}
              {item.id === "editor" && (
                <span className="ml-auto text-[9px] text-muted-foreground">
                  current
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
