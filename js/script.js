const characterRange = document.getElementById("characterrange")
const characterNumber = document.getElementById("characternumber")
const say = document.getElementById("say")
const uppercase = document.getElementById("uppercase")
const lowercase = document.getElementById("lowercase")
const numbers = document.getElementById("numbers")
const symbols = document.getElementById("symbols")
const form = document.getElementById("buttons")
const generate = document.getElementById("generate")
const passwordDisplay = document.getElementById("passwordDisplay")
const readability = document.getElementById("readability")

const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const radios = document.querySelectorAll('input[type="radio"]')

window.onload = () => {
    generateDisplay();
}

characterRange.addEventListener('input', e => {
    synchCharacterAmount(e);
    generateDisplay();
  });
  
characterNumber.addEventListener('input', e => {
    synchCharacterAmount(e);
    generateDisplay();
  });

function generateDisplay() {
    const length = parseInt(characterRange.value);
    const isSay = say.checked;
    const isUppercase = uppercase.checked;
    const isLowercase = lowercase.checked;
    const isSymbols = symbols.checked;
    const isNumbers = numbers.checked;
    const isReadability = readability.checked;
    const password = generatePassword(length, isReadability, isSay, isUppercase, isLowercase, isNumbers, isSymbols)
    passwordDisplay.innerHTML = password
}

function copier() {
    const copyText = document.getElementById("passwordDisplay").textContent;
    navigator.clipboard.writeText(copyText);
}

copy.addEventListener('click', e => {
    e.preventDefault();
    copier();
})

generate.addEventListener('click', e => {
    e.preventDefault();
    generateDisplay();
})

window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        generateDisplay();
    }
    if (e.key.toLowerCase() === 'c' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        copier();
    }
})

characterNumber.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        generateDisplay();
    } 
})

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('keypress', e => {
        if (e.key === 'Enter' && checkbox.checked == false) {
            generateDisplay();
        } else if(e.key === 'Enter' && checkbox.checked == true) {
            checkbox.checked = false;
            const checkedBoxes = [...checkboxes].filter(cb => cb.checked);
            if (checkedBoxes.length === 0 && checkbox.checked == false) {
                e.preventDefault();
                checkbox.checked = true;
            }
            generateDisplay();
        }

        setTimeout(() => {
            checkboxes.forEach(cb => {
                if (cb !== checkbox) cb.blur();
            });
        }, 0);
    });
    checkbox.addEventListener('change', e => {
        const checkedBoxes = [...checkboxes].filter(cb => cb.checked);
        if (checkedBoxes.length === 0 && checkbox.checked == false) {
            e.preventDefault();
            checkbox.checked = true;
        }
        generateDisplay();
    });
    checkbox.addEventListener('input', e => {
        generateDisplay();
    });
})

radios.forEach(radio => {
    const group = radio.dataset.group;
    radio.addEventListener('keypress', e => {
        if (e.key === 'Enter' | e.key === ' ') {
            e.preventDefault();
            selectRadio(radio, group);
            generateDisplay();
        }
    });
    radio.addEventListener('click', () => {
        selectRadio(radio, group);
    });
    radio.addEventListener('change', () => {
        if (radio.checked) {
            if (radio.value === 'say') {
                checkboxes.forEach(cb => {
                    if (cb.id === 'uppercase' || cb.id === 'lowercase') {
                        cb.checked = true;
                    } else {
                        cb.checked = false;
                        cb.disabled = true;
                    }
                })
            } else if (radio.value === 'readability') {
                checkboxes.forEach(cb => {
                    if (cb.id === 'uppercase' || cb.id === 'lowercase') {
                        cb.checked = true;
                    } else {
                        cb.checked = false;
                        cb.disabled = false;
                    }
                })
            } else if (radio.value === 'allowall') {
                checkboxes.forEach(cb => {
                    cb.checked = true;
                    cb.disabled = false;
                });
            };
        };
    });
    radio.addEventListener('input', generateDisplay)
})

function selectRadio(selectedRadio, group){
    document.querySelectorAll(`input[type="radio"][data-group="${group}"]`)
        .forEach(radio => {radio.checked = false});
    selectedRadio.checked = true;
    selectedRadio.dispatchEvent(new Event('change'), { bubbles: true });
}

function generatePassword(passwordLength, readability, say, uppercase, lowercase, numbers, symbols){
    const characterArray = [];
    const ambiguousChars = ['l', '1', 'L', '0', 'O', 'o', 'I', 'i', '|'];
    const removeAmbiguous = str => [...str].filter(c => !ambiguousChars.includes(c)).join('');
    const options = [
        {enabled: uppercase, value: secureRandomPassword.upper},
        {enabled: lowercase, value: secureRandomPassword.lower},
        {enabled: numbers, value: secureRandomPassword.digits},
        {enabled: symbols, value: secureRandomPassword.symbols},
    ];

    const ambiguousOptions = [
        {enabled: uppercase, value: removeAmbiguous(secureRandomPassword.upper)},
        {enabled: lowercase, value: removeAmbiguous(secureRandomPassword.lower)},
        {enabled: numbers, value: removeAmbiguous(secureRandomPassword.digits)},
        {enabled: symbols, value: removeAmbiguous(secureRandomPassword.symbols)},
    ];

    if (readability) {
        for (const {enabled, value} of ambiguousOptions) {
            if (enabled) {
                characterArray.push(value);
            }
        }
    } else {
        for (const {enabled, value} of options) {
            if (enabled) {
                characterArray.push(value);
            }
        }
    }

    while (characterArray.length > passwordLength) {
        const index = randomInt(0, characterArray.length);
        characterArray.splice(index, 1);
    }

    return secureRandomPassword.randomPassword({
        length: Number(passwordLength), 
        characters: characterArray});
}

function synchCharacterAmount(e) {
    const value = e.target.value
    characterrange.value = value
    characternumber.value = value
}