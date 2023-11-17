import React from "react";
import { createRoot } from "react-dom/client";
import App from "./component/App";
import "./index.css";
// import "github-fork-ribbon-css/gh-fork-ribbon.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
// https://bobbyhadz.com/blog/react-you-are-importing-createroot-from-react-dom
