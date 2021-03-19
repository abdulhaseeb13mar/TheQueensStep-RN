/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import WrapperScreen from '../QsComp/WrapperScreen';
import {H_W} from '../QsComp/QsDim';
import NavigationRef from '../QsComp/RefNavigation';
import Entypo from 'react-native-vector-icons/Entypo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Data from '../QsData';
import {connect} from 'react-redux';
import {QssetCurrentProductAction} from '../QsRedux/QsActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import QsSearchBar from '../QsComp/QsSearchBar';
import {colors} from '../QsComp/QsColor';
import {Avatar} from 'react-native-elements';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase()),
    );
    return SearchedItems.length === 0 ? (
      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
        Nothing Found...
      </Text>
    ) : (
      CardRender(SearchedItems)
    );
  };

  const QsGoToSingleProduct = (item) => {
    props.QssetCurrentProductAction(item);
    NavigationRef.Navigate('QsSP');
  };

  const CardRender = (Arr) => {
    return Arr.map((item, index) => (
      <View
        key={index}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: HEIGHT * 0.02,
        }}>
        <TouchableOpacity onPress={() => QsGoToSingleProduct(item)}>
          <Avatar
            rounded
            size={H_W.width * 0.6}
            source={item.images}
            containerStyle={{
              backgroundColor: colors.secondary,
              elevation: 24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              marginLeft: H_W.width * 0.04,
            }}
          />
        </TouchableOpacity>
      </View>
    ));
  };
  const QsGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen
      style={{
        backgroundColor: `rgba(${colors.rgb_Primary}, 0.15)`,
      }}>
      <View
        style={{
          width: H_W.width,
          height: HEIGHT * 0.15,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          backgroundColor: colors.primary,
          paddingHorizontal: H_W.width * 0.04,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: HEIGHT * 0.04,
            marginBottom: HEIGHT * 0.05,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={QsGoBack}>
            <Entypo name="chevron-left" color="white" size={H_W.width * 0.06} />
          </TouchableOpacity>
          <View style={{width: '85%', marginLeft: H_W.width * 0.05}}>
            <QsSearchBar changeSearchText={changeSearchText} />
          </View>
        </View>
      </View>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}>
        {searchText !== '' ? RenderSearchedResult() : CardRender(Data.product)}
      </KeyboardAwareScrollView>
    </WrapperScreen>
  );
}

const mapStateToProps = (state) => ({
  QsFavs: state.QsToggleFav,
});

export default connect(mapStateToProps, {
  QssetCurrentProductAction,
})(Search);
