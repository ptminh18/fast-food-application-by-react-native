import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import products from '@assets/data/products';
import ProductListItem from '@components/ProductListItems';
import { Link } from 'expo-router';

export default function MenuScreen() {
  return (
    <SafeAreaView>
      <FlatList data={products} 
      renderItem={({item}) => <ProductListItem product={item}/>}
      numColumns={2} 
      contentContainerStyle={{ gap:10 }} 
      columnWrapperStyle={{ gap: 10, padding: 5 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
