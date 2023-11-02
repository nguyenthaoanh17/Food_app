import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Feather';
import { useEffect, useState } from "react";
import axios from "axios";
import { Base_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
const Cart = ( { route, navigation }: any ) =>
{
    const [ actionDelete, setActionDelete ] = useState<string>( "Del0" );
    const [ count, setCount ] = useState( 0 );
    const [ cart, setCart ] = useState<any>( [] );
    const [ price, setPrice ] = useState<any>( 0 );
    const [ loginInfo, setloginInfo ] = useState<any>( {} )
    let row: Array<any> = [];
    let prevOpenedRow: { close: () => void; };
    const getLoginInfo = async () =>
    {
        try
        {
            const value = await AsyncStorage.getItem( 'loginInfo' )
            if ( value !== null )
            {
                callGetCart( JSON.parse( value ) );
                // lấy được dữ liệu
                setloginInfo( JSON.parse( value ) );

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
            setPrice( a )


            setCart( data )

        } catch ( error )
        {
            // setCate( JSON.stringify( error ) )
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




    const listCart = ( { item, index }: { item: any, index: any } ) =>
    {

        return (
            <Swipeable
                renderRightActions={ ( progress, dragX ) =>
                    renderRightView( item, index )
                }
                onSwipeableOpen={ () => closeRow( index ) }
                ref={ ( ref ) => ( row[ index ] = ref ) }



            >
                <TouchableOpacity onPress={ () => navigation.navigate( 'Detail', { item: item.item } ) } style={ styles.listCart }>
                    <Image source={ { uri: item.item.image } } style={ { height: 80, width: 80, left: 15 } } />
                    <View style={ { height: 100, marginLeft: 20, paddingVertical: 15, flex: 1, justifyContent: 'space-between' } } >
                        <Text style={ { fontSize: 18, color: 'black', fontWeight: 'bold', alignItems: "center" } }>{ item.item.name }</Text>
                        <Text style={ { fontSize: 16, color: 'gray' } }>{ item.size }</Text>
                        <Text style={ { fontSize: 18, color: '#FF3800', fontWeight: 'bold' } }>{ item.item.price }$</Text>
                    </View>
                    <View >

                        <View>
                            <View style={ {
                                width: 90,
                                height: 30,
                                backgroundColor: '#40E0D0',
                                marginRight: 10,
                                paddingHorizontal: 3,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignContent: 'center'
                            } }>
                                <Icons onPress={ () => setCount( count == 0 ? count : count - 1 ) } style={ { color: 'white', alignSelf: 'center' } } name="minus" color="#c6c6c6" size={ 23 } />
                                <Text style={ { color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', alignItems: 'center' } }>{ count }</Text>
                                <Icons onPress={ () => setCount( count == 3 ? count : count + 1 ) } style={ { color: 'white', alignSelf: 'center' } } name="plus" color="#c6c6c6" size={ 23 } />
                            </View>
                            <Text style={ { marginTop: 10, fontSize: 17, marginRight: 5 } }>Topping : 0</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )
    }

    const onDelete = async ( item: any, index: any ) =>
    {


        try
        {
            await axios.delete( `${ Base_URL }/cart/${ item.id }` )
            callGetCart( loginInfo )
        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }
    };

    const closeRow = ( index: number ) =>
    {
        //console.log( 'closerow' );
        if ( prevOpenedRow && prevOpenedRow !== row[ index ] )
        {
            prevOpenedRow.close();
        }
        prevOpenedRow = row[ index ];
    };

    const renderRightView = ( item: any, index: any ) =>
    {
        return (
            <TouchableOpacity onPress={ () => { onDelete( item, index ) } }
                style={ {
                    marginVertical: 10,
                    alignContent: 'center',
                    justifyContent: 'center',
                    width: 80,
                    backgroundColor: "#FF3800",
                    height: 100
                } }>

                <Text style={ { fontSize: 18, color: "white", alignSelf: "center", fontWeight: "bold" } }>DELETE</Text>
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView style={ { flex: 1 } }>

            <View style={ { backgroundColor: '#40E0D0', } }>
                <View style={ styles.header }>
                    <Icon style={ { color: 'white' } } onPress={ () => navigation.goBack() } name="arrow-back-ios" color="#c6c6c6" size={ 27 } />
                    <Text style={ { fontSize: 23, fontWeight: 'bold', color: 'white' } }>Cart</Text>
                    <Icons style={ { color: 'white' } } name="x" color="#c6c6c6" size={ 29 } />
                </View>
                <View style={ {
                    backgroundColor: '#f8f8ff',
                    borderTopLeftRadius: 40,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderTopRightRadius: 40,
                    height: 445
                } }>
                    <View style={ { paddingTop: 20 } }>
                        {

                            ( cart.length == 0 )
                                ?
                                <View style={ { paddingTop: 20 } }>
                                    <Text style={ { fontSize: 20, alignSelf: "center" } }>The shopping cart is empty</Text>
                                </View>
                                :
                                <FlatList
                                    showsVerticalScrollIndicator={ false }

                                    data={ cart }
                                    renderItem={ listCart }

                                />
                        }
                        {/* <FlatList
                            showsVerticalScrollIndicator={ false }

                            data={ cart }
                            renderItem={ listCart }

                        /> */}
                    </View>

                </View>


                <View style={ styles.footer }>
                    <View style={ { paddingHorizontal: 25, flexDirection: 'row', justifyContent: "space-between", paddingTop: 20 } }>
                        <Text style={ { fontSize: 25, fontWeight: 'bold', color: 'black' } }>Total Price</Text>
                        <Text style={ { fontSize: 25, fontWeight: 'bold', color: '#FF3800' } }>{ price }$</Text>
                    </View>
                    <View style={ { marginHorizontal: 30, top: 40 } }>
                        <TouchableOpacity onPress={ () => { navigation.navigate( 'Checkout' ) } } style={ { backgroundColor: '#40E0D0', paddingVertical: 20, borderRadius: 15 } }>
                            <Text style={ {
                                alignItems: 'center',
                                alignSelf: 'center',
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: 'white'
                            } }>CHECKOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create( {
    header: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingHorizontal: 20,

        paddingVertical: 30
    },
    listCart: {
        height: 100,
        elevation: 1,
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    footer: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',







    },
} )
export default Cart;