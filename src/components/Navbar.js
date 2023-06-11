import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

const styleList = {
  width: '.5em',
  height: '.5em'
};
const Navbar = ({ user, setUser }) => {


  const Handlelogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser('')
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/app/operarios">Home</Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/app/operarios">Operarios</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/app/gerentes">Gerentes</Link>
            </li>
          </ul>
          {/* Usuario de sesión */}

          <div className="dropdown">
            <button onClick={Handlelogout} className="btn btn-secondary " type="button">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;