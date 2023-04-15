// const digit = ["", "", "puluh", "ratus", "ribu", "puluh ribu", "ratus ribu", "juta", "puluh juta", "ratus juta", "milyar", "trilyun"];
const ones = {
	"0" : "",
	"1" : "se",
	"2" : "dua ",
	"3" : "tiga ",
	"4" : "empat ",
	"5" : "lima ",
	"6" : "enam ",
	"7" : "tujuh ",
	"8" : "delapan ",
	"9" : "sembilan "
};

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
}).mount('#app');

function convertToIndonesian(number){
	const integer = parseInt(number);
	const digit = number.length;

	if (number[0] === "0" && number.length > 1)
		return convertToIndonesian(number.slice(1));
	switch (digit){
		case 1:
			if (number !== "1")
				return ones[number];
			return "satu";
		case 2:
			if (integer > 10 && integer < 20)
				return ones[number[1]] + "belas ";
			return ones[number[0]] + "puluh " + convertToIndonesian(number.slice(1));
		case 3:
			return ones[number[0]] + "ratus " + convertToIndonesian(number.slice(1));
		case 4:
			return ones[number[0]] + "ribu " + convertToIndonesian(number.slice(1));
		case 5:
			return convertToIndonesian(number.substring(0, 2)) + "ribu " + convertToIndonesian(number.substring(2));
		case 6:
			return convertToIndonesian(number.substring(0, 3)) + "ribu " + convertToIndonesian("0" + number.substring(3));
		case 7:
			if (number[0] !== "1")
				return convertToIndonesian(number.substring(0, 1)) + "juta " + convertToIndonesian(number.substring(1));
			return "sejuta " + convertToIndonesian(number.substring(1));
		case 8:
			return convertToIndonesian(number.substring(0, 2)) + "juta " + convertToIndonesian(number.substring(2));
		case 9:
			return convertToIndonesian(number.substring(0, 3)) + "juta " + convertToIndonesian("0" + number.substring(3));
	}
	return "fooo";
}
