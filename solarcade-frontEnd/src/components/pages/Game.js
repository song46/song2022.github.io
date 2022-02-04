import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { formatUnits } from '@ethersproject/units';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import NFTMinter from '../../config/abi/NFTMinter.json';
import { Link } from 'react-router-dom';
import NFTItem from '../NFTItem/NFTItem';
import NFTDetail from '../modals/NFTDetail';
import modalContext from '../../context/modal/modalContext';

const Home = () => {
	const { account, chainId, library } = useWeb3React();
	const [ NFTData, setNFTData ] = useState([]);
	const [ detailData, setDetailData ] = useState();
	const { openModal } = useContext(modalContext);

	const fetchData = useCallback(async () => {
		try {
			const minterContract = new Contract(
				NFTMinter.networks[chainId].address,
				NFTMinter.abi,
				library.getSigner()
			);

			const tokens = await minterContract.getMyTokens();
			const result = [];

			for (let i = 0; i < tokens.length; i++) {
				const res = await fetch(tokens[i].uri);
				const data = await res.json();
				
				result.push({
					...data,
					owner: tokens[i].owner,
					id: formatUnits(tokens[i].id, 'wei')
				});
			}

			setNFTData(result);
		} catch (e) {
			console.log(e);
		}
	}, [chainId, library]);

	useEffect(() => {
		fetchData();
	}, [fetchData, account]);

	const handleSelect = (index) => {
		if (NFTData.length === 0) return;
		setDetailData(NFTData[index]);
		openModal('NFTDetail');
	}
	
  return (
    <section id='game'>
			<header>
				<Link to='/' className='logo-link'>
					<img src='https://solajump.solmint.co/static/media/Logo_solajump1.e66f755d.png' alt='solajump background'/>
		    </Link>
			</header>
			<div className='container'>
				<button className='filled connect-wallet'>
					{ account && `${account.slice(0, 6)}...${account.slice(-4)}` }
				</button>
				<h1 className='title'>Your collections</h1>
				<div className='items-container'>
					{
						NFTData.map((nft, index) => (
							<NFTItem
								key={nft.dna}
								data={nft}
								index={index}
								onClick={handleSelect}
							/>
						))
					}
				</div>
			</div>
			{ detailData && <NFTDetail data={detailData}/> }
    </section>
  );
};

export default Home;
