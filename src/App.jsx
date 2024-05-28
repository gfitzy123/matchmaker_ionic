import { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import { setupConfig } from "@ionic/core";
import Routing from "./Routing";
import "./theme/tailwind.css";
import "./theme/variables.css";

setupConfig({
  mode: "md", // or 'md' for Material Design
});

setupIonicReact();

const App = () => {
  const [theme, setTheme] = useState('light');

  const handleTheme = (value) => {
    setTheme(value);
    document.querySelector("html")?.setAttribute("data-theme", value);
  };
  useEffect(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    const currentTheme = localStorage.getItem("theme") || "dark";
    handleTheme(currentTheme);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Routing />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
