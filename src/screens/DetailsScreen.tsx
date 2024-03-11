import React from 'react';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';

import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import {useStore} from '../store/store';
import {COLORS} from '../theme/theme';

type RootStackParamList = {
  Home: undefined;
  Details: {id: string; index: number; type: string};
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
interface Props {
  navigation: NavigationProp<ParamListBase>;
  route: DetailsScreenRouteProp;
}

const DetailsScreen = ({navigation, route}: Props) => {
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const backHandler = () => {
    navigation.goBack();
  };
  const toggleFavouriteHandler = (
    favourite: boolean,
    type: string,
    id: string,
  ) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  const {type, index, id} = route.params;
  const itemOfIndex = useStore((state: any) =>
    type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[index];
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <ImageBackgroundInfo
          enableBackHandler={true}
          {...itemOfIndex}
          backHandler={backHandler}
          toggleFavourite={toggleFavouriteHandler}
        />
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
});
