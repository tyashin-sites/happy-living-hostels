import { createFileRoute, Outlet } from "@tanstack/react-router";

// Pathless /blog layout: renders only an <Outlet/> so that the /blog index
// (blog.index.tsx) and individual posts (/blog/$slug) render as full sibling
// pages. Previously blog.tsx WAS the index page (no Outlet), which meant
// /blog/$slug matched but its parent rendered the listing UI and the post
// article component never mounted. Keep this component free of any UI.
export const Route = createFileRoute("/blog")({
  component: () => <Outlet />,
});
