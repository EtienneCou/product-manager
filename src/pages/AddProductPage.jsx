import { useState }   from 'react'
import { addProduct } from '../services/ProductServices'
import { useNavigate } from 'react-router'

function AddProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    
    const product = {
      name,
      description,
      price
    }
    
    try {
        await addProduct(product)
        navigate('/', {
          state: {
            notification: {
              variant: 'success',
              message: 'Produit ajouté avec succès.'
            }
          }
        })
    } catch (error) {
        console.error('Erreur lors de l’ajout du produit :', error)
        setErrorMessage('Erreur lors de l’ajout du produit. Réessayez.')
    }
  }


  return (
    <>
      <div className="container mt-5">
        <h3 className="mb-5">Ajouter un produit</h3>
        {errorMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {errorMessage}
            <button
              type="button"
              className="btn-close"
              aria-label="Fermer"
              onClick={() => setErrorMessage('')}
            />
          </div>
        )}
        <form onSubmit={handleSubmit}>
              <label htmlFor="fieldText" className="form-label">Nom</label>
              <input 
                className="form-control mb-3"
                placeholder="Nom du produit"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <label htmlFor="fieldText" className="form-label">Description</label>
              <input 
                className="form-control mb-3"
                placeholder="Description du produit"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <label htmlFor="fieldText" className="form-label">Prix</label>
              <input 
                className="form-control mb-3"
                placeholder="Prix du produit"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
              <button className="btn btn-primary">
                Ajouter le produit
              </button>
        </form>
      </div>
    </>
  )
}

export default AddProductPage
