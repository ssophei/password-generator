const characterrange = document.getElementById("characterrange")
const characternumber = document.getElementById("characternumber")
const say = document.getElementById("say")
const uppercase = document.getElementById("uppercase")
const lowercase = document.getElementById("lowercase")
const numbers = document.getElementById("numbers")
const symbols = document.getElementById("symbols")
const form = document.getElementById("passwordgeneratorform")
const passwordDisplay = document.getElementById("passwordDisplay")

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

document.querySelectorAll('input[type="checkbox"].toggle').forEach(checkbox => {
    checkbox.addEventListener('keypress', e => {
        if (e.key === 'Enter' && checkbox.checked == false) {
            checkbox.checked = true;
        } 
        else if(e.key === 'Enter' && checkbox.checked == true) {
            checkbox.checked =false;
        }
    });
})

document.querySelectorAll('input[type="radio"].toggle').forEach(radio => {
    const group = radio.dataset.group;
    radio.addEventListener('keypress', e => {
        if (e.key === 'Enter' | e.key === ' ') {
            e.preventDefault();
            selectRadio(radio, group);
        }
    });
    radio.addEventListener('click', () => {
        selectRadio(radio, group);
    })
})

function selectRadio(selectedRadio, group){
    document.querySelectorAll(`input[type="radio"][data-group="${group}"]`)
        .forEach(radio => {radio.checked = false});
    selectedRadio.checked = true;
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