import 'react-native-gesture-handler';
import * as React from 'react';
import HomeRoutes from './HomeRoutes';
import MoreRoutes from './MoreRoutes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import Home from '../screen/Home';
import I18n from 'i18n-js';
import NativeModules from 'react-native'

const Tab = createBottomTabNavigator();


I18n.translations = {
    en: { 
        home: 'Home',
        search: 'Search',
        soon: 'Soon', 
        download: 'Downloads',
        more: 'More' 
    },
    pt: { 
        home : 'Inicio',
        search:  'Buscar',
        soon: 'Em breve', 
        download: 'Baixar',
        more: 'Mais' 
    },
};

const normalizeTranslate = {
    'en_US': 'en',
    'pt_BR': 'pt',
    'en': 'en',
    'pt_US': 'pt',
}

const setLanguageToI18n = () => {
    const language = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localeIdentifier
    const translateNormalize = normalizeTranslate[language]
    const iHaveThisLanguage = I18n.translations.hasOwnProperty(translateNormalize)
    iHaveThisLanguage
      ? I18n.locale = translateNormalize
      : I18n.defaultLocale = 'en_US'
}

const translate = (key) => I18n.t(key);

export default function Tabs() {

    setLanguageToI18n();

    return (

        <Tab.Navigator
            tabBarOptions={{
                backgroundColor:'black',
                activeTintColor:'white',
                style:{
                    backgroundColor:'#1a1718',
                    borderTopColor:'transparent'
                }
            }}
        >

            <Tab.Screen
                name='Home'
                component={HomeRoutes}
                options={{
                    tabBarLabel:translate('home'),
                    tabBarIcon: ({ color, size }) => <Entypo name='home' size={size} color={color} />
                }}
            />

            <Tab.Screen
                name='Busca'
                component={Home}
                options={{
                    tabBarLabel:translate('search'),
                    tabBarIcon: ({ color, size }) => <AntDesign name='search1' size={size} color={color} />
                }}
            />

            <Tab.Screen
                name='Em breve'
                component={Home}
                options={{
                    tabBarLabel:translate('soon'),
                    tabBarIcon: ({ color, size }) => <MaterialIcons name='perm-media' size={size} color={color} />
                }}
            />

            <Tab.Screen
                name='Downloads'
                component={Home}
                options={{
                    tabBarLabel:translate('download'),
                    tabBarIcon: ({ color, size }) => <Feather name='download' size={size} color={color} />
                }}
            />

            <Tab.Screen
                name='Mais'
                component={MoreRoutes}
                options={{
                    tabBarLabel:translate('more'),
                    tabBarIcon: ({ color, size }) => <Feather name='menu' size={size} color={color} />
                }}
            />

        </Tab.Navigator>
    )
}