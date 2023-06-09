const button = document.querySelector('#btn');
const textInput = document.querySelector('#input');
const paragraph = document.querySelector('#meaning');
const paragraphTwo = document.querySelector('#example');
const headingTwo = document.querySelector('#word');
const paragraphThree = document.querySelector('#synonym');
const audio = document.querySelector('#audioButton');
const audioPlayer = new Audio();
const soundIcon = document.querySelector('#speaker-icon');
const wordType = document.querySelector('#word-type');
const container = document.getElementById('container');


 //An event listener for a button clik retrieves the input value from a text input field, and make Get request to a dictionary API to fetch information for the provided input.
  button.addEventListener('click', () => {
    let info = textInput.value;
     console.log(info);
  axios
  .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${info}`)
    .then((response) => {
      console.log(response);

      let word = response.data[0]?.word;
      if (word) {
        console.log(word);
        headingTwo.innerHTML = word;
        audio.style.display = 'inline';

        let type = response.data[0].meanings[0]?.partOfSpeech;
        console.log(type);
        wordType.innerText = type;

        let cit = response.data[0].meanings[0]?.definitions[0]?.definition;
        console.log(cit);
        paragraph.innerText = cit;

        let example = response.data[0].meanings[1]?.definitions[0]?.example;
        if (example) {
          console.log(example);
          paragraphTwo.innerText = example;
          paragraphTwo.style.backgroundColor = 'transparent';
          paragraphTwo.style.display = 'block';
        } else {
          console.log('There is no example for this word.');
          paragraphTwo.innerText = 'There is no example for this word.';
          paragraphTwo.style.backgroundColor = 'transparent';
          paragraphTwo.style.display = 'block';
        }
        let synony = response.data[0].meanings[0]?.synonyms;
        console.log(synony);
//Organizes synonyms into groups of three, formats them by enclosing each synonym in u tags, and assigns the formatted synonyms to the HTML  content of paragraphThree
         let groups = [];
        for (let i = 0; i < synony.length; i += 3) {
          groups.push(synony.slice(i, i + 3));
        }
        let formattedSynonyms = groups
          .map((group) => {
            return group.map((synonym) => `<u>${synonym}</u>`).join(', ');
          })
          .join('\n\n');

        paragraphThree.innerHTML = formattedSynonyms;
      } else{
        headingTwo.innerHTML = `Can't find the meanings of '${info}'. Please try to search for another word.`;
        audio.style.display = 'none';
      }
      
      })
    
  })
    

audio.addEventListener('click', async () => {
  const wordTwo = textInput.value;
  const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordTwo}`);
  const audioUrl = response.data[0].phonetics[1]?.audio;
  console.log(audioUrl);
  audioPlayer.src = audioUrl;
  audioPlayer.play();
});














































