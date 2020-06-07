# Prueba de concepto para utlizar Redux en un hilo diferente (Web Worker)

Esta prueba de concepto plantea la comunicación con un [Store](https://redux.js.org/api/store) enbebido dentro de un hilo diferent al principal del navegador.

## Motivación

Mi motivación principal es dejar el hilo principal sólo para tareas relacionadas con el [DOM](https://developer.mozilla.org/es/docs/DOM) y mantener hilos
diferentes para gestionar los datos.

 * Artículo relacionado que describe bien esta problemática: [Why Web Developers Need to Care about Interactivity](https://philipwalton.com/articles/why-web-developers-need-to-care-about-interactivity/)

Redux diferencia muy bien estos dos tipos de tareas; por lo que me parece buen punto de partida para plantear una solución multi hilos utilizando [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Todo el trabajo de los [reducers](https://redux.js.org/glossary#reducer) pertenecen a la capa de datos de nuestra aplicación y muchas veces consuemen 
demasiados recursos que limitan las capacidades del hilo principal del navegador.

Es evidente que las tareas de gestión del [DOM](https://developer.mozilla.org/es/docs/DOM) consumen de los datos; pero hay muchas otras tareas (que normalmente son las más complejas) que sólo estan relacionadas con los datos.


## Propuesta

Para poder ejecutar y trabajar con el Store (y todos sus reducers) planteo dos capas intermedias (StoreFront, StoreBack) para que normalizen el uso 
del API del [Store](https://redux.js.org/api/store) y que sea lo más transparente para el desarrollador.

### Comunicación

```text
[app] <--> [StoreFront] <- |- postMessage -| -> [StoreBack] <--> [Store]
```

### Ejemplos

  * [TODO](./examples/todo/README.md)


## Notas de interés

  * He tenido que meter una _"solución táctica"_ para consumir Redux como [módulo](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/M%C3%B3dulos) desde un CDN. [ver solcuión](./examples/todo)
  * Redux implementa mecanismos de garantía al hora de obtener el estado en curso (da un error si se están ejucanto los _reducers_ y se pide el estado). Con el comunicación actual, no estoy seguro de que se garantice esto.
  * Queda pendiente plantear una solución real. Esto impliva ver como se pondría en producción este planteamiento; ya que tendrían que estar disponibles (en el servidor) para ser consumidos desde la aplicación.
