export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data, onClose }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.onClose = onClose;

    this.render();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  handleResize() {
    if (this.data.visible) {
      this.adjustWidth();
    }
  }

  adjustWidth() {
    const deviceWidth = window.innerWidth;
    const $contentWrapper = this.$imageInfo.querySelector(".content-wrapper");
    if (deviceWidth <= 768) {
      $contentWrapper.style.width = `${deviceWidth}px`;
    }
  }

  handleClose() {
    const $closeButton = this.$imageInfo.querySelector(".close");
    $closeButton.addEventListener("click", () => {
      this.onClose();
    });

    const $contentWrapper = this.$imageInfo.querySelector(".content-wrapper");
    $contentWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    this.$imageInfo.addEventListener("click", (e) => {
      this.onClose();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        this.onClose();
      }
    });
  }

  render() {
    if (this.data.visible) {
      if (!this.data.image) {
        this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <p>결과 값이 존재 하지 않습니다.</p>
        </div>`;
      } else {
        const { name, url, temperament, origin } = this.data.image;

        this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <h2>${name}</h2>
              <button class="close">x</button>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <p>성격: ${temperament}</p>
              <p>태생: ${origin}</p>
            </div>
          </div>`;
      }

      this.$imageInfo.style.display = "block";

      this.adjustWidth();
      this.handleClose();
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
