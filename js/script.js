// Створи галерею з можливістю кліка по її елементах і перегляду повнорозмірного
// зображення в модальному вікні. Прев'ю результату подивися
// [за посиланням](https://take.ms/ZvBD0E).

// ![Прев'ю](preview.jpg)

// Розбий завдання на кілька підзадач:

// - Створення і рендер розмітки по масиву даних і наданим шаблоном.
// - Реалізація делегування на галереї `ul.js-gallery` і отримання `url` великого
//   зображення.
// - Відкриття модального вікна при натисканні на елементі галереї.
// - Підміна значення атрибута `src` елемента `img.lightbox__image`.
// - Закриття модального вікна при натисканні на кнопку
//   `button[data-action="close-modal"]`.
// - Очищення значення атрибута `src` елемента `img.lightbox__image`. Це необхідно
//   для того, щоб при наступному відкритті модального вікна, поки вантажиться
// зображення, ми не бачили попереднє.

import galleryItems from "./gallery-items.js";

const galleryRef = document.querySelector(".js-gallery");

galleryRef.addEventListener("click", onLoadEvent);

function onLoadEvent(event) {
  event.
}

//console.log(galleryRef);
//console.log(galleryItems);

function createGalleryItemMarkup({ original, preview, description }) {
  const imageRef = `
    <li class="gallery__item">
        <a class="gallery__link" href=${original}>
            <img class="gallery__image"
            src=${preview}
            data-source=${original}
            alt=${description}/>
        </a>
    </li>
    `;
  return imageRef;
}
function createGalleryMarkup(ItemsArray) {
  const GalleryMarkup = ItemsArray.map(createGalleryItemMarkup).join("");
  return GalleryMarkup;
}

const GalleryMarkup = createGalleryMarkup(galleryItems);
console.log(GalleryMarkup);

galleryRef.innerHTML = GalleryMarkup;
