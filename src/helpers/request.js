import handleJson from './handle-json';
import handleFormData from './handle-formdata';
import handleUrlEncode from './handle-urlencode';

function request({ url, method = 'POST', dataType = 'json', data = {}, beforeSend = () => { }, success = () => { }, fail = () => { }, complete = () => { } }) {
	if (!url) {
		throw new Error('url参数不可缺省');
	}
	let xml = new XMLHttpRequest();
	if (method === 'GET') {
		xml.open(method, url + '?' + handleUrlEncode(data));
		beforeSend(xml);
		xml.send();
	} else {
		xml.open(method, url);
		let dataData;
		switch (dataType) {
			case 'json':
				xml.setRequestHeader('Content-Type', 'application/json');
				dataData = handleJson(data);
				break;
			case 'formdata':
				// xml.setRequestHeader('Content-Type', "application/vnd.ms-excel");
				dataData = handleFormData(data);
				break;
			default:
				xml.setRequestHeader('Content-Type', 'application/json');
				dataData = handleJson(data);
		}
		beforeSend(xml);
		xml.send(dataData);
	}
	xml.onreadystatechange = () => {
		if (xml.readyState === 4) {
			if (xml.status === 200) {
				let data = JSON.parse(xml.responseText);
				let msg = data.msg;
				try {
					if(method=='POST'){
						if(msg === undefined) throw new Error('msg is not defined') 
					}
				} catch (e) {
					data = JSON.parse(data);
				}
				if (method == 'GET') {
					success(data)
				} else if (method == 'POST') {
					if (data.msg = 'ok') {
						success(data);
					} else {
						fail(data);
					}
				}
			}else if(xml.status === 401){
				let data = JSON.parse(xml.responseText);
				let msg = data.msg;
				alert(msg)
			} else {
				alert('请求遇到了问题，请稍后再尝试');
				fail();
			}
		}
		complete();
	}
};



export default request;
