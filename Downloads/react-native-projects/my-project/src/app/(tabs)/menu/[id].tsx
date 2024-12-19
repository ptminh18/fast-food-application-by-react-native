import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItems';
import Button from '@/src/components/button';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [selectedSize, setSelectedSize] = useState('M');

  const product = products.find((p) => p.id.toString() == id);

  const addToCart = () => {
    console.warn('Adding to cart,', product?.name, ' size:', selectedSize);
  }

  if (!product) {
    return <Text>Product not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }}/>
      <Image 
        source={{ uri: product.image || defaultPizzaImage }} 
        style={styles.image}
      />

      <Text>Select size</Text>
      
      <View style={styles.sizes}>
        {sizes.map(size => ( // sizes map
        <Pressable 
          onPress={() => { setSelectedSize(size) }}
          style={[
          styles.size, { 
            backgroundColor: selectedSize === size ? 'gainsboro' : 'white' 
            },
            ]} 
            key={size} 
        >
          <Text style={[
            styles.sizeText, {
              color: selectedSize === size ? 'black' : 'gray' 
            },
            ]}
          >
            {size}
          </Text>
        </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>

        <Button onPress={addToCart} text='Add to cart'/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,

  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 100, //temp----------------------
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center', //vertical line
    justifyContent: 'center', //horizontal line
  },
  sizeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default ProductDetailScreen;