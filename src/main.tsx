import React from "react";
import { createRoot } from "react-dom/client";
// import App from "./App";
import { Toaster } from "@/components/ui/sonner"
import TailGridDemo from "./TailGridDemo";
const rootContainer = document.getElementById("root");
const root = createRoot(rootContainer!);
root.render(
  <React.StrictMode>
    <TailGridDemo />
    <Toaster />
  </React.StrictMode>
);