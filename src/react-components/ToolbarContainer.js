import React, { useState } from "react";
import { Toolbar } from "./Toolbar";
import { UploadButton } from "./UploadButton";
import { MoreMenu } from "./MoreMenu";
import { dispatch } from "../dispatch";
import constants from "../constants";
import NEAR from '../constants/near';
import { useSelector } from 'react-redux';

function dispatchResetView() {
  dispatch(constants.resetView);
}

function dispatchExportAvatar() {
  dispatch(constants.exportAvatar);
}

function takeScreenshot(){
  dispatch(constants.takeScreenshot);
}

export function ToolbarContainer({ onGLBUploaded, randomizeConfig }) {
  const [getScreenshot, setScreenshot] = useState(false);
  const nearWallet = useSelector(state => state.near.wallet);

  const login = () => {
    console.log("qua: ", nearWallet)
      nearWallet?.requestSignIn(
          NEAR.NFT_CONTRACT_NAME,
          'Nearhub Avatar'
      );
  }

  return (
    <Toolbar>
      <div className="toolbarContent">
        <span className="appName">NEAR Hub Avatar Maker</span>
        <MoreMenu
          items={
            <>
              <UploadButton onGLBUploaded={onGLBUploaded} />
              {/* <a href="https://github.com/mozilla/hackweek-avatar-maker" target="_blank">
                GitHub
              </a> */}
            </>
          }
        ></MoreMenu>
        <input type="hidden" id="screenshot" value={getScreenshot} />
        <button onClick={randomizeConfig}>Randomize avatar</button>
        <button onClick={dispatchResetView}>Reset camera view</button>
        {/* <button onClick={takeScreenshot}>Take screenshot</button> */}
        
          
        
        { nearWallet?.isSignedIn() && nearWallet.getAccountId() &&
          <button onClick={dispatchExportAvatar} className="primary">Mint avatar</button>
        }
        { nearWallet?.isSignedIn() !== true &&
          <button onClick={login} >Connect Wallet</button>
        }
      </div>
      <div className="toolbarNotice">
        <span>The some of the 3D models used in this app are ©2020-2022 by individual <a href="https://www.mozilla.org" target="_blank" noreferrer>mozilla.org</a> and <a href="https://www.nearhub.club" target="_blank" noreferrer>nearhub.club</a> contributors.
          Content available under a <a href="https://www.mozilla.org/en-US/foundation/licensing/website-content/" target="_blank" noreferrer>Creative Commons license</a>.</span>
      </div>
    </Toolbar>
   

  );
}
