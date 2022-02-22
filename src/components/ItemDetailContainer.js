import './ItemDetailContainer.css';

import { useState, useEffect } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";


export default function ItemDetailContainer() {
  const [item, setItem] = useState();
  // El useParams es un hoook de react-router-dom que nos provee para obtener los 
  // parametros de la URL. 
  // El nombre "itemId" es arbitrario y lo tengo que definir en el App.js
  const { productId } = useParams();

  useEffect(() => {

    // Obtengo la referencia del documento, necesita conocer la base de dato, el nombre de la collecion y el id de item
    const itemRef = doc(db, "items", productId);

    // Le pido a firebase mi documento en base a su referencia
    getDoc(itemRef)
    .then((snapshot) => {
      
      // Verifico si el item existe
      if(snapshot.exists()) {
        // Asigno el item a mi estado
        setItem({ id: snapshot.id, ...snapshot.data()})
      }

    })
    .catch(error => {
      console.log(error)
    })

  }, [productId]);

  return (
    <div className='item-detail-container'>
      {!item ? <p>Cargando producto...</p> :  <ItemDetail item={item} />}
    </div>
  )
};
