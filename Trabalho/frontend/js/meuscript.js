$(function () {
    function exibir_Produtos() {
        $.ajax({
            url: 'http://localhost:5000/lista/Produto',
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
                    'class="EditarProduto"><img src="img/editar.png" ' +
                    'alt="EditarProduto" title="EditarProduto" width=40px height=40px></a>' +
                    '</td>' +
                    '<td><a href=# id="Encontrar' + Produto[i].id + '" ' +
                    'class="EncontrarProduto"><p>Local</p></a>' +
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
        preco = $("#campoPreco").val();
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
            //alert("Produto inclu??da com sucesso!");
            $("#campoNome").val("");
            $("#campoPreco").val("");
            $("#campoPeso").val("");
            $("#campoBarra").val("");
            inclui2();





        } else {
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }

    function erroAoIncluir(retorno) {
        alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
    }
    //Local
    $(document).on("click", "#IncluirLocal", function () {
        id = $('#campoId4').val();
        setor = $('#campoSetor').val();
        posicao = $("#campoPosicao").val();
        andar = $("#campoAndar").val();
        Produto_id = $("#campoProdutoId").val();
        var dados = JSON.stringify({ setor: setor, posicao: posicao, andar: andar, id: id, Produto_id: Produto_id });
        $.ajax({
            url: 'http://localhost:5000/incluirLocal',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: LocalIncluido,
            error: erroAoIncluirLocal
        });
    })
    function inclui2() {
        id = $('#campoId4').val();
        setor = $('#campoSetor').val();
        posicao = $("#campoPosicao").val();
        andar = $("#campoAndar").val();
        Produto_id = $("#campoProdutoId").val();
        var dados = JSON.stringify({ setor: setor, posicao: posicao, andar: andar, id: id, Produto_id: Produto_id });
        $.ajax({
            url: 'http://localhost:5000/incluirLocal',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: LocalIncluido,
            error: erroAoIncluirLocal
        });
    }

    function LocalIncluido(retorno) {
        mostrar_conteudo("conteudoInicial");
        if (retorno.resultado == "ok") {
            //alert("Produto inclu??da com sucesso!");
            $("#campoId").val("");
            $("#campoSetor").val("");
            $("#campoPosicao").val("");
            $("#campoAndar").val("");
            $("#campoProdutoId").val("");
        } else {
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }

    function erroAoIncluirLocal(retorno) {
        alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
    }
    $('#modalIncluirLocal').on('hide.bs.modal', function (e) {
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
            success: Altera????oFeita,
            error: erroAoAlterar
        });

    })

    function Altera????oFeita(retorno) {
        mostrar_conteudo("conteudoInicial");
        if (retorno.resultado == "ok") {
            //alert("Produto alterado com sucesso!");
            $("#campoId2").val("");
            $("#campoNome2").val("");
            $("#campoPreco2").val("");
            $("#campoPeso2").val("");
            $("#campoBarra2").val("");
            exibir_Produtos();
        } else {
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }

    function erroAoAlterar(retorno) {
        alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
    }
    $('#modalAlterarProdutos').on('hide.bs.modal', function (e) {
        if (!$("#TabelaProduto").hasClass("d-none")) {
            exibir_Produtos();
        }
    });
    $(document).on("click", ".EncontrarProduto", function () {
        var componente_clicado = $(this).attr('id');
        var nome_icone = "Localizar";
        var id_Produto = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/listaLocal/' + id_Produto,
            method: 'GET',
            dataType: 'json',
            success: LocalizarProduto,
            error: erroAoLocalizar
        });
    })

    function LocalizarProduto(retorno) {
        $('#modalEncontrar').modal('show');
        $("#campoId3").val(retorno['id']);
        $("#campoSetor2").val(retorno['setor']);
        $("#campoPosicao2").val(retorno['posicao']);
        $("#campoAndar2").val(retorno['andar']);

    }

    function erroAoLocalizar(retorno) {
        alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
    }


    $(document).on("click", "#AlterarLocal", function () {
        id = $('#campoId3').val();
        setor = $('#campoSetor2').val();
        posicao = $("#campoPosicao2").val();
        andar = $("#campoAndar2").val();
        var dados = JSON.stringify({ setor: setor, posicao: posicao, andar: andar, id: id });
        $.ajax({
            url: 'http://localhost:5000/AlterarLocal',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: Altera????oLocalFeita,
            error: erroAoAlterarLocal
        });

    })

    function Altera????oLocalFeita(retorno) {
        mostrar_conteudo("conteudoInicial");
        if (retorno.resultado == "ok") {
            //alert("Produto alterado com sucesso!");
            $("#campoId3").val("");
            $("#campoSetor2").val("");
            $("#campoPosicao2").val("");
            $("#campoAndar2").val("");
            exibir_Produtos();
        } else {
            alert(retorno.resultado + ":" + retorno.detalhes);
        }
    }

    function erroAoAlterarLocal(retorno) {
        alert("ERRO: " + retorno.resultado + ":" + retorno.detalhes);
    }
    $('#modalAlterarLocal').on('hide.bs.modal', function (e) {
        if (!$("#TabelaProduto").hasClass("d-none")) {
            exibir_Produtos();
        }
    });

    function carregarCombo(combo_id, nome_classe) {
        $.ajax({
            url: 'http://localhost:5000/lista/' + nome_classe,
            method: 'GET',
            dataType: 'json',
            success: carregar,
            error: function (problema) {
                alert("erro ao ler dados, verifique o backend: ");
            }
        });

        function carregar() {
            $('#' + combo_id).empty();
            $('#loading_' + combo_id).removeClass('d-none');
            var i = 0
            var dados = ['']
            if (combo_id == "campoSetorId") {
                dados = ['']
                i = 0
                dados = ["papelaria", "frios", "bebidas", "frutas", "vegetais", "padaria", "acougue"]
                for (i in dados) {
                    $('#' + combo_id).append(
                        $('<option></option>').attr("value",
                            dados[i]).text(dados[i]));
                }
            }
            if (combo_id == "campoPosicaoId") {
                dados = ['']
                i = 0
                dados = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",]
                for (i in dados) {
                    $('#' + combo_id).append(
                        $('<option></option>').attr("value",
                            dados[i]).text(dados[i]));
                }
            }
            if (combo_id == "campoAndarId") {
                dados = ['']
                i = 0
                dados = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",]
                for (i in dados) {
                    $('#' + combo_id).append(
                        $('<option></option>').attr("value",
                            dados[i]).text(dados[i]));
                }
            }
            setTimeout(() => {
                $('#loading_' + combo_id).addClass('d-none');
            }, 1000);
        }
    }
    $('#modalIncluir').on('shown.bs.modal', function (e) {
        carregarCombo("campoSetorId", "Localnaloja");
        carregarCombo("campoPosicaoId", "Localnaloja");
        carregarCombo("campoAndarId", "Localnaloja");
    });

});