var participante = false
var pista = document.getElementById('pista')
var progress = document.getElementById('progress')
var titulo = document.getElementById('titulo')
var artista = document.getElementById('artista')
var imagen = document.getElementById('imagen')
var handler = document.getElementById('handler')
var current_track = 0
var cancion, audio, duration
var canciones_html = ''

var canciones = [
    {
        imagen: 'https://i.scdn.co/image/ab67616d00001e027b768646248d10fb4bf57d77',
        titulo: 'Cuatro veces',
        artista: 'Odisseo',
        audio: 'music/Odisseo - Cuatro Veces.mp3'
    },
    {
        imagen: 'https://i.scdn.co/image/ab67616d00001e025149c948fde506624246a684',
        titulo: 'Kingslayer',
        artista: 'Bring Me the Horizon(feat. BABYMETAL)',
        audio: 'music/Bring Me the Horizon - Kingslayer (feat. BABYMETAL).mp3'
    },
    {
        imagen: 'https://i.scdn.co/image/ab67616d00001e02b96e7ac256df3ca695bc7596',
        titulo: 'Yen',
        artista: 'Slipknot',
        audio: 'music/Slipknot - Yen.mp3'
    },
    
    {
        imagen: 'https://i.scdn.co/image/ab67616d00001e02b96e7ac256df3ca695bc7596',
        titulo: 'De sade',
        artista: 'Slipknot',
        audio: 'music/Slipknot - De Sade.mp3'
    },
    {
        imagen: 'https://i.scdn.co/image/ab67616d00001e026b3463e7160d333ada4b175a',
        titulo: 'Vermilion      ',
        artista: 'Slipknot',
        audio: 'music/Slipknot - Vermilion.mp3'
    },
    
]

$(document).ready(function () {
    $.each(canciones, function (index) {
        canciones_html += '<li class="list-group-item d-flex justify-content-between align-items-center" onclick="CancionSelect(' + index + ')">'
        canciones_html += '<blockquote class="blockquote">'
        canciones_html += '<h5>' + canciones[index].titulo + '</h5>'
        canciones_html += '<footer class="blockquote-footer">' + canciones[index].artista + '</footer>'
        canciones_html += '</blockquote>'
        canciones_html += '<h3><i id="play' + index + '" class="fas fa-play-circle"></i></h3>'
        canciones_html += '</li>'
    })
    $('#contenido').html(canciones_html)
    init()
})

function CancionSelect(id) {
    current_track = id
    cancion = canciones[current_track];
    audio.src = cancion.audio;
    audio.onloadeddata = function () {
        updateInfo();
        $('#play').removeClass('fa-play-circle')
        $('#play').addClass('fa-pause-circle')
        for (var i = 0; i <= canciones.length; i++) {
            $('#play' + i + '').removeClass('fa-pause-circle')
            $('#play' + i + '').addClass('fa-play-circle')
        }
        $('#play' + id + '').removeClass('fa-play-circle')
        $('#play' + id + '').addClass('fa-pause-circle')
        audio.addEventListener('timeupdate', initProgressBar, false);
    }
}

function init() {
    cancion = canciones[current_track]
    audio = new Audio()
    imagen.src = cancion.imagen
    audio.src = cancion.audio
    titulo.textContent = cancion.titulo
    artista.textContent = cancion.artista
}

function playTrack() {
    if ($('#play').hasClass('fa-pause-circle')) {
        $('#play').removeClass('fa-pause-circle')
        $('#play').addClass('fa-play-circle')
        $('#play' + current_track + '').removeClass('fa-pause-circle')
        $('#play' + current_track + '').addClass('fa-play-circle')
        audio.pause()
    } else {
        $('#play').removeClass('fa-play-circle')
        $('#play').addClass('fa-pause-circle')
        $('#play' + current_track + '').removeClass('fa-play-circle')
        $('#play' + current_track + '').addClass('fa-pause-circle')
        audio.play()
        audio.addEventListener('timeupdate', initProgressBar, false);
    }
}

function nextTrack() {
    current_track++;
    current_track = current_track % (canciones.length);
    cancion = canciones[current_track];
    audio.src = cancion.audio;
    audio.onloadeddata = function () {
        $('#play').removeClass('fa-play-circle')
        $('#play').addClass('fa-pause-circle')
        for (var i = 0; i <= canciones.length; i++) {
            $('#play' + i + '').removeClass('fa-pause-circle')
            $('#play' + i + '').addClass('fa-play-circle')
        }
        $('#play' + current_track + '').removeClass('fa-play-circle')
        $('#play' + current_track + '').addClass('fa-pause-circle')
        updateInfo();
    }
}

function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (canciones.length - 1) : current_track);
    cancion = canciones[current_track];
    audio.src = cancion.audio;
    audio.onloadeddata = function () {
        $('#play').removeClass('fa-play-circle')
        $('#play').addClass('fa-pause-circle')
        for (var i = 0; i <= canciones.length; i++) {
            $('#play' + i + '').removeClass('fa-pause-circle')
            $('#play' + i + '').addClass('fa-play-circle')
        }
        $('#play' + current_track + '').removeClass('fa-play-circle')
        $('#play' + current_track + '').addClass('fa-pause-circle')
        updateInfo();
    }
}

function updateInfo() {
    titulo.textContent = cancion.titulo;
    artista.textContent = cancion.artista;
    imagen.src = cancion.imagen;
    imagen.onload = function () {
        audio.play();
    }
}

function initProgressBar() {
    var length = audio.duration
    var current_time = audio.currentTime

    var totalLength = calculateTotalValue(length)
    $('#end-time').html(totalLength)

    var currentTime = calculateCurrentValue(current_time)
    $('#start-time').html(currentTime)

    progress.value = (audio.currentTime / audio.duration);
    progress.addEventListener("click", seek);

    function seek(event) {
        var percent = event.offsetX / this.offsetWidth;
        audio.currentTime = percent * audio.duration;
        progress.value = percent / 100;
    }

}

function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ':' + seconds

    return time;
}

function calculateCurrentValue(currentTime) {
    var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
}