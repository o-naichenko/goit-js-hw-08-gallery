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
const lightBoxRef = document.querySelector(".js-lightbox");
const lightBoxImageRef = document.querySelector(".lightbox__image");
const closelightBoxBtnRef = document.querySelector(".lightbox__button");
const lightBoxOverlayRef = document.querySelector(".lightbox__overlay");
const imagePathAll = galleryItems.map((item) => item.original);
const GalleryMarkup = createGalleryMarkup(galleryItems);

galleryRef.addEventListener("click", openLightBox);

function openLightBox(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  } else {
    lightBoxImageRef.src = event.target.dataset.source;
    lightBoxRef.classList.add("is-open");

    window.addEventListener("keydown", toggleImages);

    toggleImages(event);
  }
  window.addEventListener("click", closelightBox);
  window.addEventListener("keydown", closelightBox);
}
function closelightBox(event) {
  event.preventDefault();
  //console.log(event.key);
  if (
    event.code !== "Escape" &&
    event.target !== closelightBoxBtnRef &&
    event.target !== lightBoxOverlayRef
  ) {
    return;
  } else {
    lightBoxRef.classList.remove("is-open");
    lightBoxImageRef.src = "";
    window.removeEventListener("click", closelightBox);
    window.removeEventListener("keydown", closelightBox);
    window.removeEventListener("keydown", toggleImages);
  }
}
function createGalleryItemMarkup({ original, preview, description }) {
  return `
    <li class="gallery__item">
        <a class="gallery__link" href=${original}>
            <img class="gallery__image"
            src=${preview}
            data-source=${original}
            alt='${description}'/>
        </a>
    </li>
    `;
}
function createGalleryMarkup(ItemsArray) {
  const GalleryMarkup = ItemsArray.map(createGalleryItemMarkup).join("");
  return GalleryMarkup;
}
function toggleImages(event) {
  event.preventDefault();
  let thisImageIndex = imagePathAll.indexOf(lightBoxImageRef.src);
  if (event.code === "ArrowLeft" && thisImageIndex > 0) {
    lightBoxImageRef.src = imagePathAll[(thisImageIndex -= 1)];
  } else if (
    event.code === "ArrowRight" &&
    thisImageIndex < imagePathAll.length - 1
  ) {
    lightBoxImageRef.src = imagePathAll[(thisImageIndex += 1)];
  } else {
    return;
  }
}

galleryRef.innerHTML = GalleryMarkup;
