# Grupo 15

Este es el repositorio del *Grupo 15*, cuyos integrantes son:

* Benjamin Alberto Cerda Reyes - Rol 202230519-3
* Jean Paul Alexandre Vergara - Rol 202230562-2
* Vicente Jesús Beiza Silva - Rol 202230516-9 
* Matias Antonio Perelli Parra - Rol 202230525-8

## Video

* [Video presentación cliente](https://aula.usm.cl/mod/resource/view.php?id=6926137)


## Wiki

Puedes acceder a la Wiki completa desde este [enlace](https://github.com/matiasperelli/GrupoSoftsy-2025-PROYINF/wiki).

## Motor Scoring

Sistema para simulación y evaluación automática de solicitudes de préstamos de consumo.  
Permite calcular un puntaje de riesgo, aprobar o rechazar solicitudes y consultar el estado de manera digital.

- Evaluación automática con motor de scoring (reglas simples).
- Almacenamiento en archivo JSON (mock de DB).
- API REST con Flask:
  - `POST /evaluar` → enviar solicitud y obtener decisión.
  - `GET /estado/{id}` → consultar estado de la solicitud.
- Tests unitarios incluidos.
- Documentación en Wiki + diagrama de secuencia.

# Requisitos
- Python 3.9+
- Instalar dependencias:
  ```bash
  pip install -r requirements.t
