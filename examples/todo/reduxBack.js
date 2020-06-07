import './process-config.js'; // solución táctica para alimentar una constante que necesita Redux
import {createStore} from 'https://unpkg.com/redux@4.0.5/es/redux.js?module';
import {rootReducer} from './reducers.js';

const store = createStore(rootReducer);
postMessage(store.getState()) // fire initial state
store.subscribe(_ => postMessage(store.getState()));
onmessage = function(oEvent) {
  const {data} = oEvent;
  console.log('Execute Command:', data)
  store.dispatch(data);
}
// puedo recibir los comandos para tener acceso a todo el api
// la salida siempre es por el subscribe