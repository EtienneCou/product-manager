import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import {getProducts} from '../services/ProductServices.js'

function ProductPage() {
  const [products, setProducts] = useState([])

useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch((err) => console.error(err))
      console.log('product', products)
  }, [])

  

  return (
    <>
      <div className="container mt-5 mb-5">
        <h1 className="mb-4">Bienvenue sur Product Manager</h1>

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-4" key={product.id}>
              <ProductCard key={product.id} product={product}/>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProductPage
