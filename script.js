var facebookMetaToken =
  'IGQWRQRmRCMEoxSEY2Y1lYQW4tVEZA2N3BQSWtjRWhwRExBbFBLWUM4TGwzRWUzZAzNsWDlPbE1qVnFWZAVI0SzBpRFg3N2hGV0szTjNhQUozZAHYwU1NDSnFDQndxbU9KWTN5WVBGZADlBVHhJU2dLOXJzcDZArZAXVSeUUZD';
const isMobile = window.innerWidth <= 500;
const isMobile2 = window.innerWidth <= 1300;
// INSTAFEED - CARGA FOTOS  DE INSTAGRAM

var feed = new Instafeed({
  get: 'user',
  accessToken: facebookMetaToken,
  resolution: 'standard_resolution',
  limit: 9,
  template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
  filter: function (image) {
    return image.type !== 'video';
  },
});

feed.run();

// VALIDACIÓN DE FORMULARIO DE CONTACTO

// VALIDACION AL TOCAR FORM
var nameInput = document.getElementById('name');
nameInput.addEventListener('blur', function () {
  nameValidation();
});

var messageInput = document.getElementById('message');
messageInput.addEventListener('blur', function () {
  messageValidation();
});

// VALIDACION DE NOMBRE
function nameValidation() {
  var name = nameInput.value;
  var nameLabel = document.querySelector('label[for="name"]');

  var nameHasNumbers = /\d/.test(name);
  var nameHasSpecialChars = /[^\w\s]/.test(name);

  var nameError;

  if (name === '') {
    nameError = 'Ingresa un nombre.';
  } else if (nameHasNumbers) {
    nameError = 'No debe contener números.';
  } else if (nameHasSpecialChars) {
    nameError = 'No debe contener caracteres especiales.';
  } else {
    nameError = '';
  }

  if (nameError !== '') {
    nameLabel.style.color = 'red';
    nameLabel.textContent = 'Nombre - ' + nameError;
  } else {
    nameLabel.style.color = '#fff';
    nameLabel.textContent = 'Nombre';
  }

  fieldsVerification();
}

// VALIDACION DE MENSAJE
function messageValidation() {
  var message = messageInput.value;
  var messageLabel = document.querySelector('label[for="message"]');

  var messageError = message === '' ? 'Ingresa un mensaje.' : '';

  if (messageError !== '') {
    messageLabel.style.color = 'red';
    messageLabel.textContent = 'Mensaje - ' + messageError;
  } else {
    messageLabel.style.color = '#fff';
    messageLabel.textContent = 'Mensaje';
  }

  fieldsVerification();
}

// VERIFICACION DE ERRORES PARA DESHABILITAR BOTON
function fieldsVerification() {
  var name = nameInput.value;
  var message = messageInput.value;
  var nameLabel = document.querySelector('label[for="name"]');
  var messageLabel = document.querySelector('label[for="message"]');
  var button = document.getElementById('whatsappbutton');

  var nameColor = getComputedStyle(nameLabel).color;
  var messageColor = getComputedStyle(messageLabel).color;

  var nameError = name === '' || nameColor === 'rgb(255, 0, 0)';
  var messageError = message === '' || messageColor === 'rgb(255, 0, 0)';

  if (nameError || messageError) {
    button.classList.add('disabled');
  } else {
    button.classList.remove('disabled');
  }
}

// ENVIAR MENSAJE DE WHATSAPP
function sendWhatsAppMessage() {
  var name = nameInput.value;
  var message = messageInput.value;
  var messageCodified = encodeURIComponent(message);

  var whatsAppLink =
    'https://wa.me/541163507783?text=' +
    'Hola Carolina, soy ' +
    name +
    '. Mensaje: ' +
    messageCodified;

  window.open(whatsAppLink, '_blank');
}

window.onscroll = function () {
  scrollFunction();
};

// AJUSTAR HEADER AL HACER SCROLL
function scrollFunction() {
  const header = document.getElementById('header');
  const title = document.querySelector('.title');
  const logo = document.querySelector('.logo');
  const nav = document.querySelector('nav');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const socialIcons = document.querySelector('.social-icons');
  const headerContacts = document.querySelectorAll('.headerContact');
  const downButton = document.querySelector('.downButton');
  const inicioLinkLi = document.querySelector(
    'nav.desktop-nav ul li:first-child'
  );
  const inicioLinkA = document.querySelector(
    'nav.desktop-nav ul li:first-child a'
  );

  let scrollPosition = window.scrollY || document.documentElement.scrollTop;
  let isScrolled = isMobile ? scrollPosition > 0.1 : scrollPosition > 10;
  console.log(window.innerHeight);

  if (isScrolled) {
    gsap.to(header, {
      height: isMobile ? 50 : 80,
      duration: 0.3,
      onComplete: () => {
        header.style.padding = isMobile ? '10px' : '0';
        header.style.flexDirection = 'row';
        header.style.alignItems = isMobile ? 'unset' : 'center';
        title.style.fontSize = isMobile ? '40px' : '50px';
        mobileNavToggle.style.display = isMobile ? 'block' : 'none';
        nav.style.marginLeft = isMobile ? '0' : '15px';
        logo.style.marginRight = '15px';
        logo.style.width = isMobile ? '45px' : '60px';
        logo.style.height = isMobile ? '45px' : '60px';
        socialIcons.style.display = 'none';
        headerContacts.forEach((contact) => (contact.style.display = 'none'));
        downButton.style.display = 'none';
      },
    });

    inicioLinkLi.style.marginRight = '20px';
    inicioLinkA.style.display = 'block';
  } else {
    gsap.to(header, {
      height: isMobile2 ? 700 : 1000,
      duration: 0.3,
      onComplete: () => {
        header.style.padding = '0';
        header.style.flexDirection = 'column';
        header.style.alignItems = 'center';
        title.style.fontSize = isMobile ? '60px' : '80px';
        mobileNavToggle.style.display = 'none';
        nav.style.marginLeft = '0';
        logo.style.marginRight = '0';
        logo.style.width = '140px';
        logo.style.height = '140px';
        socialIcons.style.display = 'flex';
        headerContacts.forEach((contact) => (contact.style.display = 'flex'));
        downButton.style.display = 'block';
      },
    });

    inicioLinkLi.style.marginRight = '0';
    inicioLinkA.style.display = 'none';
  }
}

// SCROLL TO SECTION
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  window.scrollTo({
    top: section.offsetTop - 65,
    behavior: 'smooth',
  });
}

// MOBILE NAV
document.addEventListener('DOMContentLoaded', function () {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuItems = document.querySelectorAll('.mobile-nav ul li a');

  mobileNavToggle.addEventListener('click', function () {
    mobileNavToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
  });

  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener('click', function () {
      menuItems.forEach(function (item) {
        item.classList.remove('active-menu-item');
      });
      menuItem.classList.add('active-menu-item');

      mobileNavToggle.classList.remove('active');
      mobileNav.classList.remove('active');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var phoneLink = document.getElementById('phoneLink');

  if (!isMobile) {
    phoneLink.removeAttribute('href');
    phoneLink.addEventListener('click', function (event) {
      event.preventDefault();
    });
  }
});

let currentSlideIndex = [0, 0, 0];

function showSlide(categoryIndex, slideIndex) {
  const carousel = document.getElementById(`carousel${categoryIndex}`);
  const slides = carousel.getElementsByClassName('slide');
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  slides[slideIndex].classList.add('active');
}

function nextSlide(categoryIndex) {
  const carousel = document.getElementById(`carousel${categoryIndex}`);
  const slides = carousel.getElementsByClassName('slide');
  currentSlideIndex[categoryIndex - 1]++;
  if (currentSlideIndex[categoryIndex - 1] >= slides.length) {
    currentSlideIndex[categoryIndex - 1] = 0;
  }
  showSlide(categoryIndex, currentSlideIndex[categoryIndex - 1]);
}

function prevSlide(categoryIndex) {
  const carousel = document.getElementById(`carousel${categoryIndex}`);
  const slides = carousel.getElementsByClassName('slide');
  currentSlideIndex[categoryIndex - 1]--;
  if (currentSlideIndex[categoryIndex - 1] < 0) {
    currentSlideIndex[categoryIndex - 1] = slides.length - 1;
  }
  showSlide(categoryIndex, currentSlideIndex[categoryIndex - 1]);
}

// Inicializar el primer slide como activo
document.addEventListener('DOMContentLoaded', () => {
  showSlide(1, 0);
  showSlide(2, 0);
  showSlide(3, 0);
});
