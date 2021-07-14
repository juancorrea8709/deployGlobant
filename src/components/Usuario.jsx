import React from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'
import logoEsu from '../logos/logoEsu.png'


const Usuario = (props) => {

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if(auth.currentUser){                               //para saber si un usuario esta activo o no y poder mostrar botones.
            console.log('existe usuario')
            setUser(auth.currentUser)
        }else{
            console.log('no existe usuario')
            props.history.push('/login')
        }
    }, [props.history])

    return (
        <div className="container mt-5" id="cardUsuario">
            <div className="card w-100 text-center">
                <div className="card-body">
                    <h1 className="card-title">BIENVENIDO</h1>
                    <img src={logoEsu} width="100" alt="" id="logo" response />
                    <h5 className="card-title mt-3">USUARIO ACTIVO</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Email registrado</h6>
                    <div className="card-text">
                        {
                            user && (
                                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Usuario)