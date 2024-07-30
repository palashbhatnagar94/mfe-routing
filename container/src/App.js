import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from "./components/Header";

const AuthLazy = lazy(() => import('./components/AuthApp'))
const Marketing = lazy(() => import('./components/MarketingApp'))

export default () => {
    const [isSignedIn, setIsSigneIn] = useState(false);
    return (
        <BrowserRouter>
            <Header isSignedIn={isSignedIn} onSignOut={() => setIsSigneIn(false)} />
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/auth">
                        <AuthLazy isSignedIn={() => setIsSigneIn(true)}/>
                    </Route>
                    <Route path="/" component={Marketing} />
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}