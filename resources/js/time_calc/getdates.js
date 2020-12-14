var gst=document.getElementById("GST").value/100;
var pst=document.getElementById("PST").value/100;

var pvrt = 1.5;
var pvrtWTax = 1.5*(1+gst);

var getTax = function(){
  gst=document.getElementById("GST").value/100;
  pst=document.getElementById("PST").value/100;
  pvrtWTax = 1.5*(1+gst);
};

var test = function(){
  var fromDate,toDate, fromYear,toYear, fromMonth,toMonth,fromDay,toDay,fromHour,toHour,fromMin,toMin;

  var accessFee = 0;
  var accessFeeWTax = 0;

  if(document.getElementById("accessFeeCheck").checked == true){
    accessFee = 1;
   /* document.getElementById("displayAFTax").style.display = "block";
    document.getElementById("displayAF").style.display = "block";
  }
  else{
    document.getElementById("displayAFTax").style.display = "none";
    document.getElementById("displayAF").style.display = "none";*/
  }
  accessFeeWTax = accessFee * (1+gst+pst);

  var daysPassed,hoursPassed,minutesPassed;
  var minCost = 0;
  var hourCost = 0;
  var dayCost = 0;
  var daysPerMonth = [31,30,31,30,31,30,31,31,30,31,30,31];

    var yearDif = 0;
    var monthDif = 0;
    var dayDif = 0;
    var totalDays = 0;
    var totalMinutes = 0;
    var totalCost=0;
    var costBTax = 0;
    var pvrtCost=0;
    var pvrtCostTax=0;

    fromDate = new Date(document.getElementById("fdate").value  + " " +document.getElementById("ftime").value);//document.getElementById("fdate").value);
    toDate = new Date(document.getElementById("tdate").value + " " +document.getElementById("ttime").value);



    //'extracting' individual date components for separate calculations
    fromYear = fromDate.getFullYear();
    toYear = toDate.getFullYear();
    fromMonth = fromDate.getMonth()+1;
    toMonth = toDate.getMonth()+1;
    fromDay = fromDate.getDate() ;
    toDay = toDate.getDate() ;
    fromHour = fromDate.getHours();
    fromMin = fromDate.getMinutes();
    toHour = toDate.getHours();
    toMin = toDate.getMinutes();

    if(fromDay-daysPerMonth[fromMonth-1]>0){
        fromDay=fromDay-daysPerMonth[fromMonth-1];
        fromMonth++;
    }

    //This section calculates the total days passed based on given date (time is ignored for now)
    yearDif = toYear - fromYear;
    monthDif = toMonth - fromMonth;
    dayDif = toDay - fromDay;

    if(fromYear==toYear){
        for(let i = fromMonth; i <toMonth;i++){
        totalDays += daysPerMonth[i-1];
        }
        totalDays= totalDays - fromDay+toDay;
    }
    else if(yearDif==1){
        for(let i = fromMonth+1; i <12;i++){
            totalDays += daysPerMonth[i-1];
        }   
        for(let i = 0; i <toMonth;i++){
            totalDays += daysPerMonth[i];
        }
        totalDays = totalDays + daysPerMonth[fromMonth-1]-fromDay + toDay;
    }
    else if(yearDif>1){
        totalDays = 365 * (yearDif-1); 
        for(let i = fromMonth+1; i <12;i++){
            totalDays += daysPerMonth[i-1];
        }   
        for(let i = 0; i <toMonth;i++){
            totalDays += daysPerMonth[i];
        }
        totalDays = totalDays + daysPerMonth[fromMonth-1]-fromDay + toDay;
    }
    
    //find total minutes from only hours/minutes given (day/month/year is ignored)
    if(fromHour!=0 || fromMin!=0){
        totalDays = totalDays- 1;
        totalMinutes = totalMinutes + (60*24-(60*fromHour+fromMin)) +(60*toHour+toMin);
    }
    else{
        totalMinutes = totalMinutes +(60*toHour+toMin);
    }

    //combining total minutes and total days to only minutes, then calculating the days/hours/minutes passed based on the result
    totalMinutes = totalMinutes + (totalDays*24*60);
    minutesPassed = Math.floor(totalMinutes%60);
    hoursPassed=Math.floor(totalMinutes/60);
    daysPassed = Math.floor(hoursPassed/24);
    hoursPassed = Math.floor(hoursPassed%24);

    /*document.getElementById("dates").innerHTML = fromMonth +"/"+ fromDay+ "/"+fromYear + " to " + toMonth +"/" + toDay +"/" + toYear + "<br\>";*/
    document.getElementById("difference").innerHTML = "Duration: " +daysPassed + " day(s) " + hoursPassed + " hour(s) "+ minutesPassed + " minute(s)";


    if(minutesPassed<37){
        minCost=document.getElementById("minRate").value*minutesPassed;
    }
    else{
        hourCost = document.getElementById("hourRate").value*1;
    }
    if(hoursPassed<6){
        hourCost=hourCost+document.getElementById("hourRate").value*hoursPassed;
    }
    else{
      minCost=0;
      hourCost=0;
      dayCost= document.getElementById("dayRate").value *1;    
      }

    dayCost = dayCost + document.getElementById("dayRate").value *daysPassed;

costBTax=(minCost+hourCost+dayCost);
totalCost= (minCost+hourCost+dayCost)*(1+gst+pst)+accessFeeWTax;

if(daysPassed==0 && toDay-fromDay==0){
  if(hoursPassed>=8){
    pvrtCost= pvrt*1;
    pvrtCostTax=pvrtCost*gst;
    totalCost = totalCost + pvrtCost + pvrtCostTax;
  }
}
else if(daysPassed==0 && toDay-fromDay==1){
  if(hoursPassed>=8){
    pvrtCost= pvrt*2;
    pvrtCostTax=pvrtCost*gst;
    totalCost = totalCost + pvrtCost + pvrtCostTax;
  }
}
  else if(daysPassed==1 && toDay-fromDay==1){
    pvrtCost= pvrt*2;
    pvrtCostTax=pvrtCost*gst;
    totalCost = totalCost + pvrtCost + pvrtCostTax;
}
else if(toDay-fromDay>1){
    pvrtCost= pvrt*(toDay-fromDay+1);
    pvrtCostTax=pvrtCost*gst;
    totalCost = totalCost + pvrtCost + pvrtCostTax;
}

document.getElementById("cost").innerHTML = "$" +costBTax.toFixed(2);
document.getElementById("taxOCost").innerHTML = "$" + (costBTax*(gst+pst)).toFixed(2);
document.getElementById("subtotal").innerHTML = "$" +(costBTax*(1+gst+pst)).toFixed(2);
document.getElementById("pvrt").innerHTML = "$" +pvrtCost.toFixed(2);
document.getElementById("taxPVRT").innerHTML = "$" +pvrtCostTax.toFixed(2);
document.getElementById("accessFeeCost").innerHTML = "$" +accessFee.toFixed(2);
document.getElementById("taxAF").innerHTML = "$" +(accessFee*(pst+gst)).toFixed(2);
document.getElementById("totalCost").innerHTML = "$" +totalCost.toFixed(2);


}

document.getElementById("GST").addEventListener("change", getTax);
document.getElementById("PST").addEventListener("change", getTax);
document.getElementById("GST").addEventListener("change", test);
document.getElementById("PST").addEventListener("change", test);
document.getElementById("accessFeeCheck").addEventListener("change", test);


document.getElementById("fdate").addEventListener("change", test);
document.getElementById("tdate").addEventListener("change",test);
document.getElementById("ttime").addEventListener("change",test);
document.getElementById("ftime").addEventListener("change",test);
document.getElementById("minRate").addEventListener("change",test);
document.getElementById("hourRate").addEventListener("change",test);
document.getElementById("dayRate").addEventListener("change",test);