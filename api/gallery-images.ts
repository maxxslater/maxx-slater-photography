import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";
 import {
  list,
  issueSignedToken,
  presignUrl,
} from "@vercel/blob";

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const gallery =
    typeof req.query.gallery === "string"
      ? req.query.gallery
      : null;

  if (!gallery) {
    return res.status(400).json({
      success: false,
      message: "Gallery required",
    });
  }

  const sessionSecret = process.env.GALLERY_SESSION_SECRET;

  if (!sessionSecret) {
    return res.status(500).json({
      success: false,
      message: "Session configuration error",
    });
  }

  const cookieHeader = req.headers.cookie ?? "";

  const sessionCookie = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("gallery_session="));

  if (!sessionCookie) {
    return res.status(401).json({
      success: false,
      message: "Gallery session required",
    });
  }

  const encodedToken = sessionCookie.substring(
    "gallery_session=".length
  );

  let token: string;

  try {
    token = decodeURIComponent(encodedToken);
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid gallery session",
    });
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return res.status(401).json({
      success: false,
      message: "Invalid gallery session",
    });
  }

  const [sessionGallery, expiresAtString, providedSignature] =
    parts;

  const expiresAt = Number(expiresAtString);

  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    return res.status(401).json({
      success: false,
      message: "Gallery session expired",
    });
  }

  if (sessionGallery !== gallery) {
    return res.status(403).json({
      success: false,
      message: "Session does not match gallery",
    });
  }

  const payload = `${sessionGallery}.${expiresAt}`;

  const expectedSignature = crypto
    .createHmac("sha256", sessionSecret)
    .update(payload)
    .digest("hex");

  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid gallery session",
    });
  }
const prefix = `galleries/${gallery}/`;

const { blobs } = await list({
  prefix,
});

const token = await issueSignedToken({
  operations: ["get"],
});

const images = await Promise.all(
  blobs.map(async (blob) => {
    const { presignedUrl } = await presignUrl(token, {
      pathname: blob.pathname,
      operation: "get",
      validUntil: Date.now() + 5 * 60 * 1000,
    });

    return {
      pathname: blob.pathname,
      url: presignedUrl,
    };
  })
);

return res.status(200).json({
  success: true,
  gallery,
  images,
});

}