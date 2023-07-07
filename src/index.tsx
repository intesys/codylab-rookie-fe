import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const { worker } = require("./mocks/browser");
worker.start({
  onUnhandledRequest(req: any, print: any) {
    if (req.url.pathname.startsWith("/api/") || req.url.host.startsWith("api.dicebear.com")) {
      return;
    }

    print.warning();
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
