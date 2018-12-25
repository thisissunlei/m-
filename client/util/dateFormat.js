import dateUtils from 'vue-dateutils';

function dateFormat(time,fmt) {

	if(!time){
		return
	}

	//	let format = fmt || 'YYYY-MM-dd HH:mm:ss'

	let format = fmt || 'YYYY-MM-dd'

    return dateUtils.dateToStr(format, new Date(time))
}


export default dateFormat;
