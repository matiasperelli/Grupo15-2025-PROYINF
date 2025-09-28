import unittest
from Scoring import evaluar_solicitud
from DBMock import guardar_resultado, consultar_resultado

class TestScoring(unittest.TestCase):

    def setUp(self):
        self.solicitud_buena = {
            "id_solicitud": "T001",
            "id_cliente": "C001",
            "edad": 30,
            "ingreso_mensual": 1200,
            "deuda_actual": 100,
            "historial_crediticio": 700
        }

        self.solicitud_mala = {
            "id_solicitud": "T002",
            "id_cliente": "C002",
            "edad": 20,
            "ingreso_mensual": 400,
            "deuda_actual": 900,
            "historial_crediticio": 550
        }

    def test_scoring_aprobado(self):
        resultado = evaluar_solicitud(self.solicitud_buena)
        self.assertEqual(resultado["decision"], "aprobado")
        self.assertTrue(resultado["puntaje"] > 60)

    def test_scoring_rechazado(self):
        resultado = evaluar_solicitud(self.solicitud_mala)
        self.assertEqual(resultado["decision"], "rechazado")
        self.assertTrue(resultado["puntaje"] <= 60)

    def test_guardar_y_consultar(self):
        resultado = evaluar_solicitud(self.solicitud_buena)
        guardar_resultado(resultado)
        consulta = consultar_resultado(self.solicitud_buena["id_solicitud"])
        self.assertIsNotNone(consulta)
        self.assertEqual(consulta["id_cliente"], "C001")

    def test_consulta_inexistente(self):
        consulta = consultar_resultado("ID_NO_EXISTE")
        self.assertIsNone(consulta)

if __name__ == "__main__":
    unittest.main()

