# Student Course API

A small, read-only REST API prototype for a university student portal, written as a
beginner classroom project for **System Integration and Architecture**.

It serves one fictional course catalogue as JSON. There is no login, no database and no
write access: three endpoints read data and return it. That is the whole system, which is
what makes it useful for studying how a client and a server talk to each other.

All course data is invented for the exercise. No real student information is used anywhere.

---

## 1. Technology used

| Piece | What it is here |
| --- | --- |
| Base44 | The platform that hosts the app and runs the backend code |
| Base44 server routes | The three backend "functions" — small HTTP handlers, one per URL |
| TanStack Start + React | The framework the project is built on (only the API routes matter here) |
| JavaScript (ES modules) | The language, using `import` / `export` only — no `require()` |
| JSON | The data format for every request and response |
| A plain JavaScript file for data | `src/lib/courses.js` holds the five sample courses in memory |
| Database | **None.** Nothing is stored between requests. |

> **Important for the report:** this is *not* a Python Flask project. The endpoints are
> Base44 server routes — each one is a file under `src/routes/api/` that exports a `GET`
> handler. Base44 runs that code on its own server, exactly like Flask would run a route
> function, but the code and the deployment are Base44's.

---

## 2. Project structure

```
/
├── README.md                       ← this file
├── package.json                    ← dependency list
├── src/
│   ├── lib/
│   │   └── courses.js              ← the five fictional courses + a lookup helper
│   ├── routes/
│   │   ├── index.jsx               ← small in-app documentation page (not the API)
│   │   └── api/                    ← THE BACKEND: every file here is an endpoint
│   │       ├── health.js           ← GET /api/health
│   │       └── courses/
│   │           ├── index.js        ← GET /api/courses
│   │           └── $id.js          ← GET /api/courses/{id}
│   └── components/api/             ← pieces of the documentation page only
└── base44/                         ← platform configuration
```

**Backend entry points.** The three files the grader will care about are
`src/routes/api/health.js`, `src/routes/api/courses/index.js` and
`src/routes/api/courses/$id.js`. Each is self-contained: a URL, one `GET` handler, and the
JSON it returns. The `$id` in the filename is the framework's way of saying "whatever the
caller puts in this part of the URL" — so `/api/courses/3` fills `params.id` with `"3"`.

**Data.** `src/lib/courses.js` exports an array of five objects and a `findCourseById()`
helper. Because it is imported by the routes (not bundled into the page), one edit there
changes what the API serves.

---

## 3. The backend functions

### `GET /api/health` — is the API awake?

Builds a small object with a status, a service name, a version and the current server time
(`new Date().toISOString()`, which is always UTC), then answers `200 OK`. It reads nothing
and touches nothing, so a success here proves the routing and JSON serialisation work.

### `GET /api/courses` — the whole list

Returns the `courses` array itself, untouched, with `200 OK`. The response body is a JSON
**array** (it starts with `[`), because that is what a list endpoint should return.

### `GET /api/courses/{id}` — one course

Two checks, in order:

1. **Is the ID a whole number?** A pattern test (`/^\d+$/`) rejects anything with letters,
   decimals or symbols, answering `400 Bad Request` with a message listing valid IDs.
2. **Does that course exist?** `findCourseById()` returns `null` when nothing matches, and
   the route answers `404 Not Found` with a message naming the requested ID.

Only when both checks pass does it return the single course object with `200 OK`. This is
the difference between "you asked for something that cannot exist" (400) and "you asked
correctly for something that isn't there" (404).

Error bodies always keep the same two keys — `error` (a short machine-readable code) and
`message` (a sentence a human can read) — so a client can branch on one and display the
other.

---

## 4. API operations and URLs

The paths below are relative to whatever domain the app is served from. In the Base44
preview they work as-is (`/api/health`); once the app is published they become full URLs on
the app's domain, e.g. `https://<your-app-domain>/api/health`.

| # | Method | Path | Success | Failure |
| --- | --- | --- | --- | --- |
| 1 | GET | `/api/health` | 200 | — |
| 2 | GET | `/api/courses` | 200 | — |
| 3 | GET | `/api/courses/{id}` | 200 | 400 invalid ID · 404 unknown ID |

There are deliberately no `POST`, `PUT`, `PATCH` or `DELETE` routes. The API is read-only.

---

## 5. Sample responses

### `GET /api/health` → 200

```json
{
  "status": "ok",
  "service": "student-course-api",
  "version": "1.0.0",
  "time": "2026-11-16T02:09:41.512Z"
}
```

### `GET /api/courses` → 200 (two of the five entries shown)

```json
[
  {
    "id": 1,
    "code": "CS 101",
    "name": "Introduction to Computing",
    "description": "How computers store, process and move information, with small hands-on exercises in problem solving."
  },
  {
    "id": 2,
    "code": "IT 204",
    "name": "Systems Integration Fundamentals",
    "description": "How separate systems exchange data through APIs, files and message queues, explained with working examples."
  }
]
```

### `GET /api/courses/3` → 200

```json
{
  "id": 3,
  "code": "IS 310",
  "name": "Database Design",
  "description": "Turning a written scenario into tables, keys and relationships, then querying the result with SQL."
}
```

### `GET /api/courses/99` → 404

```json
{
  "error": "course_not_found",
  "message": "No course exists with id 99. Available ids: 1, 2, 3, 4, 5."
}
```

### `GET /api/courses/abc` → 400

```json
{
  "error": "invalid_course_id",
  "message": "\"abc\" is not a whole number. Course IDs look like 1, 2, 3, 4, 5."
}
```

Every response is sent with `Content-Type: application/json` (from `Response.json`) and
`Cache-Control: no-store`, so a reload always shows fresh output.

---

## 6. Testing instructions

**In the app.** Open the documentation page, find the three endpoints and press
**Try it**. The dark panel shows the real status code and JSON for that request.

**In a browser tab.** Type the path straight into the address bar:

```
/api/health
/api/courses
/api/courses/3
/api/courses/99
```

**From the command line** (`-i` shows the status line and headers):

```bash
curl -i http://localhost:3000/api/health
curl -i http://localhost:3000/api/courses
curl -i http://localhost:3000/api/courses/1
curl -i http://localhost:3000/api/courses/99    # expect 404
curl -i http://localhost:3000/api/courses/abc   # expect 400
```

Replace the host with the app's published domain when testing the live version.

**Checklist for the report**

| Check | Expected |
| --- | --- |
| `/api/health` | 200, `"status": "ok"` |
| `/api/courses` | 200, array of 5 objects with `id`, `code`, `name`, `description` |
| `/api/courses/1` | 200, the CS 101 object |
| `/api/courses/99` | 404, `error` + `message` |
| `/api/courses/abc` | 400, `error` + `message` |
| Any write method (e.g. `curl -X POST`) | No write route exists — nothing is created |

---

## 7. Known limitations

- **No database.** Courses live in a JavaScript file in memory. Editing a course means
  editing code and redeploying; nothing an API client sends is ever stored.
- **Read-only by design.** There are no create/update/delete endpoints, so the catalogue
  cannot be changed through the API.
- **Fixed sample data.** Five fictional courses with IDs 1–5. No pagination, searching,
  sorting or filtering.
- **No authentication.** Anyone with the URL can read the catalogue. That is acceptable
  here because the data is public and fictional; a real student portal would need sign-in
  and would never expose other students' records.
- **No persistent logging or metrics.** Each request is answered and forgotten.
- **URLs depend on the host.** Paths are shown relative; the full address only exists once
  the app is published to a domain.

---

## 8. Connecting the project to GitHub

Base44 keeps the project's code in a Git repository you can connect to GitHub, so every
change in the editor shows up as a commit you can pull, review, and submit as evidence of
your work.

1. Open **GitHub** from the app's sidebar (or **Settings → Git** in the workspace).
2. Choose **Connect GitHub** and authorise Base44. If you are asked to install the GitHub
   App, pick your own account and grant access to the repository you want to use.
3. Create a new repository for the project (or select an existing empty one). Keep it
   **private** if the assignment is not public yet.
4. Confirm the connection. Base44 pushes the current code — `src/`, `base44/`,
   `package.json`, this README — and keeps pushing as you edit.
5. On GitHub, open the repository and check the three files under `src/routes/api/`. Those
   are the endpoints you submitted.

To work locally, clone the repository, run `npm install`, then `npm run dev`. Publishing a
live version is done with the **Publish** button in the Base44 editor — GitHub is for the
source code, not for hosting this API.
