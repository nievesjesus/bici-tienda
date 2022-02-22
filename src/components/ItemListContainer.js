import './ItemListContainer.css';

import { useEffect, useState } from 'react';
import ItemCount from './ItemCount';
import ItemList from './ItemList';
import { getItems } from '../api';
import { useParams } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

export default function ItemListContainer({ greetings }) {
  const [itemsList, setItemsList] = useState([]);
  const { categoryName } = useParams();


  useEffect(() => {
    // En el montaje del componente voy a traer los productos del archivo api
    getItems().then((items) => {
      if (!categoryName) {
        setItemsList(items);
      } else {
        const itemsPorCategoria = items.filter((producto) => {
          return producto.category === categoryName;
        });

        setItemsList(itemsPorCategoria);
      }
    }).catch((error) => {
      console.log(error);
    });

  }, [categoryName]);

  useEffect(() => {

    // Referencia a la collecion, debe tener la referencia a la DB y el nombre de la collecion\
    // collection(db, "items")
    // Importar getDocs y Collection arriba
    // import { getDocs, collection } from 'firebase/firestore';
    // Importar base de datos
    // import { db } from '../firebase';
    
    // 1- La referencia a la collecion
    const itemsCollection = collection(db, "items");

    // 2- Obtengo mis documentos
    getDocs(itemsCollection)
    .then(snapshot => {
      // doc.data() archivo de Firestore, dame todos tus datos dentro del item
      //3 -  Mapeo mis productos
      const products =  snapshot.docs.map( (doc) =>  ({ id: doc.id, ...doc.data() }))
      console.log(products)
    })
    .catch(error => {
      console.log(error)
    })


  }, []);

  function onAddItem(itemCount) {
    console.log(itemCount);
  }

  return (
    <div>
      <h1>{greetings}</h1>

      {
        itemsList.length === 0 ? 
          <p>Cargando productos...</p> : 
          <ItemList items={itemsList} />
      }

      {/* Lo seguimos manteniendo acá por el momento */}
      <ItemCount stock={5} initial={1} onAdd={onAddItem} />
    </div>
  )
}
