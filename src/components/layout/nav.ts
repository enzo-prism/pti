export const HEADER_HEIGHT_PROPERTY = "--pti-header-height";
export const DESKTOP_NAV_MEDIA = "(min-width: 1280px)";

export function isNavItemActive(currentPath: string, path: string): boolean {
  if (path === "/") {
    return currentPath === "/";
  }

  return currentPath === path || currentPath.startsWith(`${path}/`);
}

export function headerHeightPx(height: number): string {
  return `${Math.max(0, Math.round(height))}px`;
}
