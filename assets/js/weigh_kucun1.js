function getDetails(res) {
  layer.open({
    title: ['图片详情'],
    type: 2,
    btn: ['关闭'],
    area: ['70%', '90%'],
    content: ['Img.html?code=' + res],
  });
}
$(function() {
  if (projectName === 'cangzhou') {
    $('#bdgl').text('磅单管理');
    $('#sdpc').hide();
    $('#yckc').hide();
    $('#lcgl').hide();
  }
  bindVideo();
});
var zhandian = '';
var dataList = [];
var yclList = [];

function bindVideo() {
  var zd = localStorage.getItem('station');
  var v1 = '';
  var v2 = '';
  switch (zd) {
    case '璧山站':
      v1 =
        'http://183.230.164.56:10810/play.html?channel=5&device=6984714942377&iframe=yes&aspect=300x240';
      v2 =
        'http://183.230.164.56:10810/play.html?channel=6&device=6984714942377&iframe=yes&aspect=300x240';
      break;
    case '双石站':
      v1 =
        'http://183.230.164.56:10810/play.html?channel=4&device=691810908353&iframe=yes&aspect=300x240';
      v2 =
        'http://183.230.164.56:10810/play.html?channel=4&device=691810908353&iframe=yes&aspect=300x240';
      break;
    case '两江站':
      v1 =
        'http://183.230.164.56:10810/play.html?channel=3&device=6984714942378&iframe=yes&aspect=300x240';
      v2 =
        'http://183.230.164.56:10810/play.html?channel=10&device=6984714942378&iframe=yes&aspect=300x240';
      break;
    case '朱沱站':
      v1 =
        'http://183.230.164.56:10810/play.html?channel=5&device=691810908354&iframe=yes&aspect=300x240';
      v2 =
        'http://183.230.164.56:10810/play.html?channel=6&device=6984714942377&iframe=yes&aspect=300x240';
      break;
  }
  $('#v1').attr('src', v1);
  $('#v2').attr('src', v2);
}

var iframeW = $('#v1').width();
$('#v1').attr('height', (iframeW / 300) * 240 + 5 + 'px');
$('#v2').attr('height', (iframeW / 300) * 240 + 5 + 'px');

var zd = localStorage.getItem('station');
console.log(zd);
layui.use(
  ['layer', 'form', 'table', 'util', 'admin', 'laydate'],
  function() {
    var table = layui.table;
    var multiSelect = layui.multiSelect;
    var form = layui.form;
    var type = 1;
    var data;
    var xData = [],
      yData = [];
    var min = 50;
    var result = JSON.parse(
      '{"errno":0,"error":"","num":0,"obj":null,"list":[{"name":"石灰石0-5","value":4390.63},{"name":"石灰石5-10","value":6433.85},{"name":"石灰石10-15","value":4122.94},{"name":"石灰石20-30","value":10585.55},{"name":"花岗石10-15","value":1926.02},{"name":"花岗石5-10","value":871.92},{"name":"玄武岩5-10","value":11303.32},{"name":"玄武岩10-15","value":27853.29},{"name":"矿粉","value":179.03},{"name":"回收料","value":22029.35},{"name":"沥青70号","value":2929.17},{"name":"改性沥青","value":0},{"name":"回收粉","value":5846.95},{"name":"SBS沥青","value":63.17}]}'
    );
    data = [];
    $.ajax({
      type: 'get',
      url: getServerUrl(zd) + '/api/data/getKuCun',
      success: function(res) {
        for (let item in res.data) {
          data.push({
            name: item,
            value: res.data[item],
          });
        }
        initChart();
      },
    });
    // 物料类型-下拉框
    // var wlOptions = '<option value="">-请选择-</option>';
    // $.ajax({
    // 	type: 'get',
    // 	url: getServerUrl(zd) + '/api/data/ajaxShipmentType',
    // 	success: function (res) {
    // 		res.list.map(val => {
    // 			wlOptions += `<option value="${val}">${val}</option>`
    // 		})
    // 		$('.wlselect').html(wlOptions);
    // 		form.render('select');
    // 	}
    // })
    // 顶部柱状图
    function initChart() {
      data.map(function(a, b) {
        xData.push(a.name);
        if (a.value === 0) {
          yData.push(a.value + 0);
        } else {
          yData.push(a.value);
        }
      });

      var sourceBar = {
        itemData: xData,
        seriesData: yData,
      };
      var itemData = sourceBar.itemData;
      var seriesData = sourceBar.seriesData;
      var tooltip = sourceBar.tooltip;
      // var backgroundList = ['#0068b7', '#8c97cb', '#aa89bd', '#f6b37f', '#e27e34'];
      var color = [
        '#00b9f6',
        '#38a97d',
        '#004eff',
        '#17c7e7',
        '#4e85ea',
        '#e49be9',
        '#078d9d',
        '#eca52a',
        '#ef9544',
        '#ea3b3b',
      ];

      var data2 = {};
      for (var k in itemData) {
        data2[itemData[k]] = seriesData[k];
      }

      var xAxisData = [];
      var dataArr = [];
      for (var i in data2) {
        xAxisData.push(i);
        dataArr.push(data2[i]);
      }

      option = {
        backgroundColor: '#142058',
        grid: {
          top: '25%',
          left: '1.5%',
          right: '10%',
          bottom: '8%',
          containLabel: true,
        },
        tooltip: {
          show: 'true',
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            shadowStyle: {
              color: 'rgba(112,112,112,0)',
            },
          },
          formatter: function(index) {
            var unit = index[0].name.substring(
              index[0].name.indexOf('(') + 1,
              index[0].name.indexOf(')')
            );
            return index[0].name + '：' + index[0].value + '吨';
          },
          backgroundColor: 'rgba(0,0,0,0.7)', // 背景
          padding: [8, 10], //内边距
          extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
        },
        xAxis: [
          {
            show: true,
            name: '来源',
            nameTextStyle: {
              fontSize: 14,
              fontFamily: 'Microsoft YaHei',
              color: '#fff',
            },
            type: 'category',
            nameLocation: 'end',
            nameGap: 8,
            axisLabel: {
              fontSize: 10,
              fontFamily: 'Microsoft YaHei',
              color: '#fff',
              interval: 0,
              margin: 16,
              formatter: function(index) {
                if (index.length > 6) {
                  index = index.substr(0, 6) + '...';
                } else {
                  index = index;
                }
                return index;
              },
            },
            axisLine: {
              show: true,
              symbol: ['none', 'arrow'],
              lineStyle: {
                color: '#05edfc',
              },
            },
            data: xAxisData,
          },
          {
            type: 'category',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            data: xAxisData,
          },
          {
            type: 'category',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            data: xAxisData,
          },
        ],
        yAxis: {
          type: 'value',
          name: '总量',
          nameTextStyle: {
            fontSize: 14,
            fontFamily: 'Microsoft YaHei',
            color: '#fff',
          },
          minInterval: 1,
          nameLocation: 'end',
          nameGap: 10,
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            fontSize: 12,
            fontFamily: 'Arial',
            color: '#fff',
          },
          axisLine: {
            show: true,
            symbol: ['none', 'arrow'],
            lineStyle: {
              color: '#05edfc',
            },
          },
        },
        series: [
          {
            type: 'bar',
            stack: 1,
            xAxisIndex: 0,
            barWidth: 5,
            barGap: 5,
            z: 2,
            data: (function() {
              var itemArr = [];
              for (var i = 1; i < dataArr.length + 1; i++) {
                var item = {
                  value: dataArr[i - 1],
                  itemStyle: {
                    normal: {
                      barBorderRadius: 50,
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: color[translateColor(i) * 2 - 2],
                          },
                          {
                            offset: 1,
                            color: color[translateColor(i) * 2 - 1],
                          },
                        ]
                      ),
                    },
                  },
                };
                itemArr.push(item);
              }
              return itemArr;
            })(),
          },
          {
            type: 'scatter',
            stack: 1,
            symbolOffset: [0, 0], //相对于原本位置的偏移量
            label: {
              normal: {
                show: false,
              },
            },
            xAxisIndex: 2,
            symbolSize: 10,
            z: 2,
            data: (function() {
              var itemArr = [];
              for (var i = 1; i < dataArr.length + 1; i++) {
                var item = {
                  value: 0,
                  itemStyle: {
                    normal: {
                      borderColor: '#fff',
                      borderWidth: 2,
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: color[translateColor(i) * 2 - 2],
                          },
                          {
                            offset: 1,
                            color: color[translateColor(i) * 2 - 1],
                          },
                        ]
                      ),
                    },
                  },
                };
                itemArr.push(item);
              }
              return itemArr;
            })(),
          },
          {
            type: 'bar',
            xAxisIndex: 1,
            barGap: '140%',
            data: dataArr,
            barWidth: 12,
            itemStyle: {
              normal: {
                barBorderRadius: 50,
                color: '#0e2147',
              },
            },
            z: 1,
          },
          {
            type: 'bar',
            xAxisIndex: 2,
            barWidth: 20,
            barGap: 1,
            z: 0,
            data: (function() {
              var itemArr = [];
              for (var i = 1; i < dataArr.length + 1; i++) {
                var item = {
                  value: dataArr[i - 1],
                  itemStyle: {
                    normal: {
                      barBorderRadius: 50,
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: color[translateColor(i) * 2 - 2],
                          },
                          {
                            offset: 1,
                            color: color[translateColor(i) * 2 - 1],
                          },
                        ]
                      ),
                    },
                  },
                };
                itemArr.push(item);
              }
              return itemArr;
            })(),
          },
          {
            type: 'scatter',
            hoverAnimation: false,
            xAxisIndex: 2,
            symbolOffset: [0, 0], //相对于原本位置的偏移量
            symbolSize: 18,
            z: 2,
            data: (function() {
              var itemArr = [];
              for (var i = 1; i < dataArr.length + 1; i++) {
                var item = {
                  value: 0,
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                          {
                            offset: 0,
                            color: color[translateColor(i) * 2 - 2],
                          },
                          {
                            offset: 1,
                            color: color[translateColor(i) * 2 - 1],
                          },
                        ]
                      ),
                    },
                  },
                };
                itemArr.push(item);
              }
              return itemArr;
            })(),
          },
        ],
      };

      function translateColor(index) {
        if (index > 5) {
          return translateColor(index - 5);
        }
        return index;
      }
    }
    initTimeToolOther('bd');
    bindkucunVideo();

    function initTimeToolOther(type) {
      var html = `
      <div class="time">
      <div name="radio_bd" class="qdk qdkaction">当日</div>
      <div name="radio_bd" class="qdk">本周</div>
      <div name="radio_bd" class="qdk">本月</div>
      </div>
      <div class="duration">
      <div class="wrapper">
      <input type="text" id="bdstartTime" readonly="readonly" class="mytime" style="margin-left: 13px;" placeholder="开始日期" />
      </div>
      <div class="fgx">-</div>
      <div class="wrapper">
      <input type="text" id="bdendTime" readonly="readonly" class="mytime" style="margin-left: 4px;" placeholder="结束日期" />
      </div>
      </div>
      <input type="button" value="确认" id="btn_time_3" class="subbtn" />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <div class="inline-block wl-type" id="selWlType">
        <!--<div class="querytxt2">物料类型：</div>-->
        <div id="demo1"></div>
      </div>
      
      <div class="inline-block bd-type cover-bd-type">
        <div class="querytxt">榜单类型：</div>
        <select id="bdtype" class="myselect">
          <option value="">-请选择-</option>
          <option value="销售发货">销售发货</option>
          <option value="采购收货">采购收货</option>
          <option value="作废">作废</option>
        </select>
      </div>
      <div style="clear: both;">
      </div>`;
      $('.querydiv').html(html);

      // 榜单时间选择
      layui.use('laydate', function() {
        var laydate = layui.laydate;
        laydate.render({
          elem: '#bdstartTime',
        });

        laydate.render({
          elem: '#bdendTime',
        });
      });
      $('#bdstartTime').val(showToDay());
      $('#bdendTime').val(showToDay());
      $('#btn_time_3').click(function() {
        params = {
          beginDate: $('#bdstartTime').val(),
          endDate: $('#bdendTime').val(),
          type: $('#bdtype').val(),
          param: $('#wltype').val(),
        };
        if (type === 'bd') {
          initTableRank(params);
        } else if (type === 'rk') {
          initTableRuku(params);
        } else if (type === 'ck') {
          initTableChuku(params);
        } else if (type === 'yc') {
          initTableYuancai(params);
        } else if (type === 'lc') {
          initTableLiaocang(params);
        }
      });

      $('#bdtype').on('change', function() {
        params = {
          beginDate: $('#bdstartTime').val(),
          endDate: $('#bdendTime').val(),
          type: $('#bdtype').val(),
          param: $('#wltype').val(),
        };
        if (type === 'bd') {
          initTableRank(params);
        } else if (type === 'rk') {
          initTableRuku(params);
        } else if (type === 'ck') {
          initTableChuku(params);
        } else if (type === 'yc') {
          initTableYuancai(params);
        } else if (type === 'lc') {
          initTableLiaocang(params);
        }
      });
      // $("#wltype").on("change", function() {
      // 	params = {
      // 		beginDate: $('#bdstartTime').val(),
      // 		endDate: $('#bdendTime').val(),
      // 		type: $("#bdtype").val(),
      // 		param: $("#wltype").val()
      // 	}
      // 	if (type === 'bd') {
      // 		initTableRank(params);
      // 	} else if (type === 'rk') {
      // 		initTableRuku(params);
      // 	} else if (type === 'yc') {
      // 		initTableYuancai(params);
      // 	} else if (type === 'lc') {
      // 		initTableLiaocang(params)
      // 	}
      // });

      $("[name='radio_bd']").on('click', function() {
        var beginDate;
        var endDate;

        $("[name='radio_bd']").removeClass('qdkaction');
        $(this).addClass('qdkaction');

        if ($(this).text() == '当日') {
          beginDate = showToDay();
          endDate = showToDay();
        } else if ($(this).text() == '本周') {
          beginDate = showWeekFirstDay();
          endDate = showWeekLastDay();
        } else if ($(this).text() == '本月') {
          beginDate = showMonthFirstDay();
          endDate = showMonthLastDay();
        }
        $('#bdstartTime').val(beginDate);
        $('#bdendTime').val(endDate);
        var params = {
          beginDate: beginDate,
          endDate: endDate,
          type: $('#bdtype').val(),
          param: $('#wltype').val(),
        };
        if (type === 'bd') {
          initTableRank(params);
        } else if (type === 'rk') {
          initTableRuku(params);
        } else if (type === 'ck') {
          initTableChuku(params);
        } else if (type === 'yc') {
          initTableYuancai(params);
        } else if (type === 'lc') {
          initTableLiaocang(params);
        }
      });
    }
    var index = {
      beginDate: showToDay(),
      endDate: showToDay(),
    };
    $('#kucun_bottom').addClass('kucun_bottom');
    initTableRank(index);
    $('#selWlType').hide();
    $('.xxk').on('click', function() {
      var data = $(this).attr('data');
      $('.xxk').removeClass('xxk_action');
      $(this).addClass('xxk_action');
      if (data === 'bd') {
        initTableRank();

        initTimeToolOther(data);
        $('#kucun_bottom').addClass('kucun_bottom');
        bindkucunVideo();
        $('.bd-type').show();
        $('.wl-type').show();
        $('#selWlType').hide();
        $('.querydiv').show();
        // $('.wlselect').html(wlOptions);
        form.render('select');
      } else if (data === 'rk') {
        removeVideo();
        initTimeToolOther(data);
        initTableRuku();
        $('.bd-type').hide();
        $('.wl-type').hide();
        //$('#selWlType').show();
        $('.querydiv').show();
      } else if (data === 'ck') {
        removeVideo();
        initTimeToolOther(data);
        initTableChuku();
        $('.bd-type').hide();
        $('.wl-type').hide();
        $('.querydiv').show();
      } else if (data === 'pc') {
        removeVideo();
        initTimeToolPancun();
        $('.bd-type').hide();
        $('.wl-type').hide();
        $('.querydiv').show();
      } else if (data === 'yc') {
        removeVideo();
        initTimeToolOther(data);
        $('.bd-type').hide();
        $('.wl-type').hide();
        $('.querydiv').show();
        // var index = layer.msg('数据请求中...');
        table.render({
          style: 'mytabletextsize',
          elem: '#tb_ele',
          data: [],
          cols: [
            [
              {
                field: 'name',
                title: '材料类型',
                align: 'center',
              },
              {
                field: 'lilun_value',
                title: '上月盘存',
                align: 'center',
              },
              {
                field: 'value',
                title: '实际库存',
                align: 'center',
              },
            ],
          ],
          toolbar: true,
        });
        setTimeout(() => {
          initTableYuancai(index);
        }, 100);
      } else if (data === 'lc') {
        removeVideo();
        initTimeToolOther();
        initTableLiaocang();
        $('.bd-type').hide();
        $('.wl-type').hide();
        $('.querydiv').hide();
      }
    });

    function removeVideo() {
      $('#kucun_bottom').removeClass('kucun_bottom');
      $('#kucun_bottom .video-container').remove();
    }
    // table-榜单管理
    function initTableRank(params) {
      var index = layer.msg('数据请求中...');

      //根据请求类型 更换url
      table.render({
        style: 'mytabletextsize',
        elem: '#tb_ele',
        url: getServerUrl(zd) + '/api/data/ajaxShipmentList',
        // data: [],
        cols: [
          [
            {
              field: 'gbdh',
              title: '磅单号',
            },
            {
              field: 'ccsj',
              title: '称重时间',
            },
            {
              field: 'scsj',
              title: '生成时间',
            },
            {
              field: 'jz',
              title: '净重（吨）',
            },
            {
              field: 'wlmc',
              title: '物料名称',
            },
            {
              field: 'wlwz',
              title: '物料位置',
            },
            // {
            //   field: 'wl',
            //   title: '物料类型',
            // },
            {
              field: 'cph',
              title: '车牌号',
            },
            {
              field: 'xm',
              title: '工程名称',
            },
            {
              field: 'gys',
              title: '供应商',
            },
            {
              field: 'scgc',
              title: '生产工厂',
            },
            {
              field: 'gbsb',
              title: '过磅设备',
            },
            {
              field: 'gbfs',
              title: '过磅方式',
            },
            // {
            //   field: 'wldw',
            //   title: '物料单位',
            // },
            // {
            //   field: 'bdzt',
            //   title: '运输状态',
            // },
            {
              align: 'center',
              toolbar: '#tableBarProject',
              title: '操作',
              minWidth: 160,
              fixed: 'right',
            },
          ],
        ],
        page: true,
        toolbar: true,
        limit: 10,
        where: params,
        request: {
          pageName: 'page', //页码的参数名称，默认：page
          limitName: 'pageSize', //每页数据量的参数名，默认：limit
        },
        response: {
          statusName: 'errno', //数据状态的字段名称，默认：code
          statusCode: 0, //成功的状态码，默认：0
          msgName: 'error', //状态信息的字段名称，默认：msg
          countName: 'num', //数据总数的字段名称，默认：count
          dataName: 'list', //数据列表的字段名称，默认：data
        },
        done: function(res) {
          //返回数据执行回调函数
          layer.close(index); //返回数据关闭loading
        },
      });
    }
    let selectMoreType = '';
    let selectMoreType1 = '';
    // table-入库日志
    function initTableRuku(params) {
      //$('.querydiv').hide();
      var index = layer.msg('数据请求中...');
      let typesList = [],
        types = '';
      if (selectMoreType) {
        typesList = selectMoreType.getValue() || [];
        if (typesList.length > 0) {
          typesList.forEach((item) => {
            types += `${item.value},`;
          });
        }
        types = types.substring(0, types.length - 1);
      }
      if (params) {
        params['bgTime'] = params['beginDate'];
        params['endTime'] = params['endDate'];
        params['type'] = types;
      }
      var params = params || {
        bgTime: showToDay(),
        endTime: showToDay(),
      };
      //根据请求类型 更换url
      table.render({
        style: 'mytabletextsize',
        elem: '#tb_ele',
        url: getServerUrl(zd) + '/api/data/ajaxPutLogList',
        cellMinWidth: 80, //全局定义常规单元格的最小宽度
        cols: [
          [
            {
              field: 'wl',
              title: '材料类型',
              align: 'center',
            },
            {
              field: 'jz',
              title: '净重',
              align: 'center',
            },
          ],
        ],
        page: true,
        toolbar: true,
        limit: 999999,
        where: params,
        request: {
          pageName: 'page', //页码的参数名称，默认：page
          limitName: 'pageSize', //每页数据量的参数名，默认：limit
        },
        response: {
          statusName: 'errno', //数据状态的字段名称，默认：code
          statusCode: 0, //成功的状态码，默认：0
          msgName: 'error', //状态信息的字段名称，默认：msg
          countName: 'num', //数据总数的字段名称，默认：count
          dataName: 'list', //数据列表的字段名称，默认：data
        },
        done: function(res) {
          //返回数据执行回调函数
          layer.close(index); //返回数据关闭loading
        },
      });
      if ($('#xiazairizi1').length < 1 && $('#rizileixin').length < 1) {
        $('#btn_time_3').after(
          `<div id="rizileixin" style="width:200px;display: inline-block;margin-left: 20px;float:left"></div><button id="filters1" class="subbtn">筛选</button><input type="button" value="下载" id="xiazairizi1" data-type='采购收货' class="subbtn">`
        );
      }
      $.ajax({
        type: 'get',
        url: `${getServerUrl(zd)}/api/inLog/clinType?beginDate=${$(
          '#bdstartTime'
        ).val()}&endDate=${$('#bdendTime').val()}`,
        // url: "https://www.zhilidaolu.com/lqonechang/api/putLog/clType?beginDate=2021-03-01&endDate=2021-03-31",
        success: function(res) {
          let list = [];
          res.list.forEach((item) => {
            list.push({
              name: item,
              value: item,
            });
          });
          selectMoreType = xmSelect.render({
            el: '#rizileixin',
            language: 'zn',
            data: list,
          });
        },
      });
      $('#filters1').click(function() {
        initTableRuku({
          beginDate: $('#bdstartTime').val(),
          endDate: $('#bdendTime').val(),
        });
      });
      $('#xiazairizi1').click(function() {
        let type = $(this).attr('data-type');
        let bgTime = $('#bdstartTime').val();
        let endTime = $('#bdendTime').val();
        let typesList1 = selectMoreType.getValue() || [];
        let types1 = '';
        if (typesList1.length > 0) {
          typesList1.forEach((item) => {
            types1 += `${item.value},`;
          });
          types1 = types1.substring(0, types1.length - 1);
        }
        window.location.href = `${getServerUrl(
          zd
        )}/api/data/kcrz?bgTime=${bgTime}&endTime=${endTime}&type=${type}&types=${encodeURIComponent(
          types
        )}`;
      });
    }
    // table-消耗日志
    function initTableChuku(params) {
      var index = layer.msg('数据请求中...');
      let typesList = [],
        types = '';
      if (selectMoreType1) {
        typesList = selectMoreType1.getValue() || [];
        if (typesList.length > 0) {
          typesList.forEach((item) => {
            types += `${item.value},`;
          });
        }
        types = types.substring(0, types.length - 1);
      }
      if (params) {
        params['bgTime'] = params['beginDate'];
        params['endTime'] = params['endDate'];
        params['type'] = types;
      }
      var params = params || {
        bgTime: showToDay(),
        endTime: showToDay(),
      };
      //根据请求类型 更换url
      table.render({
        style: 'mytabletextsize',
        elem: '#tb_ele',
        url: getServerUrl(zd) + '/api/data/ckrz',
        cellMinWidth: 80, //全局定义常规单元格的最小宽度
        cols: [
          [
            {
              field: 'xm',
              title: '项目',
              align: 'center',
            },
            {
              field: 'wl',
              title: '材料类型',
              align: 'center',
            },
            {
              field: 'jz',
              title: '净重',
              align: 'center',
            },
          ],
        ],
        page: true,
        toolbar: true,
        limit: 999999,
        where: params,
        request: {
          beginDate: 'bgTime',
          endDate: 'endTime',
          pageName: 'page', //页码的参数名称，默认：page
          limitName: 'pageSize', //每页数据量的参数名，默认：limit
        },
        response: {
          statusName: 'errno', //数据状态的字段名称，默认：code
          statusCode: 0, //成功的状态码，默认：0
          msgName: 'error', //状态信息的字段名称，默认：msg
          countName: 'num', //数据总数的字段名称，默认：count
          dataName: 'list', //数据列表的字段名称，默认：data
        },
        done: function(res) {
          //返回数据执行回调函数
          layer.close(index); //返回数据关闭loading
        },
      });
      if ($('#xiazairizi2').length < 1 && $('#rizileixin1').length < 1) {
        $('#btn_time_3').after(
          `<div id="rizileixin1" style="width:200px;display: inline-block;margin-left: 20px;float:left"></div><button id="filters2" class="subbtn">筛选</button><input type="button" value="下载" id="xiazairizi2" data-type='销售发货' class="subbtn">`
        );
      }
      $.ajax({
        type: 'get',
        url: `${getServerUrl(zd)}/api/putLog/clType?beginDate=${$(
          '#bdstartTime'
        ).val()}&endDate=${$('#bdendTime').val()}`,
        // url: "http://www.zhilidaolu.com/lqonechang/api/putLog/clType?beginDate=2021-03-01&endDate=2021-03-31",
        success: function(res) {
          let list = [];
          res.list.forEach((item) => {
            list.push({
              name: item,
              value: item,
            });
          });
          selectMoreType1 = xmSelect.render({
            el: '#rizileixin1',
            language: 'zn',
            data: list,
          });
        },
      });
      $('#filters2').click(function() {
        initTableChuku({
          beginDate: $('#bdstartTime').val(),
          endDate: $('#bdendTime').val(),
        });
      });
      $('#xiazairizi2').click(function() {
        let type = $(this).attr('data-type');
        let bgTime = $('#bdstartTime').val();
        let endTime = $('#bdendTime').val();
        let typesList1 = selectMoreType1.getValue() || [];
        let types1 = '';
        if (typesList1.length > 0) {
          typesList1.forEach((item) => {
            types1 += `${item.value},`;
          });
          types1 = types1.substring(0, types1.length - 1);
        }
        window.location.href = `${getServerUrl(
          zd
        )}/api/data/kcrz?bgTime=${bgTime}&endTime=${endTime}&type=${type}&types=${encodeURIComponent(
          types1
        )}`;
      });
    }

    function initTimeToolPancun() {
      var html = `
      <div name="radio_bd" class="qdk">本月</div>
      <div name="radio_bd" class="qdk">本季</div>
      <div class="wrapper">
      <input type="text" id="pcstartTime" readonly="readonly" class="mytime" style="margin-left: 13px;" placeholder="开始日期" />
      </div>
      <div class="fgx">-</div>
      <div class="wrapper">
      <input type="text" id="pcendTime" readonly="readonly" class="mytime" style="margin-left: 4px;" placeholder="结束日期" />
      </div>
      <input type="button" value="确认" id="btn_time_33" class="subbtn" />
      <div style="clear: both;">
      </div>`;
      $('.querydiv').html(html);
      // 手动盘存时间选择
      layui.use('laydate', function() {
        var laydate = layui.laydate;
        laydate.render({
          elem: '#pcstartTime',
          type: 'month',
        });

        laydate.render({
          elem: '#pcendTime',
          type: 'month',
        });
      });
      var index = {
        STime: $('#pcstartTime').val(),
        ETime: $('#pcendTime').val(),
      };
      initTablePancun(index);
      $('#btn_time_33').click(function() {
        params = {
          STime: $('#pcstartTime').val(),
          ETime: $('#pcendTime').val(),
        };
        console.log(params);
        initTablePancun(params);
      });
      $("[name='radio_bd']").on('click', function() {
        var beginDate;
        var endDate;

        $("[name='radio_bd']").removeClass('qdkaction');
        $(this).addClass('qdkaction');

        if ($(this).text() == '本月') {
          beginDate = showMonthFirstDay();
          endDate = showMonthLastDay();
        } else if ($(this).text() == '本季') {
          beginDate = show3MonthFirstDay();
          endDate = showMonthLastDay();
        }
        var params = {
          STime: beginDate,
          ETime: endDate,
        };
        initTablePancun(params);
      });
    }
    // table-手动盘存
    function initTablePancun(params) {
      params = params || {};
      var index = layer.msg('数据请求中...');
      table.render({
        style: 'mytabletextsize',
        elem: '#tb_ele',
        url: url + '/sysSdpc/getSdpcList',
        // data: [],
        cols: [
          [
            {
              field: 'cllb',
              title: '材料类型',
              align: 'center',
            },
            {
              field: 'clmc',
              title: '材料名称',
              align: 'center',
            },
            {
              field: 'sj',
              title: '时间',
              align: 'center',
            },
            {
              field: 'kcsl',
              title: '库存数量',
              align: 'center',
            },
          ],
        ],
        toolbar: true,
        where: params,
        request: {
          pageName: 'currentIndex', //页码的参数名称，默认：page
          limitName: 'pageSize', //每页数据量的参数名，默认：limit
        },
        response: {
          statusName: 'code', //数据状态的字段名称，默认：code
          statusCode: 0, //成功的状态码，默认：0
          msgName: 'error', //状态信息的字段名称，默认：msg
          countName: 'totalCount', //数据总数的字段名称，默认：count
          dataName: 'list', //数据列表的字段名称，默认：data
        },
        done: function(res) {
          //返回数据执行回调函数
          layer.close(index); //返回数据关闭loading
        },
      });
    }
    // table-原材库存
    function initTableYuancai(index) {
      $.ajax({
        type: 'get',
        url: getServerUrl(zd) + '/api/data/ajaxGetKuCun',
        success: function(res) {
          let data = [];
          let data1 = res.list;
          $.ajax({
            type: 'get',
            url: getServerUrl(zd) + '/api/data/ajaxGetKuCun_lilun',
            async: false,
            success: function(res) {
              let data2 = res.list;
              data1.map((list, index) => {
                data.push({
                  ...list,
                  lilun_value: data2[index].value,
                });
              });
              console.log(data);
              //根据请求类型 更换url
              table.render({
                style: 'mytabletextsize',
                elem: '#tb_ele',
                // url: getServerUrl(getServerUrl(zd) + '/api/data/ajaxGetKuCun',
                data: data,
                cols: [
                  [
                    {
                      field: 'name',
                      title: '材料类型',
                      align: 'center',
                    },
                    {
                      field: 'lilun_value',
                      title: '上月盘存',
                      align: 'center',
                    },
                    {
                      field: 'value',
                      title: '实际库存',
                      align: 'center',
                    },
                  ],
                ],
                toolbar: true,
                done: function(res) {
                  //返回数据执行回调函数
                  layer.close(index); //返回数据关闭loading
                },
              });
            },
          });
        },
      });
    }
    // table-料仓管理
    function initTableLiaocang(params) {
      var index = layer.msg('数据请求中...');
      var params = params || {
        beginDate: showToDay(),
        endDate: showToDay(),
      };
      //根据请求类型 更换url
      table.render({
        style: 'mytabletextsize',
        elem: '#tb_ele',
        url: url + '/dispatch/getMarkers',
        //data:{},
        cellMinWidth: 80, //全局定义常规单元格的最小宽度
        // data: [{lc: '料仓一', cl: '材料1', cl2: '材料2'}],
        cols: [
          [
            {
              field: 'wareHouse',
              title: '料仓名称',
              align: 'center',
            },
            {
              field: 'cl',
              title: '材料名称',
              align: 'center',
              templet: function(d) {
                console.log(d.u_Code);
                return `<select name="u_Code" value="${d.u_Code}"  lay-filter="selectCl"></select>`;
              },
            },
            {
              field: 'tsoll',
              title: '额定量',
              align: 'center',
              templet: function(d) {
                return `<input type="text" name="tsoll" class="table-ipt" value="${d.tsoll}" lay-event="editIpt" placeholder="请输入"/>`;
              },
            },
            {
              title: '操作',
              toolbar:
                '<div><a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="confirm" href="javascript:;">确认</a></div>',
              align: 'center',
            },
          ],
        ],
        where: {
          idzhandian: localStorage.getItem('station_id'),
        },
        response: {
          statusName: 'code', //数据状态的字段名称，默认：code
          statusCode: 0, //成功的状态码，默认：0
          msgName: 'error', //状态信息的字段名称，默认：msg
          countName: 'totalCount', //数据总数的字段名称，默认：count
          dataName: 'list', //数据列表的字段名称，默认：data
        },
        done: function(res) {
          //返回数据执行回调函数
          console.log(res);
          layer.close(index); //返回数据关闭loading
          dataList = res.list;
          let options = '<option value="">请选择</option>';

          $.ajax({
            //拼接下拉选项
            type: 'get',
            url: url + '/yuancailiao/getyuancailiaoList',
            data: {
              zdId: localStorage.getItem('station_id'),
            },
            dataType: 'json',
            async: false,
            success: function(res) {
              formateData(res.list);
              yclList.map((val) => {
                options += `<option value="${val.u_Code}">${val.u_Name}</option>`;
              });
              $("select[name='u_Code']").html(options);
              form.render('select');
            },
          });
          layui.each($("select[name='u_Code']"), function(index, item) {
            var elem = $(item);
            elem.val(dataList[index].u_Code);
          });
          form.render('select');
        },
      });
      table.on('tool(tableUser)', function(obj) {
        console.log(obj);
        var layEvent = obj.event;
        var data = obj.data;
        if (layEvent === 'confirm') {
          data['tsoll'] = $(obj.tr).find("input[name='tsoll']").val();
          $.ajax({
            //拼接下拉选项
            type: 'post',
            url: url + '/dispatch/UpdateMarker',
            contentType: 'application/json',
            data: JSON.stringify({
              ...data,
              ID: data.id,
              idzhandian: localStorage.getItem('station_id'),
            }),
            async: false,
            success: function(res) {
              if (res.code === 0) {
                layer.msg('修改成功');
              } else {
                layer.msg(res.msg);
              }
            },
            fail: function(res) {
              layer.msg('修改失败');
            },
          });
        }
      });
      form.on('select(selectCl)', function(obj) {
        console.log(obj);
        var elem = $(obj.elem);
        var trElem = elem.parents('tr');
        console.log(trElem.data('index'), elem.attr('name'));
        // 更新到表格的缓存数据中，才能在获得选中行等等其他的方法中得到更新之后的值
        dataList[trElem.data('index')][elem.attr('name')] = obj.value;
        yclList.map((val) => {
          if (val.u_Code === obj.value) {
            dataList[trElem.data('index')]['u_Name'] = val.u_Name;
            dataList[trElem.data('index')]['u_Id'] = val.id;
          }
        });
        console.log(dataList[trElem.data('index')]);
        form.render('select');
      });
    }

    function formateData(arr, index = 0) {
      let index1 = index;
      index++;
      return arr.map((val) => {
        yclList.push({
          ...val,
          u_Name: val.u_Name,
        });
        if (val.children.length > 0) formateData(val.children, index);
      });
    }
    // 加空格
    function formateName(index) {
      let str = '';
      for (let i = 0; i < index; i++) {
        str += '&nbsp;&nbsp;&nbsp;&nbsp;';
      }
      return str;
    }

    function showToDay() {
      var Nowdate = new Date();
      M = Number(Nowdate.getMonth()) + 1;
      var day = Nowdate.getDate();
      // alert((Nowdate.getDate()<10)?('0'+Nowdate.getDate()):Nowdate.getDate());
      return (
        Nowdate.getFullYear() +
        '-' +
        (M < 10 ? '0' + M : M) +
        '-' +
        (Nowdate.getDate() < 10
          ? '0' + Nowdate.getDate()
          : Nowdate.getDate())
      );
    }

    function showTomorrow() {
      var tom = new Date();
      tom.setDate(tom.getDate() + 1);
      M = Number(tom.getMonth()) + 1;
      return (
        tom.getYear() + '-' + (M < 10 ? '0' + M : M) + '-' + tom.getDate()
      );
    }

    function showWeekFirstDay() {
      var Nowdate = new Date();
      var WeekFirstDay = new Date(
        Nowdate - (Nowdate.getDay() - 1) * 86400000
      );
      M = Number(WeekFirstDay.getMonth()) + 1;
      return (
        WeekFirstDay.getFullYear() +
        '-' +
        (M < 10 ? '0' + M : M) +
        '-' +
        (WeekFirstDay.getDate() < 10
          ? '0' + WeekFirstDay.getDate()
          : WeekFirstDay.getDate())
      );
    }

    function showWeekLastDay() {
      var Nowdate = new Date();
      var WeekFirstDay = new Date(
        Nowdate - (Nowdate.getDay() - 1) * 86400000
      );
      var WeekLastDay = new Date(
        (WeekFirstDay / 1000 + 6 * 86400) * 1000
      );
      M = Number(WeekLastDay.getMonth()) + 1;
      return (
        WeekLastDay.getFullYear() +
        '-' +
        (M < 10 ? '0' + M : M) +
        '-' +
        (WeekLastDay.getDate() < 10
          ? '0' + WeekLastDay.getDate()
          : WeekLastDay.getDate())
      );
    }

    function showMonthFirstDay() {
      var Nowdate = new Date();
      var MonthFirstDay = new Date(
        Nowdate.getFullYear(),
        Nowdate.getMonth(),
        1
      );
      M = Number(MonthFirstDay.getMonth()) + 1;
      return (
        MonthFirstDay.getFullYear() +
        '-' +
        (M < 10 ? '0' + M : M) +
        '-' +
        (MonthFirstDay.getDate() < 10
          ? '0' + MonthFirstDay.getDate()
          : MonthFirstDay.getDate())
      );
    }

    function showMonthLastDay() {
      var Nowdate = new Date();
      var MonthNextFirstDay = new Date(
        Nowdate.getFullYear(),
        Nowdate.getMonth() + 1,
        1
      );
      var MonthLastDay = new Date(MonthNextFirstDay - 86400000);
      M = Number(MonthLastDay.getMonth()) + 1;
      return (
        MonthLastDay.getFullYear() +
        '-' +
        (M < 10 ? '0' + M : M) +
        '-' +
        (MonthLastDay.getDate() < 10
          ? '0' + MonthLastDay.getDate()
          : MonthLastDay.getDate())
      );
    }

    function show3MonthFirstDay() {
      var date = new Date(
        new Date().getFullYear(),
        new Date().getMonth() - 2,
        1
      );
      return (
        date.getFullYear() +
        '-' +
        (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()) +
        '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      );
    }
  }
);

function bindkucunVideo() {
  $('#kucunvideo').html('');
  var deviceWidth = document.documentElement.clientWidth;
  var station = localStorage.getItem('station');
  $.get(
    url + video_api_url,
    {
      zhandian: station,
      model_name: '物料管理-库存盘点',
      type: 'pc',
    },
    function(res) {
      for (var i = 0; i < res.length; i++) {
        var playerid = 'player' + i;
        var html = '';
        html += '<div class="monitor-box" style="margin-bottom:10px;" >';
        html += '<video id=' + playerid + ' controls></video>';
        html += '</div>';
        $('#kucunvideo').append(html);
        setVideoFlvJsPlayer(playerid, res[i].url, 210, 160);
      }
    }
  );
}