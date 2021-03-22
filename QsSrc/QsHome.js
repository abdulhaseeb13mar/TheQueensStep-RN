/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WrapperScreen from '../QsComp/WrapperScreen';
import {colors, textFont} from '../QsComp/QsColor';
import {H_W} from '../QsComp/QsDim';
import Data from '../QsData';
import Loop from '../QsComp/QsFlatList';
import RefNavigation from '../QsComp/RefNavigation';
import {connect} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  QssetCurrentProductAction,
  QsremoveFavAction,
  QssetFavAction,
} from '../QsRedux/QsActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import QsSearchBar from '../QsComp/QsSearchBar';
import QsHeader from '../QsComp/QsHeader';

function QsHome(props) {
  useEffect(() => {
    QschangeTab(Data.category[0]);
  }, []);
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  const [Qscategories, setQsCategories] = useState(Data.category);
  const [QscurrentCat, setQsCurrentCat] = useState(Data.category[0]);
  const [QstabProducts, setQsTabProducts] = useState([]);

  const QschangeTab = (tab) => {
    setQsCurrentCat(tab);
    const filteredProducts = Data.product.filter(
      (item) => item.categoryId === tab.id,
    );
    setQsTabProducts(filteredProducts);
  };

  const QsGotoFav = () => RefNavigation.Navigate('QsFav');
  const QsGotoCart = () => RefNavigation.Navigate('QsCart');
  const QsGotoSearch = () => RefNavigation.Navigate('QsSearch');
  const QsGoToSingleProduct = (item) => {
    props.QssetCurrentProductAction(item);
    RefNavigation.Navigate('QsSP');
  };
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1}}>
        <QsHeader
          leftIcon={Feather}
          rightIcon={Feather}
          leftIconName="heart"
          rightIconName="shopping-bag"
          rightIconColor="black"
          leftIconAction={QsGotoFav}
          rightIconAction={QsGotoCart}
          Title={
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                fontFamily: 'Verdana-Bold',
              }}>
              THE{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  fontFamily: 'Verdana-Bold',
                  fontStyle: 'italic',
                  color: 'black',
                }}>
                QUEEN'S
              </Text>{' '}
              STEP
            </Text>
          }
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: HEIGHT * 0.025,
          }}>
          <TouchableOpacity
            onPress={QsGotoSearch}
            style={{
              width: '85%',
            }}>
            <QsSearchBar editable={false} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: HEIGHT * 0.4,
              width: H_W.width * 0.2,
              marginLeft: H_W.width * 0.03,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ScrollView style={{width: '100%'}} bounces={false}>
              {Qscategories.map((item, index) => (
                <TabList
                  key={index}
                  item={item}
                  QschangeTab={QschangeTab}
                  QscurrentCat={QscurrentCat}
                />
              ))}
            </ScrollView>
          </View>
          <View style={{width: H_W.width * 0.8}}>
            <Loop
              data={QstabProducts}
              renderItem={({item}) => (
                <QsVerticalTile
                  item={item}
                  QsFavs={props.QsFavs}
                  QssetFav={(i) => props.QssetFavAction(i)}
                  QsremoveFav={(i) => props.QsremoveFavAction(i)}
                  QsGoToSingleProduct={QsGoToSingleProduct}
                />
              )}
            />
          </View>
        </View>
        <Text
          style={{
            marginLeft: H_W.width * 0.08,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: HEIGHT * 0.015,
          }}>
          Popular
        </Text>
        {Data.popular.map((item, index) => (
          <QsHorizontalTile
            key={index}
            item={item}
            QsGoToSingleProduct={QsGoToSingleProduct}
          />
        ))}
      </ScrollView>
    </WrapperScreen>
  );
}

export const QsHorizontalTile = ({item, QsGoToSingleProduct}) => {
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => QsGoToSingleProduct(item)}
      style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: H_W.width * 0.85,
        }}>
        <ImageBackground
          source={item.images}
          imageStyle={{
            margin: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            transform: [{rotate: '-13deg'}],
          }}
          style={{
            width: H_W.width * 0.2,
            height: H_W.width * 0.2,
            backgroundColor: 'rgba(0,0,0, 0.25)',
            borderRadius: 13,
          }}
          resizeMode="contain"
        />
        <View
          style={{
            width: H_W.width * 0.6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              numberOfLines={2}
              style={{
                color: 'black',
                width: H_W.width * 0.35,
                fontFamily: textFont.FuturaMedium,
                fontSize: 15.5,
              }}>
              {item.name}
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                alignSelf: 'flex-start',
                marginTop: HEIGHT * 0.015,
              }}>
              <AntDesign name="star" color="#ffce33" size={H_W.width * 0.04} />
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
          <Text
            style={{
              color: 'black',
              fontFamily: 'GillSans-Bold',
              fontSize: 16,
            }}>
            ${item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const QsVerticalTile = ({
  item,
  QsGoToSingleProduct,
  QsFavs,
  QsremoveFav,
  QssetFav,
}) => {
  useEffect(() => {
    checkIfFav();
  }, []);
  const [fav, setFav] = useState(false);

  const checkIfFav = () => {
    for (let us = 0; us < QsFavs.length; us++) {
      if (QsFavs[us].id === item.id) {
        setFav(true);
        break;
      }
    }
  };
  const toggleFav = () => {
    fav ? QsremoveFav(item.id) : QssetFav(item);
    setFav(!fav);
  };
  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);
  return (
    <TouchableOpacity
      onPress={() => QsGoToSingleProduct(item)}
      style={{
        marginRight: H_W.width * 0.1,
        width: H_W.width * 0.47,
        borderRadius: 15,
        margin: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
      }}>
      <View
        style={{
          borderRadius: 15,
          paddingVertical: HEIGHT * 0.015,
          backgroundColor: `rgba(${colors.rgb_Primary}, 0.8)`,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: H_W.width * 0.02,
            paddingRight: H_W.width * 0.02,
            marginBottom: HEIGHT * 0.015,
          }}>
          <Text
            numberOfLines={2}
            style={{
              width: '70%',
              fontSize: 23,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={toggleFav}>
            <Ionicons
              name={fav ? 'heart' : 'heart-outline'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={item.images}
          resizeMode="contain"
          imageStyle={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            transform: [{rotate: '-13deg'}],
          }}
          style={{
            marginLeft: H_W.width * 0.13,
            width: H_W.width * 0.4,
            height: HEIGHT * 0.25,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export const TabList = ({item, QschangeTab, QscurrentCat}) => {
  return (
    <View
      style={{
        borderColor: 'blue',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: H_W.height * 0.02,
        // transform: [{rotate: '-90deg'}],
      }}>
      <TouchableOpacity
        style={styles.HomeTabsWrapper}
        onPress={() => QschangeTab(item)}>
        <Text
          style={{
            ...styles.HomeTabsText,
            color:
              item.category === QscurrentCat.category
                ? colors.primary
                : colors.secondary,
          }}>
          {item.category}
        </Text>
        {item.category === QscurrentCat.category ? (
          <View style={styles.tabIndicator} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  QsHome21: {},
  QsHome20: {},
  QsHome19: {},
  QsHome18: {},
  QsHome17: {},
  QsHome16: {},
  QsHome15: {},
  QsHome14: {},
  QsHome13: {},
  QsHome12: {},
  QsHome11: {},
  QsHome10: {},
  QsHome9: {},
  QsHome8: {},
  QsHome7: {},
  QsHome6: {},
  QsHome5: {},
  QsHome4: {},
  QsHome3: {},
  QsHome2: {},
  QsHome1: {},
  tabIndicator: {
    width: 30,
    borderWidth: 1.8,
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: colors.primary,
  },
  HomeTabsText: {
    fontSize: 16,
    fontWeight: '700',
  },
  HomeTabsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: H_W.height * 0.03,
    height: H_W.width * 0.1,
    paddingHorizontal: H_W.width * 0.02,
    transform: [{rotate: '-90deg'}],
    paddingTop: H_W.width * 0.02,
  },
});

const mapStateToProps = (state) => {
  return {
    QstotalItems: state.QsCartReducer.totalItems,
    QsFavs: state.QsToggleFav,
  };
};

export default connect(mapStateToProps, {
  QssetCurrentProductAction,
  QsremoveFavAction,
  QssetFavAction,
})(QsHome);
