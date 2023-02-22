const INIT_NEAR = 'near/init';

const initialState = { api: null, config: null, wallet: null, nftContract: null, nftContract2: null, nftContract3: null, marketContract: null };
export const initNear = ({ api, config, wallet, marketContract, nftContract, nftContract2, nftContract3 }) => {
    return {
        type: INIT_NEAR,
        payload: {
            api, config, wallet, marketContract, nftContract, nftContract2, nftContract3
        },
    };
}

export default function nearReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case INIT_NEAR:
            newState = Object.assign({}, state);
            newState.api = action.payload.api;
            newState.config = action.payload.config;
            newState.wallet = action.payload.wallet;
            newState.marketContract = action.payload.marketContract;
            newState.nftContract = action.payload.nftContract;
            newState.nftContract2 = action.payload.nftContract2;
            newState.nftContract3 = action.payload.nftContract3;
            return newState;
        default:
            return state;
    };
};