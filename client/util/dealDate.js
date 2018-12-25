import Vue from 'vue'

function dateToArray(date) {
	var myArray = Array();
	let myDate = new Date(date);
	let year = myDate.getFullYear();
	let month = myDate.getMonth() + 1;
	let day = myDate.getDate();
	let hour = myDate.getHours();
	let minutes = myDate.getMinutes();
	let seconds = myDate.getSeconds();
	if (hour == 0) {
		hour = "00";
	} else if (hour > 0 && hour < 10) {
		hour = `0${hour}`;
	}

	if (minutes == 0) {
		minutes = "00";
	} else if (minutes > 0 && minutes < 10) {
		minutes = `0${minutes}`;
	}

  if (seconds == 0) {
    seconds = "00";
  } else if (seconds > 0 && seconds < 10) {
    seconds = `0${seconds}`;
  }

	myArray[0] = year;
	myArray[1] = month;
	myArray[2] = day;
	myArray[3] = hour;
	myArray[4] = minutes;
  myArray[5] = seconds;
	return myArray;
}


export default {dateToArray:dateToArray};