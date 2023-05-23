const button = document.querySelector('#btn');
const textInput = document.querySelector('#input');
const paragraph = document.querySelector('#meaning')
const paragraphTwo = document.querySelector('#example')
const headingTwo = document.querySelector('#word')
const paragraphThree = document.querySelector('#synonym')
const audio = document.querySelector('#audioButton')
const audioPlayer = new Audio();
const soundIcon = document.querySelector('#speaker-icon')



function toggleDarkMode() {
    var container = document.getElementById('container');
    container.classList.toggle('dark');
}

document.addEventListener('DOMContentLoaded', () => {
    button.addEventListener('click', async () => {
        let info = textInput.value;
        console.log(info);
        
            let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${info}`);
            console.log(response); 

          let word = response.data[0].word;
          if (word) {
           console.log(word)
           headingTwo.innerHTML = word;
           audio.style.display = 'inline'
          }else {
            console.log('Please enter a correct word')
            headingTwo.innerHTML = 'Please enter a correct word'
            audio.style.display = 'none'
          }
          
          

           let cit = response.data[0].meanings[0].definitions[0].definition;
           console.log(cit);
            paragraph.innerText = cit;

            let example = response.data[0].meanings[1].definitions[0].example;
            if (example){
            console.log(example)
            paragraphTwo.innerText = example
            paragraphTwo.style.display  = "block";
            } else {
                console.log('There is no example for this word.')
                paragraphTwo.innerText = '"There is no example for this word."'
                paragraphTwo.style.display = "block"
            }

    });  

});



audio.addEventListener('click', async () => {
  const wordTwo = textInput.value

    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordTwo}`)
    
    const audioUrl = response.data[0].phonetics[1].audio
    console.log(audioUrl)
    audioPlayer.src = audioUrl
    audioPlayer.play()

  
});









