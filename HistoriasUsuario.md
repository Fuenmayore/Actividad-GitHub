# Historias de Usuario - Proyecto Películas Populares

## Historia de Usuario 1: Filtrar Películas por Categoría
**Como** usuario,  
**quiero** seleccionar una categoría desde el menú desplegable,  
**para** ver únicamente las películas que pertenecen a esa categoría en la lista.

### Criterios de Aceptación:
- El menú desplegable debe mostrar todas las categorías disponibles.
- Al seleccionar una categoría, la lista de películas se actualiza dinámicamente.
- Existe una opción "Todos" para ver todas las películas sin filtro.

---

## Historia de Usuario 2: Ver Detalles de una Película
**Como** usuario,  
**quiero** hacer clic en una película de la lista,  
**para** abrir un modal con información detallada de la película, incluyendo sinopsis, calificación y elenco.

### Criterios de Aceptación:
- El modal debe mostrarse al hacer clic en cualquier película.
- La información del modal debe incluir título, sinopsis, calificación y actores principales.
- Debe haber un botón para cerrar el modal fácilmente.

---

## Historia de Usuario 3: Ver Gráficos de Películas
**Como** usuario,  
**quiero** ver gráficos interactivos sobre las mejores películas y las más populares,  
**para** entender cuáles son las tendencias actuales en el cine.

### Criterios de Aceptación:
- Deben mostrarse al menos dos gráficos: uno de películas mejor calificadas y otro de las más populares.
- Los gráficos deben ser interactivos y permitir visualizar datos específicos al pasar el cursor.
- Un filtro por rango de fechas permite actualizar los datos mostrados en los gráficos.

---

## Historia de Usuario 4: Desplazamiento Suave entre Secciones
**Como** usuario,  
**quiero** que al hacer clic en los enlaces de navegación,  
**para** moverme a la sección correspondiente con un efecto de desplazamiento suave.

### Criterios de Aceptación:
- Los enlaces del navbar deben llevar al usuario a la sección correspondiente.
- El desplazamiento debe ser suave, con una duración aproximada de 800 ms.
- La URL debe actualizarse con el hash de la sección después del desplazamiento.

---

## Historia de Usuario 5: Ver Información en la Cartelera
**Como** usuario,  
**quiero** leer la cartelera actual en un texto dinámico,  
**para** estar al tanto de las funciones disponibles y los horarios.

### Criterios de Aceptación:
- El texto debe estar visible como un marquee dinámico en la parte superior del sitio.
- Debe incluir información como horarios y títulos destacados.
- La información debe actualizarse automáticamente según la programación del cine.
