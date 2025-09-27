import json
from datetime import datetime

DB_FILE = "solicitudes.json"

def cargar_db():
    try:
        with open(DB_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

def guardar_db(data):
    with open(DB_FILE, "w") as f:
        json.dump(data, f, indent=4)

def guardar_resultado(resultado):
    db = cargar_db()
    resultado["fecha_evaluacion"] = datetime.now().isoformat()
    db.append(resultado)
    guardar_db(db)
    return resultado

def consultar_resultado(id_solicitud):
    db = cargar_db()
    for r in db:
        if r["id_solicitud"] == id_solicitud:
            return r
    return None
