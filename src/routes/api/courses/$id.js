import { createFileRoute } from "@tanstack/react-router";
import { courses, findCourseById } from "@/lib/courses";

// GET /api/courses/{id}
// Looks up one course by its integer ID.
// 200 = found, 400 = the ID is not a number, 404 = no course with that ID.
export const Route = createFileRoute("/api/courses/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const raw = String(params.id);
        const validIds = courses.map((course) => course.id).join(", ");

        // Step 1: is the ID a whole number at all?
        if (!/^\d+$/.test(raw)) {
          return Response.json(
            {
              error: "invalid_course_id",
              message: `"${raw}" is not a whole number. Course IDs look like ${validIds}.`,
            },
            { status: 400, headers: { "cache-control": "no-store" } }
          );
        }

        // Step 2: does a course with that number exist?
        const course = findCourseById(Number(raw));
        if (!course) {
          return Response.json(
            {
              error: "course_not_found",
              message: `No course exists with id ${raw}. Available ids: ${validIds}.`,
            },
            { status: 404, headers: { "cache-control": "no-store" } }
          );
        }

        return Response.json(course, {
          status: 200,
          headers: { "cache-control": "no-store" },
        });
      },
    },
  },
});
