/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {H_W} from '../QsComp/QsDim';
import WrapperScreen from '../QsComp/WrapperScreen';
import {connect} from 'react-redux';
import {colors, textFont} from '../QsComp/QsColor';
import NavigationRef from '../QsComp/RefNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import QsHeader from '../QsComp/QsHeader';
import {
  QsremoveFavAction,
  QssetFavAction,
  QsaddCartAction,
  QsremoveCartAction,
} from '../QsRedux/QsActions';

function SingleProduct(props) {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);

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

  const QsAddToCart = () => {
    props.QsaddCartAction({...QsProduct});
  };
  const QsRemoveFromCart = () => {
    props.QsCart[QsProduct.id].added !== 0 &&
      props.QsremoveCartAction(QsProduct);
  };

  // const QsGotoSearch = () => NavigationRef.Navigate('QsSearch');
  const QsGoBack = () => NavigationRef.GoBack();

  return (
    <WrapperScreen
      style={{
        backgroundColor: 'white',
      }}>
      <KeyboardAwareScrollView bounces={false}>
        <QsHeader
          leftIcon={Entypo}
          rightIcon={Entypo}
          rightIconName={fav ? 'heart' : 'heart-outlined'}
          leftIconName="chevron-left"
          leftIconAction={QsGoBack}
          leftIconColor={colors.secondary}
          rightIconAction={toggleFav}
          rightIconColor={colors.secondary}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ImageBackground
            source={QsProduct.image}
            style={{width: H_W.width * 0.9, height: HEIGHT * 0.45}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: H_W.width * 0.03,
            marginTop: HEIGHT * 0.02,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: colors.secondary,
              fontFamily: textFont,
              fontSize: 30,
              width: H_W.width * 0.6,
            }}>
            {QsProduct.productName}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Fontisto name="stopwatch" color={colors.secondary} size={24} />
            <Text
              style={{
                fontSize: 17.5,
                marginLeft: H_W.width * 0.02,
                color: colors.darkGray,
                fontFamily: textFont,
              }}>
              20 min
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginLeft: H_W.width * 0.03,
            fontSize: 20.5,
            marginTop: HEIGHT * 0.01,
            fontWeight: 'bold',
            fontFamily: textFont,
          }}>
          Details
        </Text>
        <Text
          style={{
            marginHorizontal: H_W.width * 0.03,
            fontWeight: 'bold',
            fontFamily: textFont,
            color: colors.darkGray,
            fontSize: 17,
            lineHeight: HEIGHT * 0.03,
            marginTop: HEIGHT * 0.01,
          }}>
          {QsProduct.description}
        </Text>
        <View
          style={{
            paddingHorizontal: H_W.width * 0.03,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: HEIGHT * 0.04,
          }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              fontFamily: textFont,
            }}>
            $ {QsProduct.price}
          </Text>
          {props.QsCart[QsProduct.id] !== undefined &&
          props.QsCart[QsProduct.id].added !== 0 ? (
            <View
              style={{
                width: H_W.width * 0.35,
                paddingHorizontal: H_W.width * 0.01,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 10,
              }}>
              <Button
                onPress={QsRemoveFromCart}
                title=""
                buttonStyle={{backgroundColor: 'transparent'}}
                icon={
                  <AntDesign
                    color={colors.secondary}
                    name="minuscircleo"
                    size={23}
                  />
                }
              />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {props.QsCart[QsProduct.id].added}
              </Text>
              <Button
                onPress={QsAddToCart}
                title=""
                buttonStyle={{backgroundColor: 'transparent'}}
                icon={
                  <AntDesign
                    color={colors.secondary}
                    name="pluscircleo"
                    size={23}
                  />
                }
              />
            </View>
          ) : (
            <Button
              onPress={QsAddToCart}
              title="Add to Cart    "
              titleStyle={{
                fontWeight: 'bold',
                color: colors.secondary,
                fontFamily: textFont,
              }}
              buttonStyle={{backgroundColor: colors.primary, borderRadius: 5}}
              containerStyle={{borderRadius: 5}}
              iconRight
              raised
              icon={
                <AntDesign
                  color={colors.secondary}
                  name="pluscircleo"
                  size={25}
                />
              }
            />
          )}
        </View>
      </KeyboardAwareScrollView>
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
