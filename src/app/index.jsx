import React from 'react';
import { observer } from 'mobx-react';
import Dashboard from 'components/Dashboard';
import LoginPage from 'pages/login';

const App = ({ user }) => {
  return user.isAuth ? <Dashboard user={user} /> : <LoginPage user={user} />;
};

export default observer(App);
