import { useWeb3React } from '@web3-react/core';
import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import config from "../../config/config";
import modalContext from '../../context/modal/modalContext';
import NFTMinter from '../../config/abi/NFTMinter.json';

const NFTDetail = ({data}) => {
    const { chainId } = useWeb3React();
    const { modal, closeModal } = useContext(modalContext);
    const image = data.image.slice(7);
    const contractAddress = NFTMinter.networks[chainId].address;

    const onClose = () => {
        closeModal('NFTDetail');
    };

    return (
        <ReactModal
            ariaHideApp={false}
            isOpen={modal.NFTDetail}
            overlayClassName='modal-overlay'
            className='modal-content nft-detail'
            shouldCloseOnOverlayClick={true}
            onRequestClose={onClose}
        >
            <div className='header'>{data.name}</div>
            <div className='content'>
                <div className='image-container'>
                    <img src={`${config.pinataBaseURI}${image}`} alt="nft content"/>
                </div>
                <div className='info-container'>
                    <span>Owner</span>
                    <a 
                        target='_blank'
                        rel="noreferrer"
                        href={`https://rinkeby.etherscan.io/address/${data.owner}`}
                    >
                        {`${data.owner.slice(0, 6)}...${data.owner.slice(-4)}`}
                    </a>
                    <span>Contract Address</span>
                    <a 
                        target='_blank'
                        rel="noreferrer"
                        href={`https://rinkeby.etherscan.io/address/${contractAddress}`}
                    >
                        {`${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`}
                    </a>
                    <span>Token ID</span>
                    <span>#{data.id}</span>
                    {
                        data.attributes.map((attr) => (
                            <>
                                <span>{attr.trait_type}</span>
                                <span>{attr.value}</span>
                            </>
                        ))
                    }
                </div>
            </div>
        </ReactModal>
    );
};

export default NFTDetail;
