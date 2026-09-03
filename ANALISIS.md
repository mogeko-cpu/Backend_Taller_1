# Análisis – Taller 1

> Completar con los números reales que arroje `npm start` en la sección
> "Parte C: Comparación de estrategias" antes de entregar.

## 1. ¿Cuál estrategia obtuvo un mejor tiempo de ejecución?

En nuestra ejecución, la estrategia **secuencial** tardó 23 992 ms y la
**concurrente** tardó 42 235 ms — es decir, en este caso particular la
secuencial fue más rápida.

Esto no contradice la teoría de `Promise.all()`; se explica por una
limitación externa: la API pública devolvía errores 429 (Too Many
Requests) de Cloudflare al lanzar muchas peticiones simultáneas. Para
evitar que el programa fallara, la estrategia concurrente tuvo que
limitarse a lotes pequeños (3 páginas a la vez) con pausas de 1.5 s entre
cada lote, lo que le agregó overhead artificial y terminó siendo más
lenta que simplemente pedir las páginas una por una. En un entorno sin
ese límite de tasa, `Promise.all()` sobre las 42 páginas de una sola vez
habría sido considerablemente más rápido que la versión secuencial.

## 2. ¿Qué ventajas ofrece Promise.all()?

- Reduce el tiempo total de ejecución cuando las tareas son independientes
  entre sí (una página no depende del resultado de otra).
- Simplifica el código: no hace falta manejar manualmente un contador de
  tareas pendientes.
- Aprovecha mejor la naturaleza no bloqueante de JavaScript/Node para I/O.

## 3. ¿Qué desventajas puede tener realizar demasiadas solicitudes concurrentes?

- Riesgo de rate limiting: la API puede rechazar o retrasar peticiones si
  detecta demasiadas solicitudes simultáneas desde el mismo cliente. En
  la práctica, al lanzar las 42 peticiones con `Promise.all()` sin
  ningún control, la API de Rick and Morty (protegida por Cloudflare)
  respondió con error 429 y bloqueó temporalmente las peticiones.
- Para evitar ese bloqueo hubo que introducir lotes pequeños y pausas
  entre ellos, lo que puede terminar anulando (o incluso revirtiendo,
  como pasó en nuestra prueba) la ventaja de velocidad que se buscaba
  con la concurrencia.
- Mayor consumo de memoria y de conexiones de red abiertas a la vez.
- Si una sola promesa falla, `Promise.all()` rechaza todo el conjunto
  inmediatamente (a menos que se use `Promise.allSettled`), lo que puede
  perder resultados ya obtenidos de las demás peticiones.

## 4. ¿En qué situaciones utilizaría consultas secuenciales y en cuáles concurrentes?

- **Secuenciales**: cuando una petición depende del resultado de la
  anterior (por ejemplo, necesitar un ID devuelto por una llamada para
  poder hacer la siguiente), o cuando hay que respetar límites estrictos
  de tasa del servidor.
- **Concurrentes**: cuando las tareas son independientes entre sí, como en
  este taller, donde cada página se puede pedir sin depender de las demás.