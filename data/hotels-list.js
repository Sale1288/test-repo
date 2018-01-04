'use strict';

//перебрать все элементы в структуре
(function() {
var container = document.querySelector('.hotels-list');

var filters = document.querySelectorAll('.hotel-filter');

var filRes = document.querySelector('.hotel-filter-reset');

var activeFilter = 'filter-all';
var hotels = [];
var curPg = 0;
const PAGE_SIZE = 9;
var filteredHotels = [];
var renderedElements = [];
var gallery = new Gallery();



// for(var i = 0; i < filters.length; i++) {

//   filters[i].addEventListener('click', function(e) {
//    var clickedElId = e.target.id;
//     setActiveFilter(clickedElId);
//   });
// }

for(var i = 0; i < filters.length; i++) {

  filters[i].addEventListener('click', function(e){
    var clickedElement = e.target;
    if(clickedElement.classList.contains('hotel-filter')) {
      setActiveFilter(clickedElement.id);
    }

    var resFil = document.querySelector('.hotel-filter-selected')
    if (resFil) {
        resFil.classList.remove('hotel-filter-selected');
    }
    e.target.classList.add('hotel-filter-selected');
  });
}


function setActiveFilter(id) {

  //prevention of setting the same filter
  if (activeFilter === id) {
    return;
  }

  //remove selected filter
  document.querySelector('#' + activeFilter).classList.remove('hotel-filter-selected');
  document.querySelector('#' + id).classList.add('hotel-filter-selected');

  filteredHotels = hotels.slice(0); //a copy of the hotels array

  switch(id) {
    case 'filter-expensive': 
    filteredHotels = filteredHotels.sort(function(a, b){
      return b.price - a.price;
    });
    break;
    case 'filter-cheap':
    filteredHotels = filteredHotels.sort(function(a, b){
      return a.stars - b.stars;
    }).filter(function(item){
      return item.stars > 2;
    });
     break;
    case 'filter-reset': 
    
    break;
  }

  renderHotels(filteredHotels, 0, true);

}




var scrollTimeout;

window.addEventListener('scroll', function(){
clearTimeout(scrollTimeout);
scrollTimeout = setTimeout(function() {
  //определяем, что скролл внизу страницы . Положение футера относительно экрана
  var footerCoordinates = document.querySelector('footer').getBoundingClientRect();
//высота экрана
  var viewportSize = window.innerHeight;

  if(footerCoordinates.bottom - viewportSize <= footerCoordinates.height) {
    if(curPg < Math.ceil(filteredHotels.length / PAGE_SIZE)) {
      renderHotels(filteredHotels, ++curPg);
    }
  }
}, 100);
});

getHolets();

function renderHotels(hotels, pgNum, replace) {

  //обработка отрисовки объектов в памяти,а не в доме
 if(replace) {

//   //  var renderedElements = container.querySelectorAll('.hotel');
//   //  [].forEach.call(renderedElements, function(el) {
//   //    el.removeEventListener('click', _onClick);
//   //  });
//   // container.removeChild(el);
  var el;

  while((el = renderedElements.shift())) {
    container.removeChild(el.element);
    el.onClick = null;
    el.remove();
  }
 }
  var frag = document.createDocumentFragment();

  var from = pgNum * PAGE_SIZE;
  var to = from + PAGE_SIZE;
  var pgHotels = hotels.slice(from, to);

  renderedElements = renderedElements.concat(pgHotels.map(function(hotel){
    var hotelElement = new Hotel(hotel);
    hotelElement.render();
    // element.addEventListener('click', function(e){
    //   if(e.target.classList.contains('hotel')) {
    //     document.querySelector('.gallery').classList.remove('hidden');
    //   }
    // });
    frag.appendChild(hotelElement.element);


    hotelElement.onClick = function(){
      gallery.data = hotelElement._data;
      gallery.show();
    };

    return hotelElement;
  }));
   container.appendChild(frag);
}

// function _onClick(evt) {
//   // evt.preventDefault();
//   gallery.show();
// }


//function to get a json list of hotes via AJAX 

function getHolets() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'data/hotels.json');
  xhr.onload = function(e) {
    var rawData = e.target.response;
    var loadedHotels = JSON.parse(rawData);

    loadedHotels = loadedHotels.map(function(hotel){
      return new HotelBase(hotel);
    });

    renderHotels(loadedHotels);

    updateLoadedHotels(loadedHotels);
  };

  xhr.send();
}

function updateLoadedHotels(loadedHotels) {
  hotels = loadedHotels;
  document.querySelector('.hotels-title-count-number').innerText = hotels.length;

  setActiveFilter(activeFilter, true);
}

})();
// function getElFrTmpl(data) {
//   var tmpl = document.querySelector('#hotel-template');

  // element.classList.add('hotel');
  // element.innerHTML = ''+ '<span class="hotel-stars"></span>' + 
  // '<h3 class="hotel-name">' + data.name + '</h3>' +
  // '<span class="hotel-rating">' + data.rating + '</span>' +
  // '<span class="hotel-favourite"></span>' + 
  // '<a href="#" class="hotel-price"><span class="hotel-price-value">' + data.price + '</span></a>';
  // if('content' in template) {
    // var element = tmpl.content.children[0].cloneNode(true);
  // } else {
  //   var element = tmpl.children[0].cloneNode(true); //IE
  // }

  // element.querySelector('.hotel-name').textContent = data.name;
  // element.querySelector('.hotel-rating').textContent = data.rating || 7.0;
  // element.querySelector('.hotel-price-value').textContent = data.price;

  // var bgImg = new Image();

  // var imgLoadTimeout = setTimeout(function(){
  //   bgImg.src = "";
  //   element.classList.add('hotel-nophoto');
  // }, 10000);

  // bgImg.onload = function(){
  //   clearTimeout(imgLoadTimeout);
  //   element.style.backgroundImage = 'url("' + bgImg.src + '")';
  // }

  // bgImg.onerror = function() {
  //   element.classList.add('hotel-nophoto');
  // }

//   bgImg.src = '/' + data.preview;

//   return element;
// }