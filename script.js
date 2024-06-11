require('dotenv').config();
var atoken = process.env.IG_TOKEN;

var feed = new Instafeed({
  get: 'user',
  accessToken: atoken,
  resolution: 'standard_resolution',
  limit: 9,
  template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
  filter: function (image) {
    return image.type !== 'video';
  },
});

feed.run();

function enviarMensajeWhatsApp() {
  var name = document.getElementById('name').value;
  var message = document.getElementById('message').value;

  var messageCodified = encodeURIComponent(message);

  var enlaceWhatsApp =
    'https://wa.me/541163507783?text=' +
    'Hola Carolina, soy ' +
    name +
    '. Mensaje: ' +
    messageCodified;

  window.open(enlaceWhatsApp, '_blank');
}

window.onscroll = function () {
  scrollFunction();
};

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
