import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import config from '../../config/config';
import modalContext from '../../context/modal/modalContext';
import walletContext from '../../context/wallet/walletContext';

const ConnectWallet = (props) => {
    const { modal, closeModal } = useContext(modalContext);
    const { activeConnector, activateWallet, disconnectWallet } = useContext(
        walletContext
    );

    const onClose = () => {
        closeModal('connectWallet');
    };

    return (
        <ReactModal
            {...props}
            ariaHideApp={false}
            isOpen={modal.connectWallet}
            overlayClassName='modal-overlay'
            className='modal-content connect-wallet'
            shouldCloseOnOverlayClick={true}
            onRequestClose={onClose}
        >
            <div className='header'>Connect Wallet</div>
            <div className='content'>
                {config.walletConnections.map(({ name, connector, icon }) => (
                    <button
                        key={name}
                        type='button'
                        className={
                            activeConnector.name === name ? 'active' : ''
                        }
                        onClick={() => activateWallet(name, connector, onClose)}
                    >
                        <span>{name}</span>
                        <img src={icon} alt={`${name} icon`} />
                    </button>
                ))}
                <button
                    onClick={() => disconnectWallet(onClose)}
                    disabled={!activeConnector.connector}
                    className='deactivate'
                    type='button'
                >
                    Disconnect
                </button>
            </div>
        </ReactModal>
    );
};

export default ConnectWallet;
