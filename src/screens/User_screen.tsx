import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/AntDesign';
import Iconsss from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconssss from 'react-native-vector-icons/MaterialIcons';
import Iconsssss from 'react-native-vector-icons/Octicons';
import Iconssssss from 'react-native-vector-icons/Feather';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const User_screen = ( { navigation }: any ) =>
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
            <ScrollView showsVerticalScrollIndicator={ false }>


                <View style={ {
                    paddingTop: 30,
                    backgroundColor: 'white',
                    paddingBottom: 20
                } }>
                    <TouchableOpacity onPress={ () => navigation.navigate( 'User_detail' ) } style={ styles.vIn4 }>

                        <Image source={ { uri: loginInfo.profile } } style={ styles.vImage } />
                        <View style={ { right: 20, alignSelf: 'center', } }>

                            <Text style={ { fontWeight: 'bold', color: 'gray', fontSize: 18 } }>{ loginInfo.name }</Text>
                            <TouchableOpacity style={ {
                                backgroundColor: '#F0F0F0',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                borderRadius: 10,
                                paddingHorizontal: 3
                            } }>
                                <Text style={ { color: 'gray', alignSelf: 'center' } }>Thành viên bạc</Text>
                                <Icon style={ { alignSelf: 'center' } } name="chevron-right" color="#708090" size={ 18 } />
                            </TouchableOpacity>

                        </View>
                        <Icon style={ { paddingLeft: 60, alignSelf: 'center' } } name="chevron-right" color="#c6c6c6" size={ 25 } />
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
                            <Icons style={ { alignSelf: 'center' } } name="phone-portrait-outline" color="#32de84" size={ 25 } />
                            <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, right: 15 } }>Đơn Nạp thẻ và Dịch vụ</Text>
                            <Icon style={ { paddingLeft: 60, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                        </View>
                    </View>
                    <View style={ {
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#D8D8D8',
                        marginLeft: 20
                    } }>
                        <TouchableOpacity style={ {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 10,


                        } }
                            onPress={ () => navigation.navigate( 'Order' ) }
                        >

                            <Icons style={ { alignSelf: 'center' } } name="clipboard-outline" color="blue" size={ 25 } />
                            <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 10 } }>Đơn Mua</Text>
                            <Text style={ { color: 'gray', alignSelf: 'center', fontSize: 15, left: 70 } }>Xem lịch sử mua hàng</Text>
                            <Icon style={ { paddingLeft: 60, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                        </TouchableOpacity>
                    </View>
                    <View style={ { flexDirection: 'row', paddingVertical: 20, marginHorizontal: 15, justifyContent: 'space-around' } }>
                        <TouchableOpacity >
                            <Iconss style={ { alignSelf: 'center' } } name="inbox" color="gray" size={ 40 } />
                            <Text style={ { color: 'black', alignSelf: 'center', fontSize: 13, paddingTop: 10 } }>Chờ lấy hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Iconsss style={ { alignSelf: 'center' } } name="truck-outline" color="gray" size={ 40 } />
                            <Text style={ { color: 'black', alignSelf: 'center', fontSize: 13, paddingTop: 10 } }>Đang giao hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Iconsss style={ { alignSelf: 'center' } } name="star-circle-outline" color="gray" size={ 40 } />
                            <Text style={ { color: 'black', alignSelf: 'center', fontSize: 13, paddingTop: 10 } }>Đánh giá</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ { backgroundColor: 'white', marginTop: 10 } }>

                    <View style={ { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#D8D8D8', marginLeft: 20 } }>
                        <Iconss style={ { alignSelf: 'center' } } name="wallet" color="#FF6347" size={ 25 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 20 } }>Tiện ích của tôi</Text>
                    </View>
                    <View style={ {
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#D8D8D8',
                        marginLeft: 20
                    } }>
                        <View style={ { flexDirection: 'row', paddingVertical: 20, justifyContent: 'space-between', marginRight: 15 } }>
                            <TouchableOpacity >
                                <Icons style={ { alignSelf: 'center' } } name="wallet-outline" color="#FF6347" size={ 40 } />
                                <Text style={ { color: 'black', alignSelf: 'center', fontSize: 13, paddingTop: 10 } }>Ví FoodPay</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Iconsss style={ { alignSelf: 'center' } } name="alpha-c-circle-outline" color="orange" size={ 40 } />
                                <Text style={ { color: 'black', alignSelf: 'center', fontSize: 13, paddingTop: 10 } }>Food Xu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Iconssss style={ { alignSelf: 'center' } } name="wallet-membership" color="#FF6347" size={ 40 } />
                                <Text style={ { color: 'black', alignSelf: 'center', fontSize: 13, paddingTop: 10 } }>SPayLater</Text>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Iconsss style={ { alignSelf: 'center' } } name="ticket-confirmation-outline" color="#FF6347" size={ 40 } />
                                <Text style={ { color: 'black', alignSelf: 'center', fontSize: 13, paddingTop: 10 } }>Kho Voucher</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={ {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        marginLeft: 20

                    } }>
                        <Iconsssss style={ { alignSelf: 'center' } } name="shield-check" color="#FF6347" size={ 25 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 20 } }>Bảo hiểm của tôi</Text>
                        <Text style={ { color: '#FF6347', alignSelf: 'center', fontSize: 15, left: 60 } }>Khám phá ngay!</Text>
                        <Icon style={ { paddingLeft: 60, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>


                </View>
                <View style={ { backgroundColor: 'white', marginTop: 10 } }>

                    <View style={ { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#D8D8D8', marginLeft: 20, justifyContent: 'space-between' } }>
                        <Iconssss style={ { alignSelf: 'center' } } name="wallet-membership" color="#FF6347" size={ 28 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, left: 20 } }>Khách hàng thân thiết</Text>
                        <Text style={ { color: 'gray', alignSelf: 'center', fontSize: 15, left: 35 } }>Thành viên Bạc</Text>
                        <Icon style={ { paddingLeft: 30, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                    <View style={ { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#D8D8D8', marginLeft: 20, justifyContent: 'space-between' } }>
                        <Iconssssss style={ { alignSelf: 'center' } } name="tv" color="#FF6347" size={ 28 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, right: 80 } }>App Live</Text>
                        <Icon style={ { paddingLeft: 40, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                    <View style={ { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#D8D8D8', marginLeft: 20, justifyContent: 'space-between' } }>
                        <Iconss style={ { alignSelf: 'center' } } name="hearto" color="#FF6347" size={ 28 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, right: 80 } }>Đã Thích</Text>
                        <Icon style={ { paddingLeft: 40, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                    <View style={ { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#D8D8D8', marginLeft: 20, justifyContent: 'space-between' } }>
                        <Iconssss style={ { alignSelf: 'center' } } name="storefront" color="#FF6347" size={ 28 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, right: 35 } }>Shop Đang Theo Dõi</Text>
                        <Icon style={ { paddingLeft: 40, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                    <View style={ { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#D8D8D8', marginLeft: 20, justifyContent: 'space-between' } }>
                        <Iconsssss style={ { alignSelf: 'center' } } name="star" color="#FF6347" size={ 28 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, right: 48 } }>Đánh Giá Của Tôi</Text>
                        <Icon style={ { paddingLeft: 40, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                </View>
                <View style={ { backgroundColor: 'white', marginTop: 10, marginBottom: 20 } }>

                    <View style={ { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#D8D8D8', marginLeft: 20, justifyContent: 'space-between' } }>
                        <Iconss style={ { alignSelf: 'center' } } name="user" color="blue" size={ 28 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, right: 50 } }>Thiết lập tài khoản</Text>
                        <Icon style={ { paddingLeft: 30, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                    <View style={ { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#D8D8D8', marginLeft: 20, justifyContent: 'space-between' } }>
                        <Iconss style={ { alignSelf: 'center' } } name="questioncircleo" color="#32de84" size={ 28 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, right: 50 } }>Trung tâm trợ giúp</Text>
                        <Icon style={ { paddingLeft: 30, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>
                    <View style={ { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#D8D8D8', marginLeft: 20, justifyContent: 'space-between' } }>
                        <Iconssss style={ { alignSelf: 'center' } } name="support-agent" color="#FF6347" size={ 28 } />
                        <Text style={ { color: 'black', alignSelf: 'center', fontSize: 18, right: 50 } }>Trò chuyện với App</Text>
                        <Icon style={ { paddingLeft: 30, alignSelf: 'center' } } name="chevron-small-right" color="#c6c6c6" size={ 30 } />
                    </View>


                </View>
            </ScrollView>


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
        width: 70,
        height: 70,
        borderRadius: 50,
    }
} )
export default User_screen;