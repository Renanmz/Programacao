$(function exibir_Produtos() { 
    $.ajax({
        url: 'http://localhost:5000/lista',
        method: 'GET',
        dataType: 'json', 
        success: lista, 
        error: function() {
            alert("erro ao ler dados, verifique o backend");
        }
    });
    function lista (Produto) {
        $('#corpoTabelaProduto').empty();
        mostrar_conteudo("TabelaProduto");
        for (var i in Produto) { 
            lin = '<tr>' + 
              '<td>' + Produto[i].nome + '</td>' + 
              '<td>' + Produto[i].preco + '</td>' + 
              '<td>' + Produto[i].peso + '</td>' + 
              '<td>' + Produto[i].barra + '</td>' +
              '</tr>';
            $('#corpoTabelaProduto').append(lin);
        }
    }
});
    function mostrar_conteudo(identificador) { 
        //$("#TabelaProdutos").addClass(’invisible’); 
        //$("#conteudoInicial").addClass(’invisible’);
        $("#"+identificador).removeClass(’invisible’); 
       }
    
    
    $(document).on("click", "#linkLista", function() { 
        exibir_Produtos(); 
    });

    $(document).on("click", "#linkInicio", function() { 
        mostrar_conteudo("conteudoInicial"); 
    });