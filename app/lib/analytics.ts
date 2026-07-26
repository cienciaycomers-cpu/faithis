export type FaithisEvent =
  | "view_item"
  | "add_to_cart"
  | "wishlist_add"
  | "filter_used"
  | "cta_click"
  | "newsletter_submit"
  | "scroll_depth";

export function track(event: FaithisEvent, properties: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("faithis:track", { detail: { event, properties } }));
  if (process.env.NODE_ENV === "development") console.info(`[faithis] ${event}`, properties);
}
