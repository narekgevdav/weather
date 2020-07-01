const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const input = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = '' 
    fetch(`http://localhost:3000/weather?address=${input}`).then((response) =>{
    response.json().then((data)=>{
        if (data.error){  
            messageOne.textContent = ''          
            messageTwo.textContent = data.error
        } else {
           const {address, forecast, location} = data
           messageOne.textContent = forecast
           messageTwo.textContent = location         
          
        }
    })
})

})