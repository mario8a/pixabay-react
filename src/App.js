import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';
import { APIKey } from './secrets/api';


function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalPginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async() => {
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key = APIKey;
      const url= `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //calcular el toal de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      //mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }

    consultarAPI();

  },[busqueda, paginaactual]);

  //regresar a la primera pagina al hacer una nueva busqueda
  useEffect (() =>{
    guardarPaginaActual(1);
  },[busqueda]);


  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual -1;

    if(nuevaPaginaActual === 0) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual +1;

    if(nuevaPaginaActual > totalPginas) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>

        <Formulario
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center mb-5">
        <ListadoImagenes
          imagenes={imagenes}
        />
        
        {(paginaactual === 1) ? null : (
          <button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>
          &laquo; Anterior 
          </button>
        )}

        {(paginaactual === totalPginas) ? null : (
          <button type="button" className="btn btn-info" onClick={paginaSiguiente}>
          Siguiente &raquo;
          </button>
        )}

      </div>
    </div>
  );
}

export default App;
