/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {H_W} from '../QsComp/QsDim';
import WrapperScreen from '../QsComp/WrapperScreen';
import {connect} from 'react-redux';
import {colors, textFont} from '../QsComp/QsColor';
import NavigationRef from '../QsComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QsHeader from '../QsComp/QsHeader';
import {
  QsremoveFavAction,
  QssetFavAction,
  QsaddCartAction,
  QsremoveCartAction,
} from '../QsRedux/QsActions';
import Data from '../QsData';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
    getRelatedImages();
  }, []);
  const [fav, setFav] = useState(false);
  const [relImages, setRelImages] = useState([]);

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const QsProduct = props.QsProduct;

  const checkIfFav = () => {
    for (let us = 0; us < props.QsFavs.length; us++) {
      if (props.QsFavs[us].id === QsProduct.id) {
        setFav(true);
        break;
      }
    }
  };

  const toggleFav = () => {
    fav
      ? props.QsremoveFavAction(QsProduct.id)
      : props.QssetFavAction(QsProduct);
    setFav(!fav);
  };
  const getRelatedImages = () => {
    let rel_images = [];
    for (let Qs = 0; Qs < Data.images.length; Qs++) {
      if (Data.images[Qs].productid === QsProduct.id) {
        rel_images.push(Data.images[Qs].images);
        if (rel_images === 3) {
          break;
        }
      }
    }
    setRelImages(rel_images);
  };
  const QsAddToCart = () => {
    props.QsaddCartAction({...QsProduct});
  };

  const QsRemoveFromCart = () => {
    props.QsCart[QsProduct.id].added !== 0 &&
      props.QsremoveCartAction(QsProduct);
  };

  const QsGotoCart = () => NavigationRef.Navigate('QsCart');
  const QsGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      statusColor={`rgba(${colors.rgb_Primary}, 0.3)`}
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary}, 0.3)`,
      }}>
      <KeyboardAwareScrollView bounces={false}>
        <QsHeader
          leftIcon={Entypo}
          rightIcon={Feather}
          rightIconName="shopping-bag"
          leftIconName="chevron-left"
          leftIconAction={QsGoBack}
          leftIconColor={colors.secondary}
          rightIconAction={QsGotoCart}
          rightIconColor={colors.secondary}
        />
        <Text
          style={{
            marginLeft: H_W.width * 0.05,
            fontSize: 33,
            marginTop: HEIGHT * 0.02,
            fontFamily: textFont.FuturaMedium,
          }}>
          {QsProduct.name}
        </Text>
        <Text
          style={{
            marginLeft: H_W.width * 0.05,
            fontSize: 23,
            fontWeight: 'bold',
            marginTop: HEIGHT * 0.025,
            fontFamily: textFont.FuturaMedium,
          }}>
          ${QsProduct.price}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginLeft: H_W.width * 0.05,
            width: H_W.width * 1.01,
            marginTop: HEIGHT * 0.06,
            overflow: 'visible',
          }}>
          <View
            style={{
              alignItems: 'center',
              alignSelf: 'stretch',
              paddingTop: HEIGHT * 0.02,
              justifyContent: 'space-between',
            }}>
            {relImages.length > 0 &&
              relImages.map((img, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    padding: 6,
                    borderRadius: 15,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  }}>
                  <ImageBackground
                    source={img}
                    style={{
                      width: H_W.width * 0.15,
                      height: H_W.width * 0.15,
                      borderRadius: 15,
                    }}
                    resizeMode="contain"
                  />
                </View>
              ))}
          </View>
          <View>
            <ImageBackground
              source={QsProduct.images}
              style={{
                width: H_W.width * 0.7,
                height: H_W.width * 0.7,
                position: 'relative',
              }}
              imageStyle={{
                transform: [{rotate: '-13deg'}],
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 20,
                },
                shadowOpacity: 0.45,
                shadowRadius: 20.68,
              }}
              resizeMode="contain">
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: `rgba(${colors.rgb_Primary}, 0.06)`,
                  borderRadius: 50,
                  opacity: 1,
                  transform: [{scaleX: 3.7}, {scaleY: 3.7}],
                  position: 'absolute',
                  top: HEIGHT * 0.1,
                  right: H_W.width * 0.1,
                  zIndex: -1,
                  shadowColor: `rgba(${colors.rgb_Primary}, 1)`,
                  shadowOffset: {
                    width: -3,
                    height: 5,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 1,
                }}
              />
            </ImageBackground>
          </View>
        </View>
        <Text
          style={{
            marginLeft: H_W.width * 0.05,
            fontSize: 23,
            fontWeight: 'bold',
            marginTop: HEIGHT * 0.05,
          }}>
          Overview
        </Text>
        <Text
          style={{
            paddingHorizontal: H_W.width * 0.05,
            fontSize: 18,
            color: colors.darkGray,
            fontWeight: 'bold',
            marginTop: HEIGHT * 0.015,
            opacity: 0.5,
            paddingBottom: HEIGHT * 0.02,
          }}>
          {QsProduct.about}
        </Text>
      </KeyboardAwareScrollView>
      <View
        style={{
          backgroundColor: 'white',
          shadowColor: '#F3BCBE',
          shadowOffset: {
            width: 0,
            height: -15,
          },
          shadowOpacity: 1,
          shadowRadius: 20.27,
        }}>
        <View
          style={{
            backgroundColor: `rgba(${colors.rgb_Primary}, 0.3)`,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
            paddingHorizontal: H_W.width * 0.05,
            paddingVertical: 20,
          }}>
          {props.QsCart[QsProduct.id] !== undefined &&
          props.QsCart[QsProduct.id].added !== 0 ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: colors.lightGrey1,
                backgroundColor: 'white',
                alignSelf: 'stretch',
                width: H_W.width * 0.55,
                borderRadius: 50,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10.27,
              }}>
              <TouchableOpacity
                onPress={QsRemoveFromCart}
                style={{
                  alignSelf: 'stretch',
                  width: H_W.width * 0.15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="minus" color="black" size={25} />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 'bold',
                }}>
                {props.QsCart[QsProduct.id].added}
              </Text>
              <TouchableOpacity
                onPress={QsAddToCart}
                style={{
                  alignSelf: 'stretch',
                  width: H_W.width * 0.15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="plus" color="black" size={25} />
              </TouchableOpacity>
            </View>
          ) : (
            <Button
              onPress={QsAddToCart}
              title="ADD TO CART"
              raised
              buttonStyle={{
                backgroundColor: colors.primary,
                height: HEIGHT * 0.07,
                alignSelf: 'stretch',
                width: H_W.width * 0.55,
                borderRadius: 13,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10.27,
              }}
              containerStyle={{
                borderRadius: 13,
              }}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 15,
                fontFamily: textFont.FuturaMedium,
              }}
            />
          )}
          <TouchableOpacity
            onPress={toggleFav}
            style={{
              height: HEIGHT * 0.073,
              alignItems: 'center',
              justifyContent: 'center',
              width: H_W.width * 0.16,
              borderRadius: 13,
              borderWidth: 2,
              borderColor: colors.primary,
              backgroundColor: 'white',
            }}>
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              color={colors.primary}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => {
  return {
    QsProduct: state.QsCrntPrdtReducer,
    QsFavs: state.QsToggleFav,
    QsCart: state.QsCartReducer.items,
  };
};

export default connect(mapStateToProps, {
  QssetFavAction,
  QsremoveFavAction,
  QsremoveCartAction,
  QsaddCartAction,
})(React.memo(SingleProduct));
