import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './QsComp/RefNavigation';
import QsHome from './QsSrc/QsHome';
import QsSP from './QsSrc/QsSP';
import QsFav from './QsSrc/QsFav';
import QsCart from './QsSrc/QsCart';
// import QsContact from './QsSrc/QsContact';
// import QsConfirmOrder from './QsSrc/QsConfirmOrder';
import QsSearch from './QsSrc/QsSearch';
const Stack = createStackNavigator();

function Routes(props) {
  return (
    <NavigationContainer
      ref={(ref) => {
        Navigator.InitializeRefNavigation(ref);
      }}>
      <Stack.Navigator
        initialRouteName="QsHome"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="QsHome" component={QsHome} />
        <Stack.Screen name="QsSP" component={QsSP} />
        <Stack.Screen name="QsFav" component={QsFav} />
        <Stack.Screen name="QsCart" component={QsCart} />
        {/* <Stack.Screen name="QsContact" component={QsContact} /> */}
        {/* <Stack.Screen name="QsConfirmOrder" component={QsConfirmOrder} /> */}
        <Stack.Screen name="QsSearch" component={QsSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
