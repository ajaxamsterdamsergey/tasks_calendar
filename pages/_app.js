import React from 'react';
import { Provider } from 'react-redux';
import { wrapper } from '../store/store';

const MyApp = ({ Component, pageProps }) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
};

export default MyApp;

