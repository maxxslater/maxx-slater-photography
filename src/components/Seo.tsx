import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import pages from "../data/seo.json";
export const origin = "https://www.maxxslater.com";
export function metadata(path: string) {
  const entry = pages[path as keyof typeof pages];
  return { title: entry?.[0] ?? "Client Gallery | Maxx Slater Photography",
    description: entry?.[1] ?? "Private client galleries from Maxx Slater Photography.",
    url: origin + path, noindex: !entry || ["/clients", "/terms", "/privacy"].includes(path) };
}
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const data = metadata(pathname);
    document.title = data.title;
    const set = (kind: "name" | "property" | "rel", key: string, value: string) => {
      const tag = kind === "rel" ? "link" : "meta";
      let element = document.head.querySelector(`${tag}[${kind}="${key}"]`);
      if (!element) { element = document.createElement(tag); element.setAttribute(kind, key); document.head.append(element); }
      element.setAttribute(kind === "rel" ? "href" : "content", value);
    };
    set("name", "description", data.description);
    set("name", "robots", data.noindex ? "noindex,follow" : "index,follow,max-image-preview:large");
    set("rel", "canonical", data.url);
    for (const [key, value] of Object.entries({title: data.title, description: data.description, url: data.url, image: origin + "/images/self.JPG"}))
      set("property", `og:${key}`, value);
  }, [pathname]);
  return null;
}
