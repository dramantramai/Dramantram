import JWT from "jsonwebtoken";

export async function verifyAuth(request) {
  const token = request.headers.get("authorization");
  if (!token) return null;
  try {
    return JWT.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}
