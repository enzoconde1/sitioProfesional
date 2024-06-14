var facebookMetaToken =
  'IGQWRQRmRCMEoxSEY2Y1lYQW4tVEZA2N3BQSWtjRWhwRExBbFBLWUM4TGwzRWUzZAzNsWDlPbE1qVnFWZAVI0SzBpRFg3N2hGV0szTjNhQUozZAHYwU1NDSnFDQndxbU9KWTN5WVBGZADlBVHhJU2dLOXJzcDZArZAXVSeUUZD';

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

  const isMobile = window.innerWidth <= 500;
  if (!isMobile) {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      header.style.padding = '10px 20px';
      header.style.flexDirection = 'row';
      title.style.fontSize = '50px';
      nav.style.marginLeft = '15px';
      logo.style.width = '60px';
      logo.style.height = '60px';
    } else {
      header.style.height = 'auto';
      header.style.padding = '10px';
      header.style.flexDirection = 'column';
      title.style.fontSize = '60px';
      nav.style.marginLeft = 'unset';
      logo.style.width = '95px';
      logo.style.height = '95px';
    }
  }
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

// SCROLL TO SECTION
function scrollToSection(sectionId) {
  var section = document.getElementById(sectionId);
  if (section) {
    var offsetTop = section.offsetTop;
    var offset = offsetTop - 75;

    const isMobile = window.innerWidth <= 500;
    if (isMobile) offset = offsetTop - 70;

    window.scrollTo({
      top: offset,
      behavior: 'smooth',
    });
  }
}
