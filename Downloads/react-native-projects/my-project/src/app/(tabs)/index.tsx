import { View, StyleSheet } from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItems';

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[3]}/>
    </View>
  );
}

const styles = StyleSheet.create({

});
