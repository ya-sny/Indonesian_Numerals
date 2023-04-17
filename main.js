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
	const convert3Digits = (digit, word) => {
		switch (digit){
			case 1:
				return (number[0] !== "1" ? ones[number[0]] + `${word} ` : `satu ${word} `) + convertToIndonesian(number.substring(1));
			case 2:
				return convertToIndonesian(number.substring(0, 2)) + `${word} `  + convertToIndonesian(number.substring(2));
			case 3:
				return convertToIndonesian(number.substring(0, 3)) + `${word} ` + convertToIndonesian("0" + number.substring(3));
		}
		return "null";
	}


	if (number[0] === "0" && number.length > 1)
		return convertToIndonesian(number.substring(1));
	if (integer > 10 && integer < 20)
		return ones[number[1]] + "belas ";
	switch (digit){
		case 1:
			return integer !== 1 ? ones[integer] : "satu ";
		case 2:
		case 3:
		case 4:
			return ones[number[0]] + ["puluh ", "ratus ", "ribu "][digit - 2] + convertToIndonesian(number.substring(1));
		case 5:
		case 6:
			return convert3Digits(digit - 3, "ribu");
		case 7:
		case 8:
		case 9:
			return convert3Digits(digit - 6, "juta");
		case 10:
		case 11:
		case 12:
			return convert3Digits(digit - 9, "milyar");
		case 13:
		case 14:
		case 15:
			return convert3Digits(digit - 12, "trilyun");
	}
	return "null";
}
