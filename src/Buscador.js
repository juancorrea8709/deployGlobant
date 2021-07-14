export default function Buscador(props) {

    const item = props.item;

    return (
        <div className="container" id="tarjeta" key={item.id}>
            <div className="card m-2">
                <div className="card-header">ID ALARMA: {item.idAlarma}</div>
                <div className="card-body">
                    <h6 className="card-text">COMUNA: {item.comuna}</h6>
                    <h6 className="card-text">BARRIO: {item.barrio}</h6>
                    <h6 className="card-text">DIRECCIÓN: {item.direccion}</h6>
                    <h6 className="card-text">TELÉFONOS: {item.telefonos}</h6>
                    <h6 className="card-text">COORDENADAS: {item.coordenadas}</h6>                    
                    <h6 className="card-text">LIDER: {item.lider}</h6>
                    
                </div>
            </div>
        </div>
    
    )
}