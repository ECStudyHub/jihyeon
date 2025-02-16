import { productAPI, ProductDTO } from "../api/products.ts";
import Product from "../components/Product.ts";
import { State } from "../core/Component.ts";
import PageComponent, { PageProps } from "../core/PageComponent.ts";
import { navigateTo } from "../utils/router.ts";

interface ProductListPageState extends State {
  products: ProductDTO[];
  isLoading: boolean;
  error: Error | null;
}

export default class ProductListPage extends PageComponent<PageProps, ProductListPageState> {
  setup() {
    this.setTitle("Product List");

    this.state = {
      products: [],
      isLoading: true,
      error: null,
    };

    this.fetchProducts();
  }
  private async fetchProducts() {
    try {
      this.setState({ ...this.state, isLoading: true });
      const products = await productAPI.getProducts();
      this.setState({ products, isLoading: false });
    } catch (error) {
      this.setState({
        ...this.state,
        error: error as Error,
      });
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  }
  public setEvent(): void {
    this.addEvent("click", ".ProductListPage", (event) => {
      const productElement = (event.target as HTMLElement).closest(".Product");
      if (!productElement) return;
      const newPath = `/web/products/${productElement.id}`;
      navigateTo(newPath);
    });
  }

  template(): string {
    const { products, isLoading, error } = this.state;

    if (isLoading) return "<div>로딩 중...</div>";
    if (error) return `<div>에러 발생: ${error.message}</div>`;

    return `<div class="ProductListPage">
        <h1>상품목록</h1>
        <ul>
        ${products.map((product) => new Product(product).render()).join("")}
        </ul>
      </div>`;
  }
}
