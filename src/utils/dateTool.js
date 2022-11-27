export const dateProcessing = function(time,type){
    var d = time ? new Date(time) : new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hours = d.getHours();
    var min = d.getMinutes();
    var seconds = d.getSeconds();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hours < 0) hours = '0' + hours;
    if (min < 10) min = '0' + min;
    if (seconds < 10) seconds = '0' + seconds;

    var res="";
    switch (type) {
        case 'yyyy-mm-dd':
          res=(year + '-' + month + '-' + day);
          break;
        case 'yyyy-mm-dd hh:mm':
            res=(year + '-' + month + '-' + day + ' ' + hours + ':' + min);
            break;
        default:
            res=(year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + seconds);
            break;
    }
    return res;

  };