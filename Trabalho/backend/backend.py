from config import *
from modelo import Produto, p1, p2

@app.route("/")
def padrao():
    return "backend operante"

@app.route("/incluir")
def incluir():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    
    dados = request.get_json() 
    try:
      db.session.add(p1) 
      db.session.commit() 
    except Exception as e: 
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})

    resposta.headers.add("Access-Control-Allow-Origin", "*")
    
    return resposta 


@app.route("/lista")
def lista():
    produtos = db.session(Produto).all()
    retorno = []
    for p in produtos:
        retorno.append(p.json())
    resposta = jsonify(retorno)
    return resposta

app.run(debug = True)