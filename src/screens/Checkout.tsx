import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, Vibration, View } from "react-native";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import Iconss from 'react-native-vector-icons/EvilIcons';
import Iconsss from 'react-native-vector-icons/Entypo';
import Iconssss from 'react-native-vector-icons/Ionicons';
import Iconsssss from 'react-native-vector-icons/Feather';
import Iconssssss from 'react-native-vector-icons/Octicons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Base_URL } from "../config";
import Toast from "react-native-toast-message";
const Checkout = ( { navigation }: any ) =>
{
    const [ loginInfo, setloginInfo ] = useState<any>( {} )
    const [ price, setPrice ] = useState<any>( 0 );
    const [ cart, setCart ] = useState<any>( [] );
    const [ cartId, setCartId ] = useState<any>( null );
    const getLoginInfo = async () =>
    {
        try
        {
            const value = await AsyncStorage.getItem( 'loginInfo' )
            if ( value !== null )
            {
                // lấy được dữ liệu
                setloginInfo( JSON.parse( value ) );
                callGetCart( JSON.parse( value ) );

            }
        } catch ( e )
        {
            // error reading value
            console.log( e );
        }
    }
    const callGetCart = async ( user: any ) =>
    {
        try
        {
            const res = await axios.get( `${ Base_URL }/cart?accountId=` + user.id, )
            //console.log( 'Res', res.data );
            const data = res.data;
            var a = 0;
            for ( let i = 0; i < data.length; i++ )
            {
                a += data[ i ].item.price;
            }
            setCartId( data )
            setPrice( a )
            setCart( data )
            console.log( data );

        } catch ( error )
        {
            // setCate( JSON.stringify( error ) )
            console.log( JSON.stringify( error ) )
        }

    }
    const addToOrder = async () =>
    {
        Toast.show( {
            type: "success",//error,infor
            text1: "ORDER SUCCESSFULLY",
            text2: "Please See More In Your Order",
            autoHide: true,
            visibilityTime: 5000,
            position: "bottom",
            // topOffset: 100,
            bottomOffset: 200
        } )
        try
        {
            await axios.post( `${ Base_URL }/orders`, { list: cart, accountId: loginInfo.id } )
            // console.log( 'Res', res.data );
            callDeleteCart()

        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }
    }
    const callDeleteCart = async () =>
    {
        try
        {
            const res = await axios.get( `${ Base_URL }/cart?accountId=` + loginInfo.id, )
            const data = res.data;
            data.forEach( async ( element: any ) =>
            {
                await axios.delete( `${ Base_URL }/cart/${ element.id }` )
            } );
        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }
    }
    useEffect( () =>
    {
        const unsubscribe = navigation.addListener( 'focus', () =>
        {
            // khi màn hình được active thì lệnh trong này hoạt động
            getLoginInfo();

        } );
        return unsubscribe;
    }, [ navigation ] );
    console.log( cart );


    return (
        <>

            <View style={ styles.container1 }>
                <View >

                    <TouchableOpacity onPress={ () => navigation.goBack() }>
                        <Icons style={ {} } name="left" color="#40E0D0" size={ 28 } />
                    </TouchableOpacity>
                </View>
                <Text style={ { color: 'black', fontSize: 20, alignSelf: 'center' } }>Check Out</Text>
                <TouchableOpacity>
                    <Icon style={ { bottom: -5, left: -5 } } name="share" color="#40E0D0" size={ 20 } />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={ false }>

                <View style={ {
                    marginTop: 10,
                    backgroundColor: "white",
                    shadowOffset: {
                        width: 0,
                        height: 44
                    },
                    shadowOpacity: 10,
                    shadowColor: 'gray',
                } }>

                    <View style={ {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 20,
                        paddingVertical: 10
                    } }>

                        <View style={ {
                            flexDirection: "row",
                            justifyContent: "space-around",
                        } }>
                            <Iconss style={ {} } name="location" color="#40E0D0" size={ 30 } />
                            <View style={ { paddingLeft: 20 } }>
                                <Text style={ { fontSize: 17, color: "black", paddingBottom: 15, bottom: -5 } }>Delivery Address</Text>
                                <Text style={ { fontSize: 16, color: "black" } }>{ loginInfo.name } | { loginInfo.phone }</Text>
                                <Text style={ { fontSize: 16, color: "black" } }>{ loginInfo.address }</Text>
                            </View>

                        </View>

                        <Iconsss style={ { alignSelf: "center" } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                </View>
                <View style={ {
                    marginTop: 10,
                    backgroundColor: "white",
                    shadowOffset: {
                        width: 0,
                        height: 44
                    },
                    shadowOpacity: 10,
                    shadowColor: 'gray',
                } }>

                    <View style={ { flexDirection: "row", paddingLeft: 10, paddingVertical: 10 } }>
                        <Iconssss style={ { alignSelf: "center" } } name="storefront-outline" color="gray" size={ 25 } />
                        <Text style={ { fontSize: 16, color: "black", left: 10, fontWeight: "bold", bottom: -5 } }>Restaurant</Text>
                    </View>

                    {
                        cart.map( ( item: any, index: any ) =>
                        {

                            return (


                                <View key={ item.id } style={ {
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingHorizontal: 20,


                                } } >

                                    <TouchableOpacity style={ styles.listCart }>
                                        <View style={ {
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            marginVertical: 10,
                                            marginRight: 20,
                                            alignItems: "center"
                                        } }>
                                            <Image source={ { uri: item.item.image } } style={ { height: 80, width: 80, left: 15 } } />
                                            <View style={ { height: 100, paddingVertical: 15, paddingLeft: 30 } } >
                                                <Text style={ { fontSize: 18, color: 'black', fontWeight: 'bold', } }>{ item.item.name }</Text>
                                                <Text style={ { fontSize: 16, color: 'gray', } }>M</Text>
                                                <Text style={ { fontSize: 18, color: '#FF3800', fontWeight: 'bold', } }>{ item.item.price }$</Text>
                                            </View>
                                        </View>
                                        <Toast />
                                        <View style={ { marginRight: 20 } }>
                                            <Text style={ { fontSize: 18, color: 'gray' } }>x1</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>

                            )
                        } )
                    }

                </View>
                <View style={ {
                    borderTopWidth: 0.5,
                    borderTopColor: '#32de84',
                    backgroundColor: "#f5feff",
                    borderBottomWidth: 0.6,
                    borderBottomColor: '#32de84',
                } }>
                    <View style={ {
                        paddingVertical: 10,
                        marginHorizontal: 10,
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#DCDCDC',

                    } }>
                        <Text style={ { color: '#32de84', alignItems: "center", fontSize: 15 } }>Shipping method</Text>
                    </View>
                    <View style={ {
                        paddingVertical: 10,
                        marginHorizontal: 10,
                        flexDirection: "row",
                        justifyContent: "space-between"
                    } }>
                        <View style={ { flexDirection: "row" } }>
                            <Icons style={ {} } name="checkcircle" color="#32de84" size={ 18 } />
                            <Text style={ { color: '#32de84', alignItems: "center", fontSize: 15, left: 5 } }>Free shipping</Text>
                        </View>

                        <Text style={ { color: 'black', alignItems: "center", fontSize: 16 } }>đ0</Text>
                    </View>
                </View>
                <View style={ {
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                } }>
                    <Text style={ { color: 'black', alignItems: "center", fontSize: 16 } }>Message</Text>

                    <Text style={ { color: '#DCDCDC', alignItems: "center", fontSize: 16 } }>Note to Seller...</Text>
                </View>
                <View style={ {
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderTopWidth: 0.5,
                    borderTopColor: '#DCDCDC',
                } }>
                    <Text style={ { color: 'black', alignItems: "center", fontSize: 16 } }>Total Payment ({ cart.length } product):</Text>

                    <Text style={ { color: '#FF3800', alignItems: "center", fontSize: 18, fontWeight: "bold" } }>${ price }</Text>
                </View>
                <View style={ {
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderTopWidth: 0.5,
                    borderTopColor: '#DCDCDC',
                } }>
                    <View style={ { flexDirection: "row" } }>
                        <Text style={ { color: 'black', alignSelf: "center", fontSize: 16 } }>Electronic Bill</Text>
                        <Iconssss style={ { left: 5, alignSelf: "center" } } name="information-circle-outline" color="gray" size={ 25 } />
                    </View>
                    <View style={ { flexDirection: "row" } }>
                        <Text style={ { color: '#DCDCDC', alignSelf: "center", fontSize: 16 } }>Request Now</Text>
                        <Iconsss style={ {} } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                </View>
                <View style={ {
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderTopWidth: 0.5,
                    borderTopColor: '#DCDCDC',
                } }>
                    <View style={ { flexDirection: "row" } }>
                        <Icons style={ { alignSelf: "center" } } name="pay-circle-o1" color="orange" size={ 20 } />
                        <Text style={ { color: 'black', alignSelf: "center", fontSize: 16, left: 5 } }>Payment Methods</Text>

                    </View>

                    <View style={ { flexDirection: "row" } }>
                        <Text style={ { color: 'black', alignSelf: "center", fontSize: 16 } }>Payment on Delivery</Text>
                        <Iconsss style={ {} } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>

                </View>
                <View style={ {
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    backgroundColor: "white",
                    borderTopWidth: 0.5,
                    borderTopColor: '#DCDCDC',
                } }>
                    <View style={ { flexDirection: "row" } }>
                        <Iconsssss style={ { alignSelf: "center" } } name="clipboard" color="orange" size={ 20 } />
                        <Text style={ { color: 'black', alignSelf: "center", fontSize: 16, left: 5 } }>Payment Details</Text>
                    </View>
                    <View style={ { paddingTop: 10, paddingHorizontal: 20 } }>
                        <View style={ { flexDirection: "row", justifyContent: "space-between" } }>
                            <Text style={ { color: 'gray', alignSelf: "center", fontSize: 15, left: 5 } }>Total Price</Text>
                            <Text style={ { color: 'gray', alignSelf: "center", fontSize: 15, left: 5 } }>{ price }$</Text>
                        </View>
                        <View style={ { flexDirection: "row", justifyContent: "space-between" } }>
                            <Text style={ { color: 'gray', alignSelf: "center", fontSize: 15, left: 5 } }>Total Shipping Fee</Text>
                            <Text style={ { color: 'gray', alignSelf: "center", fontSize: 15, left: 5 } }>0$</Text>
                        </View>
                    </View>
                    <View style={ { flexDirection: "row", paddingTop: 10, justifyContent: "space-between" } }>

                        <Text style={ { color: 'black', alignSelf: "center", fontSize: 18, left: 5, fontWeight: "bold" } }>Payment Details</Text>
                        <Text style={ { color: '#FF3800', alignSelf: "center", fontSize: 18, fontWeight: "bold" } }>${ price }</Text>
                    </View>
                </View>
                <View style={ {
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "white",
                    borderTopWidth: 0.5,
                    borderTopColor: '#DCDCDC',
                    marginBottom: 5
                } }>
                    <View style={ { flexDirection: "row", justifyContent: "space-between" } }>
                        <Iconssssss style={ { alignSelf: "center" } } name="checklist" color="orange" size={ 25 } />
                        <Text style={ { color: 'black', alignSelf: "center", fontSize: 16, left: 5, width: 350 } }>Clicking "Order" means you agree to comply with the App Terms</Text>

                    </View>



                </View>
            </ScrollView>
            <View style={ {

                borderTopWidth: 0.5,
                borderTopColor: "#DCDCDC",
                flexDirection: "row",
                justifyContent: "flex-end",
                backgroundColor: "white",

            } }>
                <View style={ { flexDirection: "column", justifyContent: "flex-end", paddingRight: 10 } }>

                    <Text style={ { color: 'black', alignSelf: "center", fontSize: 20 } }>Total Payment</Text>
                    <Text style={ { color: '#FF3800', alignSelf: "center", fontSize: 20, fontWeight: "bold" } }>${ price }</Text>
                </View>
                <TouchableOpacity onPress={ () => navigation.navigate( 'Order', addToOrder() ) } style={ { backgroundColor: "#FF3800", width: "30%", alignItems: "center", height: 60 } }>
                    <Text style={ { color: 'white', alignContent: "center", fontSize: 20, fontWeight: "bold", bottom: -15 } }>Order</Text>
                </TouchableOpacity>


            </View>



        </>
    )
}
const styles = StyleSheet.create( {

    container1: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 20
    },
    listCart: {
        height: 100,
        elevation: 1,
        borderRadius: 10,
        marginVertical: 10,

        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        width: "100%",
        justifyContent: "space-between"
    },
} )
export default Checkout;