var dataConfig = {
  fields: [
    {
      "label": "ID",
      "prop": "id",
      "width": "60px",
      "sortable": "custom",
    },
    {
      "label": "名称",
      "prop": "name",
      "width": "120px",
      "sortable": false,
    },
    {
      "label": "年龄",
      "prop": "age",
      "width": "100px",
      "sortable": false,
    },
    {
      "label": "性别",
      "prop": "sex",
      "width": "100px",
      "sortable": false,
      "formatter": function(row) {
        if(row.sex === 1) {
          return '男'
        } else {
          return '女'
        }
      }
    },
    {
      "label": "地址",
      "prop": "addr",
      "width": "100px",
      "sortable": false,
    },
  ],
  showColumn: ["名称", "年龄", "性别", "地址"],
  // 编辑
  editForm: {
    "id": 1,
    "name": "33",
    "addr": "",
    "age": 0,
    "birth": "",
    "sex": 1,
  },
  editFormRules: {
    name: [
      {required: true, message: '请输入姓名', trigger: 'blur'}
    ],
    age: [
      {required: true, message: '请输入年龄', trigger: 'blur'}
    ],
    sex: [
      {required: true, message: '请输入性别', trigger: 'blur'}
    ],
  },
  editFields: [
    {
      "label": "名称",
      "prop": "name",
      "type": "text",
      "disabled": false,
    },
    {
      "label": "年龄",
      "prop": "age",
      "type": "number",
      "disabled": false,
    },
    {
      "label": "性别",
      "prop": "sex",
      "type": "radio",
      "path": [
        {code: 1, description: '男'},
        {code: 2, description: '女'},
      ],
      "disabled": false,
    },
    {
      "label": "地址",
      "prop": "addr",
      "type": "text",
      "disabled": false,
    },
    {
      "label": "生日",
      "prop": "birth",
      "type": "date",
      "disabled": false,
    },
  ],
};

export default dataConfig
