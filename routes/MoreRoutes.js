import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import More from '../screen/More';


const Stack =  createStackNavigator();

export default function MoreRoutes() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="More"
                component={More}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}