import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav className="navbar sticky-top bg-white border-bottom shadow-sm py-3" aria-label="Navigation principale">
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3">
        <NavLink
          className="navbar-brand d-flex align-items-center gap-2 m-0 fw-bold text-dark"
          to="/"
          end
        >
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-3 bg-primary text-white"
            style={{ width: 40, height: 40 }}
            aria-hidden="true"
          >
            PM
          </span>
          <span>Product Manager</span>
        </NavLink>

        <div className="d-flex flex-wrap align-items-center gap-2 ms-auto">
          <NavLink
            className={({ isActive }) =>
              `btn rounded-pill px-3 ${
                isActive ? 'btn-primary' : 'btn-outline-secondary'
              }`
            }
            to="/"
            end
          >
            Catalogue
          </NavLink>
          <NavLink
            className="btn btn-primary rounded-pill px-4"
            to="/products/add"
          >
            <span className="me-1" aria-hidden="true">+</span>
            Ajouter un produit
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar