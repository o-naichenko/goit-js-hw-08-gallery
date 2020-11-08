"use strict";

var _galleryItems = _interopRequireDefault(require("./gallery-items.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var galleryRef = document.querySelector(".js-gallery");
var lightBoxRef = document.querySelector(".js-lightbox");
var lightBoxImageRef = document.querySelector(".lightbox__image");
var closelightBoxBtnRef = document.querySelector(".lightbox__button");
var lightBoxOverlayRef = document.querySelector(".lightbox__overlay");

var imagePathAll = _galleryItems["default"].map(function (item) {
  return item.original;
});

var GalleryMarkup = createGalleryMarkup(_galleryItems["default"]);
galleryRef.addEventListener("click", openLightBox);

function closeLightBox(event) {
  event.preventDefault();
  var code = event.code,
      target = event.target;

  if (code == "Escape" && target == closelightBoxBtnRef && target == lightBoxOverlayRef) {
    lightBoxRef.classList.remove("is-open");
    lightBoxImageRef.src = "";
    window.removeEventListener("click", closeLightBox);
    window.removeEventListener("keydown", closeLightBox);
    window.removeEventListener("keydown", toggleImages);
  }
}

function createGalleryMarkup(array) {
  return array.map(createGalleryItemMarkup).join("");
}

function createGalleryItemMarkup(_ref) {
  var original = _ref.original,
      preview = _ref.preview,
      description = _ref.description;
  return "\n    <li class=\"gallery__item\">\n        <a class=\"gallery__link\" href=".concat(original, ">\n            <img class=\"gallery__image\"\n            src=").concat(preview, "\n            data-source=").concat(original, "\n            alt='").concat(description, "'/>\n        </a>\n    </li>\n    ");
}

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

  window.addEventListener("click", closeLightBox);
  window.addEventListener("keydown", closeLightBox);
}

function toggleImages(event) {
  event.preventDefault();
  var thisImageIndex = imagePathAll.indexOf(lightBoxImageRef.src);

  if (event.code === "ArrowLeft" && thisImageIndex > 0) {
    lightBoxImageRef.src = imagePathAll[thisImageIndex -= 1];
  } else if (event.code === "ArrowRight" && thisImageIndex < imagePathAll.length - 1) {
    lightBoxImageRef.src = imagePathAll[thisImageIndex += 1];
  } else {
    return;
  }
}

galleryRef.innerHTML = GalleryMarkup;