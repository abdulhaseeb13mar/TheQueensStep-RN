/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {connect} from 'react-redux';
import WrapperScreen from '../QsComp/WrapperScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H_W} from '../QsComp/QsDim';
import {colors} from '../QsComp/QsColor';
import {Button, Overlay} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {isFormValid} from '../QsComp/validation';
import NavPointer from '../QsComp/RefNavigation';
import {QsUserAction, QsresetCart} from '../QsRedux/QsActions';
import Toast from 'react-native-root-toast';
import UseHeader from '../QsComp/QsHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ConfirmOrder = (props) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [firstNameErrMsg, setFirstNameErrMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [email, setEmail] = useState('');
  const [phoneErrMsg, setPhoneErrMsg] = useState('');
  const [addressErrMsg, setAddressErrMsg] = useState('');
  const [phone, setPhone] = useState('');

  const QsConfirm = () => {
    const formValidResponse = isFormValid(firstName, email, phone, address);
    if (!formValidResponse.status) {
      errorMsgHandler(formValidResponse.errCategory, formValidResponse.errMsg);
    } else {
      CallApi();
      props.QsUserAction({
        email: email,
        firstName: firstName,
        phone: phone,
        address: address,
      });
    }
  };

  const ShowToast = (msg) => {
    Toast.show(msg, {
      position: -60,
      backgroundColor: colors.secondary,
      opacity: 1,
      textColor: 'white',
    });
  };

  const CallApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://reactnativeapps.herokuapp.com/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname: firstName,
            address: address,
            phonenumber: phone,
            email: email,
            appname: 'SweetnSticky',
          }),
        },
      );
      const response = await res.json();
      setLoading(false);
      response.status ? setShowModal(true) : ShowToast('Some error occurred');
    } catch (error) {
      console.log(error);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'email') {
      setEmailErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'firstname') {
      setEmailErrMsg('');
      setFirstNameErrMsg(errMsg);
      setPhoneErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'phone') {
      setPhoneErrMsg(errMsg);
      setEmailErrMsg('');
      setFirstNameErrMsg('');
      setAddressErrMsg('');
    } else if (errCategory === 'address') {
      setAddressErrMsg(errMsg);
      setPhoneErrMsg('');
      setFirstNameErrMsg('');
      setEmailErrMsg('');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    props.QsresetCart();
    NavPointer.Push('QsHome');
  };

  const changePhone = (t) => setPhone(t);
  const changeAddress = (t) => setAddress(t);
  const changeEmail = (t) => setEmail(t);
  const QsGoBack = () => NavPointer.GoBack();
  const changeFirstName = (t) => setFirstName(t);

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={styles.container} bounces={false}>
        <UseHeader
          leftIcon={Entypo}
          leftIconName="chevron-left"
          leftIconAction={QsGoBack}
          rightIconAction={() => props.QsresetCart()}
          leftIconColor="black"
          Title={<Text style={{color: 'black', fontSize: 22}}>Checkout</Text>}
        />

        <Text
          style={{
            marginLeft: H_W.width * 0.03,
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: HEIGHT * 0.015,
          }}>
          Personal Information
        </Text>
        <View style={styles.QsPersonalInfoWrapper}>
          <View style={styles.QsSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.QsPersonalInfoHeadingName,
                color: firstNameErrMsg ? 'red' : 'black',
              }}>
              FULL NAME <Text> {firstNameErrMsg}</Text>
            </Text>
            <View style={styles.QsPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Your Name"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeFirstName}
                placeholderTextColor={colors.lightGrey3}
              />
              <Feather
                name="user"
                size={H_W.width * 0.07}
                style={styles.QsInputIcon}
              />
            </View>
          </View>
          <View style={styles.QsSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.QsPersonalInfoHeadingName,
                color: emailErrMsg ? 'red' : 'black',
              }}>
              EMAIL ADDRESS<Text> {emailErrMsg}</Text>
            </Text>
            <View style={styles.QsPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Email"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeEmail}
                placeholderTextColor={colors.lightGrey3}
              />
              <FontAwesome5
                name="envelope"
                size={H_W.width * 0.07}
                style={styles.QsInputIcon}
              />
            </View>
          </View>
          <View style={styles.QsSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.QsPersonalInfoHeadingName,
                color: phoneErrMsg ? 'red' : 'black',
              }}>
              CONTACT<Text> {phoneErrMsg}</Text>
            </Text>
            <View style={styles.QsPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Phone Number"
                keyboardType="number-pad"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changePhone}
                placeholderTextColor={colors.lightGrey3}
              />
              <FontAwesome5
                name="phone"
                size={H_W.width * 0.07}
                style={styles.QsInputIcon}
              />
            </View>
          </View>
          <View style={styles.QsSinglePersonalInfoWrapper}>
            <Text
              style={{
                ...styles.QsPersonalInfoHeadingName,
                color: addressErrMsg ? 'red' : 'black',
              }}>
              DELIVERY ADDRESS<Text> {addressErrMsg}</Text>
            </Text>
            <View style={styles.QsPersonalInfoInputWrapper}>
              <TextInput
                placeholder="Address"
                style={{...styles.Input, height: HEIGHT * 0.065}}
                onChangeText={changeAddress}
                placeholderTextColor={colors.lightGrey3}
              />
              <FontAwesome5
                name="map-marker-alt"
                size={H_W.width * 0.07}
                style={styles.QsInputIcon}
              />
            </View>
          </View>
        </View>
        <Text
          style={{
            marginLeft: H_W.width * 0.03,
            fontSize: 20,
            fontWeight: 'bold',
            marginVertical: HEIGHT * 0.015,
          }}>
          Order Details
        </Text>
        <View style={{...styles.QsSummaryOverlay, marginBottom: HEIGHT * 0.02}}>
          <View style={styles.QsSm1}>
            <View style={styles.QsSm2}>
              <Text style={{fontSize: 23}}>Total:</Text>
              <Text style={{fontWeight: 'bold', fontSize: 23}}>
                ${props.total}
              </Text>
            </View>
            <View style={styles.QsSm3}>
              <Text style={styles.QsSm4}>Payment Mode:</Text>
              <Text style={styles.QsSm4}>Cash on delivery</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.QsConfirmButtonWrapper,
            marginBottom: HEIGHT * 0.02,
          }}>
          <Button
            title="CONFIRM ORDER"
            raised
            containerStyle={styles.QsConfirmButtonContainer}
            buttonStyle={{
              ...styles.QsConfirmButton,
              padding: HEIGHT * 0.018,
            }}
            titleStyle={{color: 'white', fontWeight: 'bold'}}
            loadingProps={{color: 'black'}}
            loading={loading}
            onPress={QsConfirm}
          />
        </View>
        <Overlay
          onBackdropPress={closeModal}
          isVisible={showModal}
          animationType="fade">
          <View
            style={{
              ...styles.QsModalWrapper,
              paddingVertical: HEIGHT * 0.04,
            }}>
            <MaterialCommunityIcons
              name="shoe-heel"
              size={H_W.width * 0.25}
              color={colors.primary}
            />
            <Text style={styles.QsModalHeadText}>THANK YOU!</Text>
            <Text style={styles.QsModalSubText}>
              Your order has been confirmed!
            </Text>
          </View>
        </Overlay>
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    total: state.QsCartReducer.totalAmount,
  };
};

export default connect(mapStateToProps, {QsUserAction, QsresetCart})(
  React.memo(ConfirmOrder),
);

const styles = StyleSheet.create({
  QsSm4: {fontSize: H_W.width * 0.045, fontWeight: 'bold'},
  QsSm3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  QsSm2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  QsSm1: {
    width: '85%',
    backgroundColor: `rgba(${colors.rgb_Primary}, 0.3)`,
    borderRadius: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    padding: H_W.width * 0.04,
  },
  QsSummaryOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  QsModalSubText: {
    fontSize: H_W.width * 0.045,
    color: colors.darkGray,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  QsModalHeadText: {
    fontSize: H_W.width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  QsModalWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: H_W.width * 0.8,
  },
  QsConfirmButtonContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
  QsConfirmButton: {
    backgroundColor: colors.primary,

    borderRadius: 50,
  },
  QsConfirmButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: H_W.width * 0.035,
  },
  Input: {
    width: H_W.width * 0.81,
    color: colors.primary,
    fontWeight: 'bold',
  },
  QsInputIcon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: H_W.width * 0.09,
    color: colors.secondary,
  },
  QsPersonalInfoInputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGrey4,
    paddingHorizontal: H_W.width * 0.02,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  QsPersonalInfoHeadingName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 6,
  },
  QsSinglePersonalInfoWrapper: {
    marginVertical: 10,
  },
  QsPersonalInfoHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  QsPersonalInfoWrapper: {
    marginHorizontal: H_W.width * 0.035,
  },
  container: {flex: 1},
});
