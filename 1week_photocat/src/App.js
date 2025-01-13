import { api } from "./api.js";
import DarkModeButton from "./components/DarkModeButton.js";
import ImageInfo from "./components/ImageInfo.js";
import Loading from "./components/Loading.js";
import RandomButton from "./components/RandomButton.js";
import SearchInput from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";
import { restoreLastSearch, storeSearch } from "./utils/storeLocalStorage.js";

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
        const { data } = await api.fetchCats(keyword);
        this.loading.setState(false);
        this.setState(data);
        storeSearch(keyword, data);
      },
    });

    this.randomButton = new RandomButton({
      $target,
      onClick: async () => {
        this.loading.setState(true);
        const { data } = await api.fetchRandDomCats();
        this.loading.setState(false);
        this.setState(data);
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

    restoreLastSearch(this.setState.bind(this));
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
