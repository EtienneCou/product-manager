import { useState, useEffect } from 'react'
import {
    getProductById,
    deleteProduct,
    updateProductAvailability
} from '../services/ProductServices.js'
import { useParams, Link, useNavigate  } from 'react-router'

function ProductDetailsPage() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState('')
    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)
    const [availableDraft, setAvailableDraft] = useState(false)
    const [isUpdatingAvailability, setIsUpdatingAvailability] = useState(false)
    const [availabilityError, setAvailabilityError] = useState('')
    const navigate = useNavigate()

useEffect(() => {
    getProductById(id)
      .then(data => setProduct(data))
      .catch((err) => console.error(err))
      console.log('product', product)
  }, [id])


    function closeDeleteModal() {
      if (!isDeleting) {
        setShowDeleteModal(false)
        setDeleteError('')
      }
    }

    async function handleDelete() {
      setIsDeleting(true)
      setDeleteError('')

      try {
        await deleteProduct(product.id)
        navigate('/', {
          state: {
            notification: {
              variant: 'success',
              message: 'Produit supprimé avec succès.'
            }
          }
        })
      } catch (error) {
        console.error('Error deleting product:', error)
        setDeleteError('Erreur lors de la suppression du produit. Réessayez.')
      } finally {
        setIsDeleting(false)
      }
    }

    function openAvailabilityModal() {
      setAvailableDraft(product.available)
      setAvailabilityError('')
      setShowAvailabilityModal(true)
    }

    function closeAvailabilityModal() {
      if (!isUpdatingAvailability) {
        setShowAvailabilityModal(false)
      }
    }

    async function handleAvailabilitySave() {
      setIsUpdatingAvailability(true)
      setAvailabilityError('')

      try {
        const updatedProduct = await updateProductAvailability(product.id, availableDraft)
        setProduct(updatedProduct)
        setShowAvailabilityModal(false)
      } catch (error) {
        console.error('Error updating product availability:', error)
        setAvailabilityError('Erreur lors de la modification. Réessayez.')
      } finally {
        setIsUpdatingAvailability(false)
      }
    }
  

  if (!product) {
    return <p className="container mt-5">
        Chargement...
    </p>
  }
    
    return (
    <>
          <main className="container py-5">
              <Link to="/" className="btn btn-link link-secondary text-decoration-none px-0 mb-4">
                  &larr; Retour aux produits
              </Link>

              <article className="card border-0 shadow rounded-4 overflow-hidden">
                  <div className="row g-0">
                      <div className="col-lg-6">
                          <div className="position-relative">
                              <div className="ratio ratio-4x3">
                                  <img
                                      className="w-100 h-100 object-fit-cover"
                                      src={product.image}
                                      alt={product.name}
                                  />
                              </div>
                              <button
                                  type="button"
                                  className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow"
                                  onClick={openAvailabilityModal}
                                  aria-label="Modifier la disponibilité du produit"
                                  title="Modifier la disponibilité"
                              >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="18"
                                      height="18"
                                      fill="currentColor"
                                      viewBox="0 0 16 16"
                                      aria-hidden="true"
                                  >
                                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-9.5 9.5a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2 14 4.793 15.293 3.5 12.5.707zM13.293 5.5 10.5 2.707 4 9.207V12h2.793zM3 10.207l-.85 2.125 1.518-.607L4 11.793v-2.586z" />
                                  </svg>
                              </button>
                          </div>
                      </div>

                      <div className="col-lg-6">
                          <div className="card-body h-100 d-flex flex-column p-4 p-md-5">
                              <span
                                  className={`badge rounded-pill align-self-start mb-3 ${
                                      product.available ? 'text-bg-success' : 'text-bg-secondary'
                                  }`}
                              >
                                  {product.available ? 'Disponible' : 'Indisponible'}
                              </span>
                              <h1 className="display-6 fw-bold mb-3">{product.name}</h1>
                              <p className="fs-5 text-body-secondary mb-4">
                                  {product.description}
                              </p>

                              <div className="mt-auto border-top pt-4 d-flex flex-wrap align-items-end justify-content-between gap-3">
                                  <div>
                                      <span className="d-block small text-body-secondary">Prix</span>
                                      <span className="fs-2 fw-bold text-primary">{product.price} €</span>
                                  </div>
                                  <button
                                      type="button"
                                      className="btn btn-outline-danger rounded-pill px-4"
                                      onClick={() => setShowDeleteModal(true)}
                                  >
                                      Supprimer le produit
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </article>
          </main>
        {showDeleteModal && (
            <>
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-product-title"
                    aria-describedby="delete-product-description"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header">
                                <h2 className="modal-title fs-5" id="delete-product-title">
                                    Confirmer la suppression
                                </h2>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Fermer"
                                    onClick={closeDeleteModal}
                                    disabled={isDeleting}
                                />
                            </div>
                            <div className="modal-body">
                                <p id="delete-product-description" className="mb-0">
                                    Voulez-vous vraiment supprimer <strong>{product.name}</strong> ?
                                    Cette action est irréversible.
                                </p>
                                {deleteError && (
                                    <div className="alert alert-danger mt-3 mb-0" role="alert">
                                        {deleteError}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={closeDeleteModal}
                                    disabled={isDeleting}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Suppression…' : 'Oui, supprimer'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop show" aria-hidden="true" />
            </>
        )}
        {showAvailabilityModal && (
            <>
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="availability-modal-title"
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content border-0 shadow">
                            <div className="modal-header">
                                <h2 className="modal-title fs-5" id="availability-modal-title">
                                    Modifier la disponibilité
                                </h2>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Fermer"
                                    onClick={closeAvailabilityModal}
                                    disabled={isUpdatingAvailability}
                                />
                            </div>
                            <div className="modal-body">
                                <p>Choisissez si ce produit est disponible.</p>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="product-availability"
                                        checked={availableDraft}
                                        onChange={(event) => setAvailableDraft(event.target.checked)}
                                        disabled={isUpdatingAvailability}
                                    />
                                    <label className="form-check-label" htmlFor="product-availability">
                                        {availableDraft ? 'Disponible' : 'Indisponible'}
                                    </label>
                                </div>
                                {availabilityError && (
                                    <div className="alert alert-danger mt-3 mb-0" role="alert">
                                        {availabilityError}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={closeAvailabilityModal}
                                    disabled={isUpdatingAvailability}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAvailabilitySave}
                                    disabled={isUpdatingAvailability}
                                >
                                    {isUpdatingAvailability ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop show" aria-hidden="true" />
            </>
        )}
    </>
  )
}

export default ProductDetailsPage