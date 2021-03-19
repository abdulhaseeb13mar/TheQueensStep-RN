/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {
  QsremoveFavAction,
  QssetFavAction,
  QssetCurrentProductAction,
} from '../QsRedux/QsActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../QsComp/QsHeader';
import WrapperScreen from '../QsComp/WrapperScreen';
import NavigationRef from '../QsComp/RefNavigation';
import Loop from '../QsComp/QsFlatList';
import {QsHorizontalTile} from './QsHome';
import {H_W} from '../QsComp/QsDim';
import {colors} from '../QsComp/QsColor';

const QsFavourites = (props) => {
  const QsGoToSingleProduct = (item) => {
    props.QssetCurrentProductAction(item);
    NavigationRef.Navigate('QsSP');
  };

  const QsGoBack = () => NavigationRef.Navigate('QsHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        <Loop
          ListHeaderComponent={
            <UseHeader
              leftIcon={Entypo}
              leftIconName="chevron-left"
              leftIconAction={QsGoBack}
              Title={`${props.QsFavs.length} Favourites`}
            />
          }
          data={props.QsFavs}
          renderItem={({item}) => (
            <QsHorizontalTile
              item={item}
              QsGoToSingleProduct={QsGoToSingleProduct}
              QsFavs={props.QsFavs}
              QssetFav={(i) => props.QssetFavAction(i)}
              QsremoveFav={(i) => props.QsremoveFavAction(i)}
            />
          )}
          horizontal={false}
        />
      </View>
      <Entypo
        name="heart"
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
    </WrapperScreen>
  );
};

const mapStateToProps = (state) => {
  return {
    QsFavs: state.QsToggleFav,
  };
};

export default connect(mapStateToProps, {
  QssetFavAction,
  QssetCurrentProductAction,
  QsremoveFavAction,
})(QsFavourites);
