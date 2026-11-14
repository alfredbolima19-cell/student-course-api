// Small HTTP helpers shared by every endpoint, so the rules of this API are
// written once: which methods are allowed, and what an error body looks like.

export const READ_METHODS = ["GET", "HEAD", "POST"];

export function methodOf(req) {
  return String(req.method || "GET").toUpperCase();
}

export function isReadable(req) {
  return READ_METHODS.includes(methodOf(req));
}

// 405 — correct status for "this resource exists but that verb is not allowed".
export function methodNotAllowed(req) {
  return Response.json(
    {
      error: `Method ${methodOf(req)} is not allowed. This API is read-only.`,
      allowed: READ_METHODS,
      status: 405,
    },
    { status: 405, headers: { Allow: READ_METHODS.join(", ") } },
  );
}

// Consistent error shape: { error, status, ...details }. Consumers can branch
// on the status code and still show `error` to a human.
export function jsonError(status, message, details = {}) {
  return Response.json({ error: message, status, ...details }, { status });
}
