import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import EndpointRow from "@/components/api/EndpointRow";
import ResponsePanel from "@/components/api/ResponsePanel";
import CourseTable from "@/components/api/CourseTable";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Student Course API — a read-only course API" },
      {
        name: "description",
        content:
          "A beginner-friendly, read-only REST API prototype for a university student portal, built with Base44 server routes.",
      },
    ],
  }),
  component: HomePage,
});

const sampleBody = `{
  "status": "ok",
  "service": "student-course-api",
  "version": "1.0.0",
  "time": "2026-11-16T02:09:41.512Z"
}`;

const endpoints = [
  {
    path: "/api/health",
    title: "Health check",
    description:
      "Confirms the service is awake. Returns a status object plus the server's current time in UTC.",
  },
  {
    path: "/api/courses",
    title: "Course list",
    description: `Returns all ${courses.length} fictional courses as one JSON array.`,
  },
  {
    path: "/api/courses/1",
    title: "Single course",
    description:
      "Returns one course by its integer ID, or HTTP 404 with a JSON error when that ID does not exist.",
  },
];

const stats = [
  { label: "Endpoints", value: "3" },
  { label: "Courses", value: String(courses.length) },
  { label: "Databases", value: "0" },
  { label: "Access", value: "Read-only" },
];

function HomePage() {
  const [result, setResult] = useState({
    path: "/api/health",
    status: null,
    statusText: "example response",
    duration: null,
    body: sampleBody,
  });
  const [pendingPath, setPendingPath] = useState(null);

  async function callEndpoint(path) {
    setPendingPath(path);
    const started = Date.now();
    try {
      const response = await fetch(path);
      const text = await response.text();
      let pretty = text;
      try {
        pretty = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        // keep the raw text if the response was not JSON
      }
      setResult({
        path,
        status: response.status,
        statusText: response.statusText || (response.ok ? "OK" : "Error"),
        duration: Date.now() - started,
        body: pretty,
      });
    } catch (error) {
      setResult({
        path,
        status: 0,
        statusText: "network error",
        duration: Date.now() - started,
        body: JSON.stringify({ error: String(error.message || error) }, null, 2),
      });
    } finally {
      setPendingPath(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f7f3] text-[#14191b]">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-8 sm:px-8 lg:px-10">
        {/* top bar */}
        <header className="flex items-center justify-between border-b border-[#14191b]/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#14191b] font-mono text-[10px] font-medium tracking-tight text-[#f8f7f3]">
              SC
            </span>
            <span className="text-[13px] font-medium tracking-tight">Student Course API</span>
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#14191b]/40">
            v1 · prototype
          </span>
        </header>

        {/* hero */}
        <section className="pt-14 sm:pt-20">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#1f6f5c]">
            System Integration &amp; Architecture
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-[42px] leading-[1.05] tracking-[-0.01em] sm:text-[60px]">
            A read-only course API,
            <span className="italic text-[#1f6f5c]"> end to end.</span>
          </h1>
          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#14191b]/55">
            Three endpoints serve one fictional university course catalogue. No logins, no database,
            no writing — just JSON in and JSON out, so the request and response cycle stays easy to
            follow.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-y-6 border-t border-[#14191b]/10 pt-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-[26px] leading-none">{stat.value}</p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#14191b]/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* endpoints + response */}
        <section className="mt-20 grid gap-10 lg:grid-cols-[1fr_minmax(0,0.95fr)] lg:items-start">
          <div>
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#14191b]/40">
              Endpoints
            </h2>
            <div className="mt-4">
              {endpoints.map((endpoint) => (
                <EndpointRow
                  key={endpoint.path}
                  path={endpoint.path}
                  title={endpoint.title}
                  description={endpoint.description}
                  active={result.path === endpoint.path}
                  running={pendingPath === endpoint.path}
                  onTry={() => callEndpoint(endpoint.path)}
                />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#14191b]/40">
                Response
              </h2>
              <span className="font-mono text-[10.5px] text-[#14191b]/35">
                {result.status ? "live" : "example"}
              </span>
            </div>
            <ResponsePanel
              path={result.path}
              status={result.status}
              statusText={result.statusText}
              duration={result.duration}
              body={result.body}
              pending={pendingPath !== null}
            />
            <p className="mt-3 text-[12px] leading-relaxed text-[#14191b]/40">
              Press <span className="font-medium text-[#14191b]/60">Try it</span> to send a real
              request. Open the same address in a browser tab to see the raw JSON.
            </p>
          </div>
        </section>

        {/* sample data */}
        <section className="mt-20">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#14191b]/40">
              The catalogue
            </h2>
            <p className="text-[12px] text-[#14191b]/40">Fictional data · no student records</p>
          </div>
          <CourseTable />
        </section>

        <footer className="mt-16 border-t border-[#14191b]/10 pt-6">
          <p className="max-w-2xl text-[12.5px] leading-relaxed text-[#14191b]/40">
            Each endpoint is one small server route in this project. The full write-up — file
            structure, how each route works, sample responses and known limitations — lives in
            README.md.
          </p>
        </footer>
      </div>
    </div>
  );
}
