import React from "react";
import { Fragment } from "react";
import { db } from "../firebase";
import "moment/locale/es";

const Buscador = () => {
 
  const [alarmas, setAlarmas] = React.useState([])
  
  React.useEffect(() => {

    const obtenerDatos = async () => {

        try {
     
           const data = await db.collection('alarmas')
           //.where('idAlarma', '==', '1008')
           .orderBy('idAlarma')
           .limit(1)
           .get() //consultar datos en firestore
           
           const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
     
           console.log(arrayData)
           console.log(alarmas)
           setAlarmas(arrayData)
           
     
         } catch (error) {
           console.log(error)
         }
       }
       
     
       obtenerDatos();
  })
 




  return (
    <Fragment>
      <div className="col-md-12">
        <div className="jumbotron text-center">
          <h3>ID ALARMA</h3>

          <input
            type="text"
            className="form-control"
            placeholder="Escribir Id Alarma"
            onChange={Buscador}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Buscador;
