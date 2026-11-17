import { useState }   from 'react'
import { addProduct } from '../services/ProductServices'

function AddProductPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    
    const product = {
      name,
      description,
      price
    }
    
    try {
        const newProduct = await addProduct(product)
        console.log('produit ajouté :', product)
        alert('Produit ajouté avec succès')
        navigate('/')
    } catch (error) {
        console.log(error)
        alert('Erreur lors de l\'ajout')
    }
    console.log({ name, description, price })
  }


  return (
    <>
      <div className="container mt-5">
        <h3 className="mb-5">Ajouter un produit</h3>
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
