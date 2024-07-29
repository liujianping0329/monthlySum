let currentDate = new Date();
let formattedDate = $.datepicker.formatDate("yy-mm-dd", currentDate);

let dialogConfig = {
    autoOpen: false,
    modal: true,
    closeOnEscape: true, // 支持按下 Esc 键关闭对话框
    width: "auto", // 设置宽度为自动
    height: "auto",     // 设置高度为自动
};

$(document).ready(function() {
    let mainTable = $('#mainTable').DataTable({
        "searching": false,
        "ajax": {
            "url": "/api/v2/monthInfo/search", // Replace with your data source URL
            "type": "POST",
            "contentType": "application/json",
            "data": function(d) {
                // d.monthStart = ""; // 添加你需要的参数
                // return d;
                let reqData = {
                    monthStart: $("#monthStart").val(),
                    monthEnd: $("#monthEnd").val()
                };
                return JSON.stringify(reqData);
            },
        },
        "columns": [
            {"data": "id"},
            {"data": "month"},
            {"data": "jpMoney"},
            {"data": "cnMoney"},
            {"data": "rate"},
            {"data": "sum"},
            {"data": "increase"},
            {
                "data": null,
                "defaultContent":$("#hiddenData #tableOperations").html()
            }
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
                text: '新增',
                action: function ( e, dt, node, config ) {
                    // 自定义按钮的点击事件处理逻辑
                    $("#dialog").dialog("open");
                }
            },
            {
                text: '筛选',
                attr: {
                    id: 'dataFilterBtn' // 自定义ID
                },
                action: function ( e, dt, node, config ) {
                    mainTable.ajax.reload(); // 刷新表格数据
                }
            },
            {
                text: '生成图表',
                action: function ( e, dt, node, config ) {
                    $("#dialogChart").dialog("open");
                    $( "#dialogChart fieldset input" ).eq(0).click(); // 默认显示月度图表
                }
            }
        ],
        "initComplete": function() {
            $("#dataFilterBtn").before($("#hiddenData #tableDateFilter").html());
            $("#hiddenData #tableDateFilter").remove();
        },
        "order": [] // 添加这行，确保没有默认排序
    });

    $("#dialog").dialog({
        ...dialogConfig,
        open: function() {
            $(this).find(".month").val(formattedDate);
            $(this).find(".datepicker-div").datepicker("setDate", currentDate);
            $.getJSON('/api/v2/rate',{}, response => {
                $(this).find("#rate").text(response.data);
            });
        },
        buttons: {
            Ok: function() {
                $.postJSON('/api/v2/monthInfo/upsert',
                    {
                        "month": $(this).find(".month").val(),
                        "jpMoney": $(this).find("#jpy").val(),
                        "cnMoney": $(this).find("#cny").val(),
                        "rate": $(this).find("#rate").text()
                    }, response => {
                        mainTable.ajax.reload(); // 刷新表格数据
                        $(this).find("input").val(""); // 清空输入框内容
                        $(this).dialog("close");
                });
            }
        }
    });

    $("#dialogUpdate").dialog({
        ...dialogConfig,
        buttons: {
        Ok: function() {
            $.postJSON('/api/v2/monthInfo/upsert',
                {
                    "id": $(this).find("#id").val(),
                    "month": $(this).find(".month").val(),
                    "jpMoney": $(this).find("#jpy").val(),
                    "cnMoney": $(this).find("#cny").val()
                }, response => {
                    mainTable.ajax.reload(); // 刷新表格数据
                    $(this).find("input").val(""); // 清空输入框内容
                    $(this).dialog("close");
                });
        }
    }
    });

    $(".dialog .datepicker-div").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        onSelect: function(dateText) {
            $(this).parents(".dialog").find(".month").val(dateText); // 将选择的日期反映到输入框上
        }
    });

    // 绑定修改按钮的点击事件
    $('#mainTable').on('click', '.edit', function() {
        let data = mainTable.row($(this).closest('tr')).data();
        // 在这里添加修改按钮的点击事件处理逻辑
        console.log("修改记录：", data);

        $("#dialogUpdate").dialog("open");
        $("#dialogUpdate").find("#month").val(data.month);
        $("#dialogUpdate .datepicker-div").datepicker("setDate", data.month);

        $("#dialogUpdate").find("#jpy").val(data.jpMoney);
        $("#dialogUpdate").find("#cny").val(data.cnMoney);
        $("#dialogUpdate").find("#rate").text(data.rate);

        $("#dialogUpdate").find("#id").val(data.id);
    });

    $( "#dialogChart fieldset input" ).checkboxradio();
    $( "#dialogChart fieldset" ).controlgroup();
    let myChart = echarts.init($("#chart").get(0));

    $("#dialogChart").dialog({
        ...dialogConfig,
        buttons: {
            Ok: function() {
                $(this).dialog("close");
            }
        }
    });

    $('#dialogChart fieldset').on('click', 'input', function() {
        let chartType = $(this).attr("id");
        let chartData = [];
         if(chartType === "radio-1") {
             chartData = $.map(mainTable.data(),(item,index)=>item.sum).reverse();
         } else {
             chartData = $.map(mainTable.data(),(item,index)=>item.increase).reverse();
             chartData[0] = 0; // 第一个月的增长率为 0
         }
        let yConfig = {
            min: Math.floor(Math.min(...chartData)-10),
            max: Math.floor(Math.max(...chartData)+10)
        };
        yConfig.interval = Math.floor((yConfig.max - yConfig.min) / 5);
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: $(this).prev("label").text()
            },
            tooltip: {},
            xAxis: {
                data: $.map(mainTable.data(),(item,index)=>item.month).reverse(),
                axisLabel: {
                    interval: 0, // 强制显示所有标签
                    rotate: 45   // 如果标签因长度问题重叠，可以考虑旋转标签
                }
            },
            yAxis: yConfig,
            series: [{
                name: '金额',
                type: 'bar',
                data: chartData,
                label: {
                    show: true, // 显示每个柱上的数字
                    position: 'top' // 数字显示在柱的顶部
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    });
});