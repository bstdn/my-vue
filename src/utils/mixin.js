let mixin = {
  data() {
    return {
      tableContent: [],
      total: 0,
      selects: [],
      // 编辑界面
      editFormVisible: false,
      editLoading: false,
      // 新增界面
      addFormVisible: false,
      addLoading: false,
      refreshLoading: false,
      pagination: {
        page: 1,
        page_size: 20,
      },
      errorMessage: '系统出错',
      current: 1,
    }
  },
  methods: {
    handleAdd() {
      this.addFormVisible = true;
    },
  }
};

export default mixin
