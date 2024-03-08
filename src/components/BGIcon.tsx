import React from 'react';
import {StyleSheet, View} from 'react-native';
import {BORDERRADIUS, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface BGIconsProps {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}
const BGIcon: React.FC<BGIconsProps> = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.IconBg, {backgroundColor: BGColor}]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  IconBg: {
    height: SPACING.space_30,
    width: SPACING.space_30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_8,
  },
});
