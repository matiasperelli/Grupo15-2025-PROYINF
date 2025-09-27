from Scoring import evaluar_solicitud
from DBMock import guardar_resultado, consultar_resultado

# simulación de solicitud:
solicitud = {
    "id_solicitud": "S001",
    "id_cliente": "C001",
    "edad": 28,
    "ingreso_mensual": 1200,
    "deuda_actual": 200,
    "historial_crediticio": 710
}

resultado = evaluar_solicitud(solicitud)
guardar_resultado(resultado)

print("La solicitud será evaluada y ha sido guardada")
print("Consultar estado:", consultar_resultado("S001"))
