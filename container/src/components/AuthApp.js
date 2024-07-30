
import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function AuthApp({isSignedIn}) {
    const ref = useRef(null);
    const history = useHistory()

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({pathname: nextPathName}) => {
                const {pathname} = history.location;
                console.log('checkk Auth child', nextPathName);
                if (pathname !== nextPathName) {
                    history.push(nextPathName);
                }
            },
            onSignIn: () => {
                console.log('Sign In')
                isSignedIn()
            }
        })
        history.listen(onParentNavigate);
    }, [])

    return (
        <div ref={ref}></div>
    )
};

export default AuthApp