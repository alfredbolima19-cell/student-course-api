import { Loader2, Play } from "lucide-react";

export default function EndpointRow({ path, title, description, active, running, onTry }) {
  return (
    <div
      className={`grid gap-4 border-t border-[#14191b]/10 py-6 transition-colors sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8 ${
        active ? "bg-[#1f6f5c]/[0.03]" : ""
      }`}
    >
      <div className="flex gap-4">
        <span className="mt-[3px] inline-flex h-[22px] shrink-0 items-center rounded-full bg-[#1f6f5c]/10 px-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-[#1a5e4e]">
          GET
        </span>
        <div>
          <p className="font-mono text-[15px] leading-6 text-[#14191b]">{path}</p>
          <p className="mt-1 text-[13px] font-semibold text-[#14191b]/75">{title}</p>
          <p className="mt-1 max-w-xl text-[13.5px] leading-relaxed text-[#14191b]/50">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onTry}
        disabled={running}
        className="inline-flex h-9 items-center gap-2 self-start rounded-full border border-[#14191b]/15 bg-white px-4 text-[12.5px] font-medium text-[#14191b] shadow-[0_1px_2px_rgba(20,25,27,0.04)] transition-all hover:border-[#14191b]/30 hover:shadow-[0_2px_10px_rgba(20,25,27,0.07)] disabled:opacity-60"
      >
        {running ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Play className="h-3 w-3 fill-current" />
        )}
        {running ? "Calling" : "Try it"}
      </button>
    </div>
  );
}
