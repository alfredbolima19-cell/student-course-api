// GET /api/courses  ->  served at /functions/apiCourses
// Returns the whole catalog as a plain JSON array (no wrapper object), which is
// what a client expects from a collection endpoint.

import { COURSES } from "../../shared/courses.ts";
import { isReadable, methodNotAllowed } from "../../shared/http.ts";

export default async function (req) {
  try {
    if (!isReadable(req)) return methodNotAllowed(req);

    return Response.json(COURSES, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return Response.json({ error: `Could not load courses: ${error.message}`, status: 500 }, { status: 500 });
  }
}
