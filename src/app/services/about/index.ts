import Service from '../service';
import { WebSender } from '../../sender';
import {names} from '../names';
import { marketType } from '../../../io/types';
import {events} from '../../../events';
import { GetPage } from '../../../io/request';
import { BaseResponse } from '../../../io/response/response';
import { connector } from '../../../constants';


class About extends Service {
  private sender: WebSender = null;
  constructor(sender, store) {
    super(names.services.ABOUT);
    this.sender = sender;
    this.initListeners();
    this.initApiListeners();
    // this.sender.send(new GetAbout('61279456', '33502073'), (response: Array<marketType>) => {
    //   this.publishEvent(events.about.DRAW_ABOUT_CONTENT, response);
    // });
  }

  private initListeners() {

  }

  private initApiListeners() {

  }
}

export default function startAboutService(sender, store) {
  return new About(sender, store);
}
