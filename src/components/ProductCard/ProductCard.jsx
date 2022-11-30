import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context'
import Button from '../Button/Button'
import Counter from '../Counter/Counter'
import './ProductCard.css'

const ProductCard = (props) => {
  const {
    id,
    title,
    description,
    price = 0,
    imgSrc,
    category
  } = props

  const { 
    basketItems, 
    addToBasket,
    increaseBasketItem, 
    decreaseBasketItem,
  } = useContext(AppContext)

  const amount = basketItems[id] ?? 0
  const isExistInBasket = amount > 0

  const onBuyButtonClick = () => {
    addToBasket(id)
  }
  const href =`/catalog/${id}`

  return (
    <article className="product-card">
      <div className="product-card__category">{category}</div>
      <Link 
        className="product-card__image-wrapper" 
        to={href}
        title="Перейти на страницу товара"
        aria-label="Перейти на страницу товара"
      >
        <img 
          className="product-card__image"
          src={imgSrc}
          alt={title}
          width="250"
          height="230"
          loading="lazy"
        />
      </Link>
      <div className="product-card__body">
        <Link className="product-card__title" to="href">{title}</Link>
        <div className="product-card__description" title={description}>{description}</div>
      </div>
      {isExistInBasket && (
        <Counter 
          value={amount}
          onDecrease={() => decreaseBasketItem(id)}
          onIncrease={() => increaseBasketItem(id)}
        />
      )}
      <div className="product-card__info">
        <div className="product-card__price">{price} $</div>
        <Button 
          className="product-card__add-to-card-button"
          type="button"
          onClick={onBuyButtonClick}
        >
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.70343 0.23877C4.1189 0.23877 4.47657 0.54044 4.55605 0.9574C4.58696 1.21975 4.80932 1.41746 5.07348 1.41746H19.8094C20.5428 1.41746 21.1281 2.16334 20.9222 2.91512L18.9712 9.98871C18.8303 10.497 18.3751 10.8469 17.8585 10.8469H7.4679C6.91421 10.8469 6.49681 11.3501 6.59911 11.8943C6.67767 12.3122 7.04266 12.615 7.4679 12.615H17.8657C18.3462 12.615 18.7328 13.0091 18.7328 13.499C18.7328 13.9889 18.3462 14.383 17.8657 14.383H5.98312C5.60016 14.383 5.24249 14.081 5.16301 13.6647L3.33172 3.85852C3.13125 2.78502 2.19424 2.0068 1.10219 2.0068C0.623487 2.0068 0.235107 1.61083 0.235107 1.12278C0.235107 0.634734 0.623487 0.23877 1.10219 0.23877H3.70343ZM4.85953 17.3297C4.85953 16.3536 5.63629 15.5617 6.59369 15.5617C7.55109 15.5617 8.32785 16.3536 8.32785 17.3297C8.32785 18.3058 7.55109 19.0977 6.59369 19.0977C5.63629 19.0977 4.85953 18.3058 4.85953 17.3297ZM18.7328 17.3297C18.7328 18.3058 17.956 19.0977 16.9986 19.0977C16.0412 19.0977 15.2645 18.3058 15.2645 17.3297C15.2645 16.3536 16.0412 15.5617 16.9986 15.5617C17.956 15.5617 18.7328 16.3536 18.7328 17.3297Z" fill="#FF8F52"/>
          </svg>
          <span>Add to cart</span>
        </Button>
      </div>
    </article>
  )
}

export default ProductCard