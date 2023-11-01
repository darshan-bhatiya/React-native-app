/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS, icons, images} from './constants';
import {ScreenHeaderBtn} from './components';

import HomeScreen from './src/screens/HomeScreen';
import JobDetails from './src/screens/JobDetails';
import JobSearch from './src/screens/JobSearch';

export type RootStackParamList = {
  Home: undefined;
  Details: {productId: string}
};


function App(): JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLORS.lightWhite,
            },
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
            ),
            headerRight: () => (
              <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
            ),
            headerTitle: '',
          }}
          name="home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="job-details"
          component={JobDetails}
          options={{
              headerStyle: {
                backgroundColor: COLORS.lightWhite,
              },
              headerShadowVisible: false,
              headerBackVisible: false,
              headerRight: () => (
                <ScreenHeaderBtn iconUrl={icons.share} dimension="60%" />
              ),
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" GoBack={true}/>
              ),
              headerTitle: ''
          }}
        />
      <Stack.Screen
          name="job-search"
          component={JobSearch}
          options={{
              headerStyle: {
                backgroundColor: COLORS.lightWhite,
              },
              headerShadowVisible: false,
              headerBackVisible: false,
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.left} dimension="60%" GoBack={true}/>
              ),
              headerTitle: ''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
