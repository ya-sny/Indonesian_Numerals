const { createApp } = Vue
createApp({
	data() {
		return {
			num: ""
		}
	},
	computed: {
		translate : function(){
			const number = this.num.replace(/[^0-9]/g, "");
			return number.length !== 1 ?
				convertToIndonesian(number) : ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"][number];
		}
	}
}).mount('#app');

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

function convertToIndonesian(number){
	const integer = parseInt(number);
	const digit = number.length;

	if (integer > 10 && integer < 20)
		return ones[number[1]] + "belas ";
	if (number[0] === "0" && number.length > 1)
		return convertToIndonesian(number.slice(1));
	switch (digit){
		case 1:
			return integer !== 1 ? ones[integer] : "satu";
		case 2:
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
			return ones[number[0]] + "juta " + convertToIndonesian(number.substring(1));
		case 8:
			return convertToIndonesian(number.substring(0, 2)) + "juta " + convertToIndonesian(number.substring(2));
		case 9:
			return convertToIndonesian(number.substring(0, 3)) + "juta " + convertToIndonesian("0" + number.substring(3));
		case 10:
			return (number[0] !== "1" ? ones[number[0]] + "milyar " : "satu milyar ") + convertToIndonesian(number.slice(1));
		case 11:
			return convertToIndonesian(number.substring(0, 2)) + "milyar " + convertToIndonesian(number.substring(2));
		case 12:
			return convertToIndonesian(number.substring(0, 3)) + "milyar " + convertToIndonesian("0" + number.substring(3));
		case 13:
			return (number[0] !== "1" ? ones[number[0]] + "trilyun " : "satu trilyun ") + convertToIndonesian(number.slice(1));
		case 14:
			return convertToIndonesian(number.substring(0, 2)) + "trilyun " + convertToIndonesian(number.substring(2));
		case 15:
			return convertToIndonesian(number.substring(0, 3)) + "trilyun " + convertToIndonesian("0" + number.substring(3));
	}
	return "";
}
