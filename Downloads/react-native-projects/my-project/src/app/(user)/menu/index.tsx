import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import ProductListItem from '@components/ProductListItems';
import { useProductList } from '@/src/api/products';

export default function MenuScreen() {

  const { data: products } = useProductList();

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

