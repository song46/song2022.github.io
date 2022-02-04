import {
    DISCONNECT_WALLET,
    SET_WALLET_CONNECTION,
} from '../types';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WALLET_CONNECTION:
            return {
                ...state,
                activeConnector: action.payload,
            };
        case DISCONNECT_WALLET:
            return {
                ...state,
                activeConnector: {
                    connector: null,
                    name: '',
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export default reducer;
