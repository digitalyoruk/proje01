/** Turkish long-form date, e.g. "15 Haziran 2025". */
export function formatDateTr(iso: string) {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
