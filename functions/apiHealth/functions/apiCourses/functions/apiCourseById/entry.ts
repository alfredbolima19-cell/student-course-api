// GET /api/courses/{id}  ->  served at /functions/apiCourseById?id=1
// A Base44 function URL is fixed, so the path parameter travels as ?id=.
// Three outcomes are handled explicitly: 400 (bad id), 404 (unknown id), 200 (found).

import { COURSE_IDS, findCourseById } from "../../shared/courses.ts";
import { isReadable, jsonError, methodNotAllowed, methodOf } from "../../shared/http.ts";

export default async function (req) {
  try {
    if (!isReadable(req)) return methodNotAllowed(req);

    let rawId = new URL(req.url).searchParams.get("id");

    // Also accept the id in a JSON body, so a client can call this through the
    // platform's function client (which always sends POST) as well as by URL.
    if (rawId === null && methodOf(req) === "POST") {
      const body = await req.json().catch(() => ({}));
      const candidate = body?.id ?? body?.courseId;
      if (candidate !== undefined && candidate !== null) rawId = String(candidate);
    }

    if (rawId === null || rawId.trim() === "") {
      return jsonError(400, "Missing required query parameter 'id'.", {
        usage: "/functions/apiCourseById?id=1",
        availableIds: COURSE_IDS,
      });
    }

    if (!/^\d+$/.test(rawId.trim())) {
      return jsonError(400, `Course id must be a whole number, received '${rawId}'.`, {
        usage: "/functions/apiCourseById?id=1",
      });
    }

    const course = findCourseById(rawId.trim());

    if (!course) {
      return jsonError(404, `No course exists with id ${rawId.trim()}.`, {
        requestedId: Number(rawId.trim()),
        availableIds: COURSE_IDS,
      });
    }

    return Response.json(course, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return Response.json({ error: `Could not load course: ${error.message}`, status: 500 }, { status: 500 });
  }
}
