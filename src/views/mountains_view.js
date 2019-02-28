const PubSub = require('../helpers/pub_sub.js')
const MountainsSomethingView = require('./mountains_something_view.js')


const MountainView = function(container) {
  this.container = container;
}

MountainView.prototype.bindEvents = function () {
  PubSub.subscribe('Mountains:data-ready', (evt) => {
    const data = evt.detail;
    this.createDropdown(data)
    this.render(data);
    const dropdown = document.querySelector('select')
    dropdown.addEventListener('change', (evt) => {
      PubSub.publish('MountainView:select-region', evt.target.value)
    });
  })
  PubSub.subscribe('Mountains:selected-region', (evt) => {
    const data = evt.detail;
    console.log(data)
    const selectElement = document.querySelectorAll(".mountain")

    selectElement.forEach((oldMountain) => {
      this.container.removeChild(oldMountain)
    })

    this.render(data)
  })
}

MountainView.prototype.render = function (data) {
  data.forEach((mountain) => {
    const mountainObject = new MountainsSomethingView(mountain, this.container);
    mountainObject.add()
  });
}

MountainView.prototype.selectRegion = function () {

};

MountainView.prototype.createDropdown = function (data) {
  const selectDropdown = document.createElement("select")
  this.container.appendChild(selectDropdown)

  regions = data.reduce((accumulator, element) => {
    if (!accumulator.includes(element.region)) {
      accumulator.push(element.region)
    }
    return accumulator
  }, [])

  regions.forEach((regionName, index)=> {
    const newDropdown = this.createElement("option", regionName)
    selectDropdown.append(newDropdown)
  })

}

MountainView.prototype.createElement = function (elementName, text) {
  const newElement = document.createElement(elementName)
  newElement.textContent = text;
  return newElement;
};

module.exports = MountainView;
