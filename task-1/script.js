// 3. JavaScript for Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Find the elements we need to work with
    const interactiveButton = document.getElementById('interactiveButton');
    const customModal = document.getElementById('customModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Function to show the modal with a fade-in effect
    function showModal() {
        customModal.classList.add('active');
    }

    // Function to hide the modal
    function hideModal() {
        customModal.classList.remove('active');
    }

    // Add event listeners to the buttons
    interactiveButton.addEventListener('click', showModal);
    closeModalBtn.addEventListener('click', hideModal);

    // Also hide the modal if the user clicks on the dark background
    customModal.addEventListener('click', (event) => {
        if (event.target === customModal) {
            hideModal();
        }
    });
    
    // --- Typing Effect ---
    const typingTextElement = document.getElementById('typing-text');
    const textToType = "Welcome to My Webpage";
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typingTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 120); // Adjust typing speed here
        }
    }
    type();
    
    // --- Scroll Reveal Animation ---
    const revealTargets = document.querySelectorAll('.reveal-target');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If it's the blocks container, reveal its children
                if(entry.target.classList.contains('blocks')) {
                    const blocks = entry.target.querySelectorAll('.block');
                    blocks.forEach(block => block.classList.add('visible'));
                } else {
                    // For other elements
                    entry.target.classList.add('visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealTargets.forEach(target => {
        observer.observe(target);
    });
});
