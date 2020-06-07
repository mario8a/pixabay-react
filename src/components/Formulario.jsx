import React, {useState} from 'react'
import Error from './Error';


const Formulario = ({guardarBusqueda}) => {

    const [termino, guardartermino] = useState('');
    const [error, guardarError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        //validar
        if(termino.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);
        //enviar el termino de busqueda hacia el componente principal

        guardarBusqueda(termino);
    }

    return ( 
        <form action="" onSubmit={buscarImagenes} >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Buscar imagen, ejemplo: selva o cafe"
                        onChange={e => guardartermino(e.target.value)}
                        />
                </div>

                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                        />

                    {/* <button type="submit" className="btn btn-lg btn-danger btn-block">
                        Buscar boton
                    </button> */}
                </div>
            </div>

            {error ? <Error mensaje="Agregar un termino de busqueda" /> : null}
        </form>
     );
}
 
export default Formulario;