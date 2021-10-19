function exibir_Produtos() { 
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
}
    function mostrar_conteudo(identificador) { 
        $("#TabelaProduto").addClass("invisible"); 
        $("#conteudoInicial").addClass("invisible");
        $("#"+identificador).removeClass("invisible"); 
       }
    
    
    $(document).on("click", "#linkLista", function() { 
        exibir_Produtos();
    });

    $(document).on("click", "#linkInicio", function() { 
        mostrar_conteudo("conteudoInicial"); 
    });


    $(document).on("click", "#IncluirProduto", function() { 
        nome = $("#campoNome").val(); 
        preco = $("#campoPreço").val(); 
        peso = $("#campoPeso").val(); 
        barra = $("#campoBarra").val(); 
        var dados = JSON.stringify({ nome: nome, preco: preco, peso: peso, barra: barra }); 
        $.ajax({ 
            url: 'http://localhost:5000/incluir', 
            type: 'POST', 
            dataType: 'json',  
            contentType: 'application/json', 
            data: dados, 
            success: ProdutoIncluido, 
            error: erroAoIncluir 
        });
    })

        function ProdutoIncluido (retorno) { 
            if (retorno.resultado == "ok") { 
                alert("Produto incluída com sucesso!"); 
                $("#campoNome").val(""); 
                $("#campoPreço").val(""); 
                $("#campoPeso").val(""); 
                $("#campoBarra").val(""); 
            } else { 
                alert(retorno.resultado + ":" + retorno.detalhes); 
            } 
        } 
        function erroAoIncluir (retorno) { 
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes); 
        }

    $('#modalIncluirProdutos').on('hide.bs.modal', function (e) { 
            if (! $("#tabelaPessoas").hasClass('invisible')) { 
                exibir_pessoas(); 
            } 
        }); 
             
               
    mostrar_conteudo("conteudoInicial"); 
