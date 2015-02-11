/*
 categorySelector 1.0.0
 Licensed under the MIT license.
 https://github.com/VaJoy/columnSum
 */
(function ($) {
    $.fn.columnSum = function (option) {
        option = option ||{};
        option = $.extend(true,{
            title:"当前汇总",  //是否把第一列设为标题，若不要则设为false
            ignore:{ //key为要忽略的列的索引（从0开始算），val为该列汇总处显示内容
                //2:"-", //第三列的汇总显示“-”
                //6:"" //第七列的汇总显示“”
            }
        },option);

        var $tbody = $(this).find("tbody"),
            $rows = $tbody.find("tr"),
            col_num = $rows.first().find("td").length,
            arr = new Array(col_num);
        if(option.title){
            arr[0] = option.title;
        }
        for(var i in option.ignore){
            arr[i] = option.ignore[i];
        }

        for(var i=0,l=$rows.length,val;i<l;i++){
            for(var j=option.title?1:0,$row=$rows.eq(i);j<col_num;j++){
                if(typeof option.ignore[j]!=="undefined") continue;
                val = Number($row.children().eq(j).text());
                arr[j] = (arr[j]||0) + (val||0);
            }
        }

        var lastRow = "<tr>";
        for(var i= 0;i<col_num;i++){
            lastRow += "<td>" + arr[i] + "</td>"
        }
        lastRow += "</tr>";
        $(lastRow).appendTo($tbody);
	}
}(jQuery));