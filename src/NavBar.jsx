import { NavLink } from "react-router";
import ProductPage from "./pages/ProductPage";
import AddProductPage from "./pages/AddProductPage";

function NavBar() {
  return (
    <nav className="navbar bg-light shadow-sm nav-overflow" data-bs-toggle="nav-overflow">
        <NavLink className="navbar-brand m-1" aria-current="page" to="/" end>
            Accueil
        </NavLink>
        <ul className="nav nav-pills d-flex gap-3">
            <li className="nav-item">
                <NavLink className="nav-link" to="/" end>
                Produit
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="products/add" end>
                Ajouter un produit
                </NavLink>
            </li>
        </ul>
    </nav> 
  );
}

export default NavBar