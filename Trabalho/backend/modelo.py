from genericpath import exists
from config import *

class Produto(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    preco = db.Column(db.String(254))
    peso = db.Column(db.String(254))


    def __str__(self):
        return  str(self.id) + "," + self.nome + ", " + self.preco + ", " + \
               self.peso

    def json(self):
        return {
            "id" : self.id,
            "nome" : self.nome,
            "preco" : self.preco,
            "peso" : self.peso,}
            

if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    p1 = Produto(nome = "caneta", preco = "2.50", peso = "15g")

    p2 = Produto(nome = "borracha", preco = "3.50", peso = "20g")

    p3 = Produto(nome = "lapis", preco = "1.50", peso = "5g")

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.commit()

    todas = db.session.query(Produto).all()

    for p in todas:
        print(p)
        print(p.json())

