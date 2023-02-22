import * as nearAPI from 'near-api-js';

import NEAR from '../constants/near';

export async function initNearContracts() {
    const nearNet = NEAR.NETWORK;
    const nearConfig = {
      networkId: nearNet,
      nodeUrl: 'https://rpc.'+nearNet+'.near.org',
      contractName: (NEAR.NFT_CONTRACT_NAME),
      walletUrl: 'https://wallet.'+(nearNet==='mainnet'?'':(nearNet+'.'))+'near.org',
      helperUrl: 'https://helper.'+nearNet+'.near.org',
      archivalUrl: 'https://archival-rpc.'+nearNet+'.near.org',
    };
    
    const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
    const near = await nearAPI.connect({ keyStore, ...nearConfig });
    const wallet = new nearAPI.WalletConnection(near);

    console.log("wallet:", wallet)
  
    const nftContract = await new nearAPI.Contract(
      wallet.account(),
      (NEAR.NFT_CONTRACT_NAME),
      {
        viewMethods: ['get_minted_quantity','get_user_minted_quantity','get_free_minted_quantity','nft_supply_for_owner','nft_tokens_for_owner'], 
        changeMethods: ['nft_mint'],
        sender: wallet.getAccountId(), 
      }
    );       
  
    return { near, nftContract, nearConfig, wallet };
}