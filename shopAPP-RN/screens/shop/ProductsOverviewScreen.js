import React from 'react'
import { FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shops/ProductItem'
// immport ProductItem from '../../components/shops/ProductItem.js'

const ProductsOverviewScreen = props => {
  const products = useSelector(state => {
    return state.products.availableProducts
  })
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  )
}

export default ProductsOverviewScreen
