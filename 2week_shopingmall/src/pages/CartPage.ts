import { productAPI, ProductDetailDTO } from "../api/products.ts";
import CartProduct, { CartProductProps } from "../components/CartProduct.ts";
import { State } from "../core/Component.ts";
import PageComponent, { PageProps } from "../core/PageComponent.ts";
import { navigateTo } from "../utils/router.ts";
import { getStoredProductsCart, ProductCart, resetProductsCart } from "../utils/storeLocalStorage.ts";

interface CartPageState extends State {
  cartProductsInfo: Map<string, ProductDetailDTO>;
  isLoading: boolean;
  error: Error | null;

  selectedProducts: CartProductProps[];
}

export default class CartPage extends PageComponent<PageProps, CartPageState> {
  setup() {
    this.setTitle("Cart");

    this.state = {
      cartProductsInfo: new Map(),
      isLoading: false,
      error: null,
      selectedProducts: [],
    };
  }
  protected async initializePage() {
    const storedProducts = getStoredProductsCart();

    if (storedProducts.length === 0) {
      alert("장바구니가 비어있습니다.");
      navigateTo("/");
      return;
    }

    // 병렬로 상품 정보 가져오기
    const productPromises = storedProducts.map(async (selected) => {
      const productId = String(selected.productId);

      if (!this.state.cartProductsInfo.has(productId)) {
        await this.fetchProduct(productId);
      }

      const product = this.state.cartProductsInfo.get(productId);
      const option = product?.productOptions.find((option) => option.id === selected.optionId);

      if (!product || !option) return null;

      return {
        id: product.id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        quantity: selected.quantity,
        productOption: {
          name: option.name,
          id: option.id,
        },
      } satisfies CartProductProps;
    });

    const cartProducts = (await Promise.all(productPromises)).filter(Boolean);

    this.setState({
      ...this.state,
      selectedProducts: cartProducts as CartProductProps[],
    });
  }

  private async fetchProduct(productId: string) {
    try {
      this.setState({ ...this.state, isLoading: true });
      const product = await productAPI.getProduct(productId);

      const updatedCartProductsInfo = new Map(this.state.cartProductsInfo);
      updatedCartProductsInfo.set(productId, product);

      this.setState({
        cartProductsInfo: updatedCartProductsInfo,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        ...this.state,
        error: error as Error,
        isLoading: false,
      });
    }
  }

  public setEvent(): void {
    this.addEvent("click", ".OrderButton", (event) => {
      alert("주문되었습니다.");
      resetProductsCart();
      navigateTo("/");
    });
  }

  template(): string {
    const { selectedProducts, isLoading } = this.state;

    if (isLoading) return "<div>로딩 중...</div>";

    return `
      <div class="CartPage">
        <h1>장바구니</h1>
        <div class="Cart">
          <ul>
            ${selectedProducts.map((product) => new CartProduct(product).render()).join("")}
          </ul>
          <div class="Cart__totalPrice">
            총 상품가격 ${selectedProducts
              .reduce((total, product) => total + product.price * product.quantity, 0)
              .toLocaleString()}원
          </div>
          <button class="OrderButton">주문하기</button>
        </div>
      </div>`;
  }
}
