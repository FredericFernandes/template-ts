import { ModelWatch, ISubscriber } from "../models";
import * as moment from 'moment'

export class MainController implements ISubscriber {

  private htmlBodyClock: HTMLElement = null;
  private htmlDate: HTMLElement = null;
  private htmlBtnMode: HTMLElement = null;
  private htmlBtnIncrease: HTMLElement = null;
  private htmlBtnLight: HTMLElement = null;
  private intervalTimer: NodeJS.Timer;
  private watchModel: ModelWatch = null;

  constructor(idBodyClock: string, idDate: string, idBtnMode: string, idBtnIncrease: string, idBtnLight: string,) {
    this.htmlBodyClock = document.getElementById(idBodyClock);
    this.htmlDate = document.getElementById(idDate);
    this.htmlBtnMode = document.getElementById(idBtnMode);
    this.htmlBtnIncrease = document.getElementById(idBtnIncrease);
    this.htmlBtnLight = document.getElementById(idBtnLight);
    this.initEvent();

    this.watchModel = new ModelWatch();
    this.watchModel.addsubscribers(this);
    this.watchModel.init();
  }

  public update(): void {
    let light: boolean = this.watchModel.getLightMode();
    let time: Date = this.watchModel.getLocalDate();
    this.htmlDate.innerHTML = this.getPrintableDate(time);
    console.log("Time: ", this.getPrintableDate(time));
  }

  private getPrintableDate(time: Date): string {
    return moment(time).format("HH:mm:ss");
  }

  private initEvent() {
    this.htmlBtnMode.addEventListener('click', () => {
      console.log("click Mode");
      this.watchModel.changeMode();
    });

    this.htmlBtnIncrease.addEventListener('click', () => {
      console.log("click Increase");
      this.watchModel.IncreaseDate();
    });

    this.htmlBtnLight.addEventListener('click', () => {
      console.log("click Light");
      this.watchModel.changeLight();
    });

  }


}
