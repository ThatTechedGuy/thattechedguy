import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Needs babel-plugin-react-compiler (devDependency).
  reactCompiler: true,
  poweredByHeader: false,
  // Two root layouts ((home) and (yank)) leave no single layout for a 404, so app/global-not-found.tsx owns it.
  experimental: { globalNotFound: true },
  // trailingSlash stays at its default (false): /yank/ redirects to /yank with a 308.
  // The opinions page used to live at /stack; keep old links working.
  redirects: async () => [{ source: "/stack", destination: "/opinions", permanent: true }],
};

export default nextConfig;
