import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';
import store from './store';
import NavigationService from './services/navigation';

import Routes from './routes';

export default function App() {
  return (
    <Provider store={store}>
      <>
        <StatusBar barStyle="light-content" />
        <Routes
          ref={navigatorRef => NavigationService.setNavigator(navigatorRef)}
        />
      </>
    </Provider>
  );
}
