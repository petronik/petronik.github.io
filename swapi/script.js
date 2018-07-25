
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
                                    <button onclick="this.disabled = true" data-lists="${item.characters}" class="get-characters btn btn-warning">Get Characters</button>
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

MAX_DEPTH = 32;

let canvas, ctx;
let stars = new Array(112);

window.onload = function() {
    canvas = document.getElementById("tutorial");
    if( canvas && canvas.getContext ) {
        ctx = canvas.getContext("2d");
        initStars();
        setInterval(loop,20);
    }
};

/* Returns a random number in the range [minVal,maxVal] */
function randomRange(minVal,maxVal) {
    return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
}

function initStars() {
    for( let i = 0; i < stars.length; i++ ) {
        stars[i] = {
            x: randomRange(-25,25),
            y: randomRange(-25,25),
            z: randomRange(1,MAX_DEPTH)
        }
    }
}

function loop() {
    let halfWidth  = canvas.width / 2;
    let halfHeight = canvas.height / 2;

    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for( let i = 0; i < stars.length; i++ ) {
        stars[i].z -= 0.2;

        if( stars[i].z <= 0 ) {
            stars[i].x = randomRange(-25,25);
            stars[i].y = randomRange(-25,25);
            stars[i].z = MAX_DEPTH;
        }

        let k  = 128.0 / stars[i].z;
        let px = stars[i].x * k + halfWidth;
        let py = stars[i].y * k + halfHeight;

        if( px >= 0 && px <= 1500 && py >= 0 && py <= 600 ) {
            let size = (1 - stars[i].z / 32.0) * 5;
            let shade = parseInt((1 - stars[i].z / 32.0) * 255);
            ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
            ctx.fillRect(px,py,size,size);
        }
    }
}

$('.right').on('click', function(){
    $('.right').toggleClass('right-origin')
})