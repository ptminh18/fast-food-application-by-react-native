import { View, StyleSheet, FlatList } from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItems';

export default function MenuScreen() {
  return (
    <View>
      <FlatList 
      data={products} 
      renderItem={({ item }) => <ProductListItem product={item}/>}
      numColumns={2} 
      contentContainerStyle={{ gap:10 }} 
      columnWrapperStyle={{ gap: 10, padding: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({

});
