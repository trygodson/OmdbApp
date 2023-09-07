import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./utils/routes";

import "react-circular-progressbar/dist/styles.css";
import { createContext, useState } from "react";
import { GET_STORAGE_ITEM } from "./config/storage";

export const ToggleSidebarContext = createContext();
export const PartnerContext = createContext();

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [partner, setPartner] = useState(GET_STORAGE_ITEM("account"));

  return (
    <ToggleSidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <PartnerContext.Provider value={{ partner, setPartner }}>
        <BrowserRouter>
          <Routes>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                Component={route.component}
                exact={true}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </PartnerContext.Provider>
    </ToggleSidebarContext.Provider>
  );
}

export default App;
