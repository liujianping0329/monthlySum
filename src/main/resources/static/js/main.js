$(document).ready(function() {
    $('#mainTable').DataTable({
        "ajax": {
            "url": "/api/v2/monthInfo/search", // Replace with your data source URL
            "type": "POST",
            "contentType": "application/json",
            "data": function(d) {
                // d.monthStart = ""; // 添加你需要的参数
                // return d;
                return JSON.stringify(d);
            },
        },
        "columns": [
            {"data": "id"},
            {"data": "month"},
            {"data": "jpMoney"},
            {"data": "cnMoney"},
            {"data": "rate"},
            {"data": "sum"}
        ],
        "columnDefs": [
            {
                "targets": [0], // 隐藏第一列（索引为 0）
                "visible": false
            }
        ],
        "dom": 'Bfrtip', // 定义表格布局，B 表示按钮
        "buttons": [
            {
                text: 'Custom Button',
                action: function ( e, dt, node, config ) {
                    // 自定义按钮的点击事件处理逻辑
                    alert('Custom Button Clicked!');
                }
            }
        ]
    });
});