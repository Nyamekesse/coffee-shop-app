import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import {useStore} from '../store/store';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

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
  const [fullDesc, setFullDesc] = useState(false);
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
        <View style={styles.footerInfoArea}>
          <Text style={styles.infoTitle}>Description</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.descriptionText}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => setFullDesc(prev => !prev)}>
              <Text style={styles.descriptionText} numberOfLines={3}>
                {itemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
        </View>
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
  footerInfoArea: {
    padding: SPACING.space_20,
  },
  infoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  descriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
});
