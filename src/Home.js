import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const navigate = useNavigate();
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) return null;

  const login = async () => navigate('/login');

  const logout = async () => oktaAuth.signOut();

  const button = authState.isAuthenticated ?
    <button onClick={logout}>Logout</button> :
    <button onClick={login}>Login</button>;

  return (
    <div>
      <Link to='/'>Home</Link><br/>
      <Link to='/protected'>Protected</Link><br/>
      {button}
    </div>
  );
};
export default Home;
