import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { 
  Form, 
  FormItem, 
  Col, 
  DatePicker, 
  TimePicker, 
  Container, 
  Header, 
  Main,
  Menu,
  MenuItem,
  Input,
  Table,
  TableColumn,
  InputNumber,
  Dialog,
  Button,
  Card,
  Row,
  Divider,
  Descriptions,
  DescriptionsItem
} from 'element-ui';

import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.config.productionTip = false

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(InputNumber);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Card);
Vue.use(Row);
Vue.use(Divider);
Vue.use(Descriptions);
Vue.use(DescriptionsItem);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
