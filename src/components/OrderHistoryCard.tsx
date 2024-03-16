import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import OrderItemCard from './OrderItemCard';

interface OrderHistoryCardProps {
  CartListPrice: string;
  OrderDate: string;
  CartList: [Object];
  navigationHandler: () => void;
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  CartList,
  CartListPrice,
  OrderDate,
  navigationHandler,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.headerTitle}>Order Time</Text>
          <Text style={styles.headerSubTitle}>{OrderDate}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.headerTitle}>Total Amount</Text>
          <Text style={styles.headerPrice}>$ {CartListPrice}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        {CartList.map((cart: any, index: number) => (
          <TouchableOpacity key={index}>
            <OrderItemCard {...cart} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default OrderHistoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    gap: SPACING.space_10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  headerSubTitle: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  headerPrice: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  listContainer: {
    gap: SPACING.space_20,
  },
});
