page('/', indexView.index, beachData.retrieveData, indexView.map);
page('/beach/:name/', detailView.index, beachData.retrieveData, Beach.loadAll,tideData.detailTideData, Beach.addTideData,Beach.renderDetailView,detailView.map);
page('/beach/:name/:lng/:lat', detailView.index, beachData.retrieveData, Beach.loadAll,tideData.detailTideData, Beach.addTideData,Beach.renderDetailView,detailView.map);

page('/location', locationView.index, beachData.retrieveData, locationController.createBeachNames, locationController.populateFilters,Beach.loadAll, Beach.renderLocations);
page();

function index() {
  $('p')
    .textContent = 'Index page generated on the client!';
}

function contact() {

  $('p')
    .textContent = 'Contact page generated on the client!';
}
