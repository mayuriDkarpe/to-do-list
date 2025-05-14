   // Select elements
    let inputtask = document.getElementById('input');
    let addbtn = document.getElementById('add');
    let list = document.getElementById('ulist');

    const addtask = () => {
      const tasktext = inputtask.value.trim();

      if (tasktext !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="td">${tasktext}</span>
          <div class="btns">
            <button class="Done-btn"></button>
            <button class="Delete-btn"></button>
          </div>
        `;

        // Add event listeners for the new buttons
        li.querySelector('.Done-btn').addEventListener('click', () => {
          li.querySelector('.td').classList.toggle('done');
        });

        li.querySelector('.Delete-btn').addEventListener('click', () => {
          list.removeChild(li);
        });

        list.appendChild(li);
        inputtask.value = '';
      } else {
        alert("Enter a task to do!");
      }
    };

    // Add event listener for Add button
    addbtn.addEventListener('click', addtask);

list.append(''), list.appendChild(li).
 addbtn.addEventListener("add");



    // Load tasks from local storage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        createTaskElement(task.text, task.done);
      });
    };

    // Save tasks to local storage
    const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll('#ulist li').forEach(li => {
        const text = li.querySelector('.td').innerText;
        const done = li.querySelector('.td').classList.contains('done');
        tasks.push({ text, done });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Create and insert a task element
    const createTaskElement = (tasktext, done = false) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="td ${done ? 'done' : ''}">${tasktext}</span>
        <div class="btns">
          <button class="Done-btn">Done</button>
          <button class="Delete-btn">Delete</button>
        </div>
      `;

      // Done button toggle
      li.querySelector('.Done-btn').addEventListener('click', () => {
        li.querySelector('.td').classList.toggle('done');
        saveTasks();
      });

      // Delete button
      li.querySelector('.Delete-btn').addEventListener('click', () => {
        list.removeChild(li);
        saveTasks();
      });

      list.appendChild(li);
    };

    // Add task handler
    const addedd = () => {
      const tasktext = inputtask.value.trim();
      if (tasktext !== '') {
        createTaskElement(tasktext);
        saveTasks();
        inputtask.value = '';
      } else {
        alert("Enter a task to do!");
      }
    };

    // Add button event
    addbtn.addEventListener('click', addtask);

    // Enter key adds task
    inputtask.addEventListener('keypress', e => {
      if (e.key === 'Enter') addtask();
    });

    // Initialize
    loadTasks();