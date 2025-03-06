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
        
        
        const noteSound = notasMap[note];
        synth.triggerAttackRelease(noteSound, '8n'); 
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

    
    document.getElementById('play').disabled = false;
    document.getElementById('modify').disabled = false;
    document.getElementById('new-sequence').disabled = false;
    document.getElementById('generate-music').disabled = true;
});


function displaySequence(seq) {
    const secuencialist = document.getElementById('secuencia-texto');
    secuencialist.innerHTML = '';  

    seq.forEach((note, index) => {
        const noteElement = document.createElement('span');
        noteElement.classList.add('note-item');
        noteElement.textContent = note;
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-note');
        deleteButton.innerHTML = '&times;'; 
        deleteButton.addEventListener('click', () => {
            secuencia.splice(index, 1);  
            displaySequence(secuencia);  
        });

        noteElement.appendChild(deleteButton);  
        secuencialist.appendChild(noteElement);
    });
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
    
    if (secuencia.length === 0) {
        Swal.fire({
            title: '¡No hay notas seleccionadas!',
            text: 'No puedes modificar notas si no has seleccionado ninguna.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }

    
    const notesList = secuencia.map((note, index) => {
        return `<li>
                    ${note} 
                    <button class="delete-note" onclick="deleteNote(${index})">Eliminar</button>
                </li>`;
    }).join('');

    
    Swal.fire({
        title: 'Modificar Notas',
        html: `
            <p>¿Qué notas deseas modificar? Puedes eliminarlas o añadir nuevas.</p>
            <ul>
                ${notesList}
            </ul>
            <label for="new-note">Añadir nueva nota:</label>
            <select id="new-note">
                <option value="Do">Do</option>
                <option value="Re">Re</option>
                <option value="Mi">Mi</option>
                <option value="Fa">Fa</option>
                <option value="Sol">Sol</option>
                <option value="La">La</option>
                <option value="Si">Si</option>
                <option value="Do (Octava alta)">Do (Octava alta)</option>
            </select>
            <button id="add-note" class="btn btn-success">Añadir Nota</button>
        `,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Cerrar',
        focusConfirm: false
    });

   
    document.getElementById('add-note').addEventListener('click', function() {
        const newNote = document.getElementById('new-note').value;
        secuencia.push(newNote);
        displaySequence(secuencia);  
    });
});


function deleteNote(index) {
    secuencia.splice(index, 1);
    displaySequence(secuencia);  
}


document.getElementById('new-sequence').addEventListener('click', function() {
    secuencia = [];
    document.getElementById('secuencia-texto').textContent = '';
    document.getElementById('nota-secuencia').style.display = 'none';  
    document.getElementById('music-output').innerHTML = 'Musica generada';
    
   
    document.getElementById('play').disabled = true;
    document.getElementById('modify').disabled = true;
    document.getElementById('new-sequence').disabled = true;
    document.getElementById('generate-music').disabled = false;

    Swal.fire({
        title: 'Nuevo Inicio',
        text: 'Se ha limpiado la secuencia. Puedes empezar de nuevo.',
        icon: 'success',
        confirmButtonText: 'OK'
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


    document.getElementById('play').disabled = false;
    document.getElementById('modify').disabled = false;
    document.getElementById('new-sequence').disabled = false;
    document.getElementById('generate-music').disabled = true;
});


document.getElementById("current-year").textContent = new Date().getFullYear();



