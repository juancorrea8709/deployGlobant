import React from 'react'
import {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const [esRegistro, setEsRegistro] = React.useState(false)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            //console.log('Ingrese email')
            setError('Ingrese Email.')
            return
        }
        if(!pass.trim()){
            //console.log('Ingrese contraseña')
            setError('Ingrese contraseña.')
            return
        }
        if(pass.length < 6){
            //console.log('Contraseña mayor a 6 carácteres')
            setError('Contraseña de 6 carácteres o más.')
            return
        }

        setError(null)
        console.log('Pasando todas las validaciones')

        if(esRegistro){
            registrar()
        }else{
            login()
        }
    }

    const login = React.useCallback(async () => {

        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/usuario')

        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Usuario no autorizado.')
            }
            if(error.code === 'auth/user-not-found'){
                setError('Usuario no autorizado.')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta.')
            }
        }
    }, [email, pass, props.history])

    const registrar = React.useCallback(async() => {

        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection('empleados').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/')            

        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido.')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('Email ya esta registrado.')
            }              
        }

    }, [email, pass, props.history]);

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'REGISTRO DE USUARIO' : 'LOGIN DE ACCESO'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )                     
                        }
                        <input
                        type="email"
                        className="form-control mb-2"
                        placeholder="Ingrese email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        />
                        <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Ingrese contraseña"
                        onChange={e => setPass(e.target.value)}
                        value={pass}
                        />
                        <button
                        className="btn btn-info btn-lg mb-2 w-100"
                        type="submit"
                        
                        >
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>
                        <button
                        className="btn btn-info btn-sm mb-2 w-100"
                        onClick={() => setEsRegistro(!esRegistro)}
                        type="button"
                        hidden="show"
                        >
                            {
                                esRegistro ? 'Ya estas registrado?' : 'No tienes cuenta?'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login) 