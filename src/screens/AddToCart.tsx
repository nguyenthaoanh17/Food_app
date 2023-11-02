import React, { useRef, useState } from 'react';
import
{
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ActionSheet, {
    ActionSheetRef,
    SheetProps,
} from 'react-native-actions-sheet';
import Icons from 'react-native-vector-icons/Entypo';

function ExampleTwo ( { sheetId, payload }: SheetProps<{ data: string }> )
{
    const actionSheetRef = useRef<ActionSheetRef>( null );
    const [ count, setCount ] = useState( 0 );
    const topping = [

        {
            "name": "Cheese",
        },
        {
            "name": "Cucumber",
        },
        {
            "name": "Sausage",
        },
        {
            "name": "Seafood",
        },
        {
            "name": "Beef",
        },
        {
            "name": "Chicken",
        },
    ];
    return (
        <ActionSheet
            id={ sheetId }
            ref={ actionSheetRef }
            containerStyle={ {
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25
            } }
            indicatorStyle={ {
                width: 100
            } }
            gestureEnabled={ true }>
            <View
                style={ {
                    padding: 20,
                    height: 440,

                    width: '100%'
                } }>
                {/* <View style={ {
                    width: 50,
                    height: 50,
                    backgroundColor: '#f7f7f7',
                    borderRadius: 100,
                    marginRight: 10
                } } /> */}

                {/* <View style={ { flexGrow: 1 } }>
                    <View style={ { width: "100%", height: 20, backgroundColor: "#f7f7f7", borderRadius: 10, marginBottom: 10 } } />
                    <Text>Hi</Text>
                    <View style={ { width: "80%", height: 20, backgroundColor: "#f7f7f7", borderRadius: 10 } } />
                </View> */}


                <View style={ {
                    marginTop: 20,
                    width: '100%',
                    height: 90,
                    borderBottomWidth: 2,
                    borderBottomColor: '#f5f5f5',

                } }>
                    <Text style={ { fontSize: 20, color: '#40E0D0', marginLeft: 10 } }>Size</Text>
                    <View style={ styles.vTopping }>
                        <View style={ styles.vlTopping }  >
                            <TouchableOpacity style={ styles.btnTopping }>
                                <Text style={ styles.textSize }  >M</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={ styles.vlTopping }  >
                            <TouchableOpacity style={ styles.btnTopping }>
                                <Text style={ styles.textSize }  >L</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={ {
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-between',
                    borderBottomWidth: 2,
                    borderBottomColor: '#f5f5f5',
                    height: 50
                } }>
                    <Text style={ { color: '#40E0D0', fontSize: 20, marginLeft: 10 } }>Số Lượng</Text>

                    <View style={ {
                        width: 100,
                        height: 36,
                        backgroundColor: '#40E0D0',

                        paddingHorizontal: 3,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignContent: 'center'
                    } }>
                        <Icons onPress={ () => setCount( count == 0 ? count : count - 1 ) } style={ { color: 'white', alignSelf: 'center' } } name="minus" color="#c6c6c6" size={ 25 } />
                        <Text style={ { color: 'white', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', alignItems: 'center' } }>{ count }</Text>
                        <Icons onPress={ () => setCount( count == 3 ? count : count + 1 ) } style={ { color: 'white', alignSelf: 'center' } } name="plus" color="#c6c6c6" size={ 25 } />
                    </View>

                </View>
                <View style={ { marginTop: 20 } }>
                    <Text style={ { fontSize: 20, color: '#40E0D0', marginLeft: 10 } }>Topping</Text>
                    <View style={ styles.vTopping }>


                        {
                            topping.map( ( item: any, index: any ) =>
                            {
                                return (
                                    <View style={ styles.vlTopping } key={ index } >
                                        <TouchableOpacity style={ styles.btnTopping }>
                                            <Text style={ styles.textTopping }  >{ item.name }</Text>
                                        </TouchableOpacity>
                                    </View>
                                )

                            } )
                        }

                    </View>
                </View>
                <View style={ { backgroundColor: 'white', marginTop: 20 } }>
                    <TouchableOpacity style={ { backgroundColor: '#40E0D0', paddingVertical: 15, } }
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
            </View>
        </ActionSheet>
    );
}
const styles = StyleSheet.create( {

    vTopping: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 10,

    },
    vlTopping: {
        paddingLeft: 10,
        paddingBottom: 10
    },
    btnTopping: {
        backgroundColor: '#f5f5f5',

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
} )

export default ExampleTwo;
