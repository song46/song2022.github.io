import MetaMaskIcon from '../assets/icons/connectors/metamask.png';
import CoinbaseWalletIcon from '../assets/icons/connectors/CoinbaseWallet.png';
import WalletConnectIcon from '../assets/icons/connectors/WalletConnect.png';
import TrezorIcon from '../assets/icons/connectors/Trezor.png';
import LedgerIcon from '../assets/icons/connectors/Ledger.png';
import PortisIcon from '../assets/icons/connectors/Portis.png';
import FortmaticIcon from '../assets/icons/connectors/Fortmatic.png';
import TorusIcon from '../assets/icons/connectors/Torus.png';
import SquarelinkIcon from '../assets/icons/connectors/Squarelink.png';
import AuthereumIcon from '../assets/icons/connectors/Authereum.png';

import {
  authereum,
  fortmatic,
  injected,
  ledger,
  portis,
  squarelink,
  torus,
  trezor,
  walletConnect,
  walletlink,
} from '../web3/connectors'

const config = {
  pinataBaseURI: 'https://gateway.pinata.cloud/ipfs/',
  walletConnections: [
  {
    name: 'MetaMask',
    connector: injected,
    icon: MetaMaskIcon,
  },
  {
    name: 'Coinbase Wallet',
    connector: walletlink,
    icon: CoinbaseWalletIcon,
  },
  {
    name: 'Wallet Connect',
    connector: walletConnect,
    icon: WalletConnectIcon,
  },
  {
    name: 'Ledger',
    connector: ledger,
    icon: LedgerIcon,
  },
  {
    name: 'Trezor',
    connector: trezor,
    icon: TrezorIcon,
  },
  {
    name: 'Fortmatic',
    connector: fortmatic,
    icon: FortmaticIcon,
  },
  {
    name: 'Portis',
    connector: portis,
    icon: PortisIcon,
  },
  {
    name: 'Squarelink',
    connector: squarelink,
    icon: SquarelinkIcon,
  },
  {
    name: 'Torus',
    connector: torus,
    icon: TorusIcon,
  },
  {
    name: 'Authereum',
    connector: authereum,
    icon: AuthereumIcon,
  },
  ],
}

export default config;