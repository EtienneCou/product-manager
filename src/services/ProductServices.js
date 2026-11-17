const API_URL = 'http://localhost:3000/products'

export async function getProducts() {
    const response = await fetch(API_URL)

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des produits')
    }

    return await response.json()
}

export async function addProduct(product) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            ...product,
            image: product.image || "https://placehold.co/400x250",
            available: product.available || true
        })
    })

    if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout du produit')
    }

    return await response.json()    
}  

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`)

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération d\'un produit')
    }

    return await response.json()   
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression du produit')
    }

    return await response.json()
}