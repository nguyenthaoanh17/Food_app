import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/AntDesign';
import Iconss from 'react-native-vector-icons/FontAwesome6';
import { SheetManager } from 'react-native-actions-sheet';
import { useEffect, useState } from "react";
import axios from "axios";
import { Base_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const Detail = ( { route, navigation }: any ) =>
{
    const [ isFavorite, setIsFavorite ] = useState<any>( false );
    const [ favoriteId, setFavoriteId ] = useState<any>( null );
    const { item } = route.params;


    const [ loginInfo, setloginInfo ] = useState<any>( {} )
    const getLoginInfo = async () =>
    {
        try
        {
            const value = await AsyncStorage.getItem( 'loginInfo' )
            if ( value !== null )
            {
                checkIsFavourite( JSON.parse( value ) );
                // lấy được dữ liệu
                setloginInfo( JSON.parse( value ) );

            }
        } catch ( e )
        {
            // error reading value
            console.log( e );
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

    const checkIsFavourite = async ( user: any ) =>
    {
        try
        {
            const res = await axios.get( `${ Base_URL }/favourite?accountId=` + user.id + `&item.id=` + item.id, )
            const data = res.data
            console.log( data );
            if ( data.length > 0 )
            {
                setFavoriteId( data[ 0 ].id )
                setIsFavorite( true )
            } else
            {
                setIsFavorite( false )
            }
        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }
    }

    const callPostFavourite = async () =>
    {
        try
        {
            const res = await axios.post( `${ Base_URL }/favourite`, { item, accountId: loginInfo.id } )
            console.log( 'Res', res.data );
            const data = res.data
            setFavoriteId( data.id )
            setIsFavorite( true )
        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }
    }
    const callDeleteFavourite = async () =>
    {
        try
        {
            const res = await axios.delete( `${ Base_URL }/favourite/${ favoriteId }`, )
            console.log( 'Res', res.data );
            setIsFavorite( false )
        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }
    }
    const addToCart = async () =>
    {
        Toast.show( {
            type: "success",//error,infor
            text1: "ADDED TO CART",
            text2: "Please See More In Cart",
            autoHide: true,
            visibilityTime: 2000,
            position: "top",
            topOffset: 180,

        } )
        try
        {
            const res = await axios.post( `${ Base_URL }/cart`, { item, accountId: loginInfo.id } )
            // console.log( 'Res', res.data );

        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={ false }>

            <View style={ { backgroundColor: '#40E0D0' } }>

                <View style={ styles.header }>
                    <Icon style={ { color: 'white' } } onPress={ () => navigation.goBack() } name="arrow-back-ios" color="#c6c6c6" size={ 27 } />
                    <Text style={ { fontSize: 20, fontWeight: 'bold', color: 'white' } }>Details</Text>
                </View>

                <View style={ {
                    justifyContent: 'center', alignItems: 'center', zIndex: 1

                } }>

                    <Image source={ { uri: item.image } } style={ { height: 230, width: 230, top: 15, position: 'absolute' } } />
                    <Toast />
                </View>

                <ScrollView showsVerticalScrollIndicator={ false } style={ { backgroundColor: 'white', borderTopLeftRadius: 40, borderWidth: 1, borderColor: 'white', borderTopRightRadius: 40, marginTop: 150, height: 480 } }>
                    <TouchableOpacity style={ { left: 320, top: 30 } } onPress={ () =>
                        isFavorite ? callDeleteFavourite() : callPostFavourite()
                    }>
                        <Icons style={ { color: '#FF1493' } } name={ isFavorite ? "heart" : "hearto" } color="#c6c6c6" size={ 40 } />
                    </TouchableOpacity>

                    <View style={ { marginTop: '30%', marginHorizontal: 20 } }>

                        <View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
                            <Text style={ { fontSize: 30, color: 'black', fontWeight: 'bold' } }>{ item.name }</Text>
                            <Text style={ { fontSize: 30, color: '#D2122E', fontWeight: 'bold' } }>{ item.price }$</Text>
                        </View>

                        <Text style={ { fontSize: 20, color: 'gray', paddingTop: 40, lineHeight: 30, } }>{ item.description }</Text>
                    </View>
                    <View style={ {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 20,
                        marginTop: 70
                    } }>
                        <View style={ { flexDirection: 'row', justifyContent: 'space-around', width: '20%' } }>
                            <Icons style={ { color: 'yellow' } } name="star" color="#c6c6c6" size={ 27 } />
                            <Text style={ { color: 'black', fontSize: 18, fontWeight: 'bold', alignSelf: 'center' } }>4.9</Text>
                        </View>
                        <View style={ { flexDirection: 'row', justifyContent: 'space-around', width: '33%', } }>
                            <Iconss style={ { color: 'red' } } name="fire" color="#c6c6c6" size={ 27 } />
                            <Text style={ { color: 'black', fontSize: 18, fontWeight: 'bold', alignSelf: 'center' } }>1000 Kcal</Text>
                        </View>
                        <View style={ { flexDirection: 'row', justifyContent: 'space-around', width: '20%' } }>
                            <Iconss style={ { color: 'red' } } name="clock" color="#c6c6c6" size={ 27 } />
                            <Text style={ { color: 'black', fontSize: 18, fontWeight: 'bold', alignSelf: 'center' } }>1h</Text>
                        </View>

                    </View>

                </ScrollView>


            </View>

            <View style={ styles.footer }>
                <TouchableOpacity style={ { backgroundColor: '#40E0D0', paddingVertical: 15, borderRadius: 15, marginHorizontal: 25, } }
                    onPress={ () =>
                    {
                        addToCart()
                        // showToast
                        // SheetManager.show( 'addToCart' );
                    } }
                >
                    <Text style={ {
                        alignItems: 'center',
                        alignSelf: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white'
                    } }>Add To Cart</Text>

                </TouchableOpacity>

            </View>
        </ScrollView>


    )
}
const styles = StyleSheet.create( {
    header: {

        flexDirection: 'row',
        alignItems: 'center',


        paddingHorizontal: 15,

        paddingVertical: 20
    },
    vTopping: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10
    },
    vlTopping: {
        paddingLeft: 10,
        paddingBottom: 10
    },
    btnTopping: {
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        alignSelf: 'center',
        height: 37,
        paddingVertical: 7,
        paddingHorizontal: 13
    },
    textTopping: {
        fontSize: 15,
        color: 'gray'
    },
    textSize: {
        fontSize: 15,
        color: 'black'
    },
    footer: {
        backgroundColor: 'white'
    }
} )
export default Detail;