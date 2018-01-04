'use strict';

(function() {

    var HotelData = function(data) {
        this.params = data;
    };

    HotelData.prototype.getPictures = function(){
        return this.params.pictures;
    };

    HotelData.prototype.getData = function() {
        return this.params.price;
    };

    HotelData.prototype.setData = function() {
        return this.params.price = price;
    };

    window.HotelData = HotelData;
})();