export const READ_METHODS = ["GET", "HEAD", "POST"];

export function methodOf(req) {
  return String(req.method || "GET").toUpperCase();
}

export function isReadable(req) {
  return READ_METHODS.includes(methodOf(req));
}

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

export function jsonError(status, message, details = {}) {
  return Response.json({ error: message, status, ...details }, { status });
}
