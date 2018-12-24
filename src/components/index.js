import dataTable from '../components/dataTable';
import pagination from '../components/Pagination';
import dataForm from '../components/dataForm';
import filterBar from '../components/filterBar';

const components = {
  install(Vue) {
    Vue.component('dataTable', dataTable);
    Vue.component('pagination', pagination);
    Vue.component('dataForm', dataForm);
    Vue.component('filterBar', filterBar);
  }
};

export default components
