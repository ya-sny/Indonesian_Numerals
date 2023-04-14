const digit = ["", "", "puluh", "ratus", "ribu", "puluh ribu", "ratus ribu", "juta", "puluh juta", "ratus juta", "milyar", "trilyun"];
const ones = { "0" : "", "1" : "se", "2" : "dua ", "3" : "tiga ", "4" : "empat ", "5" : "lima ", "6" : "enam ", "7" : "tujuh ", "8" : "delapan ", "9" : "sembilan ", }

const { createApp } = Vue
createApp({
	data() {
		return {
			num: ""
		}
	},
	computed: {
		translate : function(){
			if (this.num.length === 1)
				return ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"][parseInt(this.num)];
			return convertToIndonesian(this.num);
		}
	}
}).mount('#app')

function convertToIndonesian(number){
	let integer = parseInt(number);
	if (integer > 10 && integer < 20){
		return ones[number[1]] + "belas";
	}
	if (number[0] === "0" && number.length > 1)
		return convertToIndonesian(number.slice(1));
	if (number.length <= 1){
		if (number !== "1")
			return ones[number];
		return "satu";
	}
	return ones[number[0]] + digit[number.length] + " " + convertToIndonesian(number.slice(1));
}
