const API_ROOT = "http://localhost:3000/api";

export function serverPath(path: string) {
  return `${API_ROOT}${path}`;
}
