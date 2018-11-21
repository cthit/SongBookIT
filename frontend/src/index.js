import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import { DigitProviders } from "@cthit/react-digit-components";
import App from "./app";

const Root = ({}) => (
    <DigitProviders>
        <App />
    </DigitProviders>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
