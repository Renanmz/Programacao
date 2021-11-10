from genericpath import exists
from config import *

class Produto(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    preco = db.Column(db.String(254))
    peso = db.Column(db.String(254))
    barra = db.Column(db.String(254))



    def __str__(self):
        return  str(self.id) + "," + self.nome + ", " + self.preco + ", " + self.peso + ", " + self.barra

    def json(self):
        return {
            "id" : self.id,
            "nome" : self.nome,
            "preco" : self.preco,
            "peso" : self.peso,
            "barra" : self.barra
            }
            



class Localnaloja(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    setor = db.Column(db.String(254))    
    posicao = db.Column(db.String(254))
    andar = db.Column(db.String(254))
    Produto_id = db.Column(db.Integer, db.ForeignKey(Produto.id), nullable=False) 
    Produto = db.relationship("Produto")


    def __str__(self):
        return  self.setor + ", " + self.posicao + ", " + self.andar + ", " + str(self.Produto)

    def json(self):
        return {
            "id" : self.id,
            "setor" : self.setor,
            "posicao" : self.posicao,
            "andar" : self.andar,
            "Produto_id":self.Produto_id, 
            "Produto":self.Produto.json() 
        }
if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    p1 = Produto(nome = "caneta", preco = "2.50", peso = "15g", barra = "1231")

    p2 = Produto(nome = "borracha", preco = "3.50", peso = "20g", barra = "4564")

    p3 = Produto(nome = "lapis", preco = "1.50", peso = "5g", barra = "7897")

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.commit()

    todas = db.session.query(Produto).all()

    for p in todas:
        print(p)
        print(p.json())
    
    l1 = Localnaloja(setor = "escola", posicao = "5", andar = "3", Produto = p1)
    l2 = Localnaloja(setor = "sede", posicao = "4", andar = "3", Produto = p2)
    l3 = Localnaloja(setor = "filial", posicao = "5", andar = "4", Produto = p3)

    
    db.session.add(l1)
    db.session.add(l2)
    db.session.add(l3)

    db.session.commit()

    print(f"Local na loja : {l1}") 
    print(f"Local na loja em json: {l1.json()}")