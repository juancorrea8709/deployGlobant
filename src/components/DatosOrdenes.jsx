import React from "react";
import app from "firebase/app";
import { withRouter } from "react-router-dom";
import logoEsu from '../logos/logoEsu.png'


const DatosOrdenes = () => {
  //pintar los datos de una collection
  const [ordenes, setOrdenes] = React.useState([]);
 
 

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = app.firestore();
        const data = await db.collection("ordenes").get();
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

  

  return (
    <div className="row">
      <div className="col-md-12">
          <ul className="list-group">
              {
                  ordenes.map(item => (
                      <li className="list-group-item mt-2" key={item.id}>
                          <h5 className="text-center text-primary mt-3">ORDEN DE SERVICIO<img src={logoEsu} width="30" id="logito" alt="" className="float-right"/></h5><hr />
                          <h6 className="text-primary">NUMERO DE ORDEN: {item.ordenNumero}</h6>
                          <h6>FECHA: {item.fecha}</h6>
                          <h6>HORA INICIAL: {item.hora}</h6>
                          <h6>CONTRATO: {item.contrato}</h6>
                          <h6>CIUDAD: {item.ciudad}</h6>
                          <h6>PROYECTO: {item.proyecto}</h6>
                          <h6>CLIENTE: {item.cliente}</h6>
                          <h6>CONTACTO: {item.contacto}</h6><hr />
                          <h6 className="text-primary mt-3">REFERENCIA DE EQUIPOS</h6><hr />
                          <h6>PANEL: Unidades:  {item.panelCantidad} / Referencia: {item.panelReferencia}</h6>
                          <h6>RECEPTORA: Unidades:  {item.receptoraCantidad} / Referencia: {item.receptoraReferencia}</h6>
                          <h6>PULSADORES: Unidades:  {item.pulsadoresCantidad} / Referencia: {item.pulsadoresReferencia}</h6>
                          <h6>TRANSFORMADOR: Unidades:  {item.transformadorCantidad} / Referencia: {item.transformadorReferencia}</h6>
                          <h6>TECLADO: Unidades:  {item.tecladoCantidad} / Referencia: {item.tecladoReferencia}</h6>
                          <h6>SIRENA: Unidades:  {item.sirenaCantidad} / Referencia: {item.sirenaReferencia}</h6>
                          <h6>BATERÍA: Unidades:  {item.bateriaCantidad} / Referencia: {item.bateriaReferencia}</h6>
                          <h6>FUENTE DE 12 V: Unidades:  {item.fuenteCantidad} / Referencia: {item.fuenteReferencia}</h6><hr />
                          <h6 className="mt-3 text-primary">DETALLE DE LOS TRABAJOS</h6><hr />
                          <p>{item.detalle}</p><hr />
                          <h6 className="text-primary mt-3">ACTIVIDADES EJECUTADAS</h6><hr />
                          <p>{item.actividad}</p><hr />
                          <h6 className="text-primary mt-3">TENSIONES Y ESTADO FINAL</h6><hr />
                          <h6>TENSIÓN BATERÍA [=] VDC: {item.tensionBateria}</h6>
                          <h6>TENSIÓN ADAPTADOR [=] VDC: {item.tensionAdaptador}</h6>
                          <h6>TENSIÓN LINEA TELEFÓNICA [=] VDC: {item.tensionTelefonica}</h6>
                          <h6>TENSIÓN LINEA SIRENA [=] VDC: {item.tensionSirena}</h6>
                          <h6>ESTADO DE LA ALARMA: {item.estadoAlarma}</h6><hr />
                          <h6 className="text-primary mt-3">REPUESTOS Y MATERIALES</h6><hr />
                          <h6>PANEL: {item.repuestoPanel}</h6>
                          <h6>FUENTE 12 VDC: {item.repuestoFuente}</h6>
                          <h6>TOMA AÉREO: {item.tomaAereo}</h6>
                          <h6>TECLADO: {item.repuestoTeclado}</h6>
                          <h6>PILAS 2025: {item.repuestoPila1}</h6>
                          <h6>PILAS 2032: {item.repuestoPila2}</h6>
                          <h6>FILTRO DSL: {item.repuestoFiltro}</h6>
                          <h6>RECEPTORA: {item.repuestoReceptora}</h6>
                          <h6>CANALETA 20x12 [m]: {item.repuestoCanaleta}</h6>
                          <h6>PULSADORES: {item.repuestoPulsador}</h6>
                          <h6>CABLE NEOPREM [m]: {item.repuestoNeopren}</h6>
                          <h6>RELEVO 12VDC: {item.repuestoRelevo}</h6>
                          <h6>SIRENA: {item.repuestoSirena}</h6>
                          <h6>CABLE UTP [m]: {item.repuestoUtp}</h6>
                          <h6>CAJA EXTERIOR: {item.repuestoCaja}</h6>
                          <h6>BATERÍA 12V-7-AH: {item.repuestoBateria}</h6>
                          <h6>CABLE DÚPLEX 2x18 [m]: {item.repuestoDuplex}</h6>
                          <h6>CABLE 2 PARES [m]: {item.repuestoDuplex}</h6>
                          <h6>TRANSFORMADOR 16.5 VAC: {item.repuestoTransformador}</h6>
                          <h6>GABINETE: {item.repuestoGabinete}</h6>
                          <h6>REPUESTO TOMA: {item.repuestoToma}</h6><hr />
                          <h6 className="text-primary mt-3">INVENTARIO DE PULSADORES</h6><hr />
                          <h6 className="text-success">USUARIO: {item.nombreUsuario}</h6>
                          <h6>CÉDULA USUARIO: {item.cedulaUsuario}</h6>
                          <h6>UBICACIÓN  USUARIO: {item.ubicacionUsuario}</h6>
                          <h6>SERIAL: {item.setSerialUsuario}</h6><hr />
                      </li>
                  ))
              }
          </ul>
      </div>
    </div>
  );
};

export default withRouter(DatosOrdenes);
