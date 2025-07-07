import { useEffect } from "react";

import ActionsAuth from "../Actions/ActionsAuth";

function AppWrapper({ children }) {
  const { GetRefresToken } = ActionsAuth();

  useEffect(() => {
    GetRefresToken(); // Intenta refrescar al iniciar la app
  }, []);

  return children;
}

export default AppWrapper;