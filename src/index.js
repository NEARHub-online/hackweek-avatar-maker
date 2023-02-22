import "./styles.css";
import "./game";
import React from "react";
import ReactDOM from "react-dom";
import { AvatarEditorContainer } from "./react-components/AvatarEditorContainer";
import { dispatch } from "./dispatch";
import { Provider } from 'react-redux';
import constants from "./constants";

import configureStore from "./store";

// Used externally by the generate-thumbnails script
window.renderThumbnail = (category, part) => {
  dispatch(constants.renderThumbnail, { thumbnailConfig: { category, part } });
};

const store = configureStore();

ReactDOM.render(
<React.StrictMode>
  <Provider store={store}>
    <AvatarEditorContainer />
  </Provider>
</React.StrictMode>, document.getElementById("root"));
