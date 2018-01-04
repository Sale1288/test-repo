(function(){
    var Gallery = function() {
        this.element = document.querySelector('.gallery');
        this._closebutton = this.element.querySelector('.gallery-close');

        this._onCloseClick = this._onCloseClick.bind(this);
    };

    Gallery.prototype = new HotelBase();

    Gallery.prototype.render = function() {
        this.element.classList.remove('hidden');
        

        var thumbnailsContainer =  this.element.querySelector('.gallery-thumbnails');

        this.getData().pictures.forEach(function(pic, i){
            var picture = new Image();
            picture.height = 40;
            picture.src = pic;
            thumbnailsContainer.appendChild(picture);
        }, this);

        this.setCurrentImage(0);

        this._closebutton.addEventListener('click', this._onCloseClick);
    };


     Gallery.prototype.remove = function() {
        this.element.classList.add('hidden');
        this._closebutton.removeEventlistener('click', this._onCloseClick);
    };

        Gallery.prototype._onCloseClick = function() {
        this.remove();       
    };

    Gallery.prototype.setCurrentImage = function(i) {
        if(this._currentImage === i) {
            return;
        }

        this._currentImage = i;
        if(this.element.querySelector('img.selected')) {
            this.element.querySelector('img.selected').classList.remove('selected');
        }
        this.element.querySelectorAll('.gallery-thumbnails img') [i].classList.add('selected');

        var image = new Image();
        image.src = this.data.pictures[i];

        var previewContainer = this.element.querySelector('.gallery-preview');
        while(previewContainer.firstChild) {
            previewContainer.removeChild(previewContainer.firstChild);
        }

        previewContainer.appendChild(image);
    };

    window.Gallery = Gallery;

})();