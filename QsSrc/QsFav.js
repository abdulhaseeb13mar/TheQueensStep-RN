/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import {
  QsremoveFavAction,
  QssetFavAction,
  QssetCurrentProductAction,
} from '../QsRedux/QsActions';
import Entypo from 'react-native-vector-icons/Entypo';
import UseHeader from '../QsComp/QsHeader';
import WrapperScreen from '../QsComp/WrapperScreen';
import NavigationRef from '../QsComp/RefNavigation';
import {QsHorizontalTile} from './QsHome';

const QsFavourites = (props) => {
  const QsGoToSingleProduct = (item) => {
    props.QssetCurrentProductAction(item);
    NavigationRef.Navigate('QsSP');
  };

  const QsGoBack = () => NavigationRef.Navigate('QsHome');

  return (
    <WrapperScreen style={{backgroundColor: 'white'}}>
      <UseHeader
        leftIcon={Entypo}
        leftIconName="chevron-left"
        leftIconColor="black"
        leftIconAction={QsGoBack}
        Title={
          <Text
            style={{
              color: 'black',
              fontSize: 22,
            }}>
            {props.QsFavs.length} Favourites
          </Text>
        }
      />
      {props.QsFavs.map((item, index) => (
        <QsHorizontalTile
          key={index}
          item={item}
          QsGoToSingleProduct={QsGoToSingleProduct}
        />
      ))}
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
