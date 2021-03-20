import React from "react";
import ReactDOM from "react-dom";

import { DigitProviders } from "@cthit/react-digit-components";
import App from "./app";

ReactDOM.render(
    <DigitProviders>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </DigitProviders>,
    document.getElementById("root")
);
