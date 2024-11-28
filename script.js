const url=new URLSearchParams(window.location.search);
const v=url.get('v');

const script=document.createElement('script')
document.body.appendChild(script)

if (v==undefined || v==''){
	script.src='/ver/1.2.js'
}
else if(v=='1.0' || v=='1.1'){
	script.src='/v/'+v+'.js';
	if (v=='1.0'){
		document.getElementsByTagName('code')[0].innerText='v1.0.2'
	}
}
else{
	script.src='/v/1.1.js'
}

