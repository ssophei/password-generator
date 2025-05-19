const characterrange = document.getElementById("characterrange")
const characternumber = document.getElementById("characternumber")
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

characterrange.addEventListener("input", synchCharacterAmount)
characternumber.addEventListener("input", synchCharacterAmount)

generate.addEventListener('click', e => {
    e.preventDefault()
    const length = characternumber.value
    const isSay = say.checked
    const isUppercase = uppercase.checked
    const isLowercase = lowercase.checked
    const isSymbols = symbols.checked
    const isNumbers = numbers.checked
    const password = generatePassword(length, isSay, isUppercase, isLowercase, isNumbers, isSymbols)
    passwordDisplay.innerHTML = password
})

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('keypress', e => {
        if (e.key === 'Enter' && checkbox.checked == false) {
            checkbox.checked = true;
        } 
        else if(e.key === 'Enter' && checkbox.checked == true) {
            checkbox.checked = false;
        }

        setTimeout(() => {
            checkboxes.forEach(cb => {
                if (cb !== checkbox) cb.blur();
            });
        }, 0);
    });
})

radios.forEach(radio => {
    const group = radio.dataset.group;
    radio.addEventListener('keypress', e => {
        if (e.key === 'Enter' | e.key === ' ') {
            e.preventDefault();
            selectRadio(radio, group);
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
})

function selectRadio(selectedRadio, group){
    document.querySelectorAll(`input[type="radio"][data-group="${group}"]`)
        .forEach(radio => {radio.checked = false});
    selectedRadio.checked = true;
    selectedRadio.dispatchEvent(new Event('change'), { bubbles: true });
}

function generatePassword(passwordLength, readability, uppercase, lowercase, numbers, symbols){
    const characterArray = [];
    const options = [
        {enabled: uppercase, value: secureRandomPassword.upper},
        {enabled: lowercase, value: secureRandomPassword.lower},
        {enabled: numbers, value: secureRandomPassword.digits},
        {enabled: symbols, value: secureRandomPassword.symbols},
    ];

    for (const {enabled, value} of options) {
        if (enabled) {
            characterArray.push(value);
        }
    }
    
    function randomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    if (passwordLength < characterArray.length) {
        const removeCount = characterArray.length - passwordLength
        for (let i = 0; i < removeCount; i ++) {
            const index = randomInt(0, characterArray.length)
            characterArray.splice(index, 1)
        }
    }

    if (readability) {
        return secureRandomPassword.randomPassword({
            length: Number(passwordLength), 
            characters: characterArray, 
            predicate: x => !/[Ll1|0Oo]/.test(x)});
    } else {
        return secureRandomPassword.randomPassword({
            length: Number(passwordLength), 
            characters: characterArray});
    }
}

function synchCharacterAmount(e) {
    const value = e.target.value
    characterrange.value = value
    characternumber.value = value
}