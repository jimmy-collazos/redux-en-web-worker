export function createStore() {
  const service = new Worker('./reduxBack.js', { type: 'module', name: `redux-service:${new Date().getTime()}`});
  const listeners = [];
  let currentState;
  const dispatch = (action) => service.postMessage(action)
  const subscribe = (fn) => listeners.push(fn);
  const getState = () => currentState;
  service.onmessage = (oEvent) => (currentState = oEvent.data, Array.from(listeners).forEach(fn => fn()));

  return {dispatch, subscribe, getState}
}