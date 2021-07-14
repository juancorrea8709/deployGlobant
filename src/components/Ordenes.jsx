import React from "react";
import { db, auth } from "../firebase";
import { withRouter } from "react-router-dom";
import {useRef, useState} from 'react';
import Fotos from './Fotos.jsx';
import Formulario from './Formulario.jsx';
import moment from "moment";
import "moment/locale/es";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import SignaturePad from 'react-signature-canvas'
import '../sigCanvas.css'

function Ordenes(props) {

  //para la firma digital del usuario
  const [imageURL, setImageURL] = useState(null)
  const sigCanvas = useRef({})
  const limpiar = () => sigCanvas.current.clear()
  const guardar = () => setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))

  //para saber si un usuario esta activo o no y poder mostrar botones.
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("existe usuario");
      setUser(auth.currentUser);
    } else {
      console.log("no existe usuario");
      console.log(user);
      props.history.push("/login");
    }
  }, [user, props.history]);

  //filtros para busqueda de idalarma
  const [filtrados, setFiltrados] = React.useState(null);
  const [resultados, setResultados] = React.useState([]);

  React.useEffect(() => {
    setup();
  }, []);

  //enlazar react con coleccion firestore
  const [ordenes, setOrdenes] = React.useState([]);

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await db.collection("ordenes").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayData);
        console.log(ordenes);
        setOrdenes(arrayData);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatos();
  }, []);

  //cargar la informacion del json
  const setup = () => {
    fetch("./maestroFinalAlarmas.json")
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        setFiltrados(json);
      });
  };
  //buscador
  const handleBuscador = (e) => {
    const palabra = e.target.value;
    console.log(palabra);

    const resultados = filtrados.filter((e) => e.idAlarma == palabra);
    console.log(resultados);
    setResultados(resultados);
  };

  const hoy = moment();
  const hoy1 = hoy.format("dddd Do MMMM YYYY");
  console.log(hoy.format("dddd Do MMMM YYYY"));

  const hora = moment();
  const hora1 = hora.format("h:mm:ss a");
  console.log(hora1);

  return (
   
    <div className="container mt-3">
       <Formulario />
      <div className="row">
        <div className="text-center">
          <h3>ORDEN DE SERVICIO</h3>
          <hr />
          <div className="col-md-12">
            <form>
              <div className="mb-3">
                <label htmlFor="fecha" className="form-label">
                  Fecha
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fecha"
                  value={hoy1}
                />

                <label
                  htmlFor="horaInicio"
                  className="form-label"
                  id="horaInicio"
                >
                  Hora Inicio
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="horaInicio"
                  value={hora1}
                />

                <label
                  htmlFor="horaFinal"
                  className="form-label"
                  id="horaFinal"
                >
                  Hora Final
                </label>
                <input type="time" className="form-control" id="horaFinal" />

                <label className="form-label" id="numeroOrden">
                  Número Orden
                </label>
                <div className="input-group">
                  <span className="input-group-text">CT</span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                  />
                  <span className="input-group-text">21</span>
                </div>

                <fieldset disabled>
                  <label htmlFor="contrato" className="form-label">
                    Contrato
                  </label>
                  <input
                    type="text"
                    id="contrato"
                    className="form-control"
                    placeholder="202100074/202100075"
                  />
                </fieldset>
              </div>
           
                <label>ID Alarma</label>
                <input
                  type="text"
                  onChange={handleBuscador}
                  className="form-control"
                  placeholder="Escribir numero de frente"
                />
             
              
              <div className="row">
                {resultados.map((item) => (
                  <div className="container" id="tarjeta" key={item.id}>
                    <div className="card m-2">
                      <div className="card-header bg-info">
                        ID ALARMA: {item.idAlarma}
                      </div>
                      <div className="card-body">
                        <h6 className="card-text">BARRIO : {item.barrio}</h6>
                        <h6 className="card-text">COMUNA : {item.comuna}</h6>
                        <h6 className="card-text">LIDER : {item.lider}</h6>
                        <h6 className="card-text">
                          DIRECCIÓN : {item.direccion}
                        </h6>
                        <h6 className="card-text">
                          COORDENADAS : {item.coordenadas}
                        </h6>
                        <h6 className="card-text">
                          TELÉFONOS : {item.telefonos}
                        </h6>
                        <h6 className="card-text">
                          MODELO ALARMA : {item.modeloAlarma}
                        </h6>
                        <h6 className="card-text">
                          FECHA DE INSTALACIÓN : {moment(item.fechaInstalacion).format('dddd Do MMMM YYYY')}
                        </h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                                                    
              <h5 className="mt-3">REFERENCIA DE EQUIPOS</h5>
                <hr /> 
                 <label className="form-label" id="numeroOrden">
                  Panel
                </label>
                <div className="input-group">
                  <span className="input-group-text">Cantidad</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
                  <span className="input-group-text ml-5">Referencia</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>Elegir...</option>
                      <option value="DSC PC 1832">DSC PC 1832</option>
                      <option value="AD-VISTA 48LA (Honeywell)">AD-VISTA 48LA (Honeywell)</option>
                      <option value="AV-VISTA 48SP (Honeywell)">AV-VISTA 48SP (Honeywell)</option>
                  </select>
                </div>
                <label className="form-label" id="numeroOrden">
                  Receptora
                </label>
                <div className="input-group">
                  <span className="input-group-text">Cantidad</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
                  <span className="input-group-text ml-5">Referencia</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>Elegir...</option>
                      <option value="DSC-RF5132-433">DSC-RF5132-433</option>
                      <option value="AD-5881ENHLA (Honeywell)">AD-5881ENHLA (Honeywell)</option>
                  </select>
                </div>
                <label className="form-label" id="numeroOrden">
                  Pulsadores
                </label>
                <div className="input-group">
                  <span className="input-group-text">Cantidad</span>
                  <input
                  type="number"
                  className="form-control"
                  placeholder="Escribir numero de frente"
                />
                  <span className="input-group-text ml-5">Referencia</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>Elegir...</option>
                      <option value="DSC-WS4938">DSC-WS4938</option>
                      <option value="5802-WXT (Honeywell)">5802-WXT (Honeywell)</option>
                  </select>
                </div>
                <label className="form-label" id="numeroOrden">
                  Transformador
                </label>
                <div className="input-group">
                  <span className="input-group-text">Cantidad</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
                  <span className="input-group-text ml-5">Referencia</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>Elegir...</option>
                      <option value="DSC - PTD1640">DSC - PTD1640</option>
                  </select>
                </div>
                <label className="form-label" id="numeroOrden">
                  Teclado
                </label>
                <div className="input-group">
                  <span className="input-group-text">Cantidad</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>0</option>
                      <option value="1">1</option>
                  </select>
                  <span className="input-group-text ml-5">Referencia</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>Elegir...</option>
                      <option value="DSC - PK 5500">DSC - PK 5500</option>
                      <option value="AD-6164SP (Honeywell)">AD-6164SP (Honeywell)</option>
                  </select>
                </div>
                <label className="form-label" id="numeroOrden">
                  Sirena
                </label>
                <div className="input-group">
                  <span className="input-group-text">Cantidad</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
                  <span className="input-group-text ml-5">Referencia</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>Elegir...</option>
                      <option value="DSC - SD30W">DSC - SD30W</option>
                  </select>
                </div>
                <label className="form-label" id="numeroOrden">
                  Batería
                </label>
                <div className="input-group">
                  <span className="input-group-text">Cantidad</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>0</option>
                      <option value="1">1</option>
                  </select>
                  <span className="input-group-text ml-5">Referencia</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>Elegir...</option>
                      <option value="12VDC - 7A-H">12VDC - 7A-H</option>
                      <option value="12VDC - 9A-H">12VDC - 9A-H</option>
                  </select>
                </div>
                <label className="form-label" id="numeroOrden">
                  Fuente de 12 Voltios
                </label>
                <div className="input-group">
                  <span className="input-group-text">Cantidad</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                  </select>
                  <span className="input-group-text ml-5">Referencia</span>
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>Elegir...</option>
                      <option value="Seco Larm - ST-1206-1.5AQ">Seco Larm - ST-1206-1.5AQ</option>
                      <option value="Seco Larm - ST-2406-2AQ">Seco Larm - ST-2406-2AQ</option>
                      <option value="Seco Larm - ST-1206-3AQ">Seco Larm - ST-1206-3AQ</option>
                  </select>
                </div>

                <h5 className="mt-3">TENSIONES Y ESTADO FINAL</h5>
                <hr /> 
                <Popup modal trigger={<button type="button" className="btn btn-info btn-sm mb-2 w-100">Crear informe</button>}
                closeOnDocumentClick={false}
                >
                 {close => (
                    <>
                <label className="form-label">Tensión bateria [=] VDC</label>
                <input
                  type="text"
                  className="form-control"
                />
                
                <label className="form-label">Tensión Adaptador [=] VDC</label>
                <input
                  type="text"
                  className="form-control"
                />

                <label className="form-label">Tensión linea telefónica [=] VDC</label>
                <input
                  type="text"
                  className="form-control"
                />

                <label className="form-label">Tensión sirena [=] VDC</label>
                <input
                  type="text"
                  className="form-control"
                />

                <label className="form-label" id="numeroOrden">
                  Estado final de la alarma
                </label>
                <div className="input-group">
                  <select 
                    type="text"
                    className="form-select"
                    aria-label="Default select example">
                      <option selected>Buena</option>
                      <option value="mala">Mala</option>
                      <option value="desinstalada">Desinstalada</option>
                  </select>
                  </div>

                    <br/>
                    <button onClick={close} className="btn btn-info btn-sm mb-2 w-100">Cerrar</button>
                    
                    </>
                 )}
                </Popup> 
                <Fotos />
                <h5 className="mt-3">FIRMA DIGITAL</h5>
                <hr/>
                <Popup modal trigger={<button type="button" className="btn btn-info btn-sm mb-2 w-100">Crear firma</button>}
                closeOnDocumentClick={false}
                >
                 {close => (
                    <>
                    <SignaturePad 
                    ref={sigCanvas}
                    canvasProps={{
                      className: 'signatureCanvas'
                    }}/>

                    <button onClick={close} className="btn btn-info btn-sm mb-2 w-100">Cerrar</button>
                    <button onClick={limpiar} className="btn btn-warning btn-sm mb-2 w-100">Limpiar</button>
                    <button onClick={guardar} className="btn btn-success btn-sm mb-2 w-100">Guardar Firma</button>
                    </>
                 )}
                </Popup>

                <br/>
                <br/>

                {
                  imageURL ? (
                    <img
                  src={imageURL}
                  alt="mi firma"
                  style={{
                  display: 'block',
                  margin: '0 auto',
                  border: '1px solid black',
                  width: '100%',
                  height: '100px'
                }}
                />   ) : null  }
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Ordenes);
