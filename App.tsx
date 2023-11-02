import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from "react-native";
import Hometab from "./src/navigation/Hometab";
import Home_screen from "./src/screens/Home_screen";
import Detail from "./src/screens/Detail";
import { SheetProvider } from 'react-native-actions-sheet';
import './src/sheets';
import Cart from "./src/screens/Cart";
import User_screen from "./src/screens/User_screen";
import Search_creen from "./src/screens/Search_screen";
import 'react-native-gesture-handler';
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";
import User_detail from "./src/screens/User_detail";
import Order from "./src/screens/Order";

import Checkout from "./src/screens/Checkout";
import Wellcome from "./src/screens/Wellcome";

const Stack = createNativeStackNavigator();
const App = () =>
{
  return (


    <SheetProvider>
      <NavigationContainer >
        <Stack.Navigator screenOptions={ { headerShown: false } } >
          <Stack.Screen name="Wellcome" component={ Wellcome } />
          <Stack.Screen name="Signin" component={ SignIn } />
          <Stack.Screen name="Hometab" component={ Hometab } />
          <Stack.Screen name="HomeScreen" component={ Home_screen } />
          <Stack.Screen name="Detail" component={ Detail } />
          <Stack.Screen name="Cart" component={ Cart } />
          <Stack.Screen name="UserScreen" component={ User_screen } />
          <Stack.Screen name="SearchScreen" component={ Search_creen } />
          <Stack.Screen name="Checkout" component={ Checkout } />
          <Stack.Screen name="Signup" component={ SignUp } />
          <Stack.Screen name="User_detail" component={ User_detail } />
          <Stack.Screen name="Order" component={ Order } />

        </Stack.Navigator>
      </NavigationContainer>
    </SheetProvider>


  )
}
export default App;