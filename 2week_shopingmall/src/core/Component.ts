export interface ComponentProps {
  [key: string]: any;
}

export interface State {
  [key: string]: any;
}

export default class Component<P extends ComponentProps = ComponentProps, S extends State = State> {
  $target: HTMLElement;
  props: P;
  state: S;

  constructor({ $target, props }: { $target: HTMLElement; props: P }) {
    this.$target = $target;
    this.state = {} as S;
    this.props = props;
    this.setup();
    this.setEvent();
    this.render();
  }
  protected setup(): void {}
  protected mounted(): void {}
  public template(): string {
    return "";
  }
  public render(): void {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  public setEvent(): void {}
  public setState(newState: Partial<S>): void {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  public addEvent<K extends keyof HTMLElementEventMap>(
    eventType: K,
    selector: string,
    callback: (event: HTMLElementEventMap[K]) => void
  ) {
    this.$target.addEventListener(eventType, (event) => {
      if (!(event.target instanceof Element)) return;

      const closestElement = event.target.closest(selector);
      if (!closestElement) return;

      callback(event);
    });
  }
}
