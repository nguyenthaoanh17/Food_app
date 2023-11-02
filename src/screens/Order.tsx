import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Iconsss from 'react-native-vector-icons/SimpleLineIcons';
import Iconssss from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Entypo';
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Base_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/Ionicons';

const Order = ( { navigation }: any ) =>
{
    const [ actionOps, setActionOps ] = useState<string>( "Ops0" );
    const [ loginInfo, setloginInfo ] = useState<any>( {} )
    const [ OrderAll, setOrderAll ] = useState<any>( [] );
    const [ order, setOrder ] = useState<any>( [] );
    const [ price, setPrice ] = useState<any>( 0 );
    const [ isShowmore, setShowmore ] = useState<boolean>( false );
    const [ iconShowmore, setIconShowmore ] = useState<string>( "" );
    const listOption = [
        {
            "id": 0,
            "name": "Wait for Confirmation"
        },
        {
            "id": 1,
            "name": "In progress of delivery"
        },
        {
            "id": 2,
            "name": "Delivered"
        },
        {
            "id": 3,
            "name": "Cancelled"
        }
    ]
    const getLoginInfo = async () =>
    {
        try
        {
            const value = await AsyncStorage.getItem( 'loginInfo' )
            if ( value !== null )
            {
                // lấy được dữ liệu
                setloginInfo( JSON.parse( value ) );
                callGetOrder( JSON.parse( value ) );

            }
        } catch ( e )
        {
            // error reading value
            console.log( e );
        }
    }
    const callGetOrder = async ( user: any ) =>
    {
        try
        {
            const res = await axios.get( `${ Base_URL }/orders?accountId=` + user.id, )
            console.log( 'Res', res.data );
            const data = res.data;

            const b = data[ 0 ].list;
            var a = 0;
            for ( let i = 0; i < b.length; i++ )
            {
                a += b[ i ].item.price;
            }
            if ( b.length > 1 )
            {
                setShowmore( true )
                setIconShowmore( "chevron-down" )
            }
            setPrice( a )
            setOrder( b )

        } catch ( error )
        {
            // setCate( JSON.stringify( error ) )
            console.log( JSON.stringify( error ) )
        }

    }

    const hanndleShowmore = () =>
    {
        if ( iconShowmore === "chevron-down" )
        {
            setIconShowmore( "chevron-up" )
        } else
        {
            setIconShowmore( "chevron-down" )
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


    return (
        <>
            <View style={ styles.container1 }>
                <View >
                    <TouchableOpacity onPress={ () => { navigation.navigate( 'Hometab' ) } }>
                        <Iconssss style={ {} } name="left" color="orange" size={ 28 } />
                    </TouchableOpacity>
                </View>
                <Text style={ { color: 'black', fontSize: 22, alignSelf: 'center' } }>Order</Text>
                <TouchableOpacity>
                    <Iconsss style={ { bottom: -5 } } name="share" color="orange" size={ 20 } />
                </TouchableOpacity>
            </View>

            <View style={ {
                backgroundColor: 'white',
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: "space-around",
                paddingTop: 20,
                paddingBottom: 5,
                height: 80


            } }>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={ false }
                    data={ listOption }
                    renderItem={ ( { item, index } ) =>
                        <TouchableOpacity key={ item.id } style={ [ actionOps == "Ops" + index ? { backgroundColor: "#40E0D0", alignSelf: "center", borderRadius: 10 } : null, { width: 120, marginHorizontal: 15, borderBottomWidth: 2.5, borderColor: "orange", height: 60, alignSelf: "center", paddingVertical: 5 } ] } >
                            <Text style={ [ actionOps == "Ops" + index ? { color: "white" } : { color: 'black', }, { fontSize: 18, textAlign: "center" } ] }>{ item.name }</Text>
                        </TouchableOpacity>
                    }
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={ false } >
                <View style={ {
                    marginTop: 10,
                    backgroundColor: "white",

                    shadowColor: 'gray',
                } }>

                    <View style={ { flexDirection: "row", paddingLeft: 10, paddingVertical: 10 } }>
                        <Icon style={ { alignSelf: "center" } } name="storefront-outline" color="gray" size={ 25 } />
                        <Text style={ { fontSize: 16, color: "black", left: 10, fontWeight: "bold", bottom: -5 } }>Restaurant</Text>
                    </View>


                    {
                        order.map( ( item: any, index: any ) =>
                        {
                            if ( iconShowmore === "chevron-down" && index > 0 )
                            {
                                return;
                            }
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


                    {/* { isShowmore ?
                        <TouchableOpacity onPress={ () => hanndleShowmore() } style={ { alignItems: "center" } }>
                            <Icons name={ iconShowmore } color="black" size={ 20 } style={ {} } />
                        </TouchableOpacity> : null
                    } */}
                    {/* <View style={ { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 } }>
                        <Text style={ { fontSize: 16, color: "black", fontWeight: "bold" } }>{ order.length } products</Text>
                        <Text style={ { fontSize: 18, color: "#FF3800", fontWeight: "bold" } }>Price : ${ price }</Text>
                    </View>
                    <TouchableOpacity style={ { backgroundColor: "#FF3800", paddingVertical: 10, borderRadius: 20, marginTop: 10, width: 130 } }>
                        <Text style={ { fontSize: 16, color: "white", fontWeight: "bold", alignSelf: "center" } }>Cancel Order</Text>
                    </TouchableOpacity> */}
                    { ( () =>
                    {
                        if ( ( order.length ) > 0 )
                        {
                            return (

                                <View>
                                    { isShowmore ?
                                        <TouchableOpacity onPress={ () => hanndleShowmore() } style={ { alignItems: "center" } }>
                                            <Icons name={ iconShowmore } color="black" size={ 20 } style={ {} } />
                                        </TouchableOpacity> : null
                                    }
                                    <View style={ { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 } }>
                                        <Text style={ { fontSize: 16, color: "black", fontWeight: "bold" } }>{ order.length } products</Text>
                                        <Text style={ { fontSize: 18, color: "#FF3800", fontWeight: "bold" } }>Price : ${ price }</Text>
                                    </View>
                                    <TouchableOpacity style={ { backgroundColor: "#FF3800", paddingVertical: 10, borderRadius: 20, marginTop: 10, width: 130 } }>
                                        <Text style={ { fontSize: 16, color: "white", fontWeight: "bold", alignSelf: "center" } }>Cancel Order</Text>
                                    </TouchableOpacity>
                                </View>

                            )
                        } else
                        {
                            return (
                                <View style={ { paddingVertical: 10 } }>
                                    <Text style={ { color: '#32CD32', fontWeight: 'bold', fontSize: 18, alignSelf: "center" } }>Order is empty</Text>
                                </View>

                            )
                        }


                        return null;
                    }
                    )() }
                </View>
            </ScrollView>



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
        paddingBottom: 10
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
export default Order;