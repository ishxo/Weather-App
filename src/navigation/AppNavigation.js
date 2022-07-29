
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CountrySearch from '../screens/countrySearch';
import LocationSearch from '../screens/locationSearch';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="CountrySearch"
          component={CountrySearch}
          options={{ title: 'Country Search' }}
        />
        <Stack.Screen 
          name="LocationSearch" 
          component={LocationSearch}  
          options={{ title: 'Location Search' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;