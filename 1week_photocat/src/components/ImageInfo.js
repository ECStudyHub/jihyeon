import Component from "./Component.js";

export default class ImageInfo extends Component {
  constructor($target, props) {
    const $container = document.createElement("div");
    $container.className = "image-info";
    $target.appendChild($container);
    super($container, props);
  }

  setup() {
    this.state = {
      modalVisible: this.props.data.modalVisible,
      selectedCat: this.props.data.selectedCat,
    };

    window.addEventListener("resize", this.handleResize.bind(this));
  }

  template() {
    const { modalVisible, selectedCat } = this.state;
    if (!modalVisible) return "";

    if (!selectedCat) {
      return `
        <div class="ImageInfo">
          <div class="content-wrapper">
            <p>결과 값이 존재 하지 않습니다.</p>
          </div>
        </div>`;
    }

    const { name, url, temperament, origin } = selectedCat;
    return `
      <div class="ImageInfo">
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
        </div>
      </div>`;
  }

  mounted() {
    if (this.state.modalVisible) {
      this.adjustWidth();
    }
  }

  setEvent() {
    const { onClose } = this.props;

    // 닫기 버튼 클릭
    this.addEvent("click", ".close", () => {
      onClose();
    });

    // content-wrapper 클릭 전파 방지
    this.addEvent("click", ".content-wrapper", (e) => {
      e.stopPropagation();
    });

    // 배경 클릭시 닫기
    this.addEvent("click", ".ImageInfo", () => {
      onClose();
    });

    // ESC 키 입력시 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        onClose();
      }
    });
  }

  handleResize() {
    if (this.state.modalVisible) {
      this.adjustWidth();
    }
  }

  adjustWidth() {
    const deviceWidth = window.innerWidth;
    const $contentWrapper = this.$target.querySelector(".content-wrapper");
    if ($contentWrapper && deviceWidth <= 768) {
      $contentWrapper.style.width = `${deviceWidth}px`;
    }
  }
}
