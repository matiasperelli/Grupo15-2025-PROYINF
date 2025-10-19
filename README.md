# Grupo 15 — Proyecto de Préstamos Digitales

Este repositorio pertenece al Grupo 15* del curso Análisis y Diseño de Software (2025-2, UTFSM).  
El proyecto consiste en el diseño e implementación de un sistema digital para la simulación, solicitud y evaluación automática de préstamos de consumo, utilizando tecnologías modernas y contenedores Docker para garantizar portabilidad y escalabilidad.

---

##  Integrantes del Grupo

* Benjamin Alberto Cerda Reyes — Rol 202230519-3  
* Jean Paul Alexandre Vergara — Rol 202230562-2  
* Vicente Jesús Beiza Silva — Rol 202230516-9  
* Matias Antonio Perelli Parra — Rol 202230525-8  

---

## Wiki

Puedes acceder a la Wiki completa desde este [enlace](https://github.com/matiasperelli/GrupoSoftsy-2025-PROYINF/wiki).

## Contexto del Proyecto

La institución financiera presenta un proceso de préstamos lento y manual, con tiempos de aprobación de hasta una semana.  
La estrategia de transformación digital busca reducir ese tiempo a menos de 24 horas mediante la digitalización completa del proceso de solicitud y evaluación.

El objetivo es ofrecer una experiencia 100% digital, segura y rápida, mejorando los KPI de tiempo de respuesta y los SLA de aprobación.

---

## Tecnologías Utilizadas

| Componente | Tecnología |
|-------------|-------------|
| **Backend** | Node.js con Express |
| **Base de datos** | PostgreSQL |
| **Contenedores** | Docker y Docker Compose |
| **Lenguaje** | JavaScript (ES6) |
| **Herramientas de prueba** | Jest y Supertest (para pruebas unitarias futuras) |

Estas tecnologías fueron elegidas por su compatibilidad, soporte, facilidad de despliegue y adaptabilidad al entorno académico y profesional.

---

## Arquitectura General

El sistema sigue una arquitectura Cliente - Servidor - Base de Datos, con las siguientes responsabilidades:

- **Cliente (Web/App):** envía las solicitudes y muestra los resultados de la simulación o evaluación.
- **Servidor (Node.js/Express):** recibe los datos, ejecuta las reglas de negocio (cálculo de scoring) y coordina las operaciones con la base de datos.
- **Base de Datos (PostgreSQL):** almacena los datos de las simulaciones y solicitudes de préstamo.

El uso de Docker Compose permite ejecutar ambos servicios en contenedores conectados, garantizando portabilidad y consistencia del entorno.

---

##  Avance de Código (Hito 3)

En este hito se incorporó un backend, cumpliendo con las cuatro historias de usuario desarrolladas hasta la fecha:

1. **HU1 – Simulación de Préstamo:** cálculo de cuota mensual y CAE.
2. **HU2 – Solicitud de Préstamo:** validación de datos y subida de documentos.
3. **HU3 – Evaluación Automática:** motor de scoring que aprueba o rechaza la solicitud.
4. **HU4 – Visualización de Resultado:** interfaz para mostrar el estado final al cliente.

Además, se incorporaron las siguientes mejoras:
- Implementación de la conexión a PostgreSQL mediante el módulo `pg`.
- Creación del motor de scoring (reglas de negocio).
- Diseño del endpoint principal `/api/evaluar` para registrar y devolver simulaciones.
- Contenedorización completa con Docker (backend y base de datos).
- Documentación técnica ampliada en este README.

---
## Video Prototipo Hito3
[![Video Hito3]()]( https://youtu.be/2Q4vW22-GCc?si=dOge9aorHjx9rV6C)

## Estructura del Código
```
/GrupoSoftsy-2025-PROYINF
├── Dockerfile
├── docker-compose.yml
├── package.json
└── src/
├── app.js
├── index.js
├── db.js
├── scoring.js
└── simulacion.js
```
### Descripción breve de cada archivo

- **index.js:** inicia el servidor Express y escucha en el puerto 3000.  
- **app.js:** configura la aplicación Express, habilita el uso de JSON y define las rutas principales.  
- **db.js:** conecta la aplicación con la base de datos PostgreSQL usando un pool de conexiones.  
- **scoring.js:** contiene la lógica del negocio, calcula la cuota y el puntaje de riesgo.  
- **simulacion.js:** define el endpoint `/api/evaluar`, ejecuta el cálculo, guarda el resultado y devuelve la respuesta al cliente.  

---

## Lógica del Motor de Scoring

El motor de scoring evalúa la relación entre el ingreso mensual y la cuota calculada para determinar el riesgo del cliente.  
La fórmula usada para la cuota es:

Cuota = \frac{Monto \times TasaMensual}{1 - (1 + TasaMensual)^{-Plazo}}

Luego calcula el porcentaje que la cuota representa del ingreso, y según eso asigna un puntaje de riesgo entre 0 y 100.  
Si el score es mayor o igual a 60, el cliente queda Preaprobado; de lo contrario, Rechazado.

---

## Instrucciones de Ejecución

### 1. Requisitos
- Tener instalado **Docker Desktop** y **Git**.
- No es necesario instalar Node.js ni PostgreSQL manualmente.

### 2. Clonar el repositorio
```bash
git clone https://github.com/matiasperelli/GrupoSoftsy-2025-PROYINF.git
cd GrupoSoftsy-2025-PROYINF
```

### 3. Levantar los contenedores
```
docker compose up --build
```

Esto descargará las imágenes necesarias, instalará dependencias y levantará:

- el servidor Node.js (node_app)

- la base de datos PostgreSQL (postgres_db)

### 4. Apagar los contenedores
```
docker compose down
```

Si desea eliminar los datos de la base:
```
docker compose down -v
```

## Video del cliente

* [Video presentación cliente](https://aula.usm.cl/mod/resource/view.php?id=6926137)

## Video prototipo sistema (Interfaz)

* [Video prototipo sistema (interfaz)](https://youtu.be/2Q4vW22-GCc?si=sNTpJr3fnx4untbg)

