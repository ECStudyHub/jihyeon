import UIComponent from "../core/UIComponent.ts";
import { formatPrice } from "../utils/format.ts";

export interface CartProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  productOption: {
    name: string;
    id: number;
  };
}

export default class CartProduct extends UIComponent<CartProductProps> {
  constructor(props: CartProductProps) {
    super(props);
  }

  template(): string {
    const { imageUrl, name, price, quantity, productOption } = this.props;
    return `<li class="Cart__item">
              <img
                src="${imageUrl}" />
              <div class="Cart__itemDesription">
                <div>${name} ${productOption.name} ${quantity}개</div>
                <div>${formatPrice(price)}원</div>
              </div>
            </li>
          `;
  }
}
