import PageComponent from "./PageComponent.ts";

export default class NotFoundPage extends PageComponent {
  setup() {
    this.setTitle("404 - Page Not Found");
  }

  template() {
    const { path } = this.props.params || {};
    return `
              <div>
                  <h1>404</h1>
                  <p>요청하신 페이지를 찾을 수 없습니다.(path : ${path})</p>
                  <a href="/" data-link>홈으로 가기</a>
              </div>
          `;
  }
}
