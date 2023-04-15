This program translates numbers from 0 to 99999999999999 into Indonesian words. It includes an HTML file, index.html, and a JavaScript file, main.js. The HTML file contains a Vue.js application that allows the user to input a number and displays the translated result. The JavaScript file defines the functions that perform the translation.

# Usage
To use the program, open the index.html file in a web browser or click [here](https://h-z-m.github.io/Indonesian_Numerals/). Enter a number  into the input field. The program will remove any non-numeric characters and translate the number into Indonesian words.

# Implementation
The main.js file defines a convertToIndonesian function that takes a string of digits as input and returns the Indonesian word for that number. The function uses a recursive approach, splitting the number into groups of three digits (for example, "123456789" becomes "123,456,789") and translating each group separately. It also defines an object ones that maps single-digit numbers to their Indonesian words.

The Vue.js application defined in index.html uses the computed property to calculate the translated result whenever the user inputs a number. It first removes any non-numeric characters from the input using a regular expression, then passes the resulting string to the convertToIndonesian function.

# Limitations
This program can only translate numbers from 0 to 99999999999999. Input that includes non-numeric characters will be cleaned up, but input that exceeds the maximum value will produce incorrect results. Additionally, the program only translates numbers into Indonesian; it does not perform any validation or error handling.
