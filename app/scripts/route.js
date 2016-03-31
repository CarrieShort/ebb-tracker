// page('/', searchController.index);
// page('/location', locationController.index);
// page('/contact', contactController.index);
// page();

page('/', indexView.index, beachData.retrieveData, Beach.loadAll, Beach.renderSearchResults);
page('/beach/:name', detailView.index, beachData.retrieveData, Beach.loadAll, Beach.renderDetailView);
// page('/search', searchController.index);
// page('/location', locationsController.index);
// page('/contact', contactController.index);
page();

function index() {
  console.log('index fired');
  $('p')
    .textContent = 'Index page generated on the client!';
}

function contact() {
  console.log('contact fired');

  $('p')
    .textContent = 'Contact page generated on the client!';
}
