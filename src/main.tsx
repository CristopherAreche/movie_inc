import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SearchProvider } from "./provider/SearchContext";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <StrictMode>
      <SearchProvider>
        <App />
      </SearchProvider>
    </StrictMode>
  );
} else {
  throw new Error("Could not find element with id 'root'");
}
