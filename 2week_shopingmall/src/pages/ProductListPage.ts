import { State } from "../core/Component.ts";
import PageComponent, { PageProps } from "../core/PageComponent.ts";

export default class ProductListPage extends PageComponent<PageProps, State> {
  setup() {
    this.setTitle("Product List");
  }

  template(): string {
    return `<div class="ProductListPage">
        <h1>상품목록</h1>
        <ul>
          <li class="Product">
            <img
              src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png" />
            <div class="Product__info">
              <div>커피잔</div>
              <div>10,000원~</div>
            </div>
          </li>
          <li class="Product">
            <img
              src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png" />
            <div class="Product__info">
              <div>커피잔</div>
              <div>10,000원~</div>
            </div>
          </li>
          <li class="Product">
            <img
              src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png" />
            <div class="Product__info">
              <div>커피잔</div>
              <div>10,000원~</div>
            </div>
          </li>
          <li class="Product">
            <img
              src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png" />
            <div class="Product__info">
              <div>커피잔</div>
              <div>10,000원~</div>
            </div>
          </li>
          <li class="Product">
            <img
              src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png" />
            <div class="Product__info">
              <div>커피잔</div>
              <div>10,000원~</div>
            </div>
          </li>
          <li class="Product">
            <img
              src="https://grepp-cloudfront.s3.ap-northeast-2.amazonaws.com/programmers_imgs/assignment_image/cafe_coffee_cup.png" />
            <div class="Product__info">
              <div>커피잔</div>
              <div>10,000원~</div>
            </div>
          </li>
        </ul>
      </div>`;
  }
}
