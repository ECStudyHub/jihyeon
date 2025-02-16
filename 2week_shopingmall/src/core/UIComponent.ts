import { ComponentProps } from "./Component";

export default class UIComponent<P extends ComponentProps = ComponentProps> {
  protected props: P;

  constructor(props: P) {
    this.props = props;
    this.setup();
    this.setEvent();
  }

  protected setup(): void {}

  protected template(): string {
    return "";
  }
  public setEvent(): void {}

  public render(): string {
    return this.template();
  }

  public addEvent<K extends keyof HTMLElementEventMap>(
    eventType: K,
    selector: string,
    callback: (event: HTMLElementEventMap[K]) => void
  ) {
    document.addEventListener(eventType, (event) => {
      if (!(event.target instanceof Element)) return;

      const closestElement = event.target.closest(selector);
      if (!closestElement) return;

      callback(event);
    });
  }
}
