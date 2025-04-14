const characterrange = document.getElementById("characterrange")
const characternumber = document.getElementById("characternumber")
const say = document.getElementById("say")
const uppercase = document.getElementById("uppercase")
const lowercase = document.getElementById("lowercase")
const numbers = document.getElementById("numbers")
const symbols = document.getElementById("symbols")
const form = document.getElementById("passwordgeneratorform")
const passwordDisplay = document.getElementById("passwordDisplay")
const readability = document.getElementById("readability")

const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const radios = document.querySelectorAll('input[type="radio"]')

characterrange.addEventListener("input", synchCharacterAmount)
characternumber.addEventListener("input", synchCharacterAmount)

form.addEventListener('submit', e => {
    e.preventDefault()
    const length = characternumber.value
    const say = say.checked
    const uppercase = uppercase.checked
    const lowercase = lowercase.checked
    const symbols = symbols.checked
    const numbers = numbers.checked
    const password = generatePassword(length, say, uppercase, lowercase, numbers, symbols)
    passwordDisplay.innerText = "banana"
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
            if (radio.value === 'readability') {
                checkboxes.forEach(cb => {
                    if (cb.id === 'uppercase' || cb.id === 'lowercase') {
                        cb.checked = true;
                    } else {
                        cb.checked = false;
                        cb.disabled = true;
                    }
                })
            } else if (radio.value === 'say') {
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

function generatePassword(length, say, readability, uppercase, lowercase, numbers, symbols){
    function getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min)) + min
    }
    const pass = getRandomNumber.toString()
    return pass
}

function synchCharacterAmount(e) {
    const value = e.target.value
    characterrange.value = value
    characternumber.value = value
}