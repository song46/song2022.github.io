import { useWeb3React } from '@web3-react/core';
import { Contract } from '@ethersproject/contracts';
import { formatUnits, parseUnits } from '@ethersproject/units';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import modalContext from '../../context/modal/modalContext';
import NFTMinter from '../../config/abi/NFTMinter.json';
import { Link } from 'react-router-dom';
import ConnectWallet from '../modals/ConnectWallet';

const Home = () => {
	const { account, chainId, library } = useWeb3React();
	const history = useHistory();
	const { openModal } = useContext(modalContext);
	const [ amount, setAmount ] = useState(1);
	const [ totalAmount, setTotalAmount ] = useState(0);
	const [ mintedAmount, setMintedAmount ] = useState(0);
	const [ mintPrice, setMintPrice ] = useState(0);

	const refreshAmount = useCallback(() => {
		try {
			const minterContract = new Contract(
				NFTMinter.networks[chainId].address,
				NFTMinter.abi,
				library.getSigner()
			);

			minterContract.totalAmount().then((res) => setTotalAmount(formatUnits(res, 'wei')));
			minterContract.getMintedAmount().then((res) => setMintedAmount(formatUnits(res, 'wei')));
			minterContract.price().then((res) => setMintPrice(formatUnits(res, 'ether')));
		} catch (e) {
			console.log(e);
		}
	}, [chainId, library]);

	useEffect(() => {
		if (!account) return;
		refreshAmount();
	}, [account, refreshAmount]);

	const handleMint = async () => {
		try {
			const minterContract = new Contract(
				NFTMinter.networks[chainId].address,
				NFTMinter.abi,
				library.getSigner()
			);
	
			const price = mintPrice * amount;
			const minted = await minterContract.createNFT(amount, { from: account, value: parseUnits(price.toString()) });
			const receipt = await minted.wait();
	
			console.log(receipt); 
			refreshAmount();
		} catch (e) {
			console.log(e);
		}
	}

	const onMinusClick = () => {
		if (amount > 1) {
			setAmount(prev => prev - 1);
		}
	}

	const onPlusClick = () => {
		if (amount < 10) {
			setAmount(prev => prev + 1)
		}
	}

	const handleEnterGame = () => {
		if (!account) return;
		history.push('/game');
	}

  return (
    <section id='home'>
			<header>
				<Link to='/' className='logo-link'>
					<img src='https://solajump.solmint.co/static/media/Logo_solajump1.e66f755d.png' alt='solajump background'/>
		    </Link>
			</header>
			<div className='container'>
				<button 
					className='filled connect-wallet'
					onClick={() => {openModal('connectWallet')}}
				>
					{ account && `${account.slice(0, 6)}...${account.slice(-4)}` }
					{ !account && `Connect Wallet`}					
				</button>
				<button 
					className='outlined enter-game'
					onClick={handleEnterGame}
				>
					Enter Game
				</button>
				<p className='subtitle'>Genesis Collection</p>
				<p className='price-detail'>Mint Price : {mintPrice} Matic</p>
				{
					account && (
						<>
							<p className='price-detail'>Mint Amount : {mintedAmount} / {totalAmount}</p>
							<div className='mint-amount'>
								<button onClick={onMinusClick}>-</button>
								<span>{amount}</span>
								<button onClick={onPlusClick}>+</button>
							</div>
							<button 
								className='filled mint-button'
								onClick={handleMint}
							>Mint</button>
						</>
					)
				}
				
				<video className='video-show' loop autoPlay muted>
				  <source src="https://elasticbeanstalk-us-east-2-916888492548.s3.us-east-2.amazonaws.com/Solajump-video.m4v" type="video/mp4"/>
				  Your browser does not support HTML video.
				</video>
			</div>
			<ConnectWallet/>
    </section>
  );
};

export default Home;
