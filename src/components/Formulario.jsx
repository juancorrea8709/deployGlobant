import React from "react";
import app from "firebase/app";
import { withRouter } from "react-router-dom";
import {useRef, useState} from 'react';
import DatosOrdenes from "./DatosOrdenes";
import Fotos from "./Fotos";
import Popup from "reactjs-popup";
import SignaturePad from 'react-signature-canvas'
import '../sigCanvas.css'
import 'reactjs-popup/dist/index.css';


import moment from "moment";
import "moment/locale/es";



//insertar fecha y hora actual
const hoy = moment();
const hoy1 = hoy.format("dddd Do MMMM YYYY");
console.log(hoy.format("dddd Do MMMM YYYY"));
const hora = moment();
const hora1 = hora.format("h:mm:ss a");
console.log(hora1);

const Formulario = () => {

  

    //para la firma digital del usuario
    const [imageURL, setImageURL] = useState(null)
    const sigCanvas = useRef({})
    const limpiar = () => sigCanvas.current.clear()
    const guardar2 = () => setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"))

   //para el popup digital del usuario
   const guardar = () => setNombreUsuario(nombreUsuario)

  //pintar los datos de una collection
  const [ordenes, setOrdenes] = React.useState([]);
  const [numeroOrden, setNumeroOrden] = React.useState("");
  const [contrato, setContrato] = React.useState("202100074/202100075");
  const [hora, setHora] = React.useState(hora1);
  const [fecha, setFecha] = React.useState(hoy1);
  const [ciudad, setCiudad] = React.useState("Medellín");
  const [proyecto, setProyecto] = React.useState(
    "Mantenimiento Alarmas Comunitarias Medellín"
  );
  const [cliente, setCliente] = React.useState(
    "SIES-M (Secretaría de Seguridad de la Alcaldía de Medellín"
  );
  const [contacto, setContacto] = React.useState(
    "Andres Felipe Mejia Hernandez -ESU- Celular: 300 443 22 75"
  );

  const [filtrados, setFiltrados] = React.useState(null);
  const [resultados, setResultados] = React.useState([]);
  const [panelCantidad, setPanelCantidad] = React.useState("");
  const [panelReferencia, setPanelReferencia] = React.useState("");
  const [receptoraCantidad, setReceptoraCantidad] = React.useState("");
  const [receptoraReferencia, setReceptoraReferencia] = React.useState("");
  const [pulsadoresCantidad, setPulsadoresCantidad] = React.useState("");
  const [pulsadoresReferencia, setPulsadoresReferencia] = React.useState("");
  const [transformadorCantidad, setTransformadorCantidad] = React.useState("");
  const [transformadorReferencia, setTransformadorReferencia] = React.useState("");
  const [tecladoCantidad, setTecladoCantidad] = React.useState("");
  const [tecladoReferencia, setTecladoReferencia] = React.useState("");
  const [sirenaCantidad, setSirenaCantidad] = React.useState("");
  const [sirenaReferencia, setSirenaReferencia] = React.useState("");
  const [bateriaCantidad, setBateriaCantidad] = React.useState("");
  const [bateriaReferencia, setBateriaReferencia] = React.useState("");
  const [fuenteCantidad, setFuenteCantidad] = React.useState("");
  const [fuenteReferencia, setFuenteReferencia] = React.useState("");
  const [detalle, setDetalle] = React.useState("");
  const [actividad, setActividad] = React.useState("");
  const [tensionBateria, setTensionBateria] = React.useState("");
  const [tensionAdaptador, setTensionAdaptador] = React.useState("");
  const [tensionTelefonica, setTensionTelefonica] = React.useState("");
  const [tensionSirena, setTensionSirena] = React.useState("");
  const [estadoAlarma, setEstadoAlarma] = React.useState("");
  const [repuestoPanel, setRepuestoPanel] = React.useState("");
  const [repuestoFuente, setRepuestoFuente] = React.useState("");
  const [tomaAereo, setTomaAereo] = React.useState("");
  const [repuestoTeclado, setRepuestoTeclado] = React.useState("");
  const [repuestoPila1, setRepuestoPila1] = React.useState("");
  const [repuestoPila2, setRepuestoPila2] = React.useState("");
  const [repuestoFiltro, setRepuestoFiltro] = React.useState("");
  const [repuestoReceptora, setRepuestoReceptora] = React.useState("");
  const [repuestoCanaleta, setRepuestoCanaleta] = React.useState("");
  const [repuestoPulsador, setRepuestoPulsador] = React.useState("");
  const [repuestoNeopren, setRepuestoNeopren] = React.useState("");
  const [repuestoRelevo, setRepuestoRelevo] = React.useState("");
  const [repuestoSirena, setRepuestoSirena] = React.useState("");
  const [repuestoUtp, setRepuestoUtp] = React.useState("");
  const [repuestoCaja, setRepuestoCaja] = React.useState("");
  const [repuestoBateria, setRepuestoBateria] = React.useState("");
  const [repuestoDuplex, setRepuestoDuplex] = React.useState("");
  const [repuestoCable, setRepuestoCable] = React.useState("");
  const [repuestoTransformador, setRepuestoTransformador] = React.useState("")
  const [repuestoGabinete, setRepuestoGabinete] = React.useState("")
  const [repuestoToma, setRepuestoToma] = React.useState("")
  const [nombreUsuario, setNombreUsuario] = React.useState("")
  const [cedulaUsuario, setCedulaUsuario] = React.useState("")
  const [ubicacionUsuario, setUbicacionUsuario] = React.useState("")
  const [serialUsuario, setSerialUsuario] = React.useState("")
  const [firmaUsuario, setFirmaUsuario] = React.useState("")

  React.useEffect(() => {
    setup();
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

  //termina la prueba
  React.useEffect(() => {

    const obtenerDatos = async () => {
      try {
        const db = app.firestore();
        const data = await db.collection("ordenes").get();
        const obtenerConsecutivo = await db.collection("consecutivo").get();
        console.log("entrando")
        const consecutivo2= obtenerConsecutivo.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()        
        }))
        console.log(consecutivo2[0].consecutivo);
        setNumeroOrden(consecutivo2[0].consecutivo)
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayData);
        setOrdenes(arrayData);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatos();
  }, []);

  const agregar = async (e) => {
    e.preventDefault();

    if (!String(numeroOrden).trim()) {
      console.log("Está vacio");
      return;
    }

    try {
      const db = app.firestore();
      const nuevaOrden = {
        ordenNumero: numeroOrden,
        contrato: contrato,
        hora: hora,
        fecha: fecha,
        ciudad: ciudad,
        proyecto: proyecto,
        cliente: cliente,
        contacto: contacto,
        panelCantidad: panelCantidad,
        panelReferencia: panelReferencia,
        receptoraCantidad: receptoraCantidad,
        receptoraReferencia: receptoraReferencia,
        pulsadoresCantidad: pulsadoresCantidad,
        pulsadoresReferencia: pulsadoresReferencia,
        transformadorCantidad: transformadorCantidad,
        transformadorReferencia: transformadorReferencia,
        tecladoCantidad: tecladoCantidad,
        tecladoReferencia: tecladoReferencia,
        sirenaCantidad: sirenaCantidad,
        sirenaReferencia: sirenaReferencia,
        bateriaCantidad: bateriaCantidad,
        bateriaReferencia: bateriaReferencia,
        fuenteCantidad: fuenteCantidad,
        fuenteReferencia: fuenteReferencia,
        detalle: detalle,
        actividad: actividad,
        tensionBateria: tensionBateria,
        tensionAdaptador: tensionAdaptador,
        tensionTelefonica: tensionTelefonica,
        tensionSirena: tensionSirena,
        estadoAlarma: estadoAlarma,
        repuestoPanel: repuestoPanel,
        repuestoFuente: repuestoFuente,
        tomaAereo: tomaAereo,
        repuestoTeclado: repuestoTeclado,
        repuestoPila1: repuestoPila1,
        repuestoPila2: repuestoPila2,
        repuestoFiltro: repuestoFiltro,
        repuestoReceptora: repuestoReceptora,
        repuestoCanaleta: repuestoCanaleta,
        repuestoPulsador: repuestoPulsador,
        repuestoNeopren: repuestoNeopren,
        repuestoRelevo: repuestoRelevo,
        repuestoSirena: repuestoSirena,
        repuestoUtp: repuestoUtp,
        repuestoCaja: repuestoCaja,
        repuestoBateria: repuestoBateria,
        repuestoDuplex: repuestoDuplex,
        repuestoCable: repuestoCable,
        repuestoTransformador: repuestoTransformador,
        repuestoGabinete: repuestoGabinete,
        repuestoToma: repuestoToma,
        nombreUsuario: nombreUsuario,
        cedulaUsuario: cedulaUsuario,
        ubicacionUsuario: ubicacionUsuario,
        serialUsuario: serialUsuario,
        firmaUsuario: firmaUsuario,
      };
      const data = await db.collection("ordenes").add(nuevaOrden);
      db.collection("consecutivo").doc("WkB6NMPTfk76fU0MiHnl").set({
        consecutivo: numeroOrden + 1
      }).then(() => {
        console.log("Document successfully written!");
    });

      setNumeroOrden(numeroOrden + 1);
      setContrato("");
      setHora("");
      setFecha("");
      setCiudad("");
      setProyecto("");
      setCliente("");
      setContacto("");
      setPanelCantidad("");
      setPanelReferencia("");
      setReceptoraCantidad("");
      setReceptoraReferencia("");
      setPulsadoresCantidad("");
      setPulsadoresReferencia("");
      setTransformadorCantidad("");
      setTransformadorReferencia("");
      setTecladoCantidad("");
      setTecladoReferencia("");
      setSirenaCantidad("");
      setSirenaReferencia("");
      setBateriaCantidad("");
      setBateriaReferencia("");
      setFuenteCantidad("");
      setFuenteReferencia("");
      setDetalle("");
      setActividad("");
      setTensionBateria("");
      setTensionAdaptador("");
      setTensionTelefonica("");
      setTensionSirena("");
      setEstadoAlarma("");
      setRepuestoPanel("");
      setRepuestoFuente("");
      setTomaAereo("");
      setRepuestoTeclado("");
      setRepuestoPila1("");
      setRepuestoPila2("");
      setRepuestoFiltro("");
      setRepuestoReceptora("");
      setRepuestoCanaleta("");
      setRepuestoPulsador("");
      setRepuestoNeopren("");
      setRepuestoRelevo("");
      setRepuestoSirena("");
      setRepuestoUtp("");
      setRepuestoCaja("");
      setRepuestoBateria("");
      setRepuestoDuplex("");
      setRepuestoCable("");
      setRepuestoTransformador("");
      setRepuestoGabinete("");
      setRepuestoToma("");
      setNombreUsuario("");
      setCedulaUsuario("");
      setUbicacionUsuario("");
      setSerialUsuario("");
      setFirmaUsuario("");

    } catch (error) {
      console.log(error);
    }

    console.log(hora);
    console.log(fecha);
  };

  

  return (
    <div className="container mt-5" id="contenido">
      <div className="row">
        <h3 className="text-center">ORDEN DE SERVICIO</h3>
        <hr />
        <div className="col-md-12">
          <form onSubmit={agregar}>
            <label htmlFor="fecha" className="form-label">
              Fecha
            </label>
            <input
              type="text"
              className="form-control mb-2"
              value={hoy1}
              onChange={(e) => setFecha(e.target.value)}
            />

            <label htmlFor="horaI" className="form-label">
              Hora Inicial
            </label>
            <input
              type="text"
              className="form-control mb-2"
              value={hora1}
              onChange={(e) => setHora(e.target.value)}
            />

            <label htmlFor="orden#" className="form-label">
              Numero de orden
            </label>
            <div className="input-group">
              <span className="input-group-text">CT</span>
              <input
                type="text"
                className="form-control"
                aria-label="Amount (to the nearest dollar)"
                onChange={(e) => setNumeroOrden(e.target.value)}
                value={numeroOrden}
              />
              <span className="input-group-text">21</span>
            </div>

            <fieldset disabled hidden="show">
              <label htmlFor="contrato" className="form-label">
                Contrato
              </label>
              <input
                type="text"
                id="contrato"
                className="form-control text-center"
                placeholder="202100074/202100075"
                onChange={(e) => setContrato(e.target.value)}
                value={contrato}
              />
            </fieldset>

            <fieldset disabled>
              <label htmlFor="ciudad" className="form-label">
                Ciudad
              </label>
              <input
                type="text"
                id="ciudad"
                className="form-control text-center"
                placeholder="Medellín"
                onChange={(e) => setCiudad(e.target.value)}
                value={ciudad}
              />
            </fieldset>

            <fieldset disabled hidden="show">
              <label htmlFor="proyecto" className="form-label">
                Proyecto
              </label>
              <input
                type="text"
                id="proyecto"
                className="form-control text-center"
                placeholder="Mantenimiento Alarmas Comunitarias Medellín"
                onChange={(e) => setProyecto(e.target.value)}
                value={proyecto}
              />
            </fieldset>

            <fieldset disabled hidden="show">
              <label htmlFor="cliente" className="form-label">
                Cliente
              </label>
              <input
                type="text"
                id="cliente"
                className="form-control text-center"
                placeholder="SIES-M (Secretaría de Seguridad de la Alcaldía de Medellín)"
                onChange={(e) => setCliente(e.target.value)}
                value={cliente}
              />
            </fieldset>

            <fieldset disabled hidden="show">
              <label htmlFor="contacto" className="form-label">
                Contacto
              </label>
              <input
                type="text"
                id="contacto"
                className="form-control text-center"
                placeholder="Andres Felipe Mejia Hernandez -ESU- Celular: 300 443 22 75"
                onChange={(e) => setContacto(e.target.value)}
                value={contacto}
                
              />
            </fieldset>

            <div className="row mt-4">
              <h5 className="text-center">INFORMACIÓN DE EQUIPOS</h5>
              <hr />
              <div className="col-md-12">
                <form onSubmit={agregar}>
                  <label>ID Alarma</label>
                  <input
                    type="text"
                    onChange={handleBuscador}
                    className="form-control"
                    placeholder="Escribir numero de frente"
                  />

                  {resultados.map((item) => (
                    <div id="tarjeta" key={item.id}>
                      <div className="card m-2 ">
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
                            FECHA DE INSTALACIÓN :{" "}
                            {moment(item.fechaInstalacion).format(
                              "dddd Do MMMM YYYY"
                            )}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}

                  <h5 className="text-center mt-3">REFERENCIA DE EQUIPOS</h5>
                  <hr />

                  <label className="form-label" id="panel">
                    Panel
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">Cantidad</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setPanelCantidad(e.target.value)}
                      value={panelCantidad}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <span className="input-group-text ml-5">Referencia</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setPanelReferencia(e.target.value)}
                      value={panelReferencia}
                    >
                      <option selected>Elegir...</option>
                      <option value="DSC PC 1832">DSC PC 1832</option>
                      <option value="AD-VISTA 48LA (Honeywell)">
                        AD-VISTA 48LA (Honeywell)
                      </option>
                      <option value="AV-VISTA 48SP (Honeywell)">
                        AV-VISTA 48SP (Honeywell)
                      </option>
                    </select>
                  </div>

                  <label className="form-label" id="receptora">
                    Receptora
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">Cantidad</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setReceptoraCantidad(e.target.value)}
                      value={receptoraCantidad}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <span className="input-group-text ml-5">Referencia</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setReceptoraReferencia(e.target.value)}
                      value={receptoraReferencia}
                    >
                      <option selected>Elegir...</option>
                      <option value="DSC-RF5132-433">DSC-RF5132-433</option>
                      <option value="AD-5881ENHLA (Honeywell)">
                        AD-5881ENHLA (Honeywell)
                      </option>
                    </select>
                  </div>

                  <label className="form-label" id="pulsadores">
                    Pulsadores
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">Cantidad</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setPulsadoresCantidad(e.target.value)}
                      value={pulsadoresCantidad}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    <span className="input-group-text ml-5">Referencia</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setPulsadoresReferencia(e.target.value)}
                      value={pulsadoresReferencia}
                    >
                      <option selected>Elegir...</option>
                      <option value="DSC-WS4938">DSC-WS4938</option>
                      <option value="5802-WXT (Honeywell)">
                        5802-WXT (Honeywell)
                      </option>
                    </select>
                  </div>

                  <label className="form-label" id="transformador">
                    Transformador
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">Cantidad</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setTransformadorCantidad(e.target.value)}
                      value={transformadorCantidad}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                    </select>
                    <span className="input-group-text ml-5">Referencia</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) =>
                        setTransformadorReferencia(e.target.value)
                      }
                      value={transformadorReferencia}
                    >
                      <option selected>Elegir...</option>
                      <option value="DSC - PTD1640">DSC - PTD1640</option>
                    </select>
                  </div>

                  <label className="form-label" id="teclado">
                    Teclado
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">Cantidad</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setTecladoCantidad(e.target.value)}
                      value={tecladoCantidad}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                    </select>
                    <span className="input-group-text ml-5">Referencia</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setTecladoReferencia(e.target.value)}
                      value={tecladoReferencia}
                    >
                      <option selected>Elegir...</option>
                      <option value="DSC - PK 5500">DSC - PK 5500</option>
                      <option value="AD-6164SP (Honeywell)">
                        AD-6164SP (Honeywell)
                      </option>
                    </select>
                  </div>

                  <label className="form-label" id="sirena">
                    Sirena
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">Cantidad</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setSirenaCantidad(e.target.value)}
                      value={sirenaCantidad}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <span className="input-group-text ml-5">Referencia</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setSirenaReferencia(e.target.value)}
                      value={sirenaReferencia}
                    >
                      <option selected>Elegir...</option>
                      <option value="DSC - SD30W">DSC - SD30W</option>
                    </select>
                  </div>

                  <label className="form-label" id="bateria">
                    Batería
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">Cantidad</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setBateriaCantidad(e.target.value)}
                      value={bateriaCantidad}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                    </select>
                    <span className="input-group-text ml-5">Referencia</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setBateriaReferencia(e.target.value)}
                      value={bateriaReferencia}
                    >
                      <option selected>Elegir...</option>
                      <option value="FU - 12VDC 7A-H">FU - 12VDC 7A-H</option>
                      <option value="YUASA - 12VDC 7A-H">
                        YUASA - 12VDC 7A-H
                      </option>
                      <option value="MTEK - 12VDC 7A-H">
                        MTEK - 12VDC 7A-H
                      </option>
                      <option value="KEYKO - 12VDC 7A-H">
                        KEYKO - 12VDC 7A-H
                      </option>
                    </select>
                  </div>

                  <label className="form-label" id="fuente">
                    Fuente de 12 V
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">Cantidad</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setFuenteCantidad(e.target.value)}
                      value={fuenteCantidad}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                    <span className="input-group-text ml-5">Referencia</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setFuenteReferencia(e.target.value)}
                      value={fuenteReferencia}
                    >
                      <option selected>Elegir...</option>
                      <option value="Seco Larm - ST-1206-1.5AQ">
                        Seco Larm - ST-1206-1.5AQ
                      </option>
                      <option value="Seco Larm - ST-2406-2AQ">
                        Seco Larm - ST-2406-2AQ
                      </option>
                      <option value="Seco Larm - ST-1206-3AQ">
                        Seco Larm - ST-1206-3AQ
                      </option>
                    </select>
                  </div>

                  <h5 className="text-center mt-3">DETALLE DE LOS TRABAJOS</h5>
                  <hr />

                  <div className="input-group">
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setDetalle(e.target.value)}
                      value={detalle}
                    >
                      <option selected>Elegir...</option>
                      <option value="Mantenimiento Prev Alarma, Alcance: revisión, verificación, limpieza y cambio solamente de pilas y/ó batería.">
                        Mantenimiento Prev Alarma, Alcance: revisión,
                        verificación, limpieza y cambio solamente de pilas y/ó
                        batería.
                      </option>
                      <option value="Mantenimiento correctivo reinstalación (TRASLADO) de: Panel, teclado, receptora, sirena y cableado a un nuevo sitio en el mismo predio.">
                        Mantenimiento correctivo reinstalación (TRASLADO) de:
                        Panel, teclado, receptora, sirena y cableado a un nuevo
                        sitio en el mismo predio.
                      </option>
                      <option value="Mantenimiento correctivo cambio de componentes de alarma, aplica sólo para: Panel, teclado, receptora, repetidora, sirena y cableado.">
                        Mantenimiento correctivo cambio de componentes de
                        alarma, aplica sólo para: Panel, teclado, receptora,
                        repetidora, sirena y cableado.
                      </option>
                      <option value="Mantenimiento correctivo de instalación de alarma. Montar en otro predio, la alarma completa: panel, teclado, receptoras, sirenas, cableado eléctrico, telefónico y cable de datos.">
                        Mantenimiento correctivo de instalación de alarma.
                        Montar en otro predio, la alarma completa: panel,
                        teclado, receptoras, sirenas, cableado eléctrico,
                        telefónico y cable de datos.
                      </option>
                      <option value="Desinstalación del sistema de alarma y componentes de alarmas o reprogramación de panel.">
                        Desinstalación del sistema de alarma y componentes de
                        alarmas o reprogramación de panel.
                      </option>
                      <option value="Mantenimiento correctivo de conexión de alarma. Reconexiones de energía o línea telefónica">
                        Mantenimiento correctivo de conexión de alarma.
                        Reconexiones de energía o línea telefónica
                      </option>
                    </select>
                  </div>

                  <h5 className="text-center mt-3">ACTIVIDADES EJECUTADAS</h5>
                  <hr />

                  <div class="form-floating">
                    <textarea
                      class="form-control"
                      onChange={(e) => setActividad(e.target.value)}
                      value={actividad}
                      id="floatingTextarea2"                    
                    ></textarea>
                    <label for="floatingTextarea2">Descripción</label>
                  </div>

                  <h5 className="text-center mt-3">TENSIONES Y ESTADO FINAL</h5>
                  <hr />

                    <label htmlFor="tensionBateria" className="form-label">
                      Tensión batería [=] VDC
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={tensionBateria}
                      onChange={(e) => setTensionBateria(e.target.value)}
                    />

                    <label htmlFor="tensionAdaptador" className="form-label">
                      Tensión adaptador [=] VDC
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={tensionAdaptador}
                      onChange={(e) => setTensionAdaptador(e.target.value)}
                    />

                    <label htmlFor="tensionTelefonica" className="form-label">
                      Tensión telefónica [=] VDC
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={tensionTelefonica}
                      onChange={(e) => setTensionTelefonica(e.target.value)}
                    />

                    <label htmlFor="tensionSirena" className="form-label">
                      Tensión sirena [=] VDC
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={tensionSirena}
                      onChange={(e) => setTensionSirena(e.target.value)}
                    />
                    
                    <label htmlFor="estadoAlarma" className="form-label">
                      Estado de la alarma
                    </label>
                    <div className="input-group">
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setEstadoAlarma(e.target.value)}
                      value={estadoAlarma}
                    >
                      <option selected>Elegir...</option>
                      <option value="Buena">Buena</option>
                      <option value="Mala">Mala</option>
                      <option value="Desinstalada">Desinstalada</option>
                    </select>
                  </div>

                  <h5 className="text-center mt-3">REPUESTOS Y MATERIALES</h5>
                  <hr />

                  <div className="input-group">
                    <span className="input-group-text">Panel</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoPanel(e.target.value)}
                      value={repuestoPanel}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Fuente 12 VDC</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoFuente(e.target.value)}
                      value={repuestoFuente}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Toma aéreo</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setTomaAereo(e.target.value)}
                      value={tomaAereo}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Teclado</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoTeclado(e.target.value)}
                      value={repuestoTeclado}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Pila 2025</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoPila1(e.target.value)}
                      value={repuestoPila1}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Pila 2032</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoPila2(e.target.value)}
                      value={repuestoPila2}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Filtro DSL</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoFiltro(e.target.value)}
                      value={repuestoFiltro}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Receptora</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoReceptora(e.target.value)}
                      value={repuestoReceptora}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Canaleta 20x12 [m]</span>
                    <input
                    type="text"
                    id="canaleta"
                    className="form-control "
                    onChange={(e) => setRepuestoCanaleta(e.target.value)}
                    value={repuestoCanaleta}
                    />                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Pulsadores</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoPulsador(e.target.value)}
                      value={repuestoPulsador}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Cable Neoprem [m]</span>
                    <input
                    type="text"
                    id="cableNeoprem"
                    className="form-control "
                    onChange={(e) => setRepuestoNeopren(e.target.value)}
                    value={repuestoNeopren}
                    />                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Relevo 12VDC</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoRelevo(e.target.value)}
                      value={repuestoRelevo}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Sirena</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoSirena(e.target.value)}
                      value={repuestoSirena}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Cable UTP</span>
                    <input
                    type="text"
                    id="cableNeoprem"
                    className="form-control "
                    onChange={(e) => setRepuestoUtp(e.target.value)}
                    value={repuestoUtp}
                    />                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Caja exterior</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoCaja(e.target.value)}
                      value={repuestoCaja}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Batería 12V-7-AH</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoBateria(e.target.value)}
                      value={repuestoBateria}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Cable Dúplex 2x18 [m]</span>
                    <input
                    type="text"
                    id="cableNeoprem"
                    className="form-control "
                    onChange={(e) => setRepuestoDuplex(e.target.value)}
                    value={repuestoDuplex}
                    />                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Cable 2 pares [m]</span>
                    <input
                    type="text"
                    id="cableNeoprem"
                    className="form-control "
                    onChange={(e) => setRepuestoCable(e.target.value)}
                    value={repuestoCable}
                    />                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Transformador 16.5 VAC</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoTransformador(e.target.value)}
                      value={repuestoTransformador}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Gabinete</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoGabinete(e.target.value)}
                      value={repuestoGabinete}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Toma telefónico RJ11</span>
                    <select
                      type="text"
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setRepuestoToma(e.target.value)}
                      value={repuestoToma}
                    >
                      <option selected>0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>                    
                  </div>

                  <h5 className="text-center mt-3">INVENTARIO DE PULSADORES</h5>
                  <hr />

                  <Popup modal trigger={<button type="button" className="btn btn-info btn-sm mb-2 w-100">Crear usuario</button>}
                closeOnDocumentClick={false}
                >
                 {close => (
                    <>
                    <div className="input-group mt-2">
                    <span className="input-group-text">Nombre</span>
                    <input
                    type="text"
                    id="nombre"
                    className="form-control "
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    value={nombreUsuario}
                    />                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Cédula</span>
                    <input
                    type="number"
                    id="nombre"
                    className="form-control "
                    onChange={(e) => setCedulaUsuario(e.target.value)}
                    value={cedulaUsuario}
                    />                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Ubicación</span>
                    <input
                    type="text"
                    id="ubicacion"
                    className="form-control "
                    onChange={(e) => setUbicacionUsuario(e.target.value)}
                    value={ubicacionUsuario}
                    />                    
                  </div>

                  <div className="input-group mt-2">
                    <span className="input-group-text">Serial</span>
                    <input
                    type="text"
                    id="nombre"
                    className="form-control "
                    onChange={(e) => setSerialUsuario(e.target.value)}
                    value={serialUsuario}
                    />                    
                  </div>

                    <button onClick={guardar} className="btn btn-success btn-sm  w-100 mt-2">Guardar usuario</button>
                    <button onClick={close} className="btn btn-info btn-sm mt-2 w-100">Cerrar</button>
                    
                    </>
                 )}
                </Popup>

                <h5 className="text-center mt-3">FIRMA USUARIO</h5>
                  <hr />
                  <Popup modal trigger={<button type="button" id="modal1" className="btn btn-info btn-sm mb-2 w-100">Crear firma</button>}
                closeOnDocumentClick={false}
                >
                  
                 {close => (
                    <>

                    <SignaturePad 
                    ref={sigCanvas}
                    canvasProps={{
                      className: 'signatureCanvas', 
                   
                      
                    }}/>
                    

                    <button onClick={close} className="btn btn-info btn-sm mb-2 w-100">Cerrar</button>
                    <button onClick={limpiar} className="btn btn-dark btn-sm mb-2 w-100">Limpiar</button>
                    <button onClick={guardar2} className="btn btn-dark btn-sm mb-2 w-100">Guardar Firma</button>
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

            <h5 className="text-center mt-3">FOTOGRAFIAS</h5>
                  <hr />

            <Fotos />
            <Fotos />

            <button className="btn btn-info w-100 mt-3" type="submit">
              Agregar
            </button>
            
          </form>
        </div>

        <div className="col-md-12">
          <DatosOrdenes />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Formulario);
