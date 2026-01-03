import React from "react";
import ReactDOM from "react-dom/client";

import MarketDataController from "./controllers/MarketDataController";
import reportWebVitals from "./utils/reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MarketDataController />
  </React.StrictMode>
);

reportWebVitals();
