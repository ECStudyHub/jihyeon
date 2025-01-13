import { api } from "./api.js";
import DarkModeButton from "./components/DarkModeButton.js";
import ImageInfo from "./components/ImageInfo.js";
import Loading from "./components/Loading.js";
import SearchInput from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";

console.log("app is running!");

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.loading = new Loading({ $target, state: false });

    this.$darkMode = new DarkModeButton({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.loading.setState(true);
        await api.fetchCats(keyword).then(({ data }) => this.setState(data));
        this.loading.setState(false);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        this.loading.setState(true);
        await api.fetchDetailCat(image.id).then(({ data }) => {
          this.imageInfo.setState({
            visible: true,
            image: data,
          });
        });
        this.loading.setState(false);
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
      onClose: () => {
        this.imageInfo.setState({
          visible: false,
          image: null,
        });
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
