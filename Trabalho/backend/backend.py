from config import *
from modelo import Localnaloja, Produto


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
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/incluirLocal", methods=['post'])
def incluirLocal():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})

    dados = request.get_json()
    try:
        nova = Localnaloja(**dados)
        db.session.add(nova)               
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/lista/<string:Class>")
def lista(Class):
    if Class == "Produto":
        classe = db.session.query(Produto).all()
    elif Class == "Localnaloja":
        classe = db.session.query(Localnaloja).all()
    retorno = []
    for p in classe:
        retorno.append(p.json())
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta


@app.route("/ExcluirProduto/<int:Produtoid>", methods=['DELETE'])
def excluir_produto(Produtoid):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Produto.query.filter(Produto.id == Produtoid).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/VerificarProduto/<int:Produtoid>")
def verificar_produto(Produtoid):
    produto_var = Produto.query.get(Produtoid)
    retorno = produto_var.json()
    resposta = jsonify(retorno)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/AlterarProduto", methods=['post'])
def alterar_produto():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    Produtoid = dados['id']
    p = Produto.query.get(Produtoid)
    try:
        p.nome = dados['nome']
        p.preco = dados['preco']
        p.peso = dados['peso']
        p.barra = dados['barra']

        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")   
    return resposta

@app.route("/listaLocal/<int:Produtoid>") 
def listaLocal(Produtoid): 
    Local = db.session.query(Localnaloja).filter(Localnaloja.Produto_id == Produtoid).first()
    resposta = jsonify(Local.json()) 
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta

@app.route("/AlterarLocal", methods=['post'])
def alterar_local():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()
    Localid = dados['id']
    l = db.session.query(Localnaloja).filter(Localnaloja.Produto_id == Localid).first()
    try:
        l.setor = dados['setor']
        l.posicao = dados['posicao']
        l.andar = dados['andar']
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")   
    return resposta

app.run(debug=True)



#p.nome = dados['nome']