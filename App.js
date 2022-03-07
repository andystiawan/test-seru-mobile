
import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import NavMain from './src/navigation/NavMain';
import Store from './src/redux/store/Store';

const App = () => {
  return(
    <Fragment>
      <StatusBar barStyle="default" />
      {/*Mengambil file store dari redux/store*/}
      <Provider store={Store}>
        <NavMain/>
      </Provider>
    </Fragment>
  )
}

export default App;
