import {BlurView} from '@react-native-community/blur';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import CustomIcon from '../components/CustomIcon';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import OrderHistory from '../screens/OrderHistoryScreen';
import {COLORS} from '../theme/theme';

const Tab = createBottomTabNavigator();

const CustomTabBarBackground = () => (
  <BlurView overlayColor="" blurAmount={15} style={styles.blurViewStyles} />
);

const renderTabBarIcon = ({
  focused,
  name,
}: {
  focused: boolean;
  name: string;
}) => (
  <CustomIcon
    name={name}
    size={24}
    color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
  />
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: CustomTabBarBackground,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => renderTabBarIcon({focused, name: 'home'}),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => renderTabBarIcon({focused, name: 'cart'}),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused}) => renderTabBarIcon({focused, name: 'like'}),
        }}
      />
      <Tab.Screen
        name="History"
        component={OrderHistory}
        options={{
          tabBarIcon: ({focused}) => renderTabBarIcon({focused, name: 'bell'}),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  blurViewStyles: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
