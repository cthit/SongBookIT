import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import { DigitDialog, DigitProviders } from "@cthit/react-digit-components";
import App from "./app";

ReactDOM.render(
    <DigitProviders defaultLangauge="sv">
        <>
            <DigitDialog />
            <App />
        </>
    </DigitProviders>,
    document.getElementById("root")
);

registerServiceWorker();
