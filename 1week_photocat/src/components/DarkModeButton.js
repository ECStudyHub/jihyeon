import Component from "./Component.js";

export default class DarkModeButton extends Component {
  constructor($target, props) {
    const $container = document.createElement("div");
    $container.className = "darkmode-button";
    $target.appendChild($container);
    super($container, props);
  }

  setup() {
    this.state = {
      isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    };
  }

  template() {
    const { isDarkMode } = this.state;
    return `
    <label class="DarkModeLabel">
      <span>다크모드 활성화</span>
      <input type="checkbox" class="DarkModeInput" ${isDarkMode ? "checked" : ""} />
      <span class="DarkModeStatus">${isDarkMode ? "다크모드" : "라이트모드"}</span>
    </label>`;
  }

  mounted() {
    if (this.state.isDarkMode) {
      document.documentElement.classList.add("dark-mode");
    }
  }

  setEvent() {
    this.addEvent("change", ".DarkModeInput", (e) => {
      const isDarkMode = e.target.checked;
      this.setState({ isDarkMode });

      const $document = document.documentElement;

      if (isDarkMode) {
        $document.classList.remove("light-mode");
        $document.classList.add("dark-mode");
      } else {
        $document.classList.remove("dark-mode");
        $document.classList.add("light-mode");
      }
    });
  }
}
