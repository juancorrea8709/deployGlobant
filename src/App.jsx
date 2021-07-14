import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Alarmas from './components/Alarmas'
import Usuario from './components/Usuario'
//import Ordenes from './components/Ordenes'
import Formulario from './components/Formulario'

import {auth} from './firebase'

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if(user){
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
      <Navbar firebaseUser={firebaseUser}/>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/usuario">
          <Usuario />
        </Route>
        <Route path="/ordenes">
          <Formulario />
        </Route> 
        <Route path="/alarmas">
          <Alarmas />
        </Route>        
      </Switch>
    </div>
    </Router>    
  ) : (
    <p>CARGANDO DATOS ...</p>
  )
}

export default App;
