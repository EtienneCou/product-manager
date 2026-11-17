import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import {getProducts} from '../services/ProductServices.js'
import { useLocation, useNavigate } from 'react-router'

function ProductPage() {
  const [products, setProducts] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const notification = location.state?.notification

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

        {notification && (
          <div className={`alert alert-${notification.variant} alert-dismissible fade show`} role="alert">
            {notification.message}
            <button
              type="button"
              className="btn-close"
              aria-label="Fermer"
              onClick={() => navigate(location.pathname, { replace: true, state: null })}
            />
          </div>
        )}

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
