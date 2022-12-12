const pianoKeys = document.querySelectorAll(".tile");
var selectedKeys = [];
const notes = ["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B","C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"];
const noteFiles = ["c3","c-3","d3","d-3","e3","f3","f-3","g3","g-3","a4","a-4","b4","c4","c-4","d4","d-4","e4","f4","f-4","g4","g-4","a5","a-5","b5"];

function updateChord(selectedKeys) {
    var selectedNotes = [];
    for (var i=0;i<selectedKeys.length;i++) {
        selectedNotes.push(notes[selectedKeys[i]]);
    }

    var uniqueNotes = [...new Set(selectedNotes)];
    var detectedChord = Tonal.Chord.detect(uniqueNotes)[0];
    console.log(detectedChord);
    const chordDisplay = document.getElementById("chord");

    if (detectedChord != undefined) {
        chordDisplay.innerText = detectedChord;
    } else if (selectedKeys.length == notes.length){
        chordDisplay.innerText = "???";
    } else {
        chordDisplay.innerText = '_';
    }

}


function updateKeys(selectedKeys) {
    const noteDisplay = document.getElementsByClassName("notes")[0];

    var child = noteDisplay.lastElementChild; 

    while (child) {
        noteDisplay.removeChild(child);
        child = noteDisplay.lastElementChild;
    }

    for (var i=0; i<selectedKeys.length; i++) {
        const span = document.createElement("span");
        span.innerText = notes[selectedKeys[i]];
        noteDisplay.appendChild(span);
    }

    if (selectedKeys.length == 0) {
        const span = document.createElement("span");
        span.innerText = "_";
        noteDisplay.appendChild(span);
    }

}

function playNote(noteNum) {
    var noteFile = noteFiles[noteNum];
    var noteSound = new Audio("audio/c3.mp3");
    noteSound.src = `audio/${noteFile}.mp3`;
    noteSound.play();
}

function playChord(selectedKeys) {
    selectedKeys.forEach(noteNum => {
        playNote(noteNum);
    })
}

function PlayButton() {
    if (selectedKeys.length > 0) {
        playChord(selectedKeys);
    }
}

function ClearButton() {
    selectedKeys = [];
    updateKeys(selectedKeys);
    updateChord(selectedKeys);
    pianoKeys.forEach(key => {
        if (key.classList.contains("selected")){
            key.classList.remove("selected");
        }
    })
}

const select = (key) => {
    var noteNum = key.dataset.note - 1;
    playNote(noteNum);

    if (key.classList.contains("selected")){
        key.classList.remove("selected");
        
        selectedKeys.splice(selectedKeys.indexOf(noteNum),1);
        console.log(selectedKeys);

    } else {
        //playNote(key);
        key.classList.add("selected");
        
        selectedKeys.push(noteNum);
        selectedKeys.sort(function(a,b){return a-b});

        console.log(selectedKeys);
    }
    updateKeys(selectedKeys);
    updateChord(selectedKeys);
}

pianoKeys.forEach(key => {
    key.addEventListener("click", () => select(key));
})