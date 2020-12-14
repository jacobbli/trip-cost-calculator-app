var date = new Date();
var currentHour = ''+date.getHours();
var currentMin = ''+date.getMinutes();

   if(currentMin.length<2){
        currentMin = '0'+currentMin;
    }
    if(currentHour.length==1){
        currentHour = '0'+currentHour;
    }
    else if(currentHour.length==0){
      currentHour = '00'+currentHour;
    }

var currentTime = currentHour+":"+currentMin;

document.getElementById('fdate').valueAsDate = new Date();
document.getElementById('tdate').valueAsDate = new Date();
document.getElementById('ftime').value = currentTime;
document.getElementById('ttime').value = currentTime;