let generateButton = document.querySelector('.hero__generate');
let quoteText = document.querySelector('.quote');
let authorText = document.querySelector('.author');
let copyBtn = document.querySelector('.hero__copy');
let listenBtn = document.querySelector('.hero__listen');

function generate(){
    generateButton.classList.add('loading');
    generateButton.innerText = 'Loading Quote...';
    copyBtn.classList.remove('copied');
    fetch('http://api.quotable.io/random').then(res => res.json().then(result => {
        quoteText.innerHTML = result.content;
        authorText.innerHTML = result.author;
        generateButton.innerText = 'Generate Quote'
        generateButton.classList.remove('loading');
    }))
}
generateButton.addEventListener('click', generate);

listenBtn.addEventListener('click', () => {
    let voices = window.speechSynthesis.getVoices();
    let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorText.innerText}`);
    utterance.voice = voices[1];
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
});

copyBtn.addEventListener('click', () => {
   navigator.clipboard.writeText(`${quoteText.innerText}`);
    copyBtn.classList.add('copied');
});
