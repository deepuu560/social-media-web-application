import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function Root() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("========== FIREBASE AUTH ==========");
      console.log("Current User:", user);
    });

    return () => unsubscribe();
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);