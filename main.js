const birthdate = document.querySelector('#input-birthdate');
const checkButton = document.querySelector('#check-button')
const result = document.querySelector('#result')
const gif = document.querySelector('#gif');

checkButton.addEventListener('click', clickHandler);
birthdate.addEventListener('change', changeHandler);

function changeHandler() {
    result.style.display = 'none';
}

function clickHandler(e) {
    var bdayStr = birthdate.value;
    if(bdayStr !== '') {
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome) {
            result.innerText = 'Hooray, it is a Palindrome!';
        } else {
            var [counter1, nextDate] = getNextClosestPalindromeDate(date);
            var [counter2, previousDate] = getPreviousClosestPalindromeDate(date);
            var str1, str2;
            (counter1 === 1) ? str1 = 'day' : str1 = 'days';
            (counter2 === 1) ? str1 = 'day' : str1 = 'days';
            setTimeout(displayResult, 3000)
            
        }
        function displayResult() {
            (counter1 < counter2) ? result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} which is ${counter1} ${str1} ahead!`
            : result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} which is ${counter2} ${str2} before!`; 
            result.style.display = "flex";
        }
    }
}

function reverseString(str) {
    let listOfChars = str.split('');
    let reversedListOfChars = listOfChars.reverse();
    let reversedString = reversedListOfChars.join('');
    return reversedString;
}

function isPalindrome(str) {
    let reversedStr = reverseString(str);
    return (str === reversedStr)
}

function convertToString(date) {
    let dateStr = {day: '', month: '', year: ''};
    if(date.day < 10) {
        dateStr.day = '0' + date.day;
    }else {
        dateStr.day = date.day.toString();
    }
    if(date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    let dateStr = convertToString(date);
    const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    const allDateFormats = getAllDateFormats(date);
    let flag = false;
    for(let i = 0; i < allDateFormats.length; i++) {
        if(isPalindrome(allDateFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if(year % 400 === 0) {
        return true;
    }
    if(year % 100 === 0) {
        return false;
    }
    if(year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    const noOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 2) {
        if(isLeapYear(year)) {
            if(day > 29){
                day = 1;
                month++;
            }
        } else {
            if(day > 28) {
                day = 1;
                month++;
            }
        }

    } else {
        if(day > noOfDays[month - 1]) {
            day = 1;
            month++;
        }
    }
    if(month > 12) {
        month = 1;
        year++;
    }

    return {day: day, month: month, year: year};
}

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;
    const noOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 1) {
        if(day < 1) {
            day = noOfDays[month.length-1];
            month = noOfDays.length;
        }
    } else if(month === 3) {
        if(day < 1) {
            if(isLeapYear(year)) {
                day = 29
                month = month - 1;
            }else {
                day = 28;
                month = month - 1;
            }
        }
    } else {
        if(day < 1) {
            day = noOfDays[month-2]
            month = month - 1;
        }
    }
    return {day: day, month: month, year: year};
}

function getNextClosestPalindromeDate(date) {
    let counter = 0
    var nextDate = getNextDate(date);
    while(1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [counter, nextDate]
}

function getPreviousClosestPalindromeDate(date) {
    let counter = 0
    let previousDate = getPreviousDate(date);
    while(1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if(isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [counter, previousDate];
}