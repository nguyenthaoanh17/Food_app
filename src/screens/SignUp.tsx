import { useContext, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

import { Base_URL } from "../config";
const SignUp = ( { navigation }: any ) =>
{
    const [ email, setEmail ] = useState<any>( '' );
    const [ profile, setProfile ] = useState<any>( '' );
    const [ name, setName ] = useState<any>( '' );
    const [ phone, setPhone ] = useState<any>( '' );
    const [ adress, setAddress ] = useState<any>( '' );
    const [ password, setPassword ] = useState<any>( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );

    const [ validEmail, setValidEmail ] = useState( false );
    const [ checkEmail, setCheckEmail ] = useState( false );
    const [ validPhone, setValidPhone ] = useState( false );
    const [ validPassword, setValidPassword ] = useState( false );
    const [ validCfPassword, setValidCfPassword ] = useState( false );



    const CheckEmail = async () =>
    {

    }
    const HandleEmail = async ( e: any ) =>
    {
        let re = /^\S+@\S+\.\S+$/;
        let regex = /[ \w]* @* [ a - z ] *\.* [ \w ]{ 5,} ( \.)* ( com ) * ( @gmail\.com)/g;
        setEmail( e );
        const resp = await axios.get( `${ Base_URL }/users?email=` + e )
        const data = resp.data;
        console.log( data );

        if ( data.length != 0 )
        {
            setCheckEmail( true )
        } else
        {
            setCheckEmail( false )
        }
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
    const HandlePhone = ( e: any ) =>
    {

        setPhone( e );
        if ( e.length < 10 )
        {
            setValidPhone( true )
        } else
        {
            setValidPhone( false )
        }
    }
    const HandleCfPassword = ( e: any ) =>
    {

        setConfirmPassword( e );
        if ( e === password )
        {
            setValidCfPassword( false )
        } else
        {
            setValidCfPassword( true )
        }
    }
    const HandleRegister = async () =>
    {
        try
        {


            const res = await axios.post( `${ Base_URL }/users`, { name, email, password, phone, adress, profile } )
            console.log( 'Res', res.data );
            // const data = res.data;

            // setCate( data )
            Alert.alert( 'success register' );
            navigation.navigate( 'Signin' )
        } catch ( error )
        {
            console.log( JSON.stringify( error ) )
        }

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
            <ScrollView showsVerticalScrollIndicator={ false }>
                <View style={ styles.container }>
                    <View>
                        <Image style={ { width: 300, height: 135, } } source={ require( '../assets/images/Circle2.png' ) } />
                        <View style={ { paddingLeft: 40, paddingBottom: 20 } }>
                            <Text style={ { color: 'white', fontSize: 45, } }>Register</Text>
                        </View>
                    </View>
                    <View style={ { paddingHorizontal: 30 } }>

                        <View style={ {
                            paddingVertical: 5, backgroundColor: 'white',
                            borderRadius: 10,
                            borderColor: '#1E90FF',
                            borderWidth: 2
                        } }>
                            <TextInput style={ styles.input } value={ name } onChangeText={ e => setName( e ) } placeholder="Enter your name" />

                        </View>

                    </View>
                    <View style={ { paddingHorizontal: 30, paddingTop: 20 } }>
                        <View style={ {
                            paddingVertical: 5, backgroundColor: 'white',
                            borderColor: '#1E90FF',
                            borderRadius: 10,
                            borderWidth: 2
                        } }>
                            <TextInput style={ styles.input } value={ email } onChangeText={ e => { HandleEmail( e ), CheckEmail() } } placeholder="example@gmail.com" />
                            { validEmail && email.length ? ( <Text style={ { left: 20, color: 'red', } }>Wrong fomat email</Text> ) : null }
                            { checkEmail ? ( <Text style={ { left: 20, color: 'red', } }>The email was registered</Text> ) : null }
                        </View>

                    </View>
                    <View style={ { paddingHorizontal: 30, paddingTop: 20 } }>
                        <View style={ {
                            paddingVertical: 5, backgroundColor: 'white',
                            borderColor: '#1E90FF',
                            borderRadius: 10,
                            borderWidth: 2
                        } }>
                            <TextInput style={ styles.input } maxLength={ 10 } value={ phone } onChangeText={ e => HandlePhone( e ) } placeholder="Phone number" />
                            { validPhone && phone.length ? ( <Text style={ { left: 20, color: 'red', } }>Phone number must have 10 digits</Text> ) : null }
                        </View>

                    </View>
                    <View style={ { paddingHorizontal: 30, paddingTop: 20 } }>
                        <View style={ {
                            paddingVertical: 5, backgroundColor: 'white',
                            borderColor: '#1E90FF',
                            borderRadius: 10,
                            borderWidth: 2
                        } }>
                            <TextInput style={ styles.input } value={ adress } onChangeText={ e => setAddress( e ) } placeholder="Enter detailed address" />

                        </View>

                    </View>
                    <View style={ { paddingHorizontal: 30, paddingTop: 20 } }>
                        <View style={ {
                            paddingVertical: 5, backgroundColor: 'white',
                            borderRadius: 10,
                            borderColor: '#1E90FF',
                            borderWidth: 2

                        } }>
                            <TextInput style={ styles.input } maxLength={ 8 } value={ password } onChangeText={ e => HandlePassword( e ) } placeholder="Password" secureTextEntry={ true } />
                            { validPassword && password.length ? ( <Text style={ { left: 20, color: 'red', } }>Password at least 8 numbers</Text> ) : null }
                        </View>
                    </View>
                    <View style={ { paddingHorizontal: 30, paddingTop: 20 } }>
                        <View style={ {
                            paddingVertical: 5, backgroundColor: 'white',
                            borderRadius: 10,
                            borderColor: '#1E90FF',
                            borderWidth: 2

                        } }>
                            <TextInput style={ styles.input } maxLength={ 8 } value={ confirmPassword } onChangeText={ e => HandleCfPassword( e ) } placeholder="Enter confirm password" secureTextEntry={ true } />
                            { validCfPassword && confirmPassword.length ? ( <Text style={ { left: 20, color: 'red', } }>Password not matched</Text> ) : null }
                        </View>
                    </View>
                    { email == '' || password == '' || confirmPassword == '' || name == '' || validEmail == true ? (
                        <View style={ { paddingHorizontal: 30, paddingTop: 30 } }>
                            <TouchableOpacity disabled onPress={ () =>
                            {
                                HandleRegister()
                            } } style={ {
                                paddingVertical: 15, backgroundColor: 'gray',
                                borderRadius: 10,
                                marginBottom: 20
                            } }>
                                <Text style={ {
                                    fontSize: 20,
                                    color: 'white',
                                    fontFamily: 'SFProRounded-Heavy',
                                    alignSelf: 'center'
                                } } >Register</Text>
                            </TouchableOpacity>
                        </View>
                    ) : ( <View style={ { paddingHorizontal: 30, paddingTop: 30 } }>
                        <TouchableOpacity onPress={ () =>
                        {
                            HandleRegister()
                        } } style={ {
                            paddingVertical: 15, backgroundColor: '#367CFE',
                            borderRadius: 10,
                            marginBottom: 20
                        } }>
                            <Text style={ {
                                fontSize: 20,
                                color: 'white',
                                fontFamily: 'SFProRounded-Heavy',
                                alignSelf: 'center'
                            } } >Register</Text>
                        </TouchableOpacity>
                    </View> ) }

                    <View style={ { paddingTop: 20 } }>
                        <Text style={ { alignSelf: 'center', fontSize: 17, color: 'gray' } }>Or connect with</Text>
                    </View>
                    <View style={ { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 20, marginBottom: 30 } }>
                        <SignWithIcon iconName='google' onPress={ () => { } } buttonTitle='Google' />
                        <SignWithIcon iconName='facebook' onPress={ () => { } } buttonTitle='FaceBook' />
                    </View>
                    <TouchableOpacity onPress={ () => navigation.navigate( 'Signin' ) } style={ { width: '100%', alignItems: 'center', paddingBottom: 20 } }>
                        <Text style={ { fontSize: 17, fontWeight: '400', color: 'black' } }>Already a member ?
                            <Text style={ { color: '#367CFE' } }> Log In Now</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
        height: 45

    },
} )
export default SignUp;