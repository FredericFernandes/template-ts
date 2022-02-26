import { ModelWatch, ISubscriber, EnumWatchMode } from "../models";
import * as moment from 'moment'

export class MainController implements ISubscriber {

  private htmlBodyClock: HTMLElement = null;
  private htmlDate: HTMLElement = null;
  private htmlDateContainer: HTMLElement = null;
  private htmlBtnMode: HTMLElement = null;
  private htmlBtnIncrease: HTMLElement = null;
  private htmlBtnLight: HTMLElement = null;
  private intervalTimer: NodeJS.Timer;
  private watchModel: ModelWatch = null;

  constructor(idBodyClock: string, idDate: string, dateContainer: string, idBtnMode: string, idBtnIncrease: string, idBtnLight: string,) {
    this.htmlBodyClock = document.getElementById(idBodyClock);
    this.htmlDate = document.getElementById(idDate);
    this.htmlDateContainer = document.getElementById(dateContainer);
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
    if (light) {
      this.htmlDateContainer.classList.add('light')
    }else{
      this.htmlDateContainer.classList.remove('light');
    }
    let time: Date = this.watchModel.getLocalDate();
    let watchMode: EnumWatchMode = this.watchModel.getWatchMode();
    if (watchMode === EnumWatchMode.STANDARD) {
      this.htmlDate.classList.remove('clignote')
    }else{
      this.htmlDate.classList.add('clignote');
    }
    this.htmlDate.innerHTML = this.getPrintableDate(time);
  }

  private getPrintableDate(time: Date): string {
    return moment(time).format("HH:mm:ss");
  }

  private initEvent() {
    this.htmlBtnMode.addEventListener('click', () => {
      this.watchModel.changeMode();
    });

    this.htmlBtnIncrease.addEventListener('click', () => {
      this.watchModel.IncreaseDate();
    });

    this.htmlBtnLight.addEventListener('click', () => {
      this.watchModel.changeLight();
    });

  }


}
