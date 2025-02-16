import UIComponent from "../core/UIComponent.ts";
import { formatPrice } from "../utils/format.ts";
import { navigateTo } from "../utils/router.ts";

export interface DetailProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  productOptions: Array<{
    id: number;
    name: string;
    price: number;
    stock: number;
  }>;
}

export default class DetailProduct extends UIComponent<DetailProductProps> {
  constructor(props: DetailProductProps) {
    super(props);
  }

  public setEvent(): void {
    this.addEvent("click", ".OrderButton", (event) => {
      event.preventDefault();
      const newPath = `/web/cart`;
      navigateTo(newPath);
    });
  }

  template(): string {
    const { imageUrl, name, price, productOptions } = this.props;
    return `<div class="ProductDetail">
          <img
            src="${imageUrl}" />
          <div class="ProductDetail__info">
            <h2>${name}</h2>
            <div class="ProductDetail__price"${price}원~</div>
            <select>
            <option>선택하세요.</option>
            ${productOptions.map((option) => {
              if (option.price === 0) {
                return `<option>${name} ${option.name}</option>`;
              }
              if (option.stock > 0) {
                return `<option>${name} ${option.name} (+${formatPrice(option.price)}원)</option>`;
              } else {
                return `<option disabled >(품절) ${name} ${option.name}</option>`;
              }
            })}
            </select>
            <div class="ProductDetail__selectedOptions">
              <h3>선택된 상품</h3>
              <ul>
                <li>
                  커피잔 100개 번들 10,000원
                  <div><input type="number" value="10" />개</div>
                </li>
                <li>
                  커피잔 1000개 번들 15,000원
                  <div><input type="number" value="5" />개</div>
                </li>
              </ul>
              <div class="ProductDetail__totalPrice">175,000원</div>
              <button class="OrderButton">주문하기</button>
            </div>
          `;
  }
}
