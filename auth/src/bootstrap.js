import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {createMemoryHistory, createBrowserHistory} from 'history';

const mount = (el, {onSignIn, onNavigate, defaultHistory, initialPath }) => {

    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDom.render(
        <App history={history} onSignIn={onSignIn} />,
        el
    );

    return {
        onParentNavigate({pathname: nextPathName}) {
            const {pathname} = history.location;
            console.log('checkk container', nextPathName);
            if (pathname !== nextPathName) {
                history.push(nextPathName);
            }
        }
    }
}

if (process.env.NODE_ENV  === 'development') {
    const el = document.querySelector('#_auth-dev-root')
    if(el) {
        mount(el, { defaultHistory: createBrowserHistory() })
    }
}

export {mount}