const MountainsSomethingView = function(mountainObj, container) {
  this.mountainObj = mountainObj;
  this.container = container;
}

MountainsSomethingView.prototype.add = function () {


  const newDiv = document.createElement("div")
  newDiv.classList.add("mountain")

  const heading = this.createElement("h3", this.mountainObj.name)
  newDiv.appendChild(heading)

  const newUl = document.createElement("ul")
  newDiv.appendChild(newUl)

  const newLiMeaning = this.createElement("li", `Meaning: ${this.mountainObj.meaning}`)
  newUl.appendChild(newLiMeaning)

  const newLiHeight = this.createElement("li", `Height: ${this.mountainObj.height}`)
  newUl.appendChild(newLiHeight)

  this.container.appendChild(newDiv)
};

MountainsSomethingView.prototype.createElement = function (elementName, text) {
  const newElement = document.createElement(elementName)
  newElement.textContent = text;
  return newElement;
};


module.exports = MountainsSomethingView;
