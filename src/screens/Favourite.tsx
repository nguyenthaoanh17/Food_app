import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Feather';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Base_URL } from "../config";


const Favourite = ( { route, navigation }: any ) =>
{
    // const listPro = [
    //     {
    //         "name": "Pepeproni",
    //         "image": require( '../assets/images/pizza1.png' ),
    //         'size': 'M',
    //         'price': '23$'
    //     },
    //     {
    //         "name": "Pepeproni",
    //         "image": require( '../assets/images/pizza2.png' ),
    //         'size': 'L',
    //         'price': '23$'
    //     },
    //     {
    //         "name": "Pepeproni",
    //         "image": require( '../assets/images/pizza3.png' ),
    //         'size': 'M',
    //         'price': '23$'
    //     }


    // ];
    const [ listPro, setListPro ] = useState<any>( [] );

    const [ loginInfo, setloginInfo ] = useState<any>( {} )
    const getLoginInfo = async () =>
    {
        try
        {
            const value = await AsyncStorage.getItem( 'loginInfo' )
            if ( value !== null )
            {
                getListFavourite( JSON.parse( value ) );
                // lấy được dữ liệu
                setloginInfo( JSON.parse( value ) );

            }
        } catch ( e )
        {
            // error reading value
            console.log( e );
        }
    }
    const getListFavourite = async ( user: any ) =>
    {
        try
        {
            const res = await axios.get( `${ Base_URL }/favourite?accountId=` + user.id, )
            const data = res.data
            console.log( data );
            setListPro( data )
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
    return (
        <>
            <View style={ { backgroundColor: '#40E0D0' } }>
                <View style={ styles.header }>
                    <Icon style={ { color: 'white' } } onPress={ () => navigation.goBack() } name="arrow-back-ios" color="#c6c6c6" size={ 27 } />
                    <Text style={ { fontSize: 23, fontWeight: 'bold', color: 'white' } }>Favourite</Text>
                    <Icons style={ { color: 'white' } } name="x" color="#c6c6c6" size={ 29 } />
                </View>
                <View style={ {
                    backgroundColor: '#f8f8ff',
                    borderTopLeftRadius: 40,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderTopRightRadius: 40,
                    height: 620
                } }>
                    <ScrollView showsVerticalScrollIndicator={ false }>
                        <View style={ { paddingTop: 20 } }>
                            {
                                listPro.map( ( item: any, index: any ) =>
                                {
                                    return (

                                        <TouchableOpacity onPress={ () => navigation.navigate( 'Detail', { item: item.item } ) } style={ styles.listCart }>
                                            <Image source={ { uri: item.item.image } } style={ { height: 80, width: 80, left: 15 } } />
                                            <View style={ { height: 100, marginLeft: 30, paddingVertical: 20, flex: 1, justifyContent: 'space-between', alignSelf: 'center' } } >
                                                <Text style={ { fontSize: 20, color: 'black', fontWeight: 'bold' } }>{ item.item.name }</Text>

                                                <Text style={ { fontSize: 18, color: 'red', fontWeight: 'bold' } }>{ item.item.price }$</Text>
                                            </View>



                                            { ( () =>
                                            {
                                                if ( ( item.item.categoryId ) == 1 )
                                                {
                                                    return (
                                                        <Text style={ { fontSize: 18, color: 'gray', fontWeight: 'bold', right: 15 } }>Pizza</Text>
                                                    )
                                                } else if ( ( item.item.categoryId ) == 2 )
                                                {
                                                    return (
                                                        <Text style={ { fontSize: 18, color: 'gray', fontWeight: 'bold', right: 15 } }>Dessert</Text>
                                                    )
                                                } else if ( ( item.item.categoryId ) == 3 )
                                                {
                                                    return (
                                                        <Text style={ { fontSize: 18, color: 'gray', fontWeight: 'bold', right: 15 } }>Salad</Text>
                                                    )
                                                } else if ( ( item.item.categoryId ) == 4 )
                                                {
                                                    return (
                                                        <Text style={ { fontSize: 18, color: 'gray', fontWeight: 'bold', right: 15 } }>Drink</Text>
                                                    )
                                                }



                                                return null;
                                            } )() }



                                        </TouchableOpacity>

                                    )
                                } )
                            }

                        </View>
                    </ScrollView>

                </View>
            </View>


        </>
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
        backgroundColor: '#f0f8ff'
    },

} )
export default Favourite;