// page('/', searchController.index);
// page('/location', locationController.index);
// page('/contact', contactController.index);
// page();

page('/', mainView.index, beachData.retrieveData, mainView.map);
page('/beach/:name', detailView.index, beachData.retrieveData, Beach.loadAll,tideData.detailTideData, Beach.addTideData,Beach.renderDetailView,detailView.map);
// page('/search', searchController.index);
page('/location', locationView.index, beachData.retrieveData, locationView.createBeachNames, locationView.populateFilters);
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
