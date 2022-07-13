
import Binding from '../../binding.js';

class ImageGallery extends HTMLDivElement {
    static imagesPerPage = 6;
    static imageHeight = 240;
    static imageWidth = 320;

    
    constructor() {
        super();
        this.images = []; // store the images in the images array
        // start shadow DOM
        let shadow = this.attachShadow({ mode: 'open' }); // create shadow DOM and attach to local variable
        
        // link external CSS for component
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = './components/image-gallery/image-gallery.css';
        shadow.appendChild(styleLink);
        let igdiv = document.createElement('div');
        igdiv.id = 'image-gallery';
        shadow.appendChild(igdiv);
        // horizontal rule
        shadow.appendChild(document.createElement('hr'));
        // make the button
        let button = document.createElement('button')
        // bind it to the renderGallery function
        button.addEventListener('click', (e) => {this.renderGallery()});
        button.appendChild(document.createTextNode('Generate'));
        shadow.appendChild(button);
    }

    renderGallery() {
        console.log('rendering gallery');
        // get this elements instance of the shadow DOM
        var shadow = this.shadowRoot;
        let ul = document.createElement('ul');
        this.images.forEach(image => {
            let li = document.createElement('li');
            let img = document.createElement('img');
            // formulate the url
            img.src = `https://picsum.photos/id/${image.id}/${ImageGallery.imageWidth}/${ImageGallery.imageHeight}`;
            li.appendChild(img);
            ul.appendChild(li);
        }, this);
        shadow.getElementById('image-gallery').replaceChildren(ul);
    }
    updateGallery() {
        // update the gallery
        console.log('updating gallery');
        let galleryImages = this.images;
        ImageGallery.fetchImages().then(images => {
            this.images = images;
        });
    }
    connectedCallback() {
        // call the renderGallery function when the element is added to the DOM
        this.updateGallery();
        this.renderGallery();
    }

    static async fetchImages() {
        // fetch the images from the API
        let page = Math.floor(Math.random() * 100); // random page number
        console.log('fetching images from page ' + page);
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${ImageGallery.imagesPerPage}`);
        const images = await response.json();
        return images;
    }
    
}

// register our custom component
customElements.define('image-gallery', ImageGallery, { extends: 'div' });

export default ImageGallery;