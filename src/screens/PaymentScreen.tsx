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
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentFooter from '../components/PaymentFooter';
import PaymentMethod from '../components/PaymentMethod';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const paymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

type RootStackParamList = {
  Home: undefined;
  Payment: {amount: string};
};

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
interface PaymentScreenProps {
  navigation: NavigationProp<ParamListBase>;
  route: PaymentScreenRouteProp;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({navigation, route}) => {
  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const buttonPressHandler = () => {};
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryWhiteHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Payments</Text>
          <View style={styles.emptyView}></View>
        </View>
        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity onPress={() => setPaymentMode('Credit Card')}>
            <View
              style={[
                styles.creditCardContainer,
                {
                  borderColor:
                    paymentMode === 'Credit Card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}>
              <Text style={styles.creditCardTitle}>Credit Card</Text>
              <View style={styles.creditCardBackground}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.linearGradientStyles}>
                  <View style={styles.creditCardRow}>
                    <CustomIcon
                      name="chip"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <CustomIcon
                      name="visa"
                      size={FONTSIZE.size_30 * 2}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View style={styles.creditCardNumberContainer}>
                    <Text style={styles.creditCardNumber}>1756</Text>
                    <Text style={styles.creditCardNumber}>9157</Text>
                    <Text style={styles.creditCardNumber}>2472</Text>
                    <Text style={styles.creditCardNumber}>1899</Text>
                  </View>
                  <View style={styles.creditCardRow}>
                    <View style={styles.creditCardNameContainer}>
                      <Text style={styles.creditCardNameSubTitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.creditCardNameTitle}>
                        Robert Evans
                      </Text>
                    </View>
                    <View style={styles.creditCardDateContainer}>
                      <Text style={styles.creditCardNameSubTitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.creditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {paymentList.map((paymentType: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setPaymentMode(paymentType.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={paymentType.name}
                icon={paymentType.icon}
                isIcon={paymentType.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{price: route.params.amount, currency: '$'}}
        buttonPressHandler={buttonPressHandler}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  emptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  paymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  creditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  creditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  creditCardBackground: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  linearGradientStyles: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  creditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  creditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  creditCardNameContainer: {
    alignItems: 'flex-start',
  },
  creditCardDateContainer: {
    alignItems: 'flex-end',
  },
  creditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  creditCardNameSubTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryLightGreyHex,
  },
});
