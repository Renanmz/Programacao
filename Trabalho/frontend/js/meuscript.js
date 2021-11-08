$(function () {
    function exibir_Produtos() {
        $.ajax({
            url: 'http://localhost:5000/lista',
            method: 'GET',
            dataType: 'json',
            success: lista,
            error: function () {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function lista(Produto) {
            $('#corpoTabelaProduto').empty();
            mostrar_conteudo("TabelaProduto");
            for (var i in Produto) {
                lin = '<tr id="linha_' + Produto[i].id + '">' +
                    '<td>' + Produto[i].nome + '</td>' +
                    '<td>' + Produto[i].preco + '</td>' +
                    '<td>' + Produto[i].peso + '</td>' +
                    '<td>' + Produto[i].barra + '</td>' +
                    '<td><a href=# id="Excluir' + Produto[i].id + '" ' +
                    'class="ExcluirProduto"><img src="img/excluir.png" ' +
                    'alt="ExcluirProduto" title="ExcluirProduto" width=40px height=40px></a>' +
                    '</td>' +
                    '<td><a href=# id="Editar' + Produto[i].id + '" ' +
                    'class="EditarProduto"><p>Editar</p></a>'
                '</td>' +
                    '</tr>';
                $('#corpoTabelaProduto').append(lin);
            }
        }
    }
    function mostrar_conteudo(identificador) {
        $("#TabelaProduto").addClass("d-none");
        $("#conteudoInicial").addClass("d-none");

        $("#" + identificador).removeClass("d-none");
    }


    $(document).on("click", "#linkLista", function () {
        exibir_Produtos();
    });

    $(document).on("click", "#linkInicio", function () {
        mostrar_conteudo("conteudoInicial");
    });


    $(document).on("click", "#IncluirProduto", function () {
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

    function ProdutoIncluido(retorno) {
        mostrar_conteudo("conteudoInicial");
        if (retorno.resultado == "ok") {
            //alert("Produto incluída com sucesso!");
            $("#campoNome").val("");
            $("#campoPreco").val("");
            $("#campoPeso").val("");
            $("#campoBarra").val("");
        } else {
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }
    function erroAoIncluir(retorno) {
        alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
    }

    $('#modalIncluirProdutos').on('hide.bs.modal', function (e) {
        if (!$("#TabelaProduto").hasClass("d-none")) {
            exibir_Produtos();
        }
    });
    mostrar_conteudo("conteudoInicial");

    $(document).on("click", ".ExcluirProduto", function () {
        var componente_clicado = $(this).attr('id');
        var nome_icone = "Excluir";
        var id_Produto = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/ExcluirProduto/' + id_Produto,
            type: 'DELETE',
            dataType: 'json',
            success: ProdutoExcluido,
            error: erroAoExcluir
        });

        function ProdutoExcluido(retorno) {
            if (retorno.resultado == "ok") {
                $("#linha_" + id_Produto).fadeOut(500, function () {
                    //alert("Produto removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoExcluir(retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    })
    $(document).on("click", ".EditarProduto", function () {
        var componente_clicado = $(this).attr('id');
        var nome_icone = "Editar";
        var id_Produto = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/VerificarProduto/' + id_Produto,
            method: 'GET',
            dataType: 'json',
            success: EditarProduto,
            error: erroAoEditar
        });
    })

    function EditarProduto(retorno) {
        $('#modalEditar').modal('show');
        $("#campoId2").val(retorno['id']);
        $("#campoNome2").val(retorno['nome']);
        $("#campoPreco2").val(retorno['preco']);
        $("#campoPeso2").val(retorno['peso']);
        $("#campoBarra2").val(retorno['barra']);
    }

    function erroAoEditar(retorno) {
        alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
    }
    $(document).on("click", "#AlterarProduto", function () {
        id = $('#campoId2').val();
        nome = $("#campoNome2").val();
        preco = $("#campoPreco2").val();
        peso = $("#campoPeso2").val();
        barra = $("#campoBarra2").val();
        var dados = JSON.stringify({ nome: nome, preco: preco, peso: peso, barra: barra, id: id });
        $.ajax({
            url: 'http://localhost:5000/AlterarProduto',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: AlteraçãoFeita,
            error: erroAoAlterar
        });
        
    })
    function AlteraçãoFeita(retorno) {
        mostrar_conteudo("conteudoInicial");
        if (retorno.resultado == "ok") {
            //alert("Produto alterado com sucesso!");
            $("#campoId2").val("");
            $("#campoNome2").val("");
            $("#campoPreco2").val("");
            $("#campoPeso2").val("");
            $("#campoBarra2").val("");
        } else {
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }
    function erroAoAlterar(retorno) {
        alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
    }
    $('#modalAlterarProdutos').on('hide.bs.modal', function (e) {
        if (!$("#TabelaProduto").hasClass("d-none")) {
            exibir_pessoas();
        }
    });
    mostrar_conteudo("conteudoInicial");
    
});

