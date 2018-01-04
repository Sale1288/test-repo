(function(){
    function Hotel() {
        this._onClick = this._onClick.bind(this);
    } 

    Hotel.prototype = new HotelBase();

    Hotel.prototype.render = function(container) {
        var tmpl = document.querySelector('#hotel-template');

  // element.classList.add('hotel');
  // element.innerHTML = ''+ '<span class="hotel-stars"></span>' + 
  // '<h3 class="hotel-name">' + data.name + '</h3>' +
  // '<span class="hotel-rating">' + data.rating + '</span>' +
  // '<span class="hotel-favourite"></span>' + 
  // '<a href="#" class="hotel-price"><span class="hotel-price-value">' + data.price + '</span></a>';
  // if('content' in template) {
        this.element = tmpl.content.children[0].cloneNode(true);
    // } else {
    //   var element = tmpl.children[0].cloneNode(true); //IE
    
    // }

        this.element.querySelector('.hotel-name').textContent = this._data.name;
        this.element.querySelector('.hotel-rating').textContent = this._data.rating || 7.0;
        this.element.querySelector('.hotel-price-value').textContent = this._data.price;

        // var amenitiesContainer = this.element.querySelectorAll('.hotel-amenities');

        // this._data.amenities.forEach(function(amenity){
            
        //     var amenityElement = document.createElement('li');

        //     amenityElement.classList.add('hotel-amenity', amenityClassName[amenity]);
            
        //     amenityElement.innerHTML = amenityName[amenity];
        //     amenitiesContainer.appendChild(amenityElement);
        // });

        var bgImg = new Image();

        var imgLoadTimeout = setTimeout(function(){
            bgImg.src = "";
            this.element.classList.add('hotel-nophoto');
        }, 10000);

        bgImg.onload = function(){
            clearTimeout(imgLoadTimeout);
            this.element.style.backgroundImage = 'url("' + bgImg.src + '")';
        }.bind(this);

        bgImg.onerror = function() {
            this.element.classList.add('hotel-nophoto');
        }.bind(this);

        bgImg.src = '/' + this._data.preview;

        this.element.addEventListener('click', this._onClick);
    };

    Hotel.prototype.remove = function() {
        this.element.removeEventListener('click', this._onClick);
    };

    Hotel.prototype._onClick = function(e) {
            if(e.target.classList.contains('hotel') && !this.element.classList.contains('hotel-nophoto')) {
                if(typeof this.onClick === 'function') {
                    this.onClick();
                }
            }
    }

    Hotel.prototype.onClick = null;

    window.Hotel = Hotel;
})();

