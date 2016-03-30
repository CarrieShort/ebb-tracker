// page('/', searchController.index);
// page('/location', locationController.index);
// page('/contact', contactController.index);
// page();
page('/', contact);
page('/search', index);
page('/location', index);
page('/contact', contact);
page();
function index() {
  console.log('index fired');
  document.querySelector('p')
    .textContent = 'Index page generated on the client!';
}

function contact() {
  console.log('contact fired');

  document.querySelector('p')
    .textContent = 'Contact page generated on the client!';
}
