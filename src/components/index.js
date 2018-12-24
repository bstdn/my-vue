import dataTable from '../components/dataTable';
import pagination from '../components/Pagination';

const components = {
  install(Vue) {
    Vue.component('dataTable', dataTable);
    Vue.component('pagination', pagination);
  }
};

export default components
