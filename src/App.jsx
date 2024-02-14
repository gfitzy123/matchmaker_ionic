import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "regenerator-runtime/runtime";

import store from "../src/config/Store";

import Routing from "./Routing";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App = () => (
  <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <GoogleOAuthProvider clientId="641741913591-csrvko4707avoo0jvu1e832dm8l016hn.apps.googleusercontent.com">
            <DndProvider backend={HTML5Backend}>
              <Provider store={store}>
                <Routing />
              </Provider>
            </DndProvider>
          </GoogleOAuthProvider>
        </IonRouterOutlet>
      </IonReactRouter>
  </IonApp>
);

export default App;
