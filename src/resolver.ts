import { crypto, extname, resolve, toFileUrl } from "./deps.ts";
import { apiDirectory } from "./env.ts";

export const jsify = (file: string) => {
  return file.replace(extname(file), ".js");
};

export const tsify = (file: string) => {
  return file.replace(extname(file), ".ts");
};

export const jsxify = (file: string) => {
  return file.replace(extname(file), ".jsx");
};

export const tsxify = (file: string) => {
  return file.replace(extname(file), ".tsx");
};

export const isValidUrl = (url: string) => {
  try {
    return new URL(url);
  } catch (_e) {
    return false;
  }
};

export const hashFile = (url: string) => {
  // strip query params from hashing
  url = url.split("?")[0];
  const msgUint8 = new TextEncoder().encode(url);
  const hashBuffer = crypto.subtle.digestSync("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
    "",
  );
  return hashHex;
};

export const stripTrailingSlash = (url: string) => {
  return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const resolveFileUrl = (from: string, to: string) => {
  return new URL(toFileUrl(resolve(from, to)).toString());
};

export const cacheBuster = (source: string, timestamp?: number) => {
  return source.replace(
    /\.(j|t)sx?/gi,
    () => {
      return `.js${timestamp ? `?ts=${timestamp}` : ""}`;
    },
  );
};

export const isRemoteSource = (value: string) => {
  return value.startsWith("https://") ||
    value.startsWith("http://");
};

export const isApiRoute = (value: string) => {
  return value.indexOf(apiDirectory) >= 0;
};
