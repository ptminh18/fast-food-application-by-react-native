import { View, Image, Text, StyleSheet, Platform } from 'react-native';
import products from '@/assets/data/products';
import { HelloWave } from '@/src/components/HelloWave';
import ParallaxScrollView from '@/src/components/ParallaxScrollView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import { Colors } from '@/src/constants/Colors';

const product = products[0];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image}} style={styles.image}/>


      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,

  },
  image: {
    width: '100%',
    aspectRatio: 1,
  }, 
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'gray',
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 10,
  },
  price:{
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
