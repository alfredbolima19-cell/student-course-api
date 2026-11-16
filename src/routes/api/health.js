import { createFileRoute } from "@tanstack/react-router";

// GET /api/health
// A tiny "is the API awake?" endpoint. It touches nothing else, so if this
// answers, the server routes themselves are wired up and returning JSON.
export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const body = {
          status: "ok",
          service: "student-course-api",
          version: "1.0.0",
          time: new Date().toISOString(),
        };

        return Response.json(body, {
          status: 200,
          headers: { "cache-control": "no-store" },
        });
      },
    },
  },
});
