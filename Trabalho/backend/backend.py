from config import *
from modelo import Produto
@app.route("/")
def padrao():
    return "backend operante"

@app.route("/incluir", methods=['post'])
def incluir():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    
    dados = request.get_json() 
    try:
      nova = Produto(**dados)
      db.session.add(nova) 
      db.session.commit() 
    except Exception as e: 
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    
    return resposta 


@app.route("/lista")
def lista():
    produtos = db.session.query(Produto).all()
    retorno = []
    for p in produtos:
        retorno.append(p.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


app.run(debug = True)