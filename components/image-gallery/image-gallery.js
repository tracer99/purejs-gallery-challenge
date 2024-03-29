
class ImageGallery extends HTMLDivElement {
    static imagesPerPage = 6;
    static imageHeight = 240;
    static imageWidth = 320;
    constructor() {
        super();
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

        let button = document.createElement('button')
        button.addEventListener('click', (e) => {this.renderGallery()});
        button.appendChild(document.createTextNode('Generate'));
        shadow.appendChild(button);
    }

    renderGallery() {
        console.log('rendering gallery');
        // get this elements instance of the shadow DOM
        var shadow = this.shadowRoot;
        let ul = document.createElement('ul');
        ImageGallery.fetchImages().then(images => {
            images.forEach(image => {
                let li = document.createElement('li');
                let img = document.createElement('img');
                // formulate the url
                img.src = `https://picsum.photos/id/${image.id}/${ImageGallery.imageWidth}/${ImageGallery.imageHeight}`;
                li.appendChild(img);
                ul.appendChild(li);
            }, this);
            // we append the finished list in this async call, not after so it's smoother. Doing it after means the gallery is blank for a while
            shadow.getElementById('image-gallery').replaceChildren(ul);
        });
    }
    connectedCallback() {
        // call the renderGallery function when the element is added to the DOM
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