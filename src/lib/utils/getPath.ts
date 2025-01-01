export function getDashboardBaseUrl(url: string) {
  const dashboardIndex = url.indexOf("/dashboard");
  if (dashboardIndex !== -1) {
    return url.slice(0, dashboardIndex + "/dashboard".length);
  }
  return null; // Trường hợp không tìm thấy /dashboard
}
