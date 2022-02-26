export enum EnumWatchMode {
  STANDARD = 0,
  INCREASEHOUR = 1,
  INCREASEMINUTE = 2
}

export interface IPublisher {

  subscribers: ISubscriber[];
  addsubscribers(subscriber: ISubscriber): void;
  removesubscribers(subscriber: ISubscriber): void;
  notifySubscibers(): void
}

export interface ISubscriber {
  update(): void;
}

export class ModelWatch implements IPublisher {

  private watchMode: EnumWatchMode = EnumWatchMode.STANDARD;
  private localDate: Date;
  private intervalTimer: NodeJS.Timer;
  private lightMode: boolean = false;
  subscribers: ISubscriber[];

  public constructor() {
    this.subscribers = [];
  }

  addsubscribers(subscriber: ISubscriber): void {
    this.subscribers.push(subscriber);
  }

  removesubscribers(subscriber: ISubscriber): void {
    throw new Error("Method not implemented.");
  }

  notifySubscibers(): void {
    this.subscribers.forEach((subscriber) => {
      subscriber.update();
    });
  }

  public getWatchMode(): EnumWatchMode {
    return this.watchMode;
  }

  public getLocalDate(): Date {
    return this.localDate;
  }

  public getLightMode(): boolean {
    return this.lightMode;
  }

  public init() {
    console.log("==== Init ModelWatch ====");
    this.localDate = new Date();
    this.initWatcherTime();
  }

  private initWatcherTime() {
    this.intervalTimer = setInterval(() => {
      this.addOneSeconde();
    }, 1000)
  }

  public changeMode() {
    this.watchMode = ++this.watchMode % 3;
    console.log("changeMode(): => ", EnumWatchMode[this.watchMode]);

    if (this.watchMode === EnumWatchMode.INCREASEHOUR || this.watchMode === EnumWatchMode.INCREASEMINUTE) {
      clearInterval(this.intervalTimer);
    } else if (this.watchMode === EnumWatchMode.STANDARD) {
      this.initWatcherTime();
    }
    this.notifySubscibers();
  }

  public IncreaseDate() {
    if (this.watchMode === EnumWatchMode.INCREASEHOUR) {
      this.addOneHour();
    } else if (this.watchMode === EnumWatchMode.INCREASEMINUTE) {
      this.addOneMinute();
    }
  }

  public changeLight() {
    this.lightMode = !this.lightMode;
    this.notifySubscibers();
  }

  private addOneHour() {
    console.log("addOneHour");
    this.localDate.setTime(this.localDate.getTime() + (1 * 60 * 60 * 1000));
    this.notifySubscibers();
  }

  private addOneSeconde() {
    this.localDate.setTime(this.localDate.getTime() + (1000));
    this.notifySubscibers();
  }

  private addOneMinute() {
    console.log("addOneMinute");
    this.localDate.setTime(this.localDate.getTime() + (60 * 1000));
    this.notifySubscibers();
  }

}
