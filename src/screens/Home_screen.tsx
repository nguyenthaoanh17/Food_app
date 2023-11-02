import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Ionicons';
import { SheetManager } from 'react-native-actions-sheet';
import axios from 'axios';
import { Base_URL } from '../config'
const Home_screen = ( { navigation }: any ) =>
{


    const [ actionCate, setActionCate ] = useState<string>( "Cate0" );
    const [ actionPro, setActionPro ] = useState<any>( [] );
    const [ cate, setCate ] = useState<any>( [] );

    useEffect( () =>
    {
        callGetCategories();
        callGetProducts( 0, 1 )

    }, [] );

    const callGetCategories = async () =>
    {
        try
        {
            const res = await axios.get( `${ Base_URL }/categories` )
            // console.log( 'Res', res.data );
            const data = res.data;

            setCate( data )

        } catch ( error )
        {
            // setCate( JSON.stringify( error ) )
            console.log( JSON.stringify( error ) )
        }

    }

    const callGetProducts = async ( index: any, cateId: any ) =>
    {
        setActionCate( "Cate" + index )
        try
        {
            const res = await axios.get( `${ Base_URL }/products` )
            const data = res.data;
            const arrNew: any = [];
            data.forEach( ( element: any ) =>
            {

                if ( element.categoryId == cateId )
                {
                    arrNew.push( element )
                }
            } );
            setActionPro( arrNew )
        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }
    }

    // const listCate = [
    //     {

    //         name: "Pizza",
    //         image: require( '../assets/images/pizza2.png' ),

    //     },
    //     {

    //         name: "Dessert",
    //         image: require( '../assets/images/Matchaaa.png' ),
    //     },
    //     {

    //         name: "Salad",
    //         image: require( '../assets/images/salat.png' ),
    //     },
    //     {

    //         name: "Drink",
    //         image: require( '../assets/images/drink.png' ),
    //     },
    //     {

    //         name: "Drink",
    //         image: require( '../assets/images/drink.png' ),
    //     },

    // ];
    // const listPro = [
    //     {
    //         "name": "Cucumber Pizza",
    //         "image": require( '../assets/images/pizza1.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',

    //     },
    //     {
    //         "name": "Cheese Pizza",
    //         "image": require( '../assets/images/pizza2.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Seafood Pizza",
    //         "image": require( '../assets/images/pizza3.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Vegetable Pizza",
    //         "image": require( '../assets/images/pizza4.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Beef Pizza",
    //         "image": require( '../assets/images/pizza5.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Shrimp Pizza",
    //         "image": require( '../assets/images/pizza6.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Meat And Sausage Pizza",
    //         "image": require( '../assets/images/pizza7.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Cucumber Pizza",
    //         "image": require( '../assets/images/pizza8.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },

    // ];
    // const listDessert = [
    //     {
    //         "name": "Tiramitsu",
    //         "image": require( '../assets/images/Tiramisu.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',

    //     },
    //     {
    //         "name": "Matcha Cake",
    //         "image": require( '../assets/images/Matcha2.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Macaron",
    //         "image": require( '../assets/images/macaron2.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Flan Cake",
    //         "image": require( '../assets/images/flan.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Królewski",
    //         "image": require( '../assets/images/Królewski.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Strawberry Cake",
    //         "image": require( '../assets/images/Strawberrycake.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Orange Roll",
    //         "image": require( '../assets/images/Orangeroll.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },
    //     {
    //         "name": "Mango Cake",
    //         "image": require( '../assets/images/mango.png' ),
    //         'price': '23$',
    //         description: 'Thanh Nhẹ Với Ô Liu Đen Tuyệt Hảo, Cà Chua Bi Tươi Ngon, Nấm, Thơm, Bắp, Hành Tây Và Phô Mai Mozzarella Cho Bạn Bữa Tiệc Rau Củ Tròn Vị',
    //     },

    // ];
    // useEffect( () =>
    // {

    //     if ( actionCate == 'Cate0' )
    //     {
    //         setActionPro( listPro )
    //     } else if ( actionCate == 'Cate1' )
    //     {
    //         setActionPro( listDessert )
    //     } else
    //     {
    //         setActionPro( listCate )
    //     }
    // }, [ actionCate ] );


    return (
        <>
            <View style={ { backgroundColor: 'white', paddingBottom: 20 } }>
                <View style={ styles.header }>
                    <Image source={ require( '../assets/images/Kellogs.png' ) } style={ styles.logo } />
                    <View style={ styles.headerRight }>
                        <Text style={ styles.tHeaderRight }>Delivery</Text>
                        <Icon style={ styles.iHeaderRight } name="caretdown" color="#c6c6c6" size={ 13 } />
                    </View>
                </View>
                <View style={ { paddingHorizontal: 15, paddingTop: 15 } }>
                    <View style={ { flexDirection: 'row', justifyContent: 'space-between' } } >
                        <Text style={ styles.title }>What Food Do U Want?</Text>
                        <Icons style={ { backgroundColor: '#40E0D0', borderRadius: 20, borderWidth: 0.5, borderColor: '#FFFACD', alignItems: 'center', padding: 10 } } name="bag-outline" color="white" size={ 25 } />
                    </View>

                </View>
            </View>
            <View style={ {} }>
                <ScrollView horizontal showsHorizontalScrollIndicator={ false } >
                    <View style={ { flexDirection: 'row', justifyContent: 'space-evenly', borderTopLeftRadius: 40, borderBottomRightRadius: 20, borderTopRightRadius: 40, borderBottomLeftRadius: 20 } }>
                        {
                            cate.map( ( item: any, index: any ) =>
                            {

                                return (


                                    <TouchableOpacity key={ item.id } onPress={ () => { callGetProducts( index, item.id ); } } style={ [ actionCate == "Cate" + index ? styles.actionCate : styles.unActionCate, { width: 100, alignItems: 'center', paddingVertical: 10, borderRadius: 7 } ] }>
                                        <Image source={ { uri: item.image } } style={ { width: 64, height: 64, } } />
                                        <Text style={ [ actionCate == "Cate" + index ? { color: 'white' } : { color: 'black' }, { fontSize: 15, fontWeight: 'bold', paddingTop: 10 } ] }>{ item.name }</Text>
                                    </TouchableOpacity>


                                )
                            } )
                        }
                    </View>
                </ScrollView >
            </View>

            <ScrollView showsVerticalScrollIndicator={ false }>
                <View style={ { flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', paddingTop: 20, paddingLeft: 15 } }>
                    {
                        actionPro.map( ( item: any, index: any ) =>
                        {
                            return (

                                <TouchableOpacity key={ item.id } onPress={ () => navigation.navigate( 'Detail', { item: item } ) } style={ { width: 173, height: 200, paddingTop: 10, backgroundColor: '#f0f8ff', borderRadius: 20, marginRight: 15, marginBottom: 20 } }>
                                    <Image source={ { uri: item.image } } style={ { width: 123, height: 123, alignSelf: 'center' } } />
                                    <Text numberOfLines={ 1 } style={ { color: 'black', fontSize: 15, fontWeight: 'bold', paddingTop: 10, paddingLeft: 10, width: 119 } }>{ item.name }</Text>
                                    <Text style={ { color: 'red', fontSize: 15, fontWeight: 'bold', paddingLeft: 10 } }>{ item.price } $</Text>
                                    <TouchableOpacity style={ { width: 37, bottom: 50, left: 145, height: 34 } }
                                        onPress={ () =>
                                        {
                                            SheetManager.show( 'addToCart' );
                                        } }
                                    >
                                        <Icon style={ { backgroundColor: '#40E0D0', borderRadius: 20, borderWidth: 0.5, borderColor: '#FFFACD', alignSelf: 'center', padding: 7, position: 'absolute', top: 10, right: 15 } } name="plus" color="white" size={ 20 } />
                                    </TouchableOpacity>
                                </TouchableOpacity>

                            )
                        } )
                    }







                    {/* <View style={ { paddingLeft: 15, } }>
                        <TouchableOpacity style={ { width: 172, paddingVertical: 10, backgroundColor: 'pink', borderRadius: 20 } }>
                            <Image source={ require( '../assets/images/pizza1.png' ) } style={ { width: 123, height: 123, alignSelf: 'center' } } />
                            <Text style={ { color: 'black', fontSize: 15, fontWeight: 'bold', paddingTop: 10 } }>Papperoni</Text>
                            <Text style={ { color: 'red', fontSize: 15, fontWeight: 'bold', paddingTop: 10 } }>23$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ { width: 50, bottom: 50, left: 120 } }>
                            <Icons style={ { backgroundColor: '#40E0D0', borderRadius: 20, borderWidth: 0.5, borderColor: '#FFFACD', alignSelf: 'center', padding: 10, } } name="bag-outline" color="white" size={ 25 } />
                        </TouchableOpacity>

                    </View> */}
                </View>

            </ScrollView>


        </>
    )
}
const styles = StyleSheet.create( {
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingLeft: 15
    },
    logo: {
        width: 215,
        height: 80,

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
    actionCate: {
        backgroundColor: '#40E0D0'
    },
    unActionCate: {
        backgroundColor: 'white'
    }
} )
export default Home_screen;