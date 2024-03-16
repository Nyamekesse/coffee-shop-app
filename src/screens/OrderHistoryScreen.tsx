import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import OrderHistoryCard from '../components/OrderHistoryCard';
import PopUpAnimation from '../components/PopUpAnimation';
import {useStore} from '../store/store';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

type RootStackParamList = {
  Home: undefined;
  OrderHistory: {};
};

type OrderHistoryScreenRouteProp = RouteProp<
  RootStackParamList,
  'OrderHistory'
>;
interface OrderHistoryScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: OrderHistoryScreenRouteProp;
}

const OrderHistory: React.FC<OrderHistoryScreenProps> = ({navigation}) => {
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const [showAnimation, setShowAnimation] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();

  const navigationHandler = ({
    index,
    id,
    type,
  }: {
    index: number;
    id: string;
    type: string;
  }) => {
    navigation.navigate('Details', {index, id, type});
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation && (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require('../lottie/download.json')}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View
          style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Order History" />
            {OrderHistoryList.length === 0 ? (
              <EmptyListAnimation title="No Order History!" />
            ) : (
              <View style={styles.listItemContainer}>
                {OrderHistoryList.map((history: any, index: any) => (
                  <OrderHistoryCard
                    key={index}
                    navigationHandler={navigationHandler}
                    {...history}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => {
                buttonPressHandler();
              }}>
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistory;

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
    gap: SPACING.space_30,
  },
  lottieAnimation: {
    height: 250,
  },
  downloadButton: {
    marginHorizontal: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
