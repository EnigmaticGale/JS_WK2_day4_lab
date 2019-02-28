const RequestHelper = require('../helpers/request_helper.js')
const PubSub = require('../helpers/pub_sub.js')

const Mountain = function() {
  this.data = null;
}

Mountain.prototype.bindEvents = function () {

  PubSub.subscribe('MountainView:select-region',(evt) => {
    const chosenRegion = evt.detail;
    const result = this.filterByRegion(chosenRegion);
    PubSub.publish('Mountains:selected-region', result)
  });

};

Mountain.prototype.filterByRegion = function (region) {
  const mountains = this.data;
  const newMountains = mountains.filter(mountain => mountain.region === region);
  return newMountains
};

Mountain.prototype.getData = function () {
  const url = 'https://munroapi.herokuapp.com/munros';
  const request = new RequestHelper(url)
  const mountainPromise = request.get()
  mountainPromise.then(value => {
    this.data = value;
    PubSub.publish("Mountains:data-ready", this.data)
  })
};



module.exports = Mountain;
