from flask import Flask, request, jsonify
from Scoring import evaluar_solicitud
from DBMock import guardar_resultado, consultar_resultado

app = Flask(__name__)

@app.route("/evaluar", methods=["POST"])
def evaluar():
    solicitud = request.json
    if not solicitud:
        return jsonify({"error": "Solicitud vacía"}), 400
    
    resultado = evaluar_solicitud(solicitud)
    guardar_resultado(resultado)
    return jsonify(resultado), 201

@app.route("/estado/<id_solicitud>", methods=["GET"])
def estado(id_solicitud):
    resultado = consultar_resultado(id_solicitud)
    if resultado:
        return jsonify(resultado)
    return jsonify({"error": "Solicitud no encontrada"}), 404

if __name__ == "__main__":
    app.run(debug=True)
