
class TodoApp {
    constructor() {
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.taskList = document.getElementById('taskList');
        this.totalCount = document.getElementById('totalCount');
        this.completedCount = document.getElementById('completedCount');
        this.emptyState = document.getElementById('emptyState');

        this.init();
    }

    init() {
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        this.updateCounts();
        this.toggleEmptyState();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText === '') return;

        const taskElement = this.createTaskElement(taskText);
        this.taskList.appendChild(taskElement);
        this.taskInput.value = '';
        this.updateCounts();
        this.toggleEmptyState();
    }

    createTaskElement(taskText) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
                    <div class="task-content">
                        <input type="checkbox" class="task-checkbox" aria-label="Mark task as complete">
                        <p class="task-text">${this.escapeHtml(taskText)}</p>
                    </div>
                    <div class="task-actions">
                        <button class="action-btn edit-btn">Edit</button>
                        <button class="action-btn delete-btn">Delete</button>
                    </div>
                `;

        const checkbox = taskItem.querySelector('.task-checkbox');
        const taskTextElement = taskItem.querySelector('.task-text');
        const editBtn = taskItem.querySelector('.edit-btn');
        const deleteBtn = taskItem.querySelector('.delete-btn');

        checkbox.addEventListener('change', () => {
            taskItem.classList.toggle('completed', checkbox.checked);
            editBtn.disabled = checkbox.checked;
            this.updateCounts();
        });

        editBtn.addEventListener('click', () => {
            this.editTask(taskTextElement, checkbox);
        });

        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                taskItem.remove();
                this.updateCounts();
                this.toggleEmptyState();
            }
        });

        return taskItem;
    }

    editTask(taskTextElement, checkbox) {
        const currentText = taskTextElement.textContent;
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = currentText;
        editInput.className = 'edit-input';

        taskTextElement.style.display = 'none';
        taskTextElement.parentNode.insertBefore(editInput, taskTextElement.nextSibling);
        editInput.focus();
        editInput.select();

        const saveEdit = () => {
            const newText = editInput.value.trim();
            if (newText !== '') {
                taskTextElement.textContent = newText;
            }
            taskTextElement.style.display = 'block';
            editInput.remove();
        };

        editInput.addEventListener('blur', saveEdit);
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveEdit();
            }
            if (e.key === 'Escape') {
                taskTextElement.style.display = 'block';
                editInput.remove();
            }
        });
    }

    updateCounts() {
        const allTasks = this.taskList.querySelectorAll('.task-item');
        const completedTasks = this.taskList.querySelectorAll('.task-item .task-checkbox:checked');

        this.totalCount.textContent = allTasks.length;
        this.completedCount.textContent = completedTasks.length;
    }

    toggleEmptyState() {
        const hasTasks = this.taskList.querySelectorAll('.task-item').length > 0;
        this.emptyState.classList.toggle('hidden', hasTasks);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});