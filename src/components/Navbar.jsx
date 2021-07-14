import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoCabletronics from "../logos/logoCabletronics.png";
import { auth } from "../firebase";

import { withRouter } from "react-router-dom";

const Navbar = (props) => {
  const cerrarSesion = () => {
    auth
      .signOut() //para cerrar la sesion activa y mostrar al usuario la pagina login
      .then(() => {
        props.history.push("/login");
      });
  };

  return (
    <div className="navbar navbar-light bg-light navbar-expand-{sm}" id="navbar">
      <Link className="navbar-brand" to="/login">
        <img src={logoCabletronics} width="200" alt="" id="logo"/>
      </Link>
      <div>
        <div className="d-flex">
    
          {
          props.firebaseUser !== null ? (
            <NavLink className="btn btn-dark btn-xs m-2" to="/usuario" hidden="show">
              Usuario
            </NavLink>
          ) : null
          }

        {
            props.firebaseUser !== null ? (
                <NavLink className="btn btn-dark btn-xs m-2" to="/ordenes">
                Ordenes
                </NavLink>
            ) : null
        }
        {
            props.firebaseUser !== null ? (
                <NavLink className="btn btn-dark btn-xs m-2" to="/alarmas">
                Alarmas
                </NavLink>
            ) : null
        }
        {
          props.firebaseUser !== null ? (
            <button
              className="btn btn-dark btn-xs m-2"
              onClick={() => cerrarSesion()}
            >
              Cerrar sesión
            </button>
          ) : (
            <NavLink className="btn btn-dark btn-xs m-2" to="/login">
              Login
            </NavLink>
          )
          } 
          
        </div>
      </div>
    </div>
  );
};

export default withRouter(Navbar);
