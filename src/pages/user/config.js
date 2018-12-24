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
};

export default dataConfig
