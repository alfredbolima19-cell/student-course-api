import { Loader2 } from "lucide-react";

function statusTone(status) {
  if (!status) return "text-[#8fa6a0]";
  if (status >= 200 && status < 300) return "text-[#5fd3a8]";
  if (status >= 400 && status < 500) return "text-[#f2b05b]";
  return "text-[#f07d7d]";
}

export default function ResponsePanel({ path, status, statusText, duration, body, pending }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#101619] ring-1 ring-white/5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.07] px-5 py-3">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#5fd3a8]">GET</span>
        <span className="font-mono text-[12.5px] text-[#cfdcd7]">{path}</span>
        <div className="ml-auto flex items-center gap-3 font-mono text-[11px]">
          {pending ? (
            <span className="inline-flex items-center gap-1.5 text-[#8fa6a0]">
              <Loader2 className="h-3 w-3 animate-spin" /> waiting
            </span>
          ) : (
            <>
              <span className={statusTone(status)}>
                {status} {statusText}
              </span>
              {duration != null && <span className="text-[#6d817c]">{duration} ms</span>}
            </>
          )}
        </div>
      </div>

      <pre className="max-h-[420px] overflow-auto px-5 py-5 font-mono text-[12.5px] leading-[1.75] text-[#d9e6e1]">
        {body}
      </pre>
    </div>
  );
}
