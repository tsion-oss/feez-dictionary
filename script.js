const button = document.querySelector('#btn');
const textInput = document.querySelector('#input');
const paragraph = document.querySelector('#meaning')
const paragraphTwo = document.querySelector('#example')
const headingTwo = document.querySelector('#word')
const paragraphThree = document.querySelector('#synonym')
const audio = document.querySelector('#audioButton')
const audioPlayer = new Audio();
const soundIcon = document.querySelector('#speaker-icon')
const wordType = document.querySelector('#word-type')



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
          
          let type = response.data[0].meanings[0].partOfSpeech

          console.log(type)
          wordType.innerText = type
          

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

            let synony = response.data[0].meanings[0].synonyms
            console.log(synony)
            
            let groups = [];
            for (let i = 0; i < synony.length; i += 3) {
              groups.push(synony.slice(i, i + 3));
            }
            let formattedSynonyms = groups.map(group => {
              return group.map(synonym => `<u> ${synonym} </u>`).join(' ,  ');
            }).join("\n\n");
            
            paragraphThree.innerHTML = formattedSynonyms;
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









