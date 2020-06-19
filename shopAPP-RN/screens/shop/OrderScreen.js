import React from 'react'
import { View, Flatlist } from 'react-native'
import { useSelector } from 'react-redux'

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders)
  return <Flatlist data={orders} keyExtractor={item => item.id} renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>} />
}

OrdersScreen.navigationOptions = {
  headerTitle: 'Your Orders'
}
export default OrdersScreen
