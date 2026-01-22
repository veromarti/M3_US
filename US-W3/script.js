const addBtn = document.getElementById('add-btn');
//console.log(addBtn)

function addTask() {
    const inputTask = (document.getElementById('new-task'));
    let taskText = inputTask.value;
    const taskList = document.getElementById('list')

    if (!taskText) {
        const errorMsg = document.getElementById('error-msg');
        errorMsg.textContent = 'Field must not be empty'
        return
    }

    const task = document.createElement('li')
    task.classList.add('task');

    task.innerHTML = `
        <span>${taskText}</span>
        <div class="actions">
            <button class="complete">✔</button>
            <button class="delete">✖</button>
        </div>
    `

    taskList.appendChild(task)
    inputTask.value = '';
    inputTask.focus();

}

addBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    addTask();
})