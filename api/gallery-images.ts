import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "node:crypto";
 import {
  list,
  issueSignedToken,
  presignUrl,
} from "@vercel/blob";

export default async function handler(
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
try {
  const prefix = `galleries/${gallery}/`;

  const { blobs } = await list({
  prefix,
});

  const previewBlobs = blobs.filter((blob) =>
  blob.pathname.includes("/previews/")
);

const images = await Promise.all(
  previewBlobs.map(async (previewBlob) => {
    const fileName = previewBlob.pathname.split("/").pop();

    if (!fileName) {
      throw new Error("Invalid preview pathname");
    }

    const originalPath =
      `galleries/${gallery}/originals/${fileName}`;

    const previewToken = await issueSignedToken({
      pathname: previewBlob.pathname,
      operations: ["get"],
      validUntil: Date.now() + 10 * 60 * 1000,
    });

    const originalToken = await issueSignedToken({
      pathname: originalPath,
      operations: ["get"],
      validUntil: Date.now() + 10 * 60 * 1000,
    });

    const { presignedUrl: previewUrl } = await presignUrl(
      previewToken,
      {
        pathname: previewBlob.pathname,
        operation: "get",
        access: "private",
        validUntil: Date.now() + 5 * 60 * 1000,
      }
    );

    const { presignedUrl: originalUrl } = await presignUrl(
      originalToken,
      {
        pathname: originalPath,
        operation: "get",
        access: "private",
        validUntil: Date.now() + 5 * 60 * 1000,
      }
    );

    return {
      pathname: originalPath,
      previewUrl,
      originalUrl,
    };
  })
);

return res.status(200).json({
  success: true,
  gallery,
  images,
});

}