import { View, Text, Platform } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCart } from '@/src/providers/CartProvider';
import { FlatList } from 'react-native';
import CartListItem from '../components/CartListItem';

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({item}) => <CartListItem cartItem={item}/>}
        contentContainerStyle={{padding: 10, gap: 10}}
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto' }/>
    </View>
  )
}

export default CartScreen