var gst=document.getElementById("GST").value/100;
var pst=document.getElementById("PST").value/100;

var pvrt = 1.5;
var pvrtWTax = 1.5*(1+gst);

var daysPerMonth = [31,30,31,30,31,30,31,31,30,31,30,31];

//formats given hour and minute to "HH:MM"
var formatTime = function(date){
  let hour = ''+date.getHours();
  let min = ''+date.getMinutes();
  let formattedTime='';

  if(min.length<2){
      min = '0'+min;
  }
  if(hour.length==1){
      hour = '0'+hour;
  }
  else if(hour.length==0){
    hour = '00'+hour;
  }

  formattedTime = hour+":"+min;
  return formattedTime;
}

var getTax = function(){
  gst=document.getElementById("GST").value/100;
  pst=document.getElementById("PST").value/100;
  pvrtWTax = 1.5*(1+gst)
};

//adds $1.50+GST for each calendar day if duration is 8 hours or longer
var addPVRT = function(daysPassed,hoursPassed,fromDay,startDay,pvrtCost,pvrtTax){
  if(daysPassed==0 && fromDay-startDay==0){
    if(hoursPassed>=8){
      pvrtCost= pvrt*1;
      pvrtTax=pvrtCost*gst;
    }
  } 
  else if(daysPassed==0 && fromDay-startDay==1){
    if(hoursPassed>=8){
      pvrtCost= pvrt*2;
      pvrtTax=pvrtCost*gst;
    }
  }
  else if(daysPassed==1 && fromDay-startDay==1){
    pvrtCost= pvrt*2;
    pvrtTax=pvrtCost*gst;
  }
  else if(fromDay-startDay>1){
    pvrtCost= pvrt*(fromDay-startDay+1);
    pvrtTax=pvrtCost*gst;
  }
  return pvrtCost + pvrtTax;
}

//calculate the total days passed between a given start and end date
var calculateTotalDays = function(startYear,startMonth,startDay,endYear,endMonth,endDay,yearDif){
  let totalDays = 0;
  if(startYear==endYear){
        for(let i = startMonth; i <endMonth;i++){
        totalDays += daysPerMonth[i-1];
        }
        totalDays= totalDays - startDay+endDay;
    }
    else if(yearDif==1){
        for(let i = startMonth+1; i <12;i++){
            totalDays += daysPerMonth[i-1];
        }   
        for(let i = 0; i <endMonth;i++){
            totalDays += daysPerMonth[i];
        }
        totalDays = totalDays + daysPerMonth[startMonth-1]-startDay + endDay;
    }
    else if(yearDif>1){
        totalDays = 365 * (yearDif-1); 
        for(let i = startMonth+1; i <12;i++){
            totalDays += daysPerMonth[i-1];
        }   
        for(let i = 0; i <endMonth;i++){
            totalDays += daysPerMonth[i];
        }
        totalDays = totalDays + daysPerMonth[startMonth-1]-startDay + endDay;
    }
    return totalDays;
}

var calculateTotalCost = function(){
  var origDate, origYear,origMonth,origDay,origHour,origMin;
  var adjDate,adjYear, adjMonth,adjDay,adjHour, adjMin;
  var startDate,startYear, startMonth,startDay,startHour, startMin;
  var origDaysPassed,origHoursPassed,origMinutesPassed;
  var adjDaysPassed,adjHoursPassed,adjMinutesPassed;

  var origMinCost = 0;
  var origHourCost = 0;
  var origDayCost = 0;

  var adjMinCost = 0;
  var adjHourCost = 0;
  var adjDayCost = 0;

  var costDiff = 0;

  var origTimeFormatted, adjTimeFormatted, startTimeFormatted;

  var origYearDif = 0;
  var origMonthDif = 0;
  var origDayDif = 0;
  var origTotalDays = 0;
  var origTotalMinutes = 0;
  var origTotalCost=0;

  var adjYearDif = 0;
  var adjMonthDif = 0;
  var adjDayDif = 0;
  var adjTotalDays = 0;
  var adjTotalMinutes = 0;
  var adjTotalCost=0;

  var pvrtCostOrig=0;
  var pvrtCostAdj=0;
  var pvrtCostTaxAdj=0;
  var pvrtCostTaxOrig=0;

  var accessFee = 0;
  var accessFeeWTax = 0;

  if(document.getElementById("accessFeeCheck").checked == true){
    accessFee = 1;
  }
  accessFeeWTax = accessFee * (1+gst+pst);

  //Create a new Date object from user-inputted date and time
  origDate = new Date(document.getElementById("origDate").value  + " " +document.getElementById("origTime").value);
  adjDate = new Date(document.getElementById("adjDate").value + " " +document.getElementById("adjTime").value);
  startDate = new Date(document.getElementById("startDate").value + " " +document.getElementById("startTime").value);

  origTimeFormatted = formatTime(origDate);
  adjTimeFormatted =formatTime(adjDate);
  startTimeFormatted = formatTime(startDate);

  //'extracting' individual date components for separate calculations
  origYear = origDate.getFullYear();
  origMonth = origDate.getMonth()+1;
  origDay = origDate.getDate() ;
  origHour = origDate.getHours();
  origMin = origDate.getMinutes();

  adjYear = adjDate.getFullYear();
  adjMonth = adjDate.getMonth()+1;
  adjDay = adjDate.getDate() ;
  adjHour = adjDate.getHours();
  adjMin = adjDate.getMinutes();

  startYear = startDate.getFullYear();
  startMonth = startDate.getMonth()+1;
  startDay = startDate.getDate() ;
  startHour = startDate.getHours();
  startMin = startDate.getMinutes();

  if(startDay-daysPerMonth[startMonth-1]>0){
      startDay=startDay-daysPerMonth[startMonth-1];
      startMonth++;
  }

  if(startDay-daysPerMonth[startMonth-1]>0){
      startDay=startDay-daysPerMonth[startMonth-1];
      startMonth++;
  }

  //Calculate total days passed based on given date (time is ignored for now)
  origYearDif = origYear - startYear;
  origMonthDif = origMonth - startMonth;
  origDayDif = origDay - startDay;

  adjYearDif = adjYear - startYear;
  adjMonthDif = adjMonth - startMonth;
  adjDayDif = adjDay - startDay;

  origTotalDays = calculateTotalDays(startYear,startMonth,startDay,origYear,origMonth,origDay,origYearDif);
  adjTotalDays = calculateTotalDays(startYear,startMonth,startDay,adjYear,adjMonth,adjDay,adjYearDif);
    
  //find total minutes from only hours/minutes given (day/month/year is ignored)
  if(startHour!=0 || startMin!=0){
      origTotalDays = origTotalDays- 1;
      origTotalMinutes = origTotalMinutes + (60*24-(60*startHour+startMin)) +(60*origHour+origMin);
  }
  else{
      origTotalMinutes = origTotalMinutes +(60*origHour+origMin);
  }

  if(startHour!=0 || startMin!=0){
      adjTotalDays = adjTotalDays- 1;
      adjTotalMinutes = adjTotalMinutes + (60*24-(60*startHour+startMin)) +(60*adjHour+adjMin);
  }
  else{
      adjTotalMinutes = adjTotalMinutes +(60*adjHour+adjMin);
  }

  //combining total minutes and total days to only minutes, then calculating the days/hours/minutes passed based on the result
  origTotalMinutes = origTotalMinutes + (origTotalDays*24*60);
  origMinutesPassed = Math.floor(origTotalMinutes%60);
  origHoursPassed=Math.floor(origTotalMinutes/60);
  origDaysPassed = Math.floor(origHoursPassed/24);
  origHoursPassed = Math.floor(origHoursPassed%24);

  adjTotalMinutes = adjTotalMinutes + (adjTotalDays*24*60);
  adjMinutesPassed = Math.floor(adjTotalMinutes%60);
  adjHoursPassed=Math.floor(adjTotalMinutes/60);
  adjDaysPassed = Math.floor(adjHoursPassed/24);
  adjHoursPassed = Math.floor(adjHoursPassed%24);

  document.getElementById("origDifference").innerHTML = "Original Duration: " + origDaysPassed + " day(s) " + origHoursPassed + " hour(s) "+ origMinutesPassed + " minute(s) ";

  document.getElementById("adjDifference").innerHTML = "Adjusted Duration: " + adjDaysPassed + " day(s) " + adjHoursPassed + " hour(s) "+ adjMinutesPassed + " minute(s) ";

  if(origMinutesPassed<37){
      origMinCost=document.getElementById("minRate").value*origMinutesPassed;
  }
  else{
      origHourCost=document.getElementById("hourRate").value*1;
  }
  if(origHoursPassed<6){
      origHourCost=origHourCost +document.getElementById("hourRate").value*origHoursPassed;
  }
  else{
      origMinCost = 0;
      origHourCost =0;
      origDayCost=document.getElementById("dayRate").value*1;
  }

  if(adjMinutesPassed<37){
      adjMinCost=document.getElementById("minRate").value*adjMinutesPassed;
  }
  else{
      adjHourCost=document.getElementById("hourRate").value*1;
  }
  if(adjHoursPassed<6){
      adjHourCost=adjHourCost +document.getElementById("hourRate").value*adjHoursPassed;
  }
  else{
      adjMinCost = 0;
      adjHourCost =0;
      adjDayCost=document.getElementById("dayRate").value*1;
  }

  origDayCost = origDayCost + document.getElementById("dayRate").value *origDaysPassed;
  adjDayCost = adjDayCost + document.getElementById("dayRate").value *adjDaysPassed;


  origTotalCost= (origMinCost+origHourCost+origDayCost)*(1+gst+pst)+accessFeeWTax;
  adjTotalCost= (adjMinCost+adjHourCost+adjDayCost)*(1+gst+pst)+accessFeeWTax;

  origTotalCost = origTotalCost + addPVRT(origDaysPassed,origHoursPassed,origDay,startDay,pvrtCostOrig,pvrtCostTaxOrig);
  adjTotalCost = adjTotalCost + addPVRT(adjDaysPassed,adjHoursPassed,adjDay,startDay,pvrtCostAdj,pvrtCostTaxAdj);

  costDiff = origTotalCost - adjTotalCost;

  document.getElementById("origCost").innerHTML ="$" +origTotalCost.toFixed(2) + " (" + startTimeFormatted + "-" + origTimeFormatted + ")";
  document.getElementById("adjCost").innerHTML = "$" +adjTotalCost.toFixed(2) + " (" + startTimeFormatted + "-" + adjTimeFormatted + ")";
  document.getElementById("difference").innerHTML = "$" + costDiff.toFixed(2) ;
}

document.getElementById("GST").addEventListener("change", getTax);
document.getElementById("PST").addEventListener("change", getTax);
document.getElementById("GST").addEventListener("change", calculateTotalCost);
document.getElementById("PST").addEventListener("change", calculateTotalCost);
document.getElementById("accessFeeCheck").addEventListener("change", calculateTotalCost);

document.getElementById("origDate").addEventListener("change", calculateTotalCost);
document.getElementById("adjDate").addEventListener("change",calculateTotalCost);
document.getElementById("startDate").addEventListener("change",calculateTotalCost);
document.getElementById("origTime").addEventListener("change",calculateTotalCost);
document.getElementById("adjTime").addEventListener("change",calculateTotalCost);
document.getElementById("startTime").addEventListener("change",calculateTotalCost);
document.getElementById("minRate").addEventListener("change",calculateTotalCost);
document.getElementById("hourRate").addEventListener("change",calculateTotalCost);
document.getElementById("dayRate").addEventListener("change",calculateTotalCost);