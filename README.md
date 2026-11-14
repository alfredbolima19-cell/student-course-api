# Student Course API

## Project Overview

Student Course API is a read-only backend project created using Base44. It provides information about fictional university courses through backend functions that return JSON responses.

This project was developed for Assignment 3 - System Integration and Architecture.

## Backend Functions

| Function | Purpose |
|---|---|
| `apiHealth` | Checks whether the API is running. |
| `apiCourses` | Returns the list of available courses. |
| `apiCourseById` | Returns a specific course using its ID. |

## API Endpoints

| Endpoint | Description |
|---|---|
| `/functions/apiHealth` | Health check |
| `/functions/apiCourses` | Retrieve all courses |
| `/functions/apiCourseById?id=1` | Retrieve course with ID 1 |
| `/functions/apiCourseById?id=9999` | Test an invalid course ID |

## Technologies Used

- Base44
- JavaScript / TypeScript
- React
- Vite
- Tailwind CSS
- Base44 SDK

## Project Structure

```text
student-course-api/
├── functions/
│   ├── apiHealth/
│   │   └── entry.ts
│   ├── apiCourses/
│   │   └── entry.ts
│   ├── apiCourseById/
│   │   └── entry.ts
│   └── shared/
│       ├── courses.ts
│       └── http.ts
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
└── README.md
```

## Testing

The following backend function tests were performed:

1. Health check — successful.
2. Course list — successful.
3. Valid course ID — successful.
4. Invalid course ID — returned HTTP 404 as expected.

## Important Note

This project uses Base44 backend functions and its `/functions/` endpoint structure. It does not use the original Python Flask `/api/` routes specified in the Lesson 3 example.

The source code must be included in the repository separately.

## Author

Student Course API - Assignment 3
