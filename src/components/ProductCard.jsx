import { Link } from 'react-router'

function ProductCard({ product }) {
  return (
    <article className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="position-relative">
        <div className="ratio ratio-4x3">
          <img
            className="w-100 h-100 object-fit-cover"
            src={product.image}
            alt={product.name}
          />
        </div>
        <span
          className={`badge rounded-pill position-absolute top-0 start-0 m-3 ${
            product.available ? 'text-bg-success' : 'text-bg-secondary'
          }`}
        >
          {product.available ? 'Disponible' : 'Indisponible'}
        </span>
      </div>

      <div className="card-body d-flex flex-column p-4">
        <h2 className="card-title h5 fw-bold mb-2">{product.name}</h2>
        <p className="card-text text-body-secondary flex-grow-1 mb-4">
          {product.description}
        </p>

        <div className="d-flex align-items-center justify-content-between gap-3 border-top pt-3 mt-auto">
          <span className="fs-4 fw-bold text-primary">{product.price} €</span>
          <Link
            className="btn btn-primary rounded-pill px-4"
            to={`/products/${product.id}`}
          >
            Voir le produit
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
