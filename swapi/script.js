
const URL = 'https://swapi.co/api/';
const filmList = document.getElementById('filmList');
const result = document.getElementById('result');

document.getElementById('getFilms').addEventListener
('click', getFilms);


function getFilms(){
    fetch(URL + 'films')
        .then((res) => res.json())
        .then((data) => {
            let opt = '<option value="-1">Choose film</option>';
            let myFilms = data.results;
            let resultFilm = '';

            myFilms.map( item => {
                opt += `<option value="${item.episode_id}">${item.title}</option>`;
                resultFilm += `<div class="hide" id="film-${item.episode_id}">
                                    <div class="film-box">
                                        <h3>${item.title}</h3>
                                        <p>Episode: ${item.episode_id}</p>
                                        <p>${item.opening_crawl}</p>
                                        <p>Producer: ${item.producer}</p>
                                        <p>Date released: ${item.release_date}</p>
                                    </div>
                                    <button onclick="this.disabled = true" data-lists="${item.characters}" class="get-characters">Get Characters</button>
                                     <div id="characterList"></div>
                                     </div>`;

            });

            filmList.classList.remove('hide');
            filmList.innerHTML = opt;
            result.innerHTML = resultFilm;


});

}

function hideElements(parent){
    [].forEach.call(parent.children, function(item){
        item.classList.add('hide');
    })
}

function showElement() {
    const id = 'film-' + this.options[this.selectedIndex].value;
    hideElements(result);
    document.getElementById(id).classList.remove('hide');
}
filmList.addEventListener('change', showElement, false);


function getCharacters(e){
    const target = e.target;
    if(!target.classList.contains('get-characters')){
        return false;
    }
    const lists = target.dataset.lists;
    const arrLists = lists.split(",");
    let st = '';
    arrLists.map(item => {
    fetch(item)
        .then(res => {
            if(res.ok) return res.json();
            throw new Error(res.statusText);
        })
        .then(data => {
                st = `<div class="char-item">
                                  <h3>NAME: ${data.name}</h3>
                                  <h3>GENDER: ${data.gender}</h3>
                                  <hr>
                                  </div>`;


            target.insertAdjacentHTML('afterEnd', st)
        })
    .catch(error => {alert(error.message)})

        })
}
result.addEventListener('click',getCharacters, false);

