import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import Home from './components/pages/Home';
import Game from './components/pages/Game';
import ModalState from './context/modal/ModalState';
import WalletState from './context/wallet/WalletState';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.scss';

function App() {
  const getLibrary = (provider) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;

    return library;
  };

  return (
    <Router>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ModalState>
          <WalletState>
            <main>
              <Switch>
                <Route path='/' exact component={Home} />
                <PrivateRoute
                    path='/game'
                    exact
                    component={Game}
                />
                <Redirect to='/' />
              </Switch>
            </main>
          </WalletState>
        </ModalState>
      </Web3ReactProvider>
    </Router>
  );
}

export default App;
