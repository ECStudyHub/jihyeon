export default class Loading {
  constructor({ $target, state }) {
    const template = `
        <div class='loading'>
            <div>loading... </ div>
        </div>`;
    $target.innerHTML += template;
    this.state = state;
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const $loading = document.querySelector(".loading");

    if (this.state) {
      $loading.style.display = "block";
    } else {
      $loading.style.display = "none";
    }
  }
}
