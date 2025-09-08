document.addEventListener('DOMContentLoaded', function() {
    // Modal Elements
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // --- Form Validation (with on-page error messages) ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        const isNameValid = validateField('name', 'name-error', 'Name is required.');
        const isEmailValid = validateEmail();
        const isMessageValid = validateField('message', 'message-error', 'Message cannot be empty.');

        if (isNameValid && isEmailValid && isMessageValid) {
            showModal();
            contactForm.reset();
            // Remove any invalid states from the form
            document.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
            document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        }
    });

    function validateField(inputId, errorId, errorMessage) {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(errorId);
        if (input.value.trim() === '') {
            input.classList.add('invalid');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            return false;
        } else {
            input.classList.remove('invalid');
            errorElement.style.display = 'none';
            return true;
        }
    }

    function validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email pattern check
        
        if (!emailRegex.test(emailInput.value)) {
            emailInput.classList.add('invalid');
            emailError.textContent = 'Please enter a valid email address.';
            emailError.style.display = 'block';
            return false;
        } else {
            emailInput.classList.remove('invalid');
            emailError.style.display = 'none';
            return true;
        }
    }

    // --- To-Do List ---
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');

    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            
            deleteBtn.onclick = function() {
                todoList.removeChild(listItem);
            };
            
            listItem.appendChild(taskSpan);
            listItem.appendChild(deleteBtn);
            todoList.appendChild(listItem);
            
            todoInput.value = '';
        }
    }

    addTaskBtn.addEventListener('click', addTask);
    // Allow adding tasks by pressing Enter
    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // --- Modal Functions ---
    function showModal() {
        successModal.classList.add('visible');
    }

    function hideModal() {
        successModal.classList.remove('visible');
    }

    closeModalBtn.addEventListener('click', hideModal);
    successModal.addEventListener('click', function(event) {
        // Close if clicking on the dark overlay
        if (event.target === successModal) {
            hideModal();
        }
    });

});
