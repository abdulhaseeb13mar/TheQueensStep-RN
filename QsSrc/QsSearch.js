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
import UseHeader from '../QsComp/QsHeader';
import {QsHorizontalTile} from './QsHome';

function Search(props) {
  const [searchText, setSearchText] = useState('');

  const insets = useSafeAreaInsets();
  const HEIGHT = H_W.height - (insets.bottom + insets.top);

  const RenderSearchedResult = () => {
    var SearchedItems = Data.product.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()),
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
      <QsHorizontalTile
        key={index}
        item={item}
        QsGoToSingleProduct={QsGoToSingleProduct}
      />
    ));
  };
  const QsGoBack = () => NavigationRef.GoBack();

  const changeSearchText = (t) => setSearchText(t);
  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconAction={QsGoBack}
        rightIconAction={() => props.QsresetCart()}
        leftIconColor="black"
        Title={<Text style={{color: 'black', fontSize: 22}}>Search</Text>}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{width: '85%', margin: 'auto'}}>
          <QsSearchBar changeSearchText={changeSearchText} />
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
