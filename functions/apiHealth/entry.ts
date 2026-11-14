// GET /api/health  ->  served at /functions/apiHealth
// Liveness probe: answers whether the service is up, with no dependencies to
// check. Read-only by design — only GET (and HEAD, plus POST used by the
// platform's own client) reach the body.

import { isReadable, methodNotAllowed } from "../shared/http.ts";

export default async function (req) {
  try {
    if (!isReadable(req)) return methodNotAllowed(req);

    return Response.json(
      {
        status: "ok",
        service: "Student Course API",
        version: "1.0.0",
        mode: "read-only",
        dataSource: "in-code fictional sample data",
        time: new Date().toISOString(),
        endpoints: [
          { method: "GET", path: "/api/health", servedAt: "/functions/apiHealth" },
          { method: "GET", path: "/api/courses", servedAt: "/functions/apiCourses" },
          { method: "GET", path: "/api/courses/{id}", servedAt: "/functions/apiCourseById?id={id}" },
        ],
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return Response.json({ error: `Health check failed: ${error.message}`, status: 500 }, { status: 500 });
  }
}
