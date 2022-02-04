import { useWeb3React } from '@web3-react/core';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({ path, component: Component, ...rest }) => {
    const { account } = useWeb3React();

    if (!account && path !== '/') {
        return <Redirect to='/mlp' />;
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default PrivateRoute;
