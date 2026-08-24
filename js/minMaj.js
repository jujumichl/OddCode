initApp();

function initApp() {
    const textInput = document.getElementById('text-input');
    const textOutput = document.getElementById('text-output');
    const clear = document.getElementById('clear');
    const switchSide = document.getElementById('btn-swap');
    const txtNbchar = document.getElementById('count-input');
    const iconInput = document.getElementById('iInput');
    const iconOutput = document.getElementById('iOutput');
    const copy = document.getElementById('btn-copy');

    let fromTo = "MAJ";

    const updateConverter = () => {
        const currentText = textInput.value;

        txtNbchar.textContent = `${currentText.length} caract.`;

        textOutput.value = (fromTo === "MAJ") 
            ? currentText.toUpperCase() 
            : currentText.toLowerCase();

        toggleCross(textInput, clear);
        adjustSize(textInput);
        adjustSize(textOutput);
    };

    textInput.addEventListener('input', updateConverter);

    clear.addEventListener('click', () => {
        textInput.value = "";
        textInput.focus();
        updateConverter();
    });

    switchSide.addEventListener('click', () => {
        textInput.value = textOutput.value;

        fromTo = (fromTo === 'MAJ') ? 'min' : 'MAJ';

        const icons = switchSide.querySelectorAll('.rotate-icon');
        icons.forEach(icon => icon.classList.toggle('is-flipped'));

        updateLabels(fromTo, iconInput, iconOutput);

        updateConverter();
    });

    copy.addEventListener('click', () => updateClipboard(textOutput.value, copy))
}

function updateLabels(fromTo, iconInput, iconOutput) {
    const isntMaj = (fromTo !== "MAJ");

    const iconMajClass = "bi bi-type-h1 me-1 text-primary";
    const iconMinClass = "bi bi-type me-1 text-success";

    const iIn = iconInput.querySelector('i');
    const iOut = iconOutput.querySelector('i');

    if (isntMaj) {
        if (iIn) iIn.className = iconMajClass;
        if (iOut) iOut.className = iconMinClass;
        iconInput.childNodes[1].textContent = " Texte en MAJUSCULE";
        iconOutput.childNodes[1].textContent = " Texte en minuscule";
    } else {
        if (iIn) iIn.className = iconMinClass;
        if (iOut) iOut.className = iconMajClass;
        iconInput.childNodes[1].textContent = " Texte en minuscule";
        iconOutput.childNodes[1].textContent = " Texte en MAJUSCULE";
    }
}

function toggleCross(input, clearBtn) {
    if (input.value.length > 0) {
        clearBtn.classList.remove('d-none');
    } else {
        clearBtn.classList.add('d-none');
    }
}

function adjustSize(element) {
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;

    const maxHeight = parseInt(window.getComputedStyle(element).maxHeight, 10);
    element.style.overflowY = (element.scrollHeight >= maxHeight) ? 'auto' : 'hidden';
}

function updateClipboard(outputText, copyBtn){
    if (!outputText) return;

    navigator.clipboard.writeText(outputText).then(
        () => {
            copyBtn.innerHTML = '<i class="bi bi-check2 me-1"></i> Copié !';
            copyBtn.classList.replace('btn-outline-secondary', 'btn-success');

            setTimeout(() => {
                copyBtn.innerHTML = '<i class="bi bi-clipboard me-1"></i> Copier';
                copyBtn.classList.replace('btn-success', 'btn-outline-secondary');
            }, 1500);
        },
        (err) => {
            console.error('Erreur lors de la copie :', err);
        }
    );
}