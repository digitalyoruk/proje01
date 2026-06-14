/** Blog category value → Turkish display label. */
export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  tadilat: "Tadilat",
  "ic-mimari": "İç Mimarlık",
  tasarim: "Tasarım",
  rehber: "Rehber",
};

export function blogCategoryLabel(value?: string) {
  if (!value) return undefined;
  return BLOG_CATEGORY_LABELS[value] ?? value;
}
