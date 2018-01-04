'use strict';

//form by id

let formEl = document.forms['searchform'];

//num of guests & num of rooms

let rooms = formEl['searchform-guests-rooms'];
let guests = formEl['searchform-guests-number'];
let submit = formEl['searchform-submit'];

let inputs = [guests, rooms];

//min & max num of guests
// min & max r system attrs of the form inputs

guests.min = 1;
guests.max = 6;

//min & max of guests depends on guests number

const MAX_GUESTS_PER_ROOM = 3;

function setMinMaxRooms(roomsEl, guestsNum) { 

//equal num of person per room
  roomsEl.min = Math.ceil(guestsNum / MAX_GUESTS_PER_ROOM);

//one person per room
  roomsEl.max = guestsNum;

}


//set start values for inputs from cookies
guests.value = docCookies.getItem('guests');
//guests.value = 4;
setMinMaxRooms(rooms, guests.value);

rooms.value = docCookies.getItem('rooms');
//rooms.value = rooms.min;



//reaction on changes
var sub = document.querySelector(".searchform-submit");

function setAttr() {
  sub = document.querySelector(".searchform-submit").setAttribute("disabled", "disabled");
}

function remAttr() {
  sub = document.querySelector(".searchform-submit").removeAttribute("disabled");
}

guests.onchange = function() {
  setMinMaxRooms(rooms, guests.value);
}

var bool1 = false;

function checkInputs(inputs) {

  for(let i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener("input", function() {
      // var targ = parseInt(e.target.value);
    var input1 = inputs[0].value;
    var input2 = inputs[1].value;
      if(parseInt(input1) === 0 || parseInt(input2) === 0) {
        bool1 = true;
      } else {
        bool1 = false;
      } 
      blockErr();
    });
  }
}

checkInputs(inputs);

function blockErr() {
  var hasErr = bool1;
  if(hasErr === true) {
     setAttr();
  } 
  if (hasErr === false){
     remAttr();
  } 
}


//save last valide data in Cookies

formEl.onsubmit = function(e) {

  //obj e to work with event

  e.preventDefault();

  let dateToExpire = +Date.now() + 3 * 24 * 60 * 60 * 1000;
  let formattedDateToExpire = new Date(dateToExpire).toUTCString();

  document.cookie = 'guests=' + guests.value + ';expires=' + formattedDateToExpire;
  document.cookie = 'rooms=' + rooms.value + ';expires=' + formattedDateToExpire;

  formEl.submit();
}

