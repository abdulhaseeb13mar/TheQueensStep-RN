/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {
  QsremoveCartAction,
  QsaddCartAction,
  QssetCurrentProductAction,
  QssetFavAction,
  QsremoveFavAction,
} from '../QsRedux/QsActions';
import WrapperScreen from '../QsComp/WrapperScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, textFont} from '../QsComp/QsColor';
import {H_W} from '../QsComp/QsDim';
import RefNavigation from '../QsComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-elements';
import Loop from '../QsComp/QsFlatList';
import UseHeader from '../QsComp/QsHeader';
import QsItemCounterWrapper from '../QsComp/QsItemCounterWrapper';
import {QsHorizontalTile} from './QsHome';

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

  const QsinfoScreen = () => RefNavigation.Navigate('QsContact');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={QsGoBack}
        Title={'Cart'}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: HEIGHT * 0.015,
          paddingLeft: H_W.width * 0.03,
        }}>
        <Text
          style={{
            color: colors.secondary,
            fontWeight: 'bold',
            fontSize: H_W.width * 0.045,
          }}>
          Total Amount:
        </Text>
        <View
          style={{
            backgroundColor: colors.secondary,
            padding: 3,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            paddingRight: H_W.width * 0.15,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: H_W.width * 0.05,
              marginLeft: H_W.width * 0.02,
            }}>
            ${props.QsTotal}
          </Text>
        </View>
      </View>
      <View style={{marginTop: HEIGHT * 0.04, flex: 1}}>
        {HorizontalCartArray.length > 0 ? (
          <Loop
            horizontal={false}
            data={HorizontalCartArray}
            renderItem={({item}) => (
              <QsItemCounterWrapper
                position="left"
                Counterlength={HEIGHT * 0.15}
                style={{marginLeft: H_W.width * 0.02}}
                item={item}
                counterColor={colors.primary}
                counterContentColor={'white'}
                CeGoToSingleProduct={QsGoToSingleProduct}>
                <QsHorizontalTile
                  item={item}
                  QsGoToSingleProduct={QsGoToSingleProduct}
                  QsFavs={props.QsFavs}
                  QssetFav={(i) => props.QssetFavAction(i)}
                  QsremoveFav={(i) => props.QsremoveFavAction(i)}
                />
              </QsItemCounterWrapper>
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
      <Entypo
        name="shopping-cart"
        color={`rgba(${colors.rgb_Primary},0.2)`}
        style={{
          position: 'absolute',
          bottom: -H_W.height * 0.07,
          right: -H_W.width * 0.25,
          zIndex: -1,
          transform: [{rotate: '-19deg'}],
        }}
        size={H_W.width * 0.75}
      />
      <Button
        onPress={QsinfoScreen}
        title="Proceed to Checkout"
        titleStyle={{fontWeight: 'bold', fontFamily: textFont, fontSize: 20}}
        disabled={props.QsTotal < 1}
        buttonStyle={{
          backgroundColor: colors.primary,
          paddingVertical: HEIGHT * 0.015,
          borderRadius: 0,
        }}
        containerStyle={{borderRadius: 0}}
        iconRight
        icon={<Entypo name="chevron-right" color="white" size={20} />}
      />
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
})(Cart);
