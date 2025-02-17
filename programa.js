const synth = new Tone.Synth().toDestination();
let secuencia = [];
let playing = false;

const notasMap = {
    "Do": "C4",
    "Re": "D4",
    "Mi": "E4",
    "Fa": "F4",
    "Sol": "G4",
    "La": "A4",
    "Si": "B4",
    "Do (Octava alta)": "C5"
};

const ritmoMap = ['8n', '4n', '16n']; 

document.querySelectorAll('.nota-btn').forEach(button => {
    button.addEventListener('click', () => {
        const note = button.getAttribute('data-note');
        secuencia.push(note);
        displaySequence(secuencia);
    });
});

document.getElementById('generate-music').addEventListener('click', function() {
    if (secuencia.length === 0) {
        Swal.fire({
            title: '¡Advertencia!',
            text: 'Por favor, selecciona algunas notas antes de generar música.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }
    displaySequence(secuencia);
    document.getElementById('music-output').innerHTML = `Tu música ha sido generada: Haz click en reproducir`;
    document.getElementById('nota-secuencia').style.display = 'block';  
    document.getElementById('play').style.display = 'inline-block'; 
    document.getElementById('modify').style.display = 'inline-block';
    document.getElementById('new-sequence').style.display = 'inline-block'; 
});

function displaySequence(seq) {
    const secuencialist = document.getElementById('secuencia-texto');
    secuencialist.textContent = seq.join(' ');
}

function playSequence() {
    if (playing) return;
    playing = true;

    let index = 0;
    const playNextNote = () => {
        if (index < secuencia.length) {
            const note = notasMap[secuencia[index]];
            const ritmo = ritmoMap[Math.floor(Math.random() * ritmoMap.length)];  
            synth.triggerAttackRelease(note, ritmo);
            index++;
            setTimeout(playNextNote, 500); 
        } else {
            playing = false;
        }
    };
    playNextNote();
}

document.getElementById('play').addEventListener('click', playSequence);

document.getElementById('modify').addEventListener('click', function() {
    Swal.fire({
        title: 'Modificar Notas',
        text: 'Puedes modificar las notas seleccionadas antes de generar nueva música.',
        icon: 'info',
        confirmButtonText: 'Entendido'
    });
});

document.getElementById('new-sequence').addEventListener('click', function() {
    secuencia = [];
    document.getElementById('secuencia-texto').textContent = '';
    document.getElementById('nota-secuencia').style.display = 'none';  
    document.getElementById('music-output').innerHTML = 'Musica generada';
    document.getElementById('play').style.display = 'none';  
    document.getElementById('modify').style.display = 'none';  
    document.getElementById('new-sequence').style.display = 'none'; 
    Swal.fire({
        title: 'Nuevo Inicio',
        text: 'Se ha limpiado la secuencia. Puedes empezar de nuevo.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});


document.getElementById("current-year").textContent = new Date().getFullYear();



