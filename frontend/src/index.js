import React from "react";
import ReactDOM from "react-dom";

import { DigitProviders } from "@cthit/react-digit-components";
import App from "./app";

ReactDOM.render(
    <DigitProviders>
        <App />
    </DigitProviders>,
    document.getElementById("root")
);
