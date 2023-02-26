import React, { useState, useEffect } from "react";
import { Toolbar } from "./Toolbar";
import { UploadButton } from "./UploadButton";
import { MoreMenu } from "./MoreMenu";
import { dispatch } from "../dispatch";
import constants from "../constants";
import NEAR from '../constants/near';
import { useSelector } from 'react-redux';
import * as THREE from "three";
import * as Hash from "ipfs-only-hash";

var imagedata;
function dispatchResetView() {
  dispatch(constants.resetView);
}

function dispatchExportAvatar() {
  dispatch(constants.exportAvatar);
}

function takeScreenshot(){
  dispatch(constants.resetView);
  setTimeout(function() {
    dispatch(constants.exportAvatar);
  }, 100);
}

export function ToolbarContainer({ onGLBUploaded, randomizeConfig }) {
  const nearWallet = useSelector(state => state.near.wallet);
  const ftContract = useSelector(state => state.near.nftContract2);
  const [showMenu, setShowMenu] = useState(false);
  const [qtyToken, setqtyToken] = useState('0');


  const data = 'hello world!'
  Hash.of(data).then((hash) => {console.log("hash: ", hash)});


  useEffect(() => {
      if (ftContract) {
        ftContract.ft_balance_of({account_id: nearWallet.getAccountId()}).then((qty) => {
          setqtyToken(qty)
          console.log("Quantity", qty);
        });
      }
  }, [ftContract, nearWallet]);

  const handleWalletClick = (e) => {
    if (nearWallet?.isSignedIn()) {
        setShowMenu(false);
    } else {
        login();
    }
}

  const login = () => {
      nearWallet?.requestSignIn(
          NEAR.NFT_CONTRACT_NAME,
          'Nearhub Avatar'
      );
      setShowMenu(false);
  }

  const logout = () => {
    nearWallet?.signOut();
    setShowMenu(true);
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
        <button onClick={randomizeConfig}>Randomize avatar</button>
        <button onClick={dispatchResetView}>Reset camera view</button>
        
          

        <span onClick={handleWalletClick} className="sc-button header-slider style style-1 wallet fl-button pri-1 pointer" style={nearWallet?.isSignedIn()?{border:'none'}:{}}>
          <span>{ nearWallet?.isSignedIn() ? nearWallet.getAccountId() +  " - " + qtyToken : 'Connect Wallet' }</span>
        </span>

        { nearWallet?.isSignedIn() === true && showMenu !== true &&
          <span><button onClick={takeScreenshot}>Mint Avatar</button><button onClick={logout}>Logout</button></span>
        }
      </div>
      <div className="toolbarNotice">
        <span>The some of the 3D models used in this app are ©2020-2022 by individual <a href="https://www.mozilla.org" target="_blank" noreferrer>mozilla.org</a> and <a href="https://www.nearhub.club" target="_blank" noreferrer>nearhub.club</a> contributors.
          Content available under a <a href="https://www.mozilla.org/en-US/foundation/licensing/website-content/" target="_blank" noreferrer>Creative Commons license</a>.</span>
      </div>
    </Toolbar>
   

  );
}
