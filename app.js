class ImageGallery extends HTMLUListElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        let images = ImageGallery.fetchImages();
        images.forEach(image => {
            let li = document.createElement('li');
            let img = document.createElement('img');
            img.src = image.url;
            li.appendChild(img);
            this.shadowRoot.append(li);
        }, this);
        this.shadowRoot.append(`<button>Generate</button>`);
    }

    static async fetchImages() {
        const response = await fetch('https://picsum.photos/v2/list?limit=6');
        const images = await response.json();
        return images;
    }
    
}


customElements.define('image-gallery', ImageGallery, {extends: 'ul'});
