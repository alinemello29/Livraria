from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

livros = []

@app.route('/')
def home():
    return "API de Livros Vai Na Web"

@app.route('/doar', methods=['POST'])
def doar_livro():
    data = request.get_json()
    if not data:
        return jsonify({"erro": "Dados inválidos"}), 400

    livro = {
        "id": len(livros) + 1,
        "titulo": data.get("titulo"),
        "autor": data.get("autor"),
        "categoria": data.get("categoria"),
        "imagem_url": data.get("imagem_url")
    }
    livros.append(livro)
    return jsonify(livro), 201

@app.route('/doar', methods=['GET'])
def listar_livros():
    return jsonify(livros), 200

if __name__ == '__main__':
    app.run()
