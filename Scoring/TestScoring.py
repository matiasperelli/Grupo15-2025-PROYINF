import unittest
from Scoring import evaluar_solicitud

class TestScoring(unittest.TestCase):
    def test_aprobado(self):
        solicitud = {
            "id_solicitud": "T001",
            "id_cliente": "C001",
            "edad": 30,
            "ingreso_mensual": 1500,
            "deuda_actual": 100,
            "historial_crediticio": 720
        }
        resultado = evaluar_solicitud(solicitud)
        self.assertEqual(resultado["decision"], "Aprobado")

    def test_rechazado(self):
        solicitud = {
            "id_solicitud": "T002",
            "id_cliente": "C002",
            "edad": 19,
            "ingreso_mensual": 300,
            "deuda_actual": 500,
            "historial_crediticio": 580
        }
        resultado = evaluar_solicitud(solicitud)
        self.assertEqual(resultado["decision"], "Rechazado")

if __name__ == "__main__":
    unittest.main()
