import { useState, useEffect } from 'react'
import { getProductById } from '../services/ProductServices.js'
import { useParams, Link } from 'react-router'

function ProductDetailsPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

useEffect(() => {
    getProductById(id)
      .then(data => setProduct(data))
      .catch((err) => console.error(err))
      console.log('product', product)
  }, [id])

    async function handleDelete(id) {
      try {
        await deleteProduct(id)
        console.log(`Product with id ${id} deleted successfully`)
        alert('Produit supprimé avec succès')
        navigate('/')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Erreur lors de la suppression du produit')
      }
    }
  

  if (!product) {
    return <p className="container mt-5">
        Chargement...
    </p>
  }
    
    return (
    <>
        <div className="container mt-5">
            <Link to="/" className="btn btn-secondary">
                    Retour
            </Link>
            <div className="card-body">
                <h2>{product.name}</h2>
                <img className="img-fluid rounded-3" src={product.image} alt={product.name} />
                <div className="d-flex cols-4">
                    <h5 className="card-title me-2">
                        {product.name}
                    </h5>
                    <span className={`badge ${product.available ? 'text-bg-success' : 'text-bg-secondary'}` }>
                        {product.available ? 'Dispo' : 'Pas dispo mec va voir ailleurs si j\'y suis'}
                    </span>
                </div>
                <p className="card-text">
                    {product.description}
                </p>
                <p className="fw-bold text-primary">
                    {product.price} €
                </p>
                <button className="btn btn-primary"
                onClick={() => {handleDelete(product.id)}}>
                    Supprimer un produit
                </button>
            </div>
        </div>
    </>
  )
}

export default ProductDetailsPage