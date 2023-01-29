import React from 'react';
import { Route, useNavigate, Routes } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';
import { oktaAuthConfig, oktaSignInConfig } from './config';


const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
  const history = useNavigate();

  const customAuthHandler = () => {
    history('/login');
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Routes>
        <Route path='/' exact={true} element={<Home/>} />
        {/* <Route path='/protected' element={<Protected/>} /> */}
        {/* <Route path='/login' render={() => <Login config={oktaSignInConfig} />} /> */}
        <Route path="/login" element={<Login config={oktaSignInConfig} />} />
        <Route path='/login/callback' element={<LoginCallback/>} />
      </Routes>
    </Security>
  );
};
export default AppWithRouterAccess;
