interface Task {
    id: number;
    text: string;
    isDone: boolean;
}

const inputs = document.querySelector('input') as HTMLInputElement;
const btn = document.querySelector('button') as HTMLButtonElement;
const taskList = document.getElementById('task-list') as HTMLElement;
let task: Task[] = [];

const localStorageData = localStorage.getItem("task array");

if (localStorageData !== null)
{
    const ogdata: Task[] = JSON.parse(localStorageData);
    task = ogdata;
    maketodo();
}

btn.addEventListener("click", function () 
{
    const query = inputs.value;
    inputs.value = "";

    if (query.trim() === "")
    {
        alert("no value entered"); // change this to toast later
        throw new Error("empty input field error");
    }

    const taskObj: Task = {
        id: Date.now(),
        text: query,
        isDone: false
    };

    // add new task to the array
    task.push(taskObj);
    localStorage.setItem("task array", JSON.stringify(task));
    maketodo();
});

function maketodo(): void 
{
    taskList.innerHTML = "";

    for (let i = 0; i < task.length; i++ )
    {
        const { id, text, isDone } = task[i];
        const element = document.createElement('div');
        element.innerHTML = `
            <span class="task">${text}</span>
            <span class="isDone">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20 8l-1.4-1.4z"/>
</svg>
            </span>
            <span class="delete">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <path d="M6 7h12v12c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V7zm3-4h6v2H9V3zM4 7h16v2H4V7z"/>
</svg>

                </span>
        `;

        // const setDoneBtn = element.querySelector('.isDone')!;
        // setDoneBtn.addEventListener("click", function ()
        // {
        //     const filteredTasks = task.filter((taskObj: Task) => taskObj.id !== id);
        //     task = filteredTasks;
        //     localStorage.setItem("task array", JSON.stringify(task));
        // })

        const delBtn = element.querySelector('.delete')!;
        delBtn.addEventListener("click", function ()
        {
            const filteredTasks = task.filter((taskObj: Task) => taskObj.id !== id);
            task = filteredTasks;
            localStorage.setItem("task array", JSON.stringify(task));
            taskList.removeChild(element);
        });

        element.classList.add('todo');
        taskList.appendChild(element);
    }
}