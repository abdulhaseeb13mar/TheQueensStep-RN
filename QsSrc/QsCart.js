/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  QsremoveCartAction,
  QsaddCartAction,
  QssetCurrentProductAction,
  QssetFavAction,
  QsremoveFavAction,
  QsresetCart,
} from '../QsRedux/QsActions';
import WrapperScreen from '../QsComp/WrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, textFont} from '../QsComp/QsColor';
import {H_W} from '../QsComp/QsDim';
import RefNavigation from '../QsComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import Loop from '../QsComp/QsFlatList';
import UseHeader from '../QsComp/QsHeader';

export const Cart = (props) => {
  useEffect(() => {
    convertObjectToArray();
  }, [props.QsCart]);

  const [HorizontalCartArray, setHorizontalCartArray] = useState([]);

  const convertObjectToArray = () => {
    const CartArray = Object.keys(props.QsCart);
    let UsArr = [];
    CartArray.forEach((element) => {
      UsArr.push(props.QsCart[element]);
    });
    setHorizontalCartArray(UsArr);
  };

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const QsGoBack = () => RefNavigation.GoBack();

  const QsGoToSingleProduct = (item) => {
    props.QssetCurrentProductAction(item);
    RefNavigation.Navigate('QsSP');
  };
  const QsAddToCart = (item) => {
    props.QsaddCartAction({...item});
  };

  const QsRemoveFromCart = (item) => {
    props.QsCart[item.id].added !== 0 && props.QsremoveCartAction(item);
  };
  const QsinfoScreen = () => RefNavigation.Navigate('QsContact');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={QsGoBack}
        rightIconAction={() => props.QsresetCart()}
        leftIconColor="black"
        rightIcon={AntDesign}
        rightIconName="delete"
        rightIconColor="black"
        Title={<Text style={{color: 'black', fontSize: 22}}>Cart</Text>}
      />

      <View style={{marginTop: HEIGHT * 0.04, flex: 1}}>
        {HorizontalCartArray.length > 0 ? (
          <Loop
            horizontal={false}
            data={HorizontalCartArray}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => QsGoToSingleProduct(item)}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <View
                  style={{
                    width: '90%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: 1,
                    borderBottomColor: colors.lightGrey3,
                    paddingBottom: HEIGHT * 0.03,
                    marginBottom: HEIGHT * 0.02,
                  }}>
                  <ImageBackground
                    source={item.images}
                    style={{
                      width: H_W.width * 0.27,
                      height: HEIGHT * 0.18,
                      backgroundColor: 'rgba(0,0,0, 0.25)',
                      borderRadius: 19,
                    }}
                    resizeMode="contain"
                  />
                  <View style={{width: H_W.width * 0.55}}>
                    <View>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: 'black',
                          width: H_W.width * 0.5,
                          fontFamily: textFont.FuturaMedium,
                          fontSize: 18.5,
                        }}>
                        {item.name}
                      </Text>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignSelf: 'flex-start',
                          marginTop: HEIGHT * 0.01,
                        }}>
                        <AntDesign
                          name="star"
                          color="#ffce33"
                          size={H_W.width * 0.04}
                        />
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 15.5,
                          }}>
                          {item.rating}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: HEIGHT * 0.02,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderWidth: 1,
                          borderColor: colors.lightGrey1,
                          borderRadius: 8,
                          height: HEIGHT * 0.04,
                        }}>
                        <TouchableOpacity
                          onPress={() => QsRemoveFromCart(item)}
                          style={{
                            alignSelf: 'stretch',
                            width: H_W.width * 0.07,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Feather name="minus" color="black" size={17} />
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginHorizontal: H_W.width * 0.04,
                          }}>
                          {item.added}
                        </Text>
                        <TouchableOpacity
                          onPress={() => QsAddToCart(item)}
                          style={{
                            alignSelf: 'stretch',
                            width: H_W.width * 0.07,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Feather name="plus" color="black" size={17} />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 20,
                          fontFamily: textFont.DINAlternate,
                        }}>
                        ${item.price}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text
            style={{
              width: '100%',
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            }}>
            Your Cart is empty...
          </Text>
        )}
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: H_W.width * 0.05,
            marginBottom: HEIGHT * 0.02,
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 28,
              fontFamily: textFont.DINAlternate,
            }}>
            Total
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 25,
              fontFamily: textFont.FuturaMedium,
            }}>
            ${props.QsTotal}
          </Text>
        </View>
        <Button
          raised
          onPress={QsinfoScreen}
          title="Checkout"
          titleStyle={{
            fontWeight: 'bold',
            fontFamily: textFont.FuturaMedium,
            fontSize: 20,
            textAlign: 'center',
          }}
          disabled={props.QsTotal < 1}
          buttonStyle={{
            backgroundColor: colors.primary,
            paddingVertical: HEIGHT * 0.015,
            borderRadius: 50,
          }}
          containerStyle={{
            borderRadius: 50,
            width: '80%',
          }}
        />
      </View>
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => ({
  QsCart: state.QsCartReducer.items,
  QsTotal: state.QsCartReducer.totalAmount,
  QsFavs: state.QsToggleFav,
});

export default connect(mapStateToProps, {
  QsremoveCartAction,
  QsaddCartAction,
  QssetCurrentProductAction,
  QssetFavAction,
  QsremoveFavAction,
  QsresetCart,
})(Cart);
