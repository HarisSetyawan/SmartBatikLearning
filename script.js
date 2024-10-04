const questionsPage1 = [
    { q: "Saya sangat suka…", a: "Mencatat", b: "Bercerita", c: "Menjiplak" },
    { q: "Saya suka membaca dengan…", a: "Cepat", b: "Suara keras", c: "Jari sebagai penunjuk" },
    { q: "Saya paling suka belajar dengan…", a: "Membaca", b: "Mendengarkan", c: "Bergerak" },
    { q: "Saya mudah mengingat dengan apa yang…", a: "Saya lihat", b: "Saya dengar", c: "Saya tulis" },
    { q: "Apabila mencatat, saya…", a: "Banyak catatan disertai gambar", b: "Sedikit mencatat karena lebih suka mendengarkan", c: "Banyak catatan namun tidak disertai gambar" },
    { q: "Saya menjawab pertanyaan dengan jawaban…", a: "Ya atau tidak", b: "Panjang lebar (suka bercerita)", c: "Diikuti dengan gerakan anggota tubuh" },
    { q: "Saat belajar saya…", a: "Tidak mudah terganggu dengan keributan", b: "Mudah terganggu dengan keributan", c: "Tidak dapat duduk diam dalam waktu lama" }
];

const questionsPage2 = [
    { q: "Saya mengingat dengan cara…", a: "Membayangkan", b: "Mengucapkan", c: "Sambil berjalan dan melihat" },
    { q: "Saya berbicara lebih suka…", a: "Melihat wajah langsung", b: "Lewat telepon", c: "Memperhatikan Gerakan tubuh" },
    { q: "Ketika berbicara saya…", a: "Cepat", b: "Intonasi/berirama", c: "Lambat" },
    { q: "Cara saya belajar biasanya suka…", a: "Mengikuti petunjuk gambar", b: "Sambil berbicara", c: "Berbicara sambil menulis" },
    { q: "Saya sering mengisi waktu luang dengan…", a: "Menonton", b: "Mendengarkan musik", c: "Bermain game" },
    { q: "Saya lebih mudah memahami pelajaran dengan…", a: "Melihat peraga", b: "Berdiskusi", c: "Praktik" },
    { q: "Saya lebih menyukai…", a: "Gambar", b: "Musik", c: "Permainan" }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestions(questions, container) {
    container.innerHTML = '';
    questions.forEach((question, index) => {
        const shuffledAnswers = shuffle([question.a, question.b, question.c]);
        container.innerHTML += `
            <p><strong>${index + 1}. ${question.q}</strong></p>
            <input type="radio" name="question${index + 1}" value="${shuffledAnswers[0]}"> ${shuffledAnswers[0]}<br>
            <input type="radio" name="question${index + 1}" value="${shuffledAnswers[1]}"> ${shuffledAnswers[1]}<br>
            <input type="radio" name="question${index + 1}" value="${shuffledAnswers[2]}"> ${shuffledAnswers[2]}<br>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const nextButton = document.getElementById('next-button');
    const submitButton = document.getElementById('submit-button');

    if (nextButton) {
        loadQuestions(questionsPage1, quizForm);
        nextButton.addEventListener('click', () => {
            const answersPage1 = new FormData(quizForm);
            localStorage.setItem('answersPage1', JSON.stringify(Object.fromEntries(answersPage1.entries())));
            window.location.href = 'page2.html';
        });
    }

    if (submitButton) {
        loadQuestions(questionsPage2, quizForm);
        submitButton.addEventListener('click', () => {
            const answersPage1 = JSON.parse(localStorage.getItem('answersPage1'));
            const answersPage2 = new FormData(quizForm);
            const allAnswers = { ...answersPage1, ...Object.fromEntries(answersPage2.entries()) };
            calculateLearningStyle(allAnswers);
        });
    }
});

function calculateLearningStyle(answers) {
    const resultSection = document.getElementById('result-section');
    const quizSection = document.getElementById('quiz-section');
    const resultText = document.getElementById('result-text');
    
    let visual = 0, auditory = 0, kinesthetic = 0;
    
    for (const value of Object.values(answers)) {
        if (['Mencatat', 'Cepat', 'Membaca', 'Saya lihat', 'Banyak catatan disertai gambar', 'Ya atau tidak', 'Tidak mudah terganggu dengan keributan', 'Membayangkan', 'Melihat wajah langsung', 'Cepat', 'Mengikuti petunjuk gambar', 'Menonton', 'Melihat peraga', 'Gambar'].includes(value)) {
            visual++;
        } else if (['Bercerita', 'Suara keras', 'Mendengarkan', 'Saya dengar', 'Sedikit mencatat karena lebih suka mendengarkan', 'Panjang lebar (suka bercerita)', 'Mudah terganggu dengan keributan', 'Mengucapkan', 'Lewat telepon', 'Intonasi/berirama', 'Sambil berbicara', 'Mendengarkan musik', 'Berdiskusi', 'Musik'].includes(value)) {
            auditory++;
        } else {
            kinesthetic++;
        }
    }

    let learningStyle;
    let redirectUrl;

    if (visual > auditory && visual > kinesthetic) {
        learningStyle = 'Visual';
        resultText.innerText = 'Anda memiliki gaya belajar Visual.';
        redirectUrl = 'https://www.canva.com/design/DAGSAzYOVtg/IQmifepY26fBNG-KuhmG4g/edit?utm_content=DAGSAzYOVtg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
    } else if (auditory > visual && auditory > kinesthetic) {
        learningStyle = 'Auditory';
        resultText.innerText = 'Anda memiliki gaya belajar Auditory.';
        redirectUrl = 'https://www.canva.com/design/DAGRZfjg3gc/E8TjAdKzUxwlCkjWm1IGUQ/edit?utm_content=DAGRZfjg3gc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
    } else {
        learningStyle = 'Kinesthetic';
        resultText.innerText = 'Anda memiliki gaya belajar Kinesthetic.';
        redirectUrl = 'https://www.canva.com/design/DAGSDL7qndc/U1ErrnKxY1G3LNikLCWUTw/edit?utm_content=DAGSDL7qndc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';
    }

    quizSection.style.display = 'none';
    resultSection.style.display = 'block';

    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 2000);
}
