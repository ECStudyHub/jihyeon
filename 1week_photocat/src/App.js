import { api } from "./api.js";
import Component from "./components/Component.js";
import DarkModeButton from "./components/DarkModeButton.js";
import ImageInfo from "./components/ImageInfo.js";
import Loading from "./components/Loading.js";
import RandomButton from "./components/RandomButton.js";
import SearchInput from "./components/SearchInput.js";
import SearchResult from "./components/SearchResult.js";
import { restoreLastSearch, storeSearch } from "./utils/storeLocalStorage.js";

console.log("app is running!");

export default class App extends Component {
  async setup() {
    const { lastData, lastKeyword } = restoreLastSearch();

    this.state = {
      cats: lastData ?? [],
      isLoading: false,
      modalVisible: false,
      selectedCat: null,
      isDarkMode: false,
    };

    this.loading = new Loading(this.$target, {
      isLoading: this.state.isLoading,
    });

    this.darkMode = new DarkModeButton(this.$target);

    this.searchInput = new SearchInput(this.$target, {
      onSearch: await this.handleSearch.bind(this),
      lastKeyword,
    });

    this.randomButton = new RandomButton(this.$target, {
      onClick: await this.handleRandomSearch.bind(this),
    });

    this.searchResult = new SearchResult(this.$target, {
      initialData: this.state.cats,
      onClick: await this.handleCatSelect.bind(this),
    });

    this.imageInfo = new ImageInfo(this.$target, {
      data: {
        visible: this.state.modalVisible,
        image: this.state.selectedCat,
      },
      onClose: this.handleModalClose.bind(this),
    });
  }

  async handleSearch(keyword) {
    try {
      this.searchInput.setState({ isLoading: true });
      const { data } = await api.fetchCats(keyword);
      this.searchInput.setState({ cats: data });
      this.loading.setState({ isLoading: false });
      storeSearch(keyword, data);
    } catch (error) {
      console.error(error);
      this.searchInput.setState({ isLoading: false });
    }
  }

  async handleRandomSearch() {
    try {
      this.loading.setState({ isLoading: true });
      const { data } = await api.fetchRandDomCats();
      this.loading.setState({ cats: data });
      this.loading.setState({ isLoading: false });
    } catch (error) {
      console.error(error);
      this.loading.setState({ isLoading: false });
    }
  }

  async handleCatSelect(image) {
    try {
      this.loading.setState({ isLoading: true });
      const { data } = await api.fetchDetailCat(image.id);
      this.imageInfo.setState({
        selectedCat: data,
        modalVisible: true,
      });
      this.loading.setState({ isLoading: false });
    } catch (error) {
      console.error(error);
      this.loading.setState({ isLoading: false });
    }
  }

  handleModalClose() {
    this.imageInfo.setState({
      modalVisible: false,
      selectedCat: null,
    });
  }
}
