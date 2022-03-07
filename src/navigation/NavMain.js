import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import Menu from '../view/menu/Menu';
import RegistrationContainer from '../view/registration/RegistrationContainer';
import PreviewRegisterContainer from '../view/previewRegistration/PreviewRegisterContainer';
import Preview from '../view/previewRegistration/preview/Preview';

const Stack = createNativeStackNavigator();
function NavMain() {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{headerShown: false}}
        initialRouteName="Menu">
          <Stack.Screen name='Menu'     component={Menu}/>
          <Stack.Screen name='Register' component={RegistrationContainer}/>
          <Stack.Screen name='Preview'  component={PreviewRegisterContainer}/>
          <Stack.Screen name='PreviewDetail' component={Preview}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NavMain;