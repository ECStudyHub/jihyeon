export default class RandomButton {
  constructor({ $target, onClick }) {
    const $randomButton = document.createElement("button");
    $randomButton.innerText = "랜덤한 고양이를 받아보세요.";
    $randomButton.className = "random-button";
    $randomButton.addEventListener("click", onClick);
    $target.appendChild($randomButton);
  }

  render() {}
}
