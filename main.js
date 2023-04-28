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

function convertToIndonesian(str_number){
	const int_number = parseInt(str_number);
	const number_of_digits = str_number.length;
	const convert3Digits = (number_of_digits, word) => {
		switch (number_of_digits){
			case 1:
				return (str_number[0] !== "1" ? ones[str_number[0]] + `${word} ` : `satu ${word} `) + convertToIndonesian(str_number.substring(1));
			case 2:
				return convertToIndonesian(str_number.substring(0, 2)) + `${word} `  + convertToIndonesian(str_number.substring(2));
			case 3:
				return convertToIndonesian(str_number.substring(0, 3)) + `${word} ` + convertToIndonesian("0" + str_number.substring(3));
		}
		return "null";
	}

	if (str_number[0] === "0" && str_number.length > 1)
		return convertToIndonesian(str_number.substring(1));
	if (int_number > 10 && int_number < 20)
		return ones[str_number[1]] + "belas ";
	switch (number_of_digits){
		case 1:
			return int_number !== 1 ? ones[int_number] : "satu ";
		case 2:
		case 3:
		case 4:
			return ones[str_number[0]] + ["puluh ", "ratus ", "ribu "][number_of_digits - 2] + convertToIndonesian(str_number.substring(1));
		case 5:
		case 6:
			return convert3Digits(number_of_digits - 3, "ribu");
		case 7:
		case 8:
		case 9:
			return convert3Digits(number_of_digits - 6, "juta");
		case 10:
		case 11:
		case 12:
			return convert3Digits(number_of_digits - 9, "milyar");
		case 13:
		case 14:
		case 15:
			return convert3Digits(number_of_digits - 12, "trilyun");
	}
	return "null";
}
