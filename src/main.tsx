import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Polyfills for older Chromium used by prerenderers.
if (!Array.prototype.at) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.at = function at<T>(this: T[], index: number): T | undefined {
    const len = this.length;
    const normalizedIndex = index < 0 ? len + index : index;
    return this[normalizedIndex];
  };
}

if (!String.prototype.at) {
  // eslint-disable-next-line no-extend-native
  String.prototype.at = function at(this: string, index: number): string {
    const len = this.length;
    const normalizedIndex = index < 0 ? len + index : index;
    return this.charAt(normalizedIndex);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
