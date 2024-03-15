import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoritesItemCard';
import HeaderBar from '../components/HeaderBar';
import {useStore} from '../store/store';
import {COLORS, SPACING} from '../theme/theme';

type RootStackParamList = {
  Home: undefined;
  Favorite: {id: string; index: number; type: string};
};

type FavoriteScreenRouteProp = RouteProp<RootStackParamList, 'Favorite'>;
interface FavoriteScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: FavoriteScreenRouteProp;
}

const FavoritesScreen: React.FC<FavoriteScreenProps> = ({
  navigation,
  route,
}) => {
  const tabBarHeight = useBottomTabBarHeight();
  const FavoriteList = useStore((state: any) => state.FavoriteList);

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View
          style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Favorites" />
            {FavoriteList.length === 0 ? (
              <EmptyListAnimation title="No Favorites!" />
            ) : (
              <View style={styles.listItemContainer}>
                {FavoriteList.map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('Details', {
                        index: item.index,
                        id: item.id,
                        type: item.type,
                      });
                    }}>
                    <FavoritesItemCard {...item} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});
