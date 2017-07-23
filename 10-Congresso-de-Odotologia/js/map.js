$(document).ready(function()
{
	iniciarMapa(); 
    carregarPontos();
    
});

var mapa;

function iniciarMapa() {
    var latlng = new google.maps.LatLng(-16.6750873, -49.264801);
 
    var options = {
        zoom: 18,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    map = new google.maps.Map(document.getElementById("mapa"), options);
}

function carregarPontos() {
	
    $.getJSON('js/pontos.json', function(ponto) {

        $.each(ponto, function(iniciarMapadex, ponto) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
                title: ponto.Titulo,
                map: map,
            });
        });
 
    });
}

