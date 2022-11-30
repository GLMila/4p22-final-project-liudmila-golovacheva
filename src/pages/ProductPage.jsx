import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API_URL } from '../views/Catalog/Catalog'
import Product from '../views/Product/Product'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const {
    category,
    instructions,
    name,
    price,
  } = product

  const fetchProductInfo = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((response) => {
        const product = response.flowerlist.find(({ productId }) => productId.toString() === id)

        setProduct(product)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchProductInfo()
  }, [])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return (
    <Product
      id={id}
      imgSrc="https://placekitten.com/356/326"
      title={name}
      description={instructions}
      category={category}
      price={price}
      />
  )
}
      
export default ProductPage