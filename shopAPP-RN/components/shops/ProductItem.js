import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'

const ProductItem = props => {
  return (
    <View styles={styles.product}>
      <Image />
      <Text> TITLE </Text>
      <Text>$PRICE</Text>
      <View>
        <Button title='View Details' />
        <Button title='To Cart' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8, 
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300
  }

})

export default ProductItem
