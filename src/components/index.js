import dataTable from '../components/dataTable';
import pagination from '../components/Pagination';
import dataForm from '../components/dataForm';

const components = {
  install(Vue) {
    Vue.component('dataTable', dataTable);
    Vue.component('pagination', pagination);
    Vue.component('dataForm', dataForm);
  }
};

export default components
