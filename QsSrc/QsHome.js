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
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

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
      (item) => item.categoryId === tab.categoryId,
    );
    setQsTabProducts(filteredProducts);
  };

  const QsGotoFav = () => RefNavigation.Navigate('QsFav');
  const QsGotoCart = () => RefNavigation.Navigate('QsCart');
  // const QsGotoSearch = () => RefNavigation.Navigate('QsSearch');
  const QsGoToSingleProduct = (item) => {
    props.QssetCurrentProductAction(item);
    RefNavigation.Navigate('QsSP');
  };
  return <WrapperScreen style={{backgroundColor: 'white'}}></WrapperScreen>;
}

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
        position: 'relative',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        width: H_W.width * 0.45,
        borderRadius: 15,
        marginHorizontal: H_W.width * 0.03,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(197, 95, 17, 0.4)',
          borderRadius: 15,
        }}>
        <View
          style={{
            width: H_W.width * 0.17,
            height: H_W.width * 0.17,
            backgroundColor: 'white',
            borderRadius: 50,
            opacity: 0.2,
            transform: [{scaleX: 3.2}, {scaleY: 3}],
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: -1,
          }}
        />
        <View
          style={{
            width: '100%',
            paddingLeft: H_W.width * 0.025,
            paddingTop: H_W.width * 0.03,
            alignSelf: 'stretch',
            justifyContent: 'space-between',
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              color: colors.secondary,
              width: '70%',
            }}>
            {item.productName}
          </Text>
          <Text
            style={{
              marginTop: HEIGHT * 0.01,
              fontSize: 20,
              color: colors.secondary,
              fontWeight: 'bold',
            }}>
            ${item.price}
          </Text>
        </View>
        <ImageBackground
          source={item.image}
          resizeMode="contain"
          imageStyle={{borderRadius: 15}}
          style={{
            width: H_W.width * 0.32,
            height: HEIGHT * 0.18,
            alignSelf: 'flex-end',
            marginTop: HEIGHT * 0.01,
          }}
        />
      </View>
      <TouchableOpacity
        onPress={toggleFav}
        style={{
          position: 'absolute',
          top: -3,
          right: -5,
          padding: 7,
          backgroundColor: 'white',
          borderRadius: 50,
          zIndex: 10,
        }}>
        <Entypo
          name={fav ? 'heart' : 'heart-outlined'}
          color={colors.secondary}
          size={27}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export const TabList = ({item, changeTab, QscurrentCat}) => {
  return (
    <TouchableOpacity
      style={styles.HomeTabsWrapper}
      onPress={() => changeTab(item)}>
      <View
        style={{
          ...styles.QsHome1,
          backgroundColor:
            item.categoryName === QscurrentCat.categoryName
              ? colors.secondary
              : colors.primary,
        }}>
        <ImageBackground
          source={
            item.categoryName === QscurrentCat.categoryName
              ? item.whiteIcon
              : item.blackIcon
          }
          style={styles.QsHome2}
        />
      </View>
    </TouchableOpacity>
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
  HomeTabsWrapper: {},
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
