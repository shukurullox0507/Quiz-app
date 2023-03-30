// const startBtn = document.querySelector('.start-btn');
// const nextBtn = document.querySelector('.next-btn');
// const question = document.querySelector('.question');
// const answers = document.querySelectorAll('.answer');
// const questionContainer = document.querySelector('.question-container');
// const body = document.querySelector('body')




// //render function

// const operations = ['*', '/', '+', '-']
// function generateNumber() {
//     return Math.floor(Math.random() * 100)
// }
// function generateOperations() {
//     return Math.floor(Math.random() * operations.length)
// }

// function generateQuestion() {
//     return `${generateNumber()} ${operations[generateOperations()]} ${generateNumber()}`
// }
// let answer = generateQuestion()


// function newQuestion() {
//     return question.textContent = answer
// }
// newQuestion()

// let correctAnswer = Math.floor(eval(answer));

// const timerEl = document.querySelector('.timer');
// let timeLeft = 15;

// function startAnswerTimeout() {
//     answerTimeout = setTimeout(() => {
//         body.classList.add('wrong');
//     }, timeLeft * 1000);
//     updateTimer();
// }

// function resetAnswerTimeout() {
//     clearTimeout(answerTimeout);
//     startAnswerTimeout();
// }

// function updateTimer() {
//     timerEl.textContent = timeLeft;
//     if (timeLeft === 0) {
//         body.classList.add('wrong');
//         clearTimeout(answerTimeout);
//         return;
//     }
//     timeLeft--;
// }

// function generateAnswer() {
//     let correctAnswerIndex = Math.floor(Math.random() * answers.length);
//     answers.forEach((answer, index) => {
//         if (index === correctAnswerIndex) {
//             answer.textContent = correctAnswer;
//         } else {
//             answer.textContent = generateNumber();
//         }
//     });
//     console.log(correctAnswer);
// }
// generateAnswer()

// function findCorrect() {
//     answers.forEach(item => {
//         item.addEventListener('click', () => {
//             let correctAnswer = eval(answer);
//             body.classList.remove('correct', 'wrong');
//             if (+item.textContent === correctAnswer) {
//                 body.classList.toggle('correct', true);
//             } else {
//                 body.classList.toggle('wrong', true);
//             }
//             resetAnswerTimeout()
//         });
//     });
// }
// findCorrect()
// setInterval(updateTimer, 1000);

// startBtn.addEventListener('click', () => {
//     startBtn.classList.add('hide')
//     questionContainer.classList.remove('hide')
//     startAnswerTimeout();

// })


const startBtn = document.querySelector('.start-btn');
const nextBtn = document.querySelector('.next-btn');
const question = document.querySelector('.question');
const answers = document.querySelectorAll('.answer');
const questionContainer = document.querySelector('.question-container');
const body = document.querySelector('body');

const operations = ['*', '/', '+', '-']

function generateNumber() {
    return Math.floor(Math.random() * 100)
}

function generateOperations() {
    return Math.floor(Math.random() * operations.length)
}

function generateQuestion() {
    return `${generateNumber()} ${operations[generateOperations()]} ${generateNumber()}`
}

let answer = generateQuestion();
let correctAnswer = Math.floor(eval(answer));

function newQuestion() {
    question.textContent = answer;
}

function generateAnswer() {
    let correctAnswerIndex = Math.floor(Math.random() * answers.length);
    answers.forEach((answer, index) => {
        if (index === correctAnswerIndex) {
            answer.textContent = correctAnswer;
        } else {
            answer.textContent = generateNumber();
        }
    });
}

function resetGame() {
    answer = generateQuestion();
    correctAnswer = Math.floor(eval(answer));
    newQuestion();
    generateAnswer();
    body.classList.remove('correct', 'wrong');
    timeLeft = 15;
    updateTimer();
}

function findCorrect() {
    answers.forEach(item => {
        item.addEventListener('click', () => {
            if (+item.textContent === correctAnswer) {
                body.classList.add('correct');
                questionContainer.classList.add('hide')
                nextBtn.classList.remove('hide')
            } else {
                body.classList.add('wrong');
                questionContainer.classList.add('hide')
                nextBtn.classList.remove('hide')
            }
            resetAnswerTimeout();
        });
    });
    
    
}

function startAnswerTimeout() {
    answerTimeout = setTimeout(() => {
        body.classList.add('wrong');
        clearInterval(intervalId);
    }, timeLeft * 1000);
}

function resetAnswerTimeout() {
    clearTimeout(answerTimeout);
    startAnswerTimeout();
}

const timerEl = document.querySelector('.timer');
let timeLeft = 15;
let intervalId;

function updateTimer() {
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
        body.classList.add('wrong');
        clearInterval(intervalId);
        clearTimeout(answerTimeout);
    } else {
        timeLeft--;
    }
}

startBtn.addEventListener('click', () => {
    startBtn.classList.add('hide');
    questionContainer.classList.remove('hide');
    resetGame();
    findCorrect();
    startAnswerTimeout();
    intervalId = setInterval(updateTimer, 1000);
});

nextBtn.addEventListener('click', () => {
    resetGame();
    findCorrect();
    startAnswerTimeout();
    newQuestion()
    questionContainer.classList.remove('hide');
    nextBtn.classList.add('hide');

});

