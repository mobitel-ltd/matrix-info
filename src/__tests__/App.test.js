import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';
import { UserStore } from 'store';

const sdkStubs = {
  createClient: () => {},
};

const userStub = new UserStore({ sdk: sdkStubs });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App user={userStub} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
