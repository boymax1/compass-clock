window.onload = function () {
    var Time = {
        chineseNum:["零","一","二","三","四","五","六","七","八","九"],
        getZhYear:function (year) {
            var temp = "";
            if (year) {
                var yearSplit = year.toString().split("");
                for (var i=0;i<yearSplit.length;i++){
                    temp+=this.chineseNum[parseInt(yearSplit[i])];
                }
            }
            return temp+"年";
        },
        getZhWeek:function(week){
            if(week===0){
                return "星期日";
            }
            return "星期"+this.chineseNum[week];
        },
        getZhOther:function (num) {
            if(num>60 || num<0 || num!==parseInt(num)) return "";
            if(num<10){
                return this.chineseNum[num];
            }
            if(num===10) return "十";
            if(num%10===0) return this.chineseNum[parseInt(num/10)]+"十";
            if(num<20) return "十"+this.chineseNum[num%10];
            return this.chineseNum[parseInt(num/10)]+"十"+this.chineseNum[num%10];
        }
    };
    function createSpanNode(myText){
        //创建span标签
        var node=document.createElement("span");
        var textnode=document.createTextNode(myText);
        node.appendChild(textnode);
        return node;
    }
    function main() {
        var divObj = document.getElementsByTagName("div");
        var now = new Date();
        for(var i=0;i<divObj.length;i++){
            if(divObj[i]){
                if(divObj[i].childNodes){
                    var nodeList = divObj[i].childNodes;
                    for(var j=nodeList.length-1;j>=0;j--){
                        var x = divObj[i].removeChild(nodeList[j]);
                        if(x.nodeType===1){
                            x=null;
                        }
                    }
                }
                switch (divObj[i].id) {
                    case "year":
                        divObj[i].appendChild(createSpanNode(Time.getZhYear(now.getFullYear())));
                        break;
                    case "month":
                        var m = now.getMonth()+1;
                        for(var j=0;j<12;j++){
                            var temp = createSpanNode(Time.getZhOther(m)+"月");
                            temp.style.transformOrigin = "-50px center";
                            temp.style.transform = "rotate("+(j*30)+"deg)";
                            divObj[i].appendChild(temp);
                            if(m===1){
                                m=12;
                            }else{
                                m--;
                            }
                        }
                        break;
                    case "date":
                        var d = now.getDate();
                        for(var j=0;j<31;j++){
                            var temp = createSpanNode(Time.getZhOther(d)+"日");
                            temp.style.transformOrigin = "-100px center";
                            temp.style.transform = "rotate("+(j*11.61)+"deg)";
                            divObj[i].appendChild(temp);
                            if(d===1){
                                d=31;
                            }else{
                                d--;
                            }
                        }
                        break;
                    case "day":
                        var w = now.getDay();
                        for(var j=0;j<7;j++){
                            var temp = createSpanNode(Time.getZhWeek(w));
                            temp.style.transformOrigin = "-160px center";
                            temp.style.transform = "rotate("+(j*51.42)+"deg)";
                            divObj[i].appendChild(temp);
                            if(w===0){
                                w=6;
                            }else{
                                w--;
                            }
                        }
                        break;
                    case "hour":
                        var h = now.getHours();
                        for(var j=0;j<24;j++){
                            var temp = createSpanNode(Time.getZhOther(h)+"时");
                            temp.style.transformOrigin = "-210px center";
                            temp.style.transform = "rotate("+(j*15)+"deg)";
                            divObj[i].appendChild(temp);
                            if(h===0){
                                h=23;
                            }else{
                                h--;
                            }
                        }
                        break;
                    case "minute":
                        var m = now.getMinutes();
                        for(var j=0;j<60;j++){
                            var temp = createSpanNode(Time.getZhOther(m)+"分");
                            temp.style.transformOrigin = "-260px center";
                            temp.style.transform = "rotate("+(j*6)+"deg)";
                            divObj[i].appendChild(temp);
                            if(m===0){
                                m=59;
                            }else{
                                m--;
                            }
                        }
                        break;
                    case "second":
                        var s = now.getSeconds();
                        for(var j=0;j<60;j++){
                            var temp = createSpanNode(Time.getZhOther(s)+"秒");
                            temp.style.transformOrigin = "-320px center";
                            temp.style.transform = "rotate("+(j*6)+"deg)";
                            divObj[i].appendChild(temp);
                            if(s===0){
                                s=59;
                            }else{
                                s--;
                            }
                        }
                        break;
                }
            }
        }
    }
    main();
    var timer = setTimeout(function func() {
        main();
        setTimeout(func,1000);
    },1000);
};
