export default class DarkModeButton {
  constructor({ $target }) {
    const $label = document.createElement("label");
    $label.className = "DarkModeLabel";
    $target.appendChild($label);

    const $darkModeTitle = document.createElement("span");
    $darkModeTitle.innerText = "다크모드 활성화";
    $label.appendChild($darkModeTitle);

    const $darkModeInput = document.createElement("input");
    $darkModeInput.setAttribute("type", "checkbox");
    $darkModeInput.className = "DarkModeInput";

    $label.appendChild($darkModeInput);

    const $darkModeStatus = document.createElement("span");
    $darkModeStatus.innerText = "";
    $label.appendChild($darkModeStatus);

    const $document = document.documentElement;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      $darkModeStatus.innerText = "다크모드";
      $darkModeInput.checked = true;
      $document.classList.add("dark-mode");
    }

    $darkModeInput.addEventListener("change", (e) => {
      if (e.target.checked) {
        $darkModeStatus.innerText = "다크모드";
        $document.classList.remove("light-mode");
        $document.classList.add("dark-mode");
      } else {
        $darkModeStatus.innerText = "라이트모드";
        $document.classList.remove("dark-mode");
        $document.classList.add("light-mode");
      }
    });

    console.log("DarkModeInput created.", this);
  }
  render() {}
}
