import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screen';
import CampusMap from '../screen/CampusMap';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Dashboard} />
                <Tab.Screen name="Settings" component={CampusMap} />
            </Tab.Navigator>
    )
}