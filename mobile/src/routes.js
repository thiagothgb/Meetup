import React from 'react';
import {Image} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import logo from '~/assets/img/logo-header.png';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Subscribe from '~/pages/Subscribe';
import Profile from '~/pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({SignIn, SignUp}),
        App: createStackNavigator(
          {
            Tab: createBottomTabNavigator(
              {
                Dashboard,
                Subscribe,
                Profile,
              },
              {
                initialRouteName: 'Dashboard',
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#fff',
                  inactiveTintColor: 'rgba(255,255,255,0.6)',
                  style: {
                    backgroundColor: '#2b1a2f',
                    borderTopWidth: 0,
                  },
                },
              },
            ),
          },
          {
            headerLayoutPreset: 'center',
            defaultNavigationOptions: {
              headerTitle: <Image source={logo} />,
              headerStyle: {
                backgroundColor: '#000',
                height: 64,
              },
            },
          },
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      },
    ),
  );
