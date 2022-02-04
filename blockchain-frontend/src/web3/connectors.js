import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { FrameConnector } from '@web3-react/frame-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { SquarelinkConnector } from '@web3-react/squarelink-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { AuthereumConnector } from '@web3-react/authereum-connector';

import { networks } from '../config/constants';

const RPC_URLS = {
    [networks.MainNet]: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    [networks.Ropsten]: `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    [networks.Rinkeby]: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    [networks.Goerli]: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    [networks.Kovan]: `https://kovan.infura.iov3/${process.env.REACT_APP_INFURA_ID}`,
    [networks.Polygon]: 'https://matic-mainnet.chainstacklabs.com',
};
const POLLING_INTERVAL = 12000;

export const injected = new InjectedConnector({
    supportedChainIds: [
        // networks.MainNet,
        // networks.Ropsten,
        networks.Rinkeby,
        // networks.Goerli,
        // networks.Kovan,
        // networks.Polygon,
        // networks.Local
    ],
});

export const walletConnect = new WalletConnectConnector({
    rpc: { [networks.MainNet]: RPC_URLS[networks.MainNet] },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL,
});

export const walletlink = new WalletLinkConnector({
    url: RPC_URLS[networks.MainNet],
    appName: 'new.pop.town',
});

export const ledger = new LedgerConnector({
    chainId: networks.MainNet,
    url: RPC_URLS[networks.MainNet],
    pollingInterval: POLLING_INTERVAL,
});

export const trezor = new TrezorConnector({
    chainId: networks.MainNet,
    url: RPC_URLS[networks.MainNet],
    pollingInterval: POLLING_INTERVAL,
    manifestEmail: 'developer@xyz.com',
    manifestAppUrl: 'https://new.pop.town',
});

export const frame = new FrameConnector({ supportedChainIds: [1] });

export const fortmatic = new FortmaticConnector({
    apiKey: 'pk_live_911E0486D54C05CE',
    chainId: networks.MainNet,
});

export const portis = new PortisConnector({
    dAppId: 'f420bde8-28fa-4954-855e-317667191963',
    networks: [networks.MainNet, 100],
});

export const squarelink = new SquarelinkConnector({
    clientId: '5f2a2233db82b06b24f9',
    networks: [networks.MainNet, 100],
});

export const torus = new TorusConnector({ chainId: networks.MainNet });

export const authereum = new AuthereumConnector({ chainId: networks.MainNet });
