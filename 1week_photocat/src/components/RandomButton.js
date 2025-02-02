import Component from "./Component.js";

export default class RandomButton extends Component {
  constructor($target, props) {
    const $container = document.createElement("div");
    $container.className = "random-button";
    $target.appendChild($container);
    super($container, props);
  }
  template() {
    return `<button class="random-button" >랜덤한 고양이를 받아보세요.</button>`;
  }

  setEvent() {
    this.addEvent("click", ".random-button", this.props.onClick);
  }
}
