import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { password, gallery } = req.body ?? {};

  if (!password || !gallery) {
    return res.status(400).json({
      success: false,
      message: "Missing credentials",
    });
  }

  const passwords: Record<string, string | undefined> = {
    "pink-pony-2026": process.env.PINK_PONY_GALLERY_PASSWORD,
    "polo-2026": process.env.POLO_GALLERY_PASSWORD,
  };

  const correctPassword = passwords[gallery];

  if (!correctPassword) {
    return res.status(404).json({
      success: false,
      message: "Gallery not found",
    });
  }

  if (password !== correctPassword) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password",
    });
  }

 const sessionToken = `${gallery}:${Date.now()}`;

const sessionSecret = process.env.GALLERY_SESSION_SECRET;

if (!sessionSecret) {
  return res.status(500).json({
    success: false,
    message: "Session configuration error",
  });
}

const maxAge = 60 * 60 * 4;
const expiresAt = Date.now() + maxAge * 1000;

const payload = `${gallery}.${expiresAt}`;

const signature = crypto
  .createHmac("sha256", sessionSecret)
  .update(payload)
  .digest("hex");

const sessionToken = `${payload}.${signature}`;

res.setHeader(
  "Set-Cookie",
  `gallery_session=${encodeURIComponent(
    sessionToken
  )}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`
);

return res.status(200).json({
  success: true,
});
}