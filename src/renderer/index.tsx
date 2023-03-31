import {createRoot} from "react-dom/client";
import Main from "./webui/Main";

import "./styles/index.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Failed to get root element");
}

createRoot(rootElement).render(<Main/>);