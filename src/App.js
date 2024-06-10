import React, { useEffect, useState } from "react";

//import Scss
import "./assets/scss/themes.scss";

//imoprt Route
import Route from "./Routes";

import { useLocation } from "react-router-dom";
import { updateSession } from "./helpers/fakebackend_helper";

function App() {
  const location = useLocation();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/login") {
      const timeoutId = setTimeout(() => {
        setModalVisible(true);
      }, 150000000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [location]);

  function tog_modal() {
    setModalVisible(!modalVisible);
  }

  async function handleUpdateSession() {
    setModalVisible(!modalVisible);
    updateSession();
  }

  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
