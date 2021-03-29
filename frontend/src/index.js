import React from "react";
import ReactDOM from "react-dom";

import { DigitProviders } from "@cthit/react-digit-components";
import App from "./app";

if (process.env.NODE_ENV === "development") {
    window.ENV = process.env;
}

ReactDOM.render(
    <DigitProviders>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </DigitProviders>,
    document.getElementById("root")
);
