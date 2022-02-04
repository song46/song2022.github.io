import React, { useState } from 'react';
import ModalContext from './modalContext';

const ModalState = ({ children }) => {
    const initialState = {
        connectWallet: false,
        NFTDetail: false
    };

    const [modal, setModal] = useState(initialState);

    const openModal = (name) => {
        setModal((prev) => ({ ...prev, [name]: true }));
    };

    const closeModal = (name) => {
        setModal((prev) => ({ ...prev, [name]: false }));
    };

    const setSnackbarMessage = (message) => {
        setModal((prev) => ({ ...prev, snackbarMessage: message }));
    };

    const setModalData = (data) => {
        setModal((prev) => ({ ...prev, modalData: data }));
    };

    return (
        <ModalContext.Provider
            value={{
                modal,
                openModal,
                closeModal,
                setSnackbarMessage,
                setModalData,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalState;
