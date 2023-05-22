const button = document.querySelector('#btn');
const textInput = document.querySelector('#input');
const paragraph = document.querySelector('#meaning')
const paragraphTwo = document.querySelector('#example')
const headingTwo = document.querySelector('#word')
const paragraphThree = document.querySelector('#synonym')
const audio = document.querySelector('#audioButton')
const audioPlayer = new Audio();



function toggleDarkMode() {
    var container = document.getElementById('container');
    container.classList.toggle('dark');
}

document.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', async () => {
        let info = textInput.value;
        console.log(info);
        try {
            let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${info}`);
            console.log(response);

            let word = response.data[0].word;
            console.log(word)
            headingTwo.innerHTML = word;

            let cit = response.data[0].meanings[0].definitions[0].definition;
            console.log(cit);
            paragraph.innerText = cit;

            let example = response.data[0].meanings[0].definitions[1].example;
            console.log(example)
            paragraphTwo.innerText = example

            let synonym = response.data[0].meanings[1].synonyms;
            paragraphThree.innerHTML = synonym

        } catch (error) {
            console.log(error);
        }
    });
});


audio.addEventListener('click', async () => {
  const wordTwo = textInput.value

    const response = await axios.get(`https://api.dictionaryapi.dev/media/pronunciations/en/${wordTwo}-1-au.mp3`)
    
    const audioUrl = response.data[0].phonetics[1].sourceUrl
    console.log(audioUrl)
    audioPlayer.src = audioUrl
    audioPlayer.play()

  
});










