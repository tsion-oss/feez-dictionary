const apiKey = "61a702596cmshd3ba168972269b1p1f9d4bjsn862d3bcdfc4b"
const button = document.querySelector('#btn')
const textInput = document.querySelector('#input')
const headingTwo = document.querySelector('#output')


button.addEventListener('click', async() => {
    let info = textInput.value 
    console.log(info)
    let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${info}`)
    console.log(response)

    let cit = response.request.responseText
    console.log(cit)
    headingTwo.innerText = cit
})
