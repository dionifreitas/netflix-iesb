import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';


const Stack =  createStackNavigator();

export default function HomeRoutes() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}