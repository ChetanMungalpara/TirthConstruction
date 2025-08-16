import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter ,Route ,Routes} from 'react-router-dom';
import './index.css';
import ClientApp from "./client/src/App"
import DashboardApp from "./dashboard/src/App"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Dashboard routes mounted at /dashboard/* */}
        <Route path="/dashboard/*" element={<DashboardApp />} />

        {/* Client app for everything else */}
        <Route path="/*" element={<ClientApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);