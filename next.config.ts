import type { NextConfig } from "next";

/**
 * Response headers every page ships with. No Content-Security-Policy yet: the
 * contact form loads Google reCAPTCHA, and a CSP that permits it correctly
 * needs a nonce per request, which is a change to make deliberately rather
 * than as a side line of a launch checklist.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // The gallery phones render at ~200-220 CSS px, which on a 2x phone needs
    // ~440 px. Without a 448 rung the browser jumps to 640 and downloads more
    // than it can show.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 448],
  },
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
