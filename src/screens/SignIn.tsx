import { useContext, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import { Base_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import auth from '@react-native-firebase/auth';
const SignIn = ( { navigation }: any ) =>
{
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ validEmail, setValidEmail ] = useState( false );
    const [ validPassword, setValidPassword ] = useState( false );
    const [ hidePassword, setHidePassword ] = useState<any>( {} );


    const GetContent = () =>
    {
        return (
            <ActivityIndicator size="large" />
        )
    }
    const HandleEmail = ( e: any ) =>
    {
        let re = /^\S+@\S+\.\S+$/;
        let regex = /[ \w]* @* [ a - z ] *\.* [ \w ]{ 5,} ( \.)* ( com ) * ( @gmail\.com)/g;
        setEmail( e );
        if ( re.test( e ) || regex.test( e ) )
        {
            setValidEmail( false )
        } else
        {
            setValidEmail( true )
        }
    }
    const HandlePassword = ( e: any ) =>
    {

        setPassword( e );
        if ( e.length < 8 )
        {
            setValidPassword( true )
        } else
        {
            setValidPassword( false )
        }
    }

    const HandleLogin = async () =>
    {

        try
        {
            const res = await axios.get( `${ Base_URL }/users?email=` + email )
            // console.log( 'Res', res.data );
            const data = res.data;
            console.log( 'Res', data.length );


            if ( data.length === 0 )
            {
                <ActivityIndicator size="large" />
                Alert.alert( 'Wrong email' );
            } else
            {
                let user = data[ 0 ];
                if ( user.password == password )
                {
                    try
                    {

                        await AsyncStorage.setItem( 'loginInfo', JSON.stringify( user ) );
                        // chuyển màn hình sang màn hình home
                        navigation.navigate( 'Hometab' );


                    } catch ( e )
                    {
                        // saving error
                        console.log( e );
                    }
                } else
                {
                    Alert.alert( 'Wrong password' );
                }
            }

        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }


        // console.log( 'res', { email, password } );




    }
    const SignWithIcon = ( { iconName, onPress, buttonTitle }: any ) =>
    {

        return (
            <TouchableOpacity style={ {
                width: '40%',
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderWidth: 2,
                backgroundColor: '',
                borderColor: 'white',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
            } }>
                <Icon style={ { marginBottom: 4 } } name={ iconName } color="#367CFE" size={ 27 } />
                <Text style={ { color: 'black' } }>{ buttonTitle }</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <View style={ styles.container }>
                <View>
                    <Image style={ { width: 300, height: 150, } } source={ require( '../assets/images/Circle2.png' ) } />
                    <View style={ { paddingLeft: 40 } }>
                        <Text style={ { color: 'white', fontSize: 45, fontFamily: 'SFProRounded-Heavy', } }>Log In</Text>
                    </View>
                </View>
                <View style={ { paddingHorizontal: 30, paddingTop: 20 } }>
                    <View style={ {
                        paddingVertical: 5, backgroundColor: 'white',
                        borderColor: '#1E90FF',
                        borderRadius: 10,
                        borderWidth: 2
                    } }>
                        <TextInput style={ styles.input } value={ email } onChangeText={ e => HandleEmail( e ) } placeholder="exam@gmail.com" />
                        { validEmail && email.length ? ( <Text style={ { left: 20, color: 'red', } }>Wrong fomat email</Text> ) : null }
                    </View>

                </View>

                <View style={ { paddingHorizontal: 30, paddingTop: 20 } }>
                    <View style={ {
                        paddingVertical: 5, backgroundColor: 'white',
                        borderColor: '#1E90FF',
                        borderRadius: 10,
                        borderWidth: 2

                    } }>
                        <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' } }>
                            <TextInput style={ styles.input } maxLength={ 8 } value={ password } onChangeText={ e => HandlePassword( e ) } placeholder="Enter your password" secureTextEntry={ hidePassword ? true : false } />
                            { password.length > 0 && (
                                <TouchableOpacity onPress={ () => { setHidePassword( !hidePassword ) } }>
                                    <Icon style={ { right: 10 } } name={ hidePassword ? 'eye-slash' : 'eye' } color="black" size={ 27 } />
                                </TouchableOpacity>
                            ) }

                        </View>

                        { validPassword && password.length ? ( <Text style={ { left: 20, color: 'red', } }>Password at least 8 numbers</Text> ) : null }
                    </View>
                </View>
                { email == '' || password == '' || validEmail == true ? (
                    <View style={ { paddingHorizontal: 30, paddingTop: 30 } }>
                        <TouchableOpacity disabled onPress={ () => { HandleLogin() } } style={ {
                            paddingVertical: 15, backgroundColor: 'gray',
                            borderRadius: 10,
                            marginBottom: 20
                        } }>
                            <Text style={ {
                                fontSize: 20,
                                color: 'white',
                                fontFamily: 'SFProRounded-Heavy',
                                alignSelf: 'center'
                            } } >Log In</Text>
                        </TouchableOpacity>
                    </View>
                ) : ( <View style={ { paddingHorizontal: 30, paddingTop: 30 } }>
                    <TouchableOpacity onPress={ () => { HandleLogin(), GetContent() } } style={ {
                        paddingVertical: 15, backgroundColor: '#367CFE',
                        borderRadius: 10,
                        marginBottom: 20
                    } }>
                        <Text style={ {
                            fontSize: 20,
                            color: 'white',
                            fontFamily: 'SFProRounded-Heavy',
                            alignSelf: 'center'
                        } } >Log In</Text>
                    </TouchableOpacity>
                </View> ) }

                <View style={ { paddingTop: 20 } }>
                    <Text style={ { alignSelf: 'center', fontSize: 17, color: 'gray' } }>Or connect with</Text>
                </View>
                <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 30 } }>
                    <SignWithIcon iconName='google' onPress={ () => { } } buttonTitle='Google' />
                    <SignWithIcon iconName='facebook' onPress={ () => { } } buttonTitle='FaceBook' />
                </View>
                <TouchableOpacity onPress={ () => navigation.navigate( 'Signup' ) } style={ { width: '100%', alignItems: 'center' } }>
                    <Text style={ { fontSize: 17, fontWeight: '400', color: 'black' } }>Not a member ?
                        <Text style={ { color: '#367CFE' } }> Register Now</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}
const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: '#D7E5FF',

    },


    input: {

        fontSize: 17,
        color: 'black',
        fontFamily: 'SFProRounded-Heavy',
        paddingLeft: 20,
        top: 3,
        height: 45,
        width: '90%'
    },



} )
export default SignIn;