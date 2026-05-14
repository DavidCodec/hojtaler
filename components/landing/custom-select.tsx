"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type CustomSelectOption = { value: string; label: string };

type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  /** Texto cuando `value` coincide con la opción vacía o no hay coincidencia */
  placeholder: string;
  "aria-labelledby"?: string;
};

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  "aria-labelledby": ariaLabelledBy,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const uid = useId();
  const listboxId = `${uid}-listbox`;

  const match = options.find((o) => o.value === value);
  const triggerLabel = match?.label ?? placeholder;
  const showMuted = value === "" || !match;

  const close = useCallback(() => setOpen(false), []);

  const selectIndex = useCallback(
    (i: number) => {
      const opt = options[i];
      if (opt) onChange(opt.value);
      close();
      queueMicrotask(() => buttonRef.current?.focus());
    },
    [options, onChange, close],
  );

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => listRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const idx = options.findIndex((o) => o.value === value);
    setHighlighted(idx >= 0 ? idx : 0);
  }, [open, value, options]);

  useEffect(() => {
    if (!open) return;
    const el = itemRefs.current[highlighted];
    el?.scrollIntoView({ block: "nearest" });
  }, [highlighted, open]);

  function onTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      queueMicrotask(() => buttonRef.current?.focus());
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, options.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectIndex(highlighted);
    }
    if (e.key === "Tab") {
      close();
    }
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-labelledby={ariaLabelledBy}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className={`flex w-full items-center justify-between gap-2 rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-2.5 text-left text-sm outline-none ring-zinc-500/40 transition-shadow hover:border-zinc-700 focus-visible:ring-2 ${
          open ? "border-zinc-600 ring-2 ring-zinc-500/40" : ""
        }`}
      >
        <span className={showMuted ? "text-zinc-600" : "text-zinc-100"}>
          {triggerLabel}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            tabIndex={0}
            onKeyDown={onListKeyDown}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute z-50 mt-1.5 max-h-56 w-full overflow-auto rounded-md border border-zinc-800 bg-zinc-900 py-1 shadow-lg shadow-black/40 ring-1 ring-zinc-800/80"
          >
            {options.map((opt, i) => {
              const selected = value === opt.value;
              const active = highlighted === i;
              return (
                <li
                  key={opt.value === "" ? "__placeholder" : opt.value}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  role="option"
                  aria-selected={selected}
                  className={`flex cursor-pointer items-center justify-between gap-2 px-3 py-2.5 text-sm transition-colors ${
                    active ? "bg-zinc-800/80 text-zinc-50" : "text-zinc-300"
                  } ${selected && !active ? "text-zinc-100" : ""}`}
                  onMouseEnter={() => setHighlighted(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectIndex(i)}
                >
                  <span>{opt.label}</span>
                  {selected ? (
                    <Check className="size-4 shrink-0 text-zinc-400" aria-hidden />
                  ) : (
                    <span className="size-4 shrink-0" aria-hidden />
                  )}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
