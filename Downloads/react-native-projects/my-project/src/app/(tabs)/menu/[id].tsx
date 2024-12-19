import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router'

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView>
        <View>
          <Stack.Screen options={{ title: 'Details: ' + id }}/>
          <Text>ProductDetailScreen for id: {id}</Text>
        </View>
    </SafeAreaView>
  )
}

export default ProductDetailScreen;