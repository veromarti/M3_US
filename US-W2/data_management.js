alert("Welcome to the CRUDLab System");
let flagMenu = false;
let user = "";
let age = 0;
let courses = 0;

let products = [];


function menu(){
    const option = intValidation(`Choose an option \n1. Create Product Object \n2. Set example \n3. Map Creation \n4. Exit`,1,4);
    return option
}

function intValidation(message, min = null, max = null){
    let flag = false;
    while (!flag) {
        let value = prompt(message, "Type here");
        if (value === null) return null;

        value = value.trim();

        if (value === "") {
            alert("The field cannot be empty");
            continue;
        }

        if (!/^-?\d+(\.\d+)?$/.test(value)) {
            alert("Please enter numbers only.");
            continue;
        }

        value = Number(value);


        if ((min !== null && value < min) || (max !== null && value > max)) {
            alert("Value out of range. Try again.");
            continue;
        }
        return value;
    }
}

function strValidation(message){
    let flag = false;
    while (!flag) {
        let value = prompt(message, "Type here");
        if (value === null) return null;

        value = value.trim();

        if (value === "") {
            alert("The field cannot be empty");
            continue;
        }

        if (!/^[a-zA-Z]+$/.test(value)) {
            alert("The field must include only letters");
            continue;
        }

        return value.toLowerCase();
    }
}

function productCreation() {
    let productID = intValidation("Product Information \nID", 1);
    let productName = strValidation("Product Information \nProduct Name");
    let productPrice = intValidation("Product Information \nPrice", 1);
    let product = {
        "ID":productID,
        "Name":productName,
        "Price":productPrice,
    }
    return product
}

function createSet(user){
    const option = intValidation(`Choose an option \n1. Create NEW Set \n2. Show Set \n3. Add new element to the Set \n4. Find element in Set \n5. Delete element \n4. Exit`,1,4);
    console.log(`Name: ${user.name} \nAge: ${user.age} \nCourses: ${user.courses}`);
    let msg = 'You are older than 18';

    if (user.age < 19) {
        msg = 'You are under age';
    }

    alert(`Name: ${user.name} \nAge: ${user.age} \n${msg} \nCourses: ${user.courses}`);
    return
}

function evaluation() {
    let sumNotes = 0, prom = 0, notes = [];
    notes[0]  = intValidation("Enter note 1", 0,5);
    notes[1]  = intValidation("Enter note 2", 0,5);
    notes[2]  = intValidation("Enter note 3", 0,5);
    let msg = 'Congratulations, you approbed';

    for(let i of notes) sumNotes += i;
    prom = sumNotes/3;
    prom = prom.toFixed(2);

    if (prom < 3) {
        msg = "Unfortunately you failed"
    } else if (prom > 4.5){
        msg = 'Congratulations, you approbed with excellence';
    }

    alert(`Your final note is: ${prom} \n${msg}`);
    return
    
}

function main(value){
    switch (value) {
        case 1:
            let product = productCreation();
            products.push(product)
            console.log(products)
            break;

        case 2:
            createSet(userInfo);
            break;
        case 3:
            evaluation();
            break;
    
        default:
            break;
    }
}

while (!flagMenu) {
    let option = menu();

    if (option === 4) {
        flagMenu = true;
        alert("Thanks for using the CRUDLab System");

    } else {
        flagMenu = false;
        main(option);
    }
}