import { View, StyleSheet } from 'react-native';
import products from '@/assets/data/products';
import { HelloWave } from '@/src/components/HelloWave';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import ProductListItem from '@/src/components/ProductListItems';

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[3]}/>
    </View>
  );
}

const styles = StyleSheet.create({

});
