import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {createMemoryHistory, createBrowserHistory} from 'history';

const mount = (el, { onNavigate, defaultHistory }) => {

    const history = defaultHistory || createMemoryHistory();

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDom.render(
        <App history={history} />,
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
    const el = document.querySelector('#_marketing-dev-root')
    if(el) {
        mount(el, { defaultHistory: createBrowserHistory() })
    }
}

export {mount}