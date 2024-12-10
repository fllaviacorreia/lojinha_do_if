import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Clients from "../screens/clients";
import Products from "../screens/products";
import Purchases from "../screens/purchases";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function AppNavigation() {

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Clientes" component={Clients}
                    options={{
                        headerTintColor: "#45defe",
                        headerStyle: {
                            backgroundColor: "#000"
                        },
                        tabBarIcon: () => (<FontAwesome6 name="person" size={24} color="black" />)
                    }}

                />
                <Tab.Screen name="Compras" component={Purchases} options={{tabBarIcon: (color) => (<MaterialCommunityIcons name="purse" size={24} color="black" />)}}/>
                <Tab.Screen name="Produtos" component={Products} options={{ tabBarIcon: () => (<FontAwesome name="product-hunt" size={24} color="black" />)}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}