$(document).ready(function() {
     $('#formDadosLogin').submit(function () {
        var email = $("#email").val();
        var senha = $("#senha").val();
       
        var usuario = {
            email: email,
            senha: senha,
        }

        $.ajax({
            url: "http://localhost:8000/api/autenticar",
            type: 'POST',
            async: true,
            data: usuario,  
            success: function(resp){ 
                $("#tituloModal").text("Login concluído");
                $("#conteudoModal").text("Login efetuado com sucesso!");
                $("#btnFecharModalRedirecionar").show();
                $("#btnFecharModal").hide();
                $("#myModal").modal("show");
            }, 
            error: function(erro){ 
                $("#tituloModal").text("Erro ao efetuar login");
                $("#conteudoModal").text(erro.responseText);
                $("#btnFecharModalRedirecionar").hide();
                $("#btnFecharModal").show();
                $("#myModal").modal("show");
            }  
        });

        return false;
    });

     $("#btnFecharModalRedirecionar").click(function (){
        $(location).attr('href', 'home.html');
     });
});