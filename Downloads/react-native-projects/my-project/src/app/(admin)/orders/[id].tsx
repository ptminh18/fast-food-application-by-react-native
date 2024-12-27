import orders from '@/assets/data/orders';
import { Text, View, FlatList } from 'react-native';
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from '@/src/components/OrderListItem';
import OrderItemListItem from '@/src/components/OrderItemListItem';

export default function OrderDetailScreen() {
    const { id } = useLocalSearchParams();

    const order = orders.find((o) => String(o.id) === id);

    if (!order) {
        return (<Text>Not Found!</Text>);
    }

    return (
        <View style={{ padding: 10, gap: 20, flex: 1 }}>
            <Stack.Screen options={{ title:`Order #${id}`}}/>
            <OrderListItem order={orders}/>

            <FlatList 
            data={order.order_items} 
            renderItem={({ item }) => <OrderItemListItem item={item} />}
            contentContainerStyle={{ gap: 10 }}
            //ListHeaderComponent={() => <OrderListItem order={order} />}
            />
        </View>
    );
}