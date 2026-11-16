import { createFileRoute } from "@tanstack/react-router";
import { courses } from "@/lib/courses";

// GET /api/courses
// Returns the whole catalogue as a plain JSON array.
export const Route = createFileRoute("/api/courses/")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json(courses, {
          status: 200,
          headers: { "cache-control": "no-store" },
        });
      },
    },
  },
});
