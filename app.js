class ImageGallery extends HTMLUListElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        let sr = this;
        ImageGallery.fetchImages().then(images => {
            images.forEach(image => {
                let li = document.createElement('li');
                let img = document.createElement('img');
                img.setAttribute('width', '400');
                img.src = image.download_url;
                li.appendChild(img);
                sr.shadowRoot.append(li);
            }, this);
        });
    }

    static async fetchImages() {
        const response = await fetch('https://picsum.photos/v2/list?limit=6');
        const images = await response.json();
        return images;
    }
    
}

class GalleryButton extends HTMLButtonElement {
    constructor() {
        super();
    }
}

customElements.define('image-gallery', ImageGallery, { extends: 'ul' });
customElements.define('button-generate', GalleryButton, { extends: 'button' });  
