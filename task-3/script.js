document.addEventListener('DOMContentLoaded', function () {

    // --- 1. IMAGE CAROUSEL LOGIC ---
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselImages = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    const totalImages = images.length;
    let autoPlayInterval;

    // Create dots
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateCarousel();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateCarousel();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextImage, 3000); // Change image every 3 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    updateCarousel();
    startAutoPlay();

    // --- 2. INTERACTIVE QUIZ LOGIC ---
    const quizData = [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Syntax"], answer: "Cascading Style Sheets" },
        { question: "Which HTML tag is used to define an internal style sheet?", options: ["<script>", "<css>", "<style>"], answer: "<style>" },
        { question: "What is the correct way to write a JavaScript array?", options: ["var colors = (1:'red', 2:'green')", "var colors = ['red', 'green']", "var colors = 'red', 'green'"], answer: "var colors = ['red', 'green']" }
    ];

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const quizResult = document.getElementById('quiz-result');
    const restartBtn = document.getElementById('restart-quiz-btn');

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuiz() {
        restartBtn.style.display = 'none';
        quizResult.textContent = '';
        if (currentQuestionIndex < quizData.length) {
            const currentQuestion = quizData[currentQuestionIndex];
            questionText.textContent = currentQuestion.question;
            optionsContainer.innerHTML = '';
            
            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = () => selectAnswer(option, button);
                optionsContainer.appendChild(button);
            });
        } else {
            questionText.textContent = "Quiz Complete!";
            optionsContainer.innerHTML = '';
            quizResult.textContent = `Your final score is ${score} out of ${quizData.length}.`;
            restartBtn.style.display = 'block';
        }
    }
    
    function selectAnswer(selectedOption, btn) {
        const correctAnswer = quizData[currentQuestionIndex].answer;
        const optionButtons = optionsContainer.querySelectorAll('button');

        optionButtons.forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }
            button.disabled = true;
        });
        
        if (selectedOption === correctAnswer) {
            score++;
        }
        
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuiz();
        }, 1500); // Wait 1.5 seconds before loading the next question
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        loadQuiz();
    }
    
    restartBtn.addEventListener('click', restartQuiz);
    loadQuiz();

    // --- 3. API DATA FETCH LOGIC ---
    const jokeContainer = document.getElementById('joke-container');
    const jokeSetup = document.getElementById('joke-setup');
    const jokePunchline = document.getElementById('joke-punchline');
    const fetchJokeBtn = document.getElementById('fetch-joke-btn');

    async function getJoke() {
        jokeContainer.innerHTML = '<div class="loader"></div>'; // Show loader
        
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            // Recreate elements
            jokeContainer.innerHTML = `
                <p id="joke-setup">${data.setup}</p>
                <p id="joke-punchline">${data.punchline}</p>
            `;
            
            const newSetup = document.getElementById('joke-setup');
            const newPunchline = document.getElementById('joke-punchline');
            
            newSetup.addEventListener('click', () => {
                newPunchline.style.display = 'block';
            });

        } catch (error) {
            jokeContainer.innerHTML = '<p id="joke-setup">Sorry, could not fetch a joke. Please try again!</p>';
            console.error("Fetch error:", error);
        }
    }

    fetchJokeBtn.addEventListener('click', getJoke);
});
