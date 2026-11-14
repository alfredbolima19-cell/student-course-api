
# Student Course API

## Project Overview

Student Course API is a read-only backend project created with Base44 for Assignment 3 - System Integration and Architecture. It provides JSON responses containing fictional university course information.

The course data is stored in a shared TypeScript file. This is a demonstration API and does not connect to a live student database.

## Live Deployment

Base44 application:

https://sparkling-study-path-api.base44.app

## Backend Functions and Endpoints

| Function | Endpoint | Purpose |
|---|---|---|
| apiHealth | /functions/apiHealth | Checks API status |
| apiCourses | /functions/apiCourses | Returns all six sample courses |
| apiCourseById | /functions/apiCourseById?id=1 | Returns one course by ID |

### Example URLs

- Health check: https://sparkling-study-path-api.base44.app/functions/apiHealth
- All courses: https://sparkling-study-path-api.base44.app/functions/apiCourses
- Course ID 1: https://sparkling-study-path-api.base44.app/functions/apiCourseById?id=1
- Invalid course ID: https://sparkling-study-path-api.base44.app/functions/apiCourseById?id=9999

## Technologies Used

- Base44 backend functions
- TypeScript
- JSON

## Project Structure

```text
student-course-api/
├── README.md
└── functions/
    ├── apiCourseById/
    │   └── entry.ts
    ├── apiCourses/
    │   └── entry.ts
    ├── apiHealth/
    │   └── entry.ts
    └── shared/
        ├── courses.ts
        └── http.ts
```

## Testing

The following tests were performed:

1. Health check — successful.
2. Courses endpoint — successful.
3. Valid course ID — successful.
4. Invalid course ID (9999) — returned HTTP 404 as expected.

## Implementation Note

This repository contains a Base44 implementation using `/functions/` routes. It is not the Python Flask implementation using `/api/health`, `/api/courses`, and `/api/courses/<id>` from the original Lesson 3 example.

If the assignment specifically requires Flask and those exact routes, this Base44 version is an alternative implementation and may need to be adapted.

## Author

Student Course API - Assignment 3
