import { useWeb3React } from '@web3-react/core';
import React, { useReducer } from 'react';
import {
    DISCONNECT_WALLET,
    SET_WALLET_CONNECTION,
} from '../types';
import WalletContext from './walletContext';
import walletReducer from './walletReducer';

const WalletState = ({ children }) => {
    const { activate, deactivate } = useWeb3React();

    const initialState = {
        activeConnector: {
            connector: null,
            name: '',
        },
    };

    const [state, dispatch] = useReducer(walletReducer, initialState);

    const {
        activeConnector,
    } = state;

    const activateWallet = async (name, connector, closeModal) => {
        try {
            dispatch({
                type: SET_WALLET_CONNECTION,
                payload: {
                    name,
                    connector,
                },
            });
            activate(connector);
        } catch (error) {
            console.log(error);
        } finally {
            if (closeModal) {
                closeModal();
            }
        }
    };

    const disconnectWallet = (closeModal) => {
        dispatch({
            type: DISCONNECT_WALLET,
        });
        deactivate(activeConnector.connector);
        if (closeModal) {
            closeModal();
        }
    };

    return (
        <WalletContext.Provider
            value={{
                activeConnector,
                activateWallet,
                disconnectWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletState;
