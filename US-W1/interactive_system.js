alert('hola mundo')
console.log('hola mundo');

const btn = document.getElementById('main-btn');

function ageValidation(value){
    console.log(value);
    if (!(Number.isInteger(value))) {
        console.log('Number not valid');
    }
}

btn.addEventListener('click', () => {
    console.log('entro');
    const name = prompt('Enter your name', 'Your name goes here');
    const age = prompt('Enter your age', 'Your age goes here');
    ageValidation(age);
})
