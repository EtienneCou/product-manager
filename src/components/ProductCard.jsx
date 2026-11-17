import { Link } from 'react-router'

function ProductCard({product}) {
    return (
            <div className="card h-100 shadow-sm">
                <img className="card-img-top" src={product.image} alt={product.name} />
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title">
                            {product.name}
                        </h5>
                        <span className={`badge ${product.available ? 'text-bg-success' : 'text-bg-secondary'}`}>
                            {product.available ? 'Dispo' : 'Pas dispo mec va voir ailleurs si j\'y suis'}
                        </span>
                    </div>
                    <p className="card-text">
                        {product.description}
                    </p>
                    <p className="fw-bold text-primary">
                        {product.price} €
                    </p>
                    <button className="btn btn-primary">
                        Ajouter un produit
                    </button>
                    
                    <button className="btn btn-primary">
                        <Link className="nav-link" to={`/products/${product.id}`}>
                            Détails
                        </Link>
                    </button>
                </div>
            </div>
    )
}

export default ProductCard