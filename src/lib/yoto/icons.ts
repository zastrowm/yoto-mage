const ICON_BASE_URL = "https://media-secure-v2.api.yotoplay.com/icons";

export function resolveIconUrl(yotoRef: string): string | null {
  if (!yotoRef || !yotoRef.startsWith("yoto:#")) return null;
  const mediaId = yotoRef.slice(6);
  return `${ICON_BASE_URL}/${mediaId}`;
}
