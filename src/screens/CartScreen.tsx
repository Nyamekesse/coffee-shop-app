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
import CartItem from '../components/CartItem';
import EmptyListAnimation from '../components/EmptyListAnimation';
import HeaderBar from '../components/HeaderBar';
import PaymentFooter from '../components/PaymentFooter';
import {useStore} from '../store/store';
import {COLORS, SPACING} from '../theme/theme';

type RootStackParamList = {
  Home: undefined;
  Cart: {id: string; index: number; type: string};
};

type CartScreenRouteProp = RouteProp<RootStackParamList, 'Cart'>;
interface CartScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: CartScreenRouteProp;
}

const CartScreen: React.FC<CartScreenProps> = ({navigation, route}) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const increaseCardItemQuantity = useStore(
    (state: any) => state.increaseCardItemQuantity,
  );
  const decreaseCardItemQuantity = useStore(
    (state: any) => state.decreaseCardItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();
  const buttonPressHandler = () => {
    navigation.navigate('Payment');
  };

  const increaseCardItemQuantityHandler = (id: string, size: string) => {
    increaseCardItemQuantity(id, size);
    calculateCartPrice();
  };
  const decreaseCardItemQuantityHandler = (id: string, size: string) => {
    decreaseCardItemQuantity(id, size);
    calculateCartPrice();
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View
          style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Cart" />
            {CartList.length === 0 ? (
              <EmptyListAnimation title="Cart is Empty" />
            ) : (
              <View style={styles.listItemContainer}>
                {CartList.map((item: any, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('Details', {
                        index: item.index,
                        id: item.id,
                        type: item.type,
                      });
                    }}>
                    <CartItem
                      {...item}
                      increaseCardItemQuantityHandler={
                        increaseCardItemQuantityHandler
                      }
                      decreaseCardItemQuantityHandler={
                        decreaseCardItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {CartList.length != 0 ? (
            <PaymentFooter
              buttonTitle="Pay"
              price={{price: CartPrice, currency: '$'}}
              buttonPressHandler={buttonPressHandler}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

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
