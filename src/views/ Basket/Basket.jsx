import React, { useEffect, useState, useContext } from 'react'
import { API_URL } from '../Catalog/Catalog'
import AppContext from '../../context'
import BasketCard from '../../components/BasketCard/BasketCard'
import './Basket.css'

const Basket = () => {
  const { basketItems } = useContext(AppContext)
  const uniqueBasketItems = Object.keys(basketItems).length

  const totalAmount = Object.values(basketItems).reduce((total, amount) => total += amount, 0)

  const [products, setProducts] = useState([])
  
  const buyItems = () => {
    const productsToBuy = products.map(({name, amount, price}) => ({
      name,
      amount,
      price,
      totalPrice: price * amount
    }))
    console.debug(productsToBuy)
  }
  const [totalPrice, setTotalPrice] = useState(0)

  const updateProductsAmountValues = () => {
    const newProducts = products.map((product) => ({
      ...product,
      amount: basketItems[product.productId]
    }))
 
    setProducts(newProducts)
  }

  const updateTotalPrice = () => {
    const newTotalPrice = products.reduce((total, { amount, price }) => total += amount * price, 0)
 
    setTotalPrice(newTotalPrice)
  }

  const fetchProducts = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((responseData) => {
        const allProducts = responseData.flowerlist
        const newProducts = []

        allProducts.forEach((product) => {
          const id = product.productId
          const isExistInBasket = basketItems.hasOwnProperty(id)
          
          if (isExistInBasket) {
            newProducts.push({
              ...product,
              amount: basketItems[id]
            })
          }
        })

        setProducts(newProducts)
      })
  }

  useEffect(() => {
    fetchProducts() 
  }, [uniqueBasketItems])

  useEffect(() => {
    updateProductsAmountValues()
  }, [basketItems])

  useEffect(() => {
    updateTotalPrice()
  }, [products])

  return (
    <div className="basket">
      <div className="basket__body">
        <h1 className="basket__title">Your Cart</h1>
        {products.length ? (
          <ul className="basket__list">
            {products.map((product) => {
              const {
                category,
                name,
                price,
                productId,
                amount,
              } = product

              return (
                <li className="basket__item" key={productId}>
                  <BasketCard
                    title={name}
                    category={category}
                    price={price}
                    id={productId}
                    amount={amount}
                    imgSrc="https://placekitten.com/146/146"
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="basket__empty-message">
            Basket is empty
          </div>
        )}
      </div>
      <div className="basket__summary">
        <div className="basket__summary-info">
          Subtotal for {totalAmount} items: {totalPrice.toFixed(2)}$
        </div>
        <button className="basket__summary-submit-button" type="button" onClick={buyItems}>
          Checkout
        </button>
      </div>
    </div>
  )
}

export default Basket