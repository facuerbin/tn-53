let body = document.querySelector('body')
let h1 = document.querySelector('h1')

if (window.confirm('¿desea modo osucro?')) {
    body.style.backgroundColor = '#7f7f7f'

    body.classList.add('fondoMoviesList')
}

h1.innerText = 'LISTADOD DE PELÍCULAS'

h1.style.color = 'white'

h1.style.backgroundColor = 'teal'

h1.style.padding = '20px'