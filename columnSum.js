/*
 categorySelector 1.0.0
 Licensed under the MIT license.
 https://github.com/VaJoy/columnSum
 */
(function ($) {
    $.fn.columnSum = function (option) {
        option = option ||{};
        option = $.extend(true,{
            ignore:{ //key为要忽略的列的索引（从0开始算），val为该列汇总处显示内容
                //2:"-", //第三列的汇总显示“-”
                //6:"" //第七列的汇总显示“”
            },
            decimal :2,  //小数位，默认精确到2位小数
            match:!0,  //小数位是否用0补全
            reg:null,
            currency:!0
        },option);

        var $tbody = $(this).find("tbody"),
            $rows = $tbody.find("tr"),
            col_num = $rows.first().find("td").length,
            arr = new Array(col_num);
        for(var i in option.ignore){
            arr[i] = option.ignore[i];
        }

        for(var i=0,l=$rows.length,val;i<l;i++){
            for(var j=0,temp= 0,dm=option.decimal,tens =Math.pow(10,dm),$row=$rows.eq(i);j<col_num;j++){
                if(typeof option.ignore[j]!=="undefined") continue;
                val = $row.children().eq(j).text();
                val = option.reg?Number(val.replace(option.reg,'')):Number(val);
                temp = (arr[j]||0) + (val||0);
                temp = Math.round(temp*tens)/tens;
                arr[j] = temp;
            }
        }

        function toCurrency(num){
            num = num.toString();
            var result = "",
                len = num.length,
                init = num.indexOf("."),
                pn_l = init<0?len:init;
            for(var i=pn_l;i>=0;i-=3){
                result = num.slice((i-3)>=0?(i-3):0,i) + (i==pn_l?"":",") + result
            }
            if(init>-1){
                result += ".";
                if(len-init>4)
                result += num.slice(init+1,len).replace(/(\d{3})(?=\d+)/g,"$1,");
                else result += num.slice(init+1,len)
            }
            return result
        }

        var lastRow = "<tr>";
        for(var i= 0;i<col_num;i++){
            if(typeof arr[i]==="number"){
                arr[i] = (option.decimal&&option.match)?Number(arr[i]).toFixed(option.decimal):arr[i];
                    arr[i] = option.currency?toCurrency(arr[i]):arr[i];
            }
            lastRow += "<td>" + arr[i] + "</td>"
        }
        lastRow += "</tr>";
        $(lastRow).appendTo($tbody);
	}
}(jQuery));