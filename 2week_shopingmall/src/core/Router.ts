import { State } from "./Component.ts";
import NotFoundPage from "./NotFoundPage.ts";
import PageComponent, { PageProps, RouteParams } from "./PageComponent.ts";

export interface RouterParams {
  [key: string]: string;
}

export interface Route {
  path: string;
  component: typeof PageComponent<PageProps, State>;
  regex: RegExp;
  paramNames: string[];
}

export default class Router {
  private root: HTMLElement;
  private routes: Route[];
  private notFoundPage: typeof PageComponent<PageProps, State>;
  private currentComponent: PageComponent | null = null;
  private basePath: string;

  constructor(root: HTMLElement, notFoundPage: typeof NotFoundPage, basePath: string) {
    this.root = root;
    this.routes = [];
    this.notFoundPage = notFoundPage;
    this.currentComponent = null;
    this.basePath = basePath.replace(/\/$/, "");

    this.initializeRouter();
  }

  private initializeRouter(): void {
    window.addEventListener("popstate", () => this.route());
    window.addEventListener("DOMContentLoaded", () => this.route());

    document.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("[data-link]") as HTMLAnchorElement;

      if (link) {
        event.preventDefault();
        this.navigate(link.href);
      }
    });
  }

  private extraParams(route: Route, path: string): RouteParams {
    const matches = path.match(route.regex);
    if (!matches) return {};

    return route.paramNames.reduce((params, name, index) => {
      params[name] = decodeURIComponent(matches[index + 1]);
      return params;
    }, {} as RouteParams);
  }

  private route() {
    const path = window.location.pathname;

    const routePath = path.slice(this.basePath.length);

    if (this.currentComponent) {
      this.currentComponent = null;
    }

    const normalizedPath = routePath === "" ? "/" : routePath;

    const route = this.routes.find((route) => route.regex.test(normalizedPath));

    if (route) {
      const params = this.extraParams(route, normalizedPath);

      this.currentComponent = new route.component({
        $target: this.root,
        props: { params },
      });
    } else {
      this.currentComponent = new this.notFoundPage({
        $target: this.root,
        props: { params: { path: decodeURIComponent(window.location.href) } },
      });
      console.warn(`Not Found : ${normalizedPath}`);
    }
  }

  public addRoute(path: string, component: typeof PageComponent<PageProps, State>): this {
    const paramNames = (path.match(/:[^/]+/g) || []).map((param) => param.slice(1));
    if (path === "/") {
      this.routes.push({
        path,
        component,
        regex: new RegExp("^/?$"), // 빈 문자열 또는 '/' 만 매칭
        paramNames,
      });
      return this;
    }

    const pattern =
      path
        .replace(/:[^/]+/g, "([^/]+)")
        .replace(/\/$/, "")
        .replace(/^\//, "^/") + "/?$";

    this.routes.push({
      path,
      component,
      regex: new RegExp(pattern),
      paramNames,
    });

    return this;
  }

  public navigate(url: string): void {
    const urlObject = new URL(url, window.location.origin);
    const newPath = `${this.basePath}${urlObject.pathname}`;

    if (window.location.pathname === newPath) return;

    window.history.pushState(null, "", newPath);
    this.route();
  }
}
