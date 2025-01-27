import { getDocs, collection } from 'firebase/firestore';
import { db } from "../firebase";

/* Codigo legacy
// Esta información en un caso real debería provenir del Backend
const items = [
  { 
    id: 1,
    title: 'Trek 2000',
    description: 'La mejor bici del 2000, la Trek 2000.',
    price: 950,
    pictureUrl: 'https://borabikes.com.ar/64631-large_default/bicicleta-mtb-trek-fuel-ex-7-nx-r29-12v-sram-doble-rock-shox.jpg',
    category: 'bicicletas',
  },
  { 
    id: 2,
    title: 'Casco Rocket 🚀',
    description: 'El casco para que te puedan chocar y no perder la vida.',
    price: 30,
    pictureUrl: 'https://borabikes.com.ar/61631-large_default/casco-bicicleta-mtb-skate-urbano-tipo-protec-adultos-y-ninos.jpg',
    category: 'accesorios',
  },
  { 
    id: 3,
    title: 'Campera Canguro Gris',
    description: 'La campera canguro que te hará estar abrigado en invierno ❄️',
    price: 35,
    pictureUrl: 'https://borabikes.com.ar/61943-large_default/campera-buzo-canguro-bicicleta-moto-giant-liv-casual-bora.jpg',
    category: 'ropa',
  },
  {
    id: 4,
    title: 'Bicicleta Mtb Enduro Vairo E1 Comp R 27.5 20 V Doble Sram X5',
    description: 'La mejor bici de enduro del planeta.',
    price: 1400,
    pictureUrl: '/images/bicicleta-mtb-enduro-vairo-e1-comp-r-275-20-v-doble-sram-x5.jpg',
    category: 'bicicletas',
  }
]
  Fin de codigo legacy, puedes borrar esto si quieres
*/


// Función que va a llamar al Backend
function getItems() {
  return new Promise(async (resolve, reject) => {
    
    /*
      Codigo legacy, para
      ejemplo

    Codigo viejo sin firebase
    setTimeout(() => {
      resolve(items);
    }, 500)

      Fin de codigo legacy, puedes borrar esto si quieres
    */

    // 1 - La referencia a la collecion    
    const itemsCollection = collection(db, "items");

    // 2 - Obtengo mis documentos
    getDocs(itemsCollection)
    .then(snapshot => {      
      // doc.data() archivo de Firestore, dame todos tus datos dentro del item
      // 3 -  Mapeo mis productos
      const products =  snapshot.docs.map( (doc) =>  ({ id: doc.id, ...doc.data() }))
      
      // Devolverle a la promesa
      resolve(products)
    })
    .catch(error => {
      console.log(error)
      reject(error)
    })

  });
}

// Exportar las funciones que necesito
export {
  getItems,
}
