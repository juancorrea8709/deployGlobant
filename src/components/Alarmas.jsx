import React, { Fragment } from 'react'
import {db, auth} from '../firebase'
import {withRouter} from 'react-router-dom'
import Buscador from './Buscador'
import moment from "moment";
import "moment/locale/es";



function Alarmas(props) {

  
  const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if(auth.currentUser){                               //para saber si un usuario esta activo o no y poder mostrar botones.
            console.log('existe usuario')
            
            setUser(auth.currentUser)
            console.log()
        }else{
            console.log('no existe usuario')
            console.log(user)
            props.history.push('/login')
        }
    }, [user, props.history])


  const [alarmas, setAlarmas] = React.useState([])
  const [alarma, setAlarma] = React.useState('')
  const [barrio, setBarrio] = React.useState('')
  const [comuna, setComuna] = React.useState('')
  const [lider, setLider] = React.useState('')
  const [direccion, setDireccion] = React.useState('')
  const [coordenadas, setCoordenadas] = React.useState('')
  const [telefonos, setTelefonos] = React.useState('')
  const [fechaInstalacion, setFechaInstalacion] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('') // para enlazar la busqueda

  

   //para agregar funcion al boton siguiente para
  const [ultimo, setUltimo] = React.useState(null)
  //para desactivar la funcion cuando llegue al ultimo documento
  const [desactivar, setDesactivar] = React.useState(false)
  
    React.useEffect(() => {

    const obtenerDatos = async () => {

      //para tener desactivado por defecto el boton siguiente
      setDesactivar(true)


      try {

        const data = await db.collection('alarmas')
        //.where('idAlarma', '==', '1008')
        .orderBy('idAlarma')
        .limit(1)
        .get() //consultar datos en firestore
        
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))

        setUltimo(data.docs[data.docs.length - 1])
        
        console.log(arrayData)
        setAlarmas(arrayData)
        
        //para tener desactivado el boton siguiente 
        const query = await db.collection('alarmas')
        .limit(1)
        .orderBy('idAlarma')
        .startAfter(data.docs[data.docs.length - 1])
        .get()

        if(query.empty){
          console.log('No hay más documentos')
          setDesactivar(true)
        }else{
          setDesactivar(false)
        }

      } catch (error) {
        console.log(error)
      }
    }
    

    obtenerDatos();

  }, [props.history])

  
  //para agregar la funcion al boton siguiente
    const siguiente = async () => {
      console.log('siguiente')
      try {
        const data = await db.collection('alarmas')
        .limit(1)
        .orderBy('idAlarma')
        .startAfter(ultimo)        
        .get() //consultar datos en firestore
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        setAlarmas([
          ...alarmas,
          ...arrayData
        ])
        setUltimo(data.docs[data.docs.length - 1])

        const query = await db.collection('alarmas')
        .limit(1)
        .orderBy('idAlarma')
        .startAfter(data.docs[data.docs.length - 1])
        .get()

        if(query.empty){
          console.log('No hay más documentos')
          setDesactivar(true)
        }else{
          setDesactivar(false)
        }

      } catch (error) {
        console.log(error)
      }
    }
   
   const agregar = async (e) => {
    e.preventDefault()

    if(!alarma.trim()){
      console.log('está vacio')
    
      return
    }

    try {
      
      const nuevaAlarma = {
        idAlarma: alarma,
        barrio: barrio,
        comuna: comuna,
        lider: lider,
        direccion: direccion,
        coordenadas: coordenadas,
        telefonos: telefonos,
        fechaInstalacion: moment(fechaInstalacion),
      }
      const data = await db.collection('alarmas').add(nuevaAlarma)

      setAlarmas([
        ...alarmas,
        {...nuevaAlarma, id: data.id}
      ])

      setAlarma('')
      setBarrio('')
      setComuna('')
      setLider('')
      setDireccion('')
      setCoordenadas('')
      setTelefonos('')
      setFechaInstalacion('')

    } catch (error) {
      console.log(error)
    }

    console.log(alarma)
  }

  //para eliminar 
  const eliminar = async (id) => {
    try {
      
      await db.collection('alarmas').doc(id).delete()

      const arrayFiltrado = alarmas.filter(item => item.id !== id)
      setAlarmas(arrayFiltrado)

    } catch (error) {
      console.log(error)
    }
  }

  const activarEdicion = (item) => { //para enlazar la busqueda 
    setModoEdicion(true)
    setAlarma(item.idAlarma)
    setBarrio(item.barrio)
    setComuna(item.comuna)
    setLider(item.lider)
    setDireccion(item.direccion)
    setCoordenadas(item.coordenadas)
    setTelefonos(item.telefonos)
    setFechaInstalacion(item.fechaInstalacion)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()
    if(!alarma.trim()) {
      console.log('vacio')
      return
    }
    try {

      await db.collection('alarmas').doc(id).update({
        idAlarma: alarma,
        barrio: barrio,
        comuna: comuna,
        lider: lider,
        direccion: direccion,
        coordenadas: coordenadas,
        telefonos: telefonos,
        fechaInstalacion: fechaInstalacion
      })
      const arrayEditado = alarmas.map(item  => (
        item.id === id ? {id: item.id, idAlarma: alarma, barrio: barrio, comuna: comuna, lider: lider,
        direccion: direccion, coordenadas: coordenadas, telefonos: telefonos, fechaInstalacion: fechaInstalacion}
        : item
      ))
      setAlarmas(arrayEditado)
      setModoEdicion(false)
      setAlarma('')
      setId('')
      setBarrio('')
      setComuna('')
      setLider('')
      setDireccion('')
      setCoordenadas('')
      setTelefonos('')
      setFechaInstalacion('')
      
      
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <Fragment>
    <div className="container mt-3">
                   
     <div className="row">
     <Buscador />
     <div className="col-md-12 align-item-center display-flex text-center">
         <h3>
           {
             modoEdicion ? 'EDITAR ALARMA' : 'REGISTRO DE ALARMA'
           }
         </h3>
         
         <form onSubmit={modoEdicion ? editar : agregar}>
           <input
           type="text"
           placeholder="Ingresar ID"
           className="form-control mb-2"
           onChange={e => setAlarma(e.target.value)}
           value={alarma}
           />
           <input
           type="text"
           placeholder="Ingresar barrio"
           className="form-control mb-2"
           onChange={e => setBarrio(e.target.value)}
           value={barrio}
           />
           <input
           type="text"
           placeholder="Ingresar comuna"
           className="form-control mb-2"
           onChange={e => setComuna(e.target.value)}
           value={comuna}
           />
           <input
           type="text"
           placeholder="Ingresar lider"
           className="form-control mb-2"
           onChange={e => setLider(e.target.value)}
           value={lider}
           />
           <input
           type="text"
           placeholder="Ingresar dirección"
           className="form-control mb-2"
           onChange={e => setDireccion(e.target.value)}
           value={direccion}
           />
           <input
           type="text"
           placeholder="Ingresar coordenadas"
           className="form-control mb-2"
           onChange={e => setCoordenadas(e.target.value)}
           value={coordenadas}
           />
           <input
           type="text"
           placeholder="Ingresar telefonos"
           className="form-control mb-2"
           onChange={e => setTelefonos(e.target.value)}
           value={telefonos}
           />
           <input
           type="text"
           placeholder="Ingresar fecha instalacion"
           className="form-control mb-2"
           onChange={e => setFechaInstalacion(e.target.value)}
           value={fechaInstalacion}
           />
           <button
            className={
              modoEdicion ? 'btn btn-warning btn-block w-100' : 'btn btn-primary btn-block w-100'
            }
            type="submit"
            id="botonAgregar"
            >
              {
                modoEdicion ? 'EDITAR' : 'AGREGAR'
              }
            </button>
         </form>
       </div>
       <div className="col-md-12">
         <ul className="list-group">
           {
             alarmas.map(item => (
               <li className="list-group-item mt-3" key={item.id}>
                 <h6>ID ALARMA : {item.idAlarma}</h6>
                 <h6>BARRIO : {item.barrio}</h6>
                 <h6>COMUNA : {item.comuna}</h6>
                 <h6>LIDER : {item.lider}</h6>
                 <h6>DIRECCIÓN : {item.direccion}</h6>
                 <h6>COORDENADAS : {item.coordenadas}</h6>
                 <h6>TELÉFONOS : {item.telefonos}</h6>
                 <h6>FECHA DE INSTALACIÓN : {moment(item.fechaInstalacion).format('dddd Do MMMM YYYY')}</h6>
                 
                 <button className="btn btn-danger btn-md float-right"
                 onClick={() => eliminar(item.id)}
                 >
                   Eliminar
                </button>
                <button className="btn btn-warning btn-md float-right m-2"
                  onClick={() => activarEdicion(item)} //obtener todo el elemento de busqueda
                 >
                   Editar
                </button>
                <button className="btn btn-info btn-md float-right m-2"
                  onClick={() => activarEdicion(item)} //obtener todo el elemento de busqueda
                 >
                   Crear orden
                </button>
               </li>
             ))
           }
         </ul>
         <button
         className="btn btn-dark btn-sm w-100 mt-2"
         onClick={() => siguiente()}
         disabled={desactivar}
         >
           Siguiente...
           </button> 
       </div>
       
     </div>
    </div>
    </Fragment>
  );
}

export default withRouter(Alarmas) 
