import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {useStore} from '../store/store';

type RootStackParamList = {
  Home: undefined;
  Details: {id: string; index: number; type: string};
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
interface Props {
  navigate: NavigationProp<ParamListBase>;
  route: DetailsScreenRouteProp;
}

const DetailsScreen = ({navigate, route}: Props) => {
  const {type, index, id} = route.params;
  const itemOfIndex = useStore((state: any) =>
    type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[index];
  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({});
