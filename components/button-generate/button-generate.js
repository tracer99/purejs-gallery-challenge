class GalleryButton extends HTMLButtonElement {
    constructor() {
        super();
    }
}

// register our custom component
customElements.define('button-generate', GalleryButton, { extends: 'button' });  

export default GalleryButton;