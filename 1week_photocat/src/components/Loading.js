export default class Loading {
  constructor({ $target, state }) {
    const template = `
        <div class='loading'>
            <div>loading... </div>
            <button class="reload">새로고침</button>
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
    const $reload = document.querySelector(".reload");

    $reload.addEventListener("click", () => {
      window.location.reload();
    });

    if (this.state) {
      $loading.style.display = "block";
    } else {
      $loading.style.display = "none";
    }
  }
}
