import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home_screen from '../screens/Home_screen';
import Cart from '../screens/Cart';
import Favourite from '../screens/Favourite';
import Search_creen from '../screens/Search_screen';
import User_screen from '../screens/User_screen';
const Hometab = () =>
{
    return (
        <>
            <Tab.Navigator
                screenOptions={ ( { route } ) => ( {
                    tabBarIcon: ( { focused, color, size } ) =>
                    {
                        let iconName: any;


                        if ( route.name === 'Home' )
                        {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                            size = focused
                                ? size + 18
                                : size + 5
                        } else if ( route.name === 'Search' )
                        {
                            iconName = focused
                                ? 'magnify'
                                : 'magnify';
                            size = focused
                                ? size + 18
                                : size + 5
                        } else if ( route.name === 'Favourite' )
                        {
                            iconName = focused
                                ? 'cards-heart'
                                : 'cards-heart-outline';
                            size = focused
                                ? size + 18
                                : size + 5
                        }
                        else if ( route.name === 'Cart' )
                        {
                            iconName = focused
                                ? 'shopping'
                                : 'shopping-outline';
                            size = focused
                                ? size + 18
                                : size + 5
                        } else if ( route.name === 'User' )
                        {
                            iconName = focused
                                ? 'account-circle'
                                : 'account-circle-outline';
                            size = focused
                                ? size + 18
                                : size + 5
                        }


                        // You can return any component that you like here!
                        return <Icon name={ iconName } size={ 33 } color={ color } />;


                    },
                    tabBarActiveTintColor: '#40E0D0',
                    tabBarInactiveTintColor: 'black',
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        borderRadius: 20,
                        height: 50,
                        top: -10,

                    }
                } ) }

            >
                <Tab.Screen name="Home" component={ Home_screen } options={ { headerShown: false } } />
                <Tab.Screen name="Favourite" component={ Favourite } options={ { headerShown: false } } />
                <Tab.Screen name="Search" component={ Search_creen } options={ { headerShown: false } } />
                <Tab.Screen name="Cart" component={ Cart } options={ { headerShown: false, } } />
                <Tab.Screen name="User" component={ User_screen } options={ { headerShown: false } } />

            </Tab.Navigator>
        </>
    )
}
export default Hometab