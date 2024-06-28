import {RouterProvider} from "react-router-dom";
import {I18nextProvider} from "react-i18next";
import Routes from "./Routes";
import i18n from "../i18n"

const App = (): JSX.Element => {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="container">
        <RouterProvider router={Routes}/>
      </div>
    </I18nextProvider>
  );
}

export default App;
