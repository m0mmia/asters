export function assetUrl(path) {
  const publicUrl = process.env.PUBLIC_URL;
  return publicUrl ? [publicUrl.replace(/\/$/, ""), path].join("") : path;
}
