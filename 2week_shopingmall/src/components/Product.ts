import UIComponent from "../core/UIComponent.ts";
import { formatPrice } from "../utils/format.ts";
import { navigateTo } from "../utils/router.ts";

export interface ProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export default class Product extends UIComponent<ProductProps> {
  constructor(props: ProductProps) {
    super(props);
  }

  template(): string {
    const { imageUrl, name, price, id } = this.props;
    return `<li class="Product" id="${id}" >
            <img src="${imageUrl}" alt="${name}" />
            <div class="Product__info">
              <div>${name}</div>
              <div>${formatPrice(price)}원~</div>
            </div>
          </li>
          `;
  }
}
