import { useState } from "react";
import { FlatList, Image, ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { Base_URL } from "../config";
const Search_creen = ( { navigation }: any ) =>
{
    const [ showCancel, setShowCancel ] = useState( false );
    const [ showDelete, setShowDelete ] = useState( false );
    const [ value, onChangeText ] = useState( '' );
    const [ isSubmit, setIsSubmit ] = useState<boolean>( false );
    const [ data, setData ] = useState<any>( [] );
    const handleCancel = () =>
    {
        setShowCancel( false ),
            Keyboard.dismiss()

    }
    const searchPro = async () =>
    {
        setIsSubmit( true )
        try
        {
            const res = await axios.get( `${ Base_URL }/products?q=` + value )
            const data = res.data;


            setData( data )
        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }
    }


    const renderItem = ( { item, index }: { item: any, index: any } ) =>
    {
        return (
            // <View key={ index } style={ { paddingHorizontal: 20, } }>
            //     <TouchableOpacity onPress={ () => navigation.navigate( 'Detail', { item: item } ) } style={ { borderBottomColor: 'gray', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 20, } }>
            //         <View style={ { flexDirection: 'column' } }>
            //             <Text numberOfLines={ 2 } style={ { color: '#00BFFF', fontSize: 18, paddingBottom: 20, width: 220 } }>{ item.name }</Text>
            //             <View style={ { flexDirection: 'row' } }>
            //                 <Text>{ item.author }</Text>
            //             </View>
            //             <View style={ { flexDirection: 'row', paddingTop: 5 } }>
            //                 <Text>89 Chương</Text>
            //                 <Text>  { ( () =>
            //                 {
            //                     if ( ( item.status ) == false )
            //                     {
            //                         return (
            //                             <Text style={ {} }>Đang ra</Text>
            //                         )
            //                     } else
            //                     {
            //                         return (
            //                             <Text style={ { color: '#32CD32', fontWeight: 'bold' } }>[Full]</Text>
            //                         )
            //                     }

            //                     return null;
            //                 } )() }</Text>
            //             </View>

            //         </View>
            //         <View>
            //             <Image source={ { uri: item.image } } style={ styles.vImage } />
            //         </View>
            //     </TouchableOpacity>

            // </View>

            <View style={ { paddingHorizontal: 20, } }>
                <TouchableOpacity onPress={ () => navigation.navigate( 'Detail', { item: item } ) } style={ { borderBottomColor: 'gray', borderBottomWidth: 0.5, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20, backgroundColor: 'white' } }>
                    <View style={ { flexDirection: 'column', alignSelf: 'center' } }>
                        <Text numberOfLines={ 2 } style={ { color: '#00BFFF', fontSize: 20, width: 220 } }>{ item.name }</Text>

                        <View style={ { flexDirection: 'row', paddingTop: 5 } }>
                            <Text style={ { color: 'red', fontSize: 18 } }>{ item.price }$</Text>
                        </View>
                        <Text numberOfLines={ 2 } style={ { color: 'gray', fontSize: 17, width: 200, paddingTop: 5 } }>{ item.description }</Text>
                    </View>
                    <View>
                        <Image source={ { uri: item.image } } style={ styles.vImage } />
                    </View>
                </TouchableOpacity>

            </View>

        );
    };
    return (
        <>



            <View style={ styles.container }>


                <View style={ styles.header }>
                    <Image source={ require( '../assets/images/Kellogs.png' ) } style={ styles.logo } />
                    <View style={ styles.headerRight }>
                        <Text style={ styles.tHeaderRight }>Delivery</Text>
                        <Icon style={ styles.iHeaderRight } name="caretdown" color="#c6c6c6" size={ 13 } />
                    </View>
                </View>


                <View style={ { paddingHorizontal: 4, flexDirection: "row", alignContent: "center" } }>
                    <View style={ showCancel ? styles.Input1 : styles.Input2 }>
                        <Icon style={ { color: '#40E0D0', bottom: -10, left: 5 } } name="search1" color="gray" size={ 25 } />
                        <TextInput
                            placeholderTextColor={ 'black' }
                            placeholder="Enter the dish name"
                            onChangeText={ text => onChangeText( text ) }
                            value={ value }
                            style={ styles.tInput }
                            onPressOut={ () => setShowCancel( true ) }
                            onKeyPress={ () => setShowDelete( true ) }
                            onSubmitEditing={ searchPro }
                        />
                        {
                            showDelete ?
                                <TouchableOpacity onPress={ () => { setShowDelete( false ), onChangeText( "" ), setIsSubmit( false ), setData( [] ) } }>
                                    <Icon style={ { color: '#A0A0A0', bottom: -12, right: 10 } } name="closecircle" color="gray" size={ 23 } />
                                </TouchableOpacity>
                                : null
                        }
                    </View>

                    {
                        showCancel ?
                            <TouchableOpacity onPress={ () =>
                            { handleCancel() } }>
                                <Text style={ styles.txtCancel }>Cancel</Text>
                            </TouchableOpacity> : null
                    }

                </View>

                {

                    ( data.length == 0 && isSubmit )
                        ?
                        <View>
                            <Image source={ require( '../assets/images/3dfood1.png' ) } style={ { alignSelf: 'center', top: 40, width: '100%' } } />
                        </View>
                        :
                        <FlatList

                            data={ data }
                            renderItem={ renderItem }
                        />
                }

            </View>
        </>
    )
}
const styles = StyleSheet.create( {
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    tTitle: {
        fontSize: 20,
        // paddingHorizontal: 140,
        color: 'black',
        paddingTop: 20,
        fontFamily: 'SFProText-Medium',
        paddingBottom: 10,
        left: 10
    },
    tInput: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        borderRadius: 15,
        color: 'black',
        fontSize: 17,
        marginLeft: 15
    },
    Input1: {
        backgroundColor: '#F0F0F0',
        borderRadius: 15,
        color: 'black',
        flexDirection: 'row',
        fontSize: 17,
        width: "80%"
    },
    Input2: {
        backgroundColor: '#F0F0F0',
        borderRadius: 15,
        color: 'black',
        flexDirection: 'row',
        fontSize: 17,
        width: "100%"
    },
    txtCancel: {
        fontSize: 18,
        color: '#40E0D0',
        left: 10,
        top: 10
    },
    vImage: {
        width: 110,
        height: 110,
        borderRadius: 5,


    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 20
    },
    headerRight: {
        flexDirection: 'row',
        right: 30,
        top: 25
    },
    tHeaderRight: {
        color: '#40E0D0',
        fontSize: 18,
        fontWeight: 'bold'
    },
    iHeaderRight: {
        paddingTop: 7,
        color: '#40E0D0',
        left: 10
    },
    title: {
        color: '#40E0D0',
        fontSize: 18,
        fontWeight: 'bold',
        bottom: -10
    },
    logo: {
        width: 215,
        height: 80,

    },


} )
export default Search_creen;