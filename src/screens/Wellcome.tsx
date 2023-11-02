import { useEffect, useRef, useState } from "react";
import { FlatList, Image, View, Dimensions, Text, TouchableOpacity } from "react-native";


const Wellcome = ( { navigation }: any ) =>
{
    const screenWidth = Dimensions.get( "window" ).width;

    const flatlistRef = useRef<any>();
    const [ activeIndex, setActiveIndex ] = useState<any>( 0 );
    const listBanner = [
        {
            "id": 0,
            "image": require( '../assets/images/banner1.jpg' )
        },
        {
            "id": 1,
            "image": require( '../assets/images/banner2.jpg' )
        },
        {
            "id": 2,
            "image": require( '../assets/images/banner3.jpg' )
        },
        {
            "id": 3,
            "image": require( '../assets/images/banner4e.jpg' )
        }
    ]
    const Banner = ( { item, index }: any ) =>
    {
        return (
            <View key={ index }>
                <Image source={ item.image } style={ { height: 400, width: 393 } } />
            </View>
        )
    }
    const renderDotIndicators = () =>
    {
        return listBanner.map( ( dot, index: any ) =>
        {



            if ( activeIndex === index )
            {
                return (
                    <View key={ index } style={ {
                        backgroundColor: "#0093AF",
                        height: 10,
                        width: 20,
                        borderRadius: 5,
                        marginHorizontal: 6
                    } }>

                    </View>
                )
            }
            return (
                <View key={ index } style={ {
                    backgroundColor: "#4FFFB0",
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    marginHorizontal: 6
                } }>

                </View>
            )
        } )
    }
    const handleScroll = ( event: any ) =>
    {
        //get scroll position
        const scrollPosition = ( event.nativeEvent.contentOffset.x ).toFixed()

        //get the index of current active item



        const index = Math.ceil( scrollPosition / Math.ceil( screenWidth ) )
        // console.log( "hi", index );
        // console.log( "h", scrollPosition );
        // console.log( "h", Math.ceil( screenWidth ) );
        //index =1
        //screenWidth=393 +393
        //scrollPosition=786
        //update the index
        setActiveIndex( index )
    }
    //Auto Scroll
    useEffect( () =>
    {

        let interval = setInterval( () =>
        {
            if ( activeIndex === listBanner.length - 1 )
            {
                flatlistRef.current.scrollToIndex( {

                    index: 0,
                    animation: true,
                } );
            } else
            {
                flatlistRef.current.scrollToIndex( {

                    index: activeIndex + 1,
                    animation: true,

                } );


            }
        }, 2000 );
        return () => clearInterval( interval )
    }, [ activeIndex ] );
    const getItemLayout = ( data: any, index: any ) => (
        {
            length: Math.ceil( screenWidth ),
            offset: Math.ceil( screenWidth ) * index,
            index: index
        }


    )

    return (
        <>
            <View style={ {} }>
                <FlatList
                    showsVerticalScrollIndicator={ false }
                    horizontal={ true }
                    data={ listBanner }
                    renderItem={ Banner }
                    pagingEnabled={ true }
                    showsHorizontalScrollIndicator={ false }
                    onScroll={ handleScroll }
                    keyExtractor={ ( item: any ) => item.id }
                    ref={ flatlistRef }
                    getItemLayout={ getItemLayout }
                />
                <View style={ {
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingTop: 20
                } }>
                    { renderDotIndicators() }
                </View>
                <View style={ { marginTop: 60, alignSelf: "center", alignItems: "center" } }>
                    <Text style={ { fontSize: 25, color: "#0093AF", fontWeight: "bold" } }>DELICIOUS FOOD</Text>
                    <Text style={ { fontSize: 18, color: "#0093AF", width: 300, alignItems: "center", textAlign: "center", marginTop: 10 } }>We help you to find best and delicious food</Text>
                </View>
                <TouchableOpacity onPress={ () => navigation.navigate( 'Signin' ) } style={ { backgroundColor: "#40E0D0", paddingVertical: 20, marginTop: 35, borderRadius: 30, marginHorizontal: 30 } }>
                    <Text style={ { color: "white", fontSize: 20, alignSelf: "center", fontWeight: "bold" } }>Get Started</Text>
                </TouchableOpacity>


            </View>
        </>
    )
}
export default Wellcome;