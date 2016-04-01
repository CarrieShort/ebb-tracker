page('/', mainView.index, beachData.retrieveData, mainView.map);
page('/beach/:name/', detailView.index, beachData.retrieveData, Beach.loadAll,tideData.detailTideData, Beach.addTideData,Beach.renderDetailView,detailView.map);
page('/beach/:name/:lng/:lat', detailView.index, beachData.retrieveData, Beach.loadAll,tideData.detailTideData, Beach.addTideData,Beach.renderDetailView,detailView.map);

page('/location', locationView.index, beachData.retrieveData, locationView.createBeachNames, locationView.populateFilters,Beach.loadAll, Beach.renderLocations);
page();

function index() {
  $('p')
    .textContent = 'Index page generated on the client!';
}

function contact() {

  $('p')
    .textContent = 'Contact page generated on the client!';
}
