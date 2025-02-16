import { productAPI, ProductDetailDTO } from "../api/products.ts";
import { State } from "../core/Component.ts";
import PageComponent, { PageProps } from "../core/PageComponent.ts";
import { formatPrice } from "../utils/format.ts";
import { navigateTo } from "../utils/router.ts";
import { getStoredProductsCart, ProductCart, storeProductsCart } from "../utils/storeLocalStorage.ts";
interface DetailProductPageState extends State {
  product: ProductDetailDTO;
  isLoading: boolean;
  error: Error | null;

  selectedProducts: ProductCart[];
}
export default class ProductDetailPage extends PageComponent<PageProps, DetailProductPageState> {
  setup() {
    this.setTitle("Product Detail");

    this.state = {
      product: {} as ProductDetailDTO,
      isLoading: true,
      error: null,
      selectedProducts: getStoredProductsCart(),
    };

    this.fetchProduct();
  }

  private async fetchProduct() {
    const { params } = this.props;

    try {
      this.setState({ ...this.state, isLoading: true });
      const product = await productAPI.getProduct(params?.productId!);
      this.setState({ product, isLoading: false });
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
    this.addEvent("change", ".selectedProduct", (event) => {
      const target = event.target as HTMLSelectElement;
      const selectedOptionId = Number(target.value);

      const selectedOption = this.state.product.productOptions.find((option) => option.id === selectedOptionId);
      if (!selectedOption) return;

      const selectedProduct: ProductCart = {
        optionId: selectedOption.id,
        productId: this.state.product.id,
        quantity: 1,
      };

      const isAlreadySelected = this.state.selectedProducts.some((product) => product.optionId === selectedOptionId);
      if (!isAlreadySelected) {
        this.setState({ ...this.state, selectedProducts: [...this.state.selectedProducts, selectedProduct] });
      }
    });

    this.addEvent("change", ".ProductDetail__selectedOptions", (event) => {
      const target = event.target as HTMLInputElement;
      const quantity = Number(target.value);
      if (Number.isNaN(quantity) || quantity < 0) return;
      if (quantity === 0) {
        this.setState({
          ...this.state,
          selectedProducts: this.state.selectedProducts.filter((product) => product.optionId !== Number(target.id)),
        });
      }

      this.setState({
        ...this.state,
        selectedProducts: this.state.selectedProducts.map((product) => ({
          ...product,
          quantity,
        })),
      });
    });

    this.addEvent("click", ".OrderButton", (event) => {
      event.preventDefault();
      storeProductsCart(this.state.selectedProducts);
      const newPath = `/web/cart`;
      navigateTo(newPath);
    });
  }

  template(): string {
    const { product, isLoading, error, selectedProducts } = this.state;
    const { imageUrl, price, productOptions } = product;

    if (isLoading) return "<div>로딩 중...</div>";
    if (error) return `<div>에러 발생: ${error.message}</div>`;

    const total = this.state.selectedProducts.reduce((acc, cur) => {
      const option = this.state.product.productOptions.find((option) => option.id === cur.optionId);
      if (option) {
        return acc + (option.price + product.price) * cur.quantity;
      }
      return acc;
    }, 0);

    return `<div class="ProductDetail">
          <img
            src="${imageUrl}" />
          <div class="ProductDetail__info">
            <h2>${name}</h2>
            <div class="ProductDetail__price"${price}원~</div>
            <select class="selectedProduct">
            <option>선택하세요.</option>
            ${productOptions.map((option) => {
              const stockOff = option.stock === 0 ? "(품절) " : "";
              const isStockOff = option.stock === 0 ? "disabled" : "";

              if (option.price === 0) {
                return `<option ${isStockOff} value="${option.id}">${stockOff}${name} ${option.name}</option>`;
              }

              return `<option ${isStockOff} value="${option.id}">${stockOff}${name} ${option.name} (+${formatPrice(
                option.price
              )}원)</option>`;
            })}
            </select>
            <div class="ProductDetail__selectedOptions">
              <h3>선택된 상품</h3>
              <ul>
              ${selectedProducts.map((selected) => {
                const selectedOption = product.productOptions.find((option) => option.id === selected.optionId);
                if (!selectedOption) return "";

                return `
                  <li >
                   ${name} ${selectedOption.name} (+${selectedOption.price}원)
                   <div><input min="0" id="${selectedOption.id}" type="number" value="${selected.quantity}" />${selected.quantity}개</div>
                 </li>
                 `;
              })}
              </ul>
              <div class="ProductDetail__totalPrice">${formatPrice(total)}원</div>
              <button class="OrderButton">주문하기</button>
            </div>
          </div>
          `;
  }
}
