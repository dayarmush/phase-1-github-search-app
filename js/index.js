const form = document.querySelector('form')
const ul = document.querySelector('#user-list')
let li2;
let query;

form.addEventListener('submit', (e) => {
    e.preventDefault()
    query = form.search.value
    form.reset()
    fetch(`https://api.github.com/search/users?q=${query}`)
    .then(resp => resp.json())
    .then(data => {
        data.items.forEach(item => displayUsers(item));
    })
    ul.textContent = ''
})

function displayUsers(item) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const p = document.createElement('p');
    li.textContent = item.login
    img.src = item.avatar_url
    p.textContent = item.html_url

    ul.append(li, img, p)

    img.addEventListener('click', () => {
        ul.textContent = ''
        repoFetch(li)
    })
}

function repoFetch(li) {
    fetch(`https://api.github.com/users/${li.textContent}/repos`)
    .then(resp => resp.json())
    .then(data => {
            data.forEach(item => {
            li2 = document.createElement('li')
            li2.textContent = item.full_name
            ul.append(li2)

            li2.addEventListener('click', (e) => {
                window.open(item.html_url, '_blank').focus();
            })
        })
    })
}