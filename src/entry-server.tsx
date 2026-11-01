import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
export { metadata, origin } from "./components/Seo";
export function render(path: string) {
  return renderToString(<StaticRouter location={path}><App /></StaticRouter>);
}
