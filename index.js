console.log('helloworld')

let baseURL = 'https://swapi.dev/api/planets/?search='

let body = document.getElementById("body")
let container = document.getElementById("planet-info")
let searchBox = document.querySelector('#search-form')
let newSearchValue = document.querySelector('#search-box')

searchBox.addEventListener('submit', (e) =>{
    e.preventDefault();
    clearContainer();

    let term = newSearchValue.value

    axios.get(baseURL + term)
        .then(res => {
            newSearchValue.value = ""
            let resultArr = res.data.results    
            resultArr[0].residents.map(URL => {
                axios.get(URL)
                    .then(res =>{
                    let {name} = res.data
                    let newPerson = document.createElement('h3')
                    newPerson.textContent = name
                    container.appendChild(newPerson)
                    })
                    .catch(err => console.error(err))
            })
        })
        .catch(err => console.error(err))
})

function clearContainer() {
    container.innerHTML = ''
}