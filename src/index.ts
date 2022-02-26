import './index.css';
import { ModelWatch } from './models';
import { MainController } from './controllers';


const controller = new MainController("bodyClock", "dateViewer", "btnMode", "btnIncrease", "btnLight");
const watch = new ModelWatch();

