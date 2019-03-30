window.$ = window.jQuery = require('jquery');
const { ipcRenderer, remote } = require('electron');  


var storageXMLdata = {
	"ex1":"",
	"ex2":"",
	"ex3":"",
	"radios1":"",
	"radios2":""
	};

$('#ex1').slider({
	formatter: function(value) {
		
		return storageXMLdata['ex1'] =value;
	}
});

$('#ex2').slider({
	formatter: function(value) {
		
		return storageXMLdata['ex2'] =value;
	}
});

$('#ex3').slider({
	formatter: function(value) {
		
		return storageXMLdata['ex3'] = value;
	}
});

$('#radios1').on('click', function(slider){
	storageXMLdata['radios2'] ="";
	storageXMLdata['radios1'] = $(this).val();
});

$('#radios2').on('click', function(slider){
	storageXMLdata['radios1'] ="";
	storageXMLdata['radios2'] =$(this).val();
});

ipcRenderer.on('app-close', _ => {
	 const fs = require('fs');
      ipcRenderer.send('closed', storageXMLdata);
      const obj = storageXMLdata['ex1']+ "\n"+
				  storageXMLdata['ex2']+ "\n"+
				  storageXMLdata['ex3']+ "\n"+
				  storageXMLdata['radios1']+ "\n"+
				  storageXMLdata['radios2'];
		  
    fs.writeFile("test.xml", obj, function(err, data) {
		if (err) {
			throw err;
		}
	}); 
      
    console.log(storageXMLdata);
});

window.onload = function(e){ 
	const fs = require('fs');
	fs.readFile("test.xml", function read(err, data) {
		if (err) {
			throw err;
		}

		var arr = data.toString().match(/^.+$/gm);
		var i =1, flag =0;
		if(arr!=null)
		arr.forEach((element) => {
			if(element!="")
			 $('#ex' + i++).slider('setValue', element);	
			 flag = (element == "left") ? 0: 1;
		});
		 
		flag ? $('#radios1').prop("checked", "true"):$('#radios2').prop("checked", "true");
		
			 
	});
	
}

