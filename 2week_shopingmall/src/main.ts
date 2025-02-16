import "./style.css";
import Router from "./core/Router.ts";
import NotFoundPage from "./core/NotFoundPage.ts";
import ProductListPage from "./pages/ProductListPage.ts";
import ProductDetailPage from "./pages/ProductDetailPage.ts";
import CartPage from "./pages/CartPage.ts";

export const ROUTES = {
  BASE: "/web",
  HOME: "/",
  PRODUCT_DETAIL: "/products/:productId",
  CART: "/cart",
} as const;

const $app = document.querySelector<HTMLDivElement>("#App");
if (!$app) throw new Error("App element not found");

const router = new Router($app, NotFoundPage, ROUTES.BASE);

router
  .addRoute(ROUTES.HOME, ProductListPage)
  .addRoute(ROUTES.PRODUCT_DETAIL, ProductDetailPage)
  .addRoute(ROUTES.CART, CartPage);
