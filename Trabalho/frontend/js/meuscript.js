$(function() { // quando o documento estiver pronto/carregado
import x from front
    
    $.ajax({
        url: 'http://localhost:5000/lista',
        method: 'GET',
        dataType: 'json', // os dados são recebidos no formato json
        success: listar, // chama a função listar para processar o resultado
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });

    function lista (Produto) {
        // percorrer a lista de Produto retornadas; 
        for (var i in Produto) { //i vale a posição no vetor
            lin = '<tr>' + // elabora linha com os dados da pessoa
              '<td>' + Produto[i].nome + '</td>' + 
              '<td>' + Produto[i].preco + '</td>' + 
              '<td>' + Produto[i].peso + '</td>' + 
              '</tr>';
            // adiciona a linha no corpo da tabela
            $('#corpoTabelaProduto').append(lin);
        }
    print (x)
    }


});