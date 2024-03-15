import React from 'react';
import {ImageProps, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import ImageBackgroundInfo from './ImageBackgroundInfo';

interface FavoriteItemProps {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  roasted: string;
  prices: any;
  type: string;
  imagelink_portrait: ImageProps;
  special_ingredient: string;
}

const FavoritesItemCard: React.FC<FavoriteItemProps> = ({
  id,
  name,
  favourite,
  roasted,
  special_ingredient,
  type,
  average_rating,
  description,
  ingredients,
  ratings_count,
  imagelink_portrait,
}) => {
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const toggleFavouriteHandler = (
    favourite: boolean,
    type: string,
    id: string,
  ) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  return (
    <View style={styles.cardContainer}>
      <ImageBackgroundInfo
        id={id}
        name={name}
        ingredients={ingredients}
        average_rating={average_rating}
        roasted={roasted}
        type={type}
        favourite={favourite}
        ratings_count={ratings_count}
        imagelink_portrait={imagelink_portrait}
        special_ingredient={special_ingredient}
        enableBackHandler={false}
        toggleFavourite={toggleFavouriteHandler}
        backHandler={() => {
          console.log('hi');
        }}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.containerLinearGradient}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

export default FavoritesItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  containerLinearGradient: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  descriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});
