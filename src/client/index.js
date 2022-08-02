import React from "react"

// ✅ now importing from react-dom/client
import { createRoot } from "react-dom/client"

import App from "./App"

const root = createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
