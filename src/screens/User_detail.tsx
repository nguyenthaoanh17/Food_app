import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Iconsss from 'react-native-vector-icons/SimpleLineIcons';
import Iconssss from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Entypo';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const User_detail = ( { navigation }: any ) =>
{
    const [ loginInfo, setloginInfo ] = useState<any>( {} )
    const getLoginInfo = async () =>
    {
        try
        {
            const value = await AsyncStorage.getItem( 'loginInfo' )
            if ( value !== null )
            {
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
    return (
        <>
            <View style={ styles.container1 }>
                <View >
                    <TouchableOpacity onPress={ () => navigation.goBack() }>
                        <Iconssss style={ {} } name="left" color="orange" size={ 28 } />
                    </TouchableOpacity>
                </View>

                <Text style={ { color: 'black', fontSize: 20, alignSelf: 'center' } }>Profile</Text>



                <TouchableOpacity>
                    <Iconsss style={ { bottom: -5 } } name="share" color="orange" size={ 20 } />
                </TouchableOpacity>

            </View>
            <View style={ {
                paddingTop: 30,
                backgroundColor: 'white',
                paddingBottom: 20
            } }>
                <TouchableOpacity style={ styles.vIn4 }>

                    <Image source={ { uri: loginInfo.profile } } style={ styles.vImage } />
                    {/* <TouchableOpacity style={ { position: 'absolute', marginLeft: 90, bottom: 10, backgroundColor: 'pink', width: '100%' } }>
                        <Text style={ { color: 'white', fontSize: 18, } }>Profile</Text>
                    </TouchableOpacity> */}
                </TouchableOpacity>
            </View>
            <View style={ { marginTop: 10, backgroundColor: 'white' } }>
                <View style={ {
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#D8D8D8',
                    marginLeft: 20
                } }>
                    <View style={ {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 10,


                    } }>

                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 10 } }>Tên</Text>
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 150 } }>{ loginInfo.name }</Text>
                        <Icon style={ { paddingLeft: 60, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                </View>
                <View style={ {
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#D8D8D8',
                    marginLeft: 20
                } }>
                    <View style={ {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 10,


                    } }>


                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 10 } }>Bio</Text>
                        <Text style={ { color: 'gray', alignSelf: 'center', fontSize: 15, left: 140 } }>Thiết lập ngay</Text>
                        <Icon style={ { paddingLeft: 60, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                </View>

            </View>
            <View style={ { marginTop: 10, backgroundColor: 'white' } }>
                <View style={ {
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#D8D8D8',
                    marginLeft: 20
                } }>
                    <View style={ {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 10,


                    } }>

                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 10 } }>Điện thoại</Text>
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 15, left: 120 } }>{ loginInfo.phone }</Text>
                        <Icon style={ { paddingLeft: 60, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                </View>
                <View style={ {
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#D8D8D8',
                    marginLeft: 20
                } }>
                    <View style={ {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 10,


                    } }>


                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 10 } }>Email</Text>
                        <Text style={ { color: 'gray', alignSelf: 'center', fontSize: 15, left: 110 } }>{ loginInfo.email }</Text>
                        <Icon style={ { paddingLeft: 60, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                </View>
                <View style={ {
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#D8D8D8',
                    marginLeft: 20
                } }>
                    <View style={ {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 10,


                    } }>


                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 10 } }>Tài khoản liên kết</Text>

                        <Icon style={ { paddingLeft: 60, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                </View>

            </View>
            <View style={ { marginTop: 10, backgroundColor: 'white' } }>
                <View style={ {
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#D8D8D8',

                } }>
                    <View style={ {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 15,
                        alignSelf: 'center'

                    } }>


                        <Text style={ { color: 'black', alignItems: 'center', fontSize: 20 } }>Đăng Xuất</Text>

                    </View>
                </View>



            </View>
        </>
    )
}
const styles = StyleSheet.create( {
    vIn4: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-around'
    },
    vImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    container1: {
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        paddingTop: 20
    },

} )
export default User_detail;