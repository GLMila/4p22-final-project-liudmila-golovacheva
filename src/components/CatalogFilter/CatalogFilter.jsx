import React, { useEffect, useState} from 'react'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { defaultCategory } from '../../views/Catalog/Catalog'
import './CatalogFilter.css'

const CatalogFilter = (props) => {
  const { 
    products,
    setFilteredProducts,
    categories,
  } = props

  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(defaultCategory)

  const filter = () => {
    const newFilteredProducts = products.filter(({ name, category }) => {
      const isCategoryTheSame = category === activeCategory
      const isDefaultCategory = activeCategory === defaultCategory
      const nameFormatted = name.toLowerCase()
      const searchQueryFormatted = searchQuery.toLowerCase()
      const isNameIncludesSearchQuery = nameFormatted.includes(searchQueryFormatted)
 
      return (isCategoryTheSame || isDefaultCategory) && isNameIncludesSearchQuery
    })
 
    setFilteredProducts(newFilteredProducts)
  }
 
  const onInputChange = ({ target }) => {
    setSearchQuery(target.value)
  }

  const onCategoryButtonClick = (categoryName) => {
    setActiveCategory(categoryName)
  }

  useEffect(() => {
    filter()
  }, [searchQuery, activeCategory])

  return (
    <div className="catalog__filter">
      <Input
        className="catalog-filter__input"
        placeholder="Search...."
        value={searchQuery}
        onChange={onInputChange}
      />
      <div className="catalog-filter__categories">
        {categories.map((categoryName) => {
          const isActive = categoryName === activeCategory
          let classNameFormatted = 'catalog-filter__category-button'
          if (isActive) {
            classNameFormatted += ' is-active'
          }
          return (
            <Button
              key={categoryName}
              className={classNameFormatted}
              type="button"
              onClick={() => onCategoryButtonClick(categoryName)}
            >
              {categoryName}
            </Button>
          )
        })}
      </div>  
    </div>
  )
}

export default CatalogFilter