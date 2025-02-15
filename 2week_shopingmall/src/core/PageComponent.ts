import Component, { ComponentProps, State } from "./Component";

export interface RouteParams {
  [key: string]: string;
}

export interface PageProps extends ComponentProps {
  params?: RouteParams;
}

export default class PageComponent<P extends PageProps = PageProps, S extends State = State> extends Component<P, S> {
  protected title: string = "";

  constructor({ $target, props }: { $target: HTMLElement; props: P }) {
    super({ $target, props });

    this.initializePage();
  }

  private initializePage(): void {
    this.resetScroll();
  }

  protected setTitle(title: string): void {
    this.title = title;
    document.title = `APP | ${title}`;
  }

  protected resetScroll(): void {
    window.scroll(0, 0);
  }
}
