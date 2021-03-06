/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__script_main__ = __webpack_require__(1);

__WEBPACK_IMPORTED_MODULE_0__script_main__["a" /* hello */]()

// 基本情報たち
const dat = new Date()
let year = dat.getFullYear()
let month = dat.getMonth()+1
let today = dat.getDate()
const week = ['日','月','火','水','木','金','土']

class CalendarData {
    execute() {
        const firstAry =  this.makeFirstData()
        const mainAry = this.makeData(year, month)
        const lastAry = this.makeLastData()

        return firstAry.concat(mainAry, lastAry)
    }
    makeData(year, month) {
        // 初日の情報
        const firstDate = new Date(year,(month -1),1)
        // 初日の曜日
        const weekday = firstDate.getDay()
        // 末日
        const lastDay = new Date(firstDate.getFullYear(),firstDate.getMonth()+1,0).getDate()
        // カレンダー情報
        const calendarData = []
        let weekdayCount = weekday
        for (let i = 0; i < lastDay; i++) {
            calendarData[i] = {
                day: i + 1,
                weekday: weekdayCount
            }
            // 曜日のカウントが6(土曜日)まできたら0(日曜日)に戻す
            if(weekdayCount >= 6) {
                weekdayCount = 0
            } else {
                weekdayCount += 1
            }
        }
        return calendarData
    }
    makeFirstData() {
        const makeData =  this.makeData(year, month)

        let week = makeData[0].weekday
        const makeFirstWeek = []

        while(week > 0) {
            week--
            makeFirstWeek.unshift({
                day: '',
                weekday: week
            })
        }
        return makeFirstWeek
    }
    makeLastData() {
        const makeData =  this.makeData(year, month)

        let week = makeData[makeData.length -1].weekday
        const makeLastWeek = []

        while(week < 6) {
            week++
            makeLastWeek.push({
                day: '',
                weekday: week
            })
        }
        return makeLastWeek
    }
}

const calendarData = new CalendarData()
calendarData.execute()

//HTMLに出力
class OutPut {
    execute() {
        this.year()
        this.month()
        this.weeks()
        this.days()
        this.makePutData()
    }
    year() {
        const titleYear = document.getElementById('title-year')
        titleYear.textContent = `${year}年`
        return year
    }
    month() {
        const titleMonth = document.getElementById('title-month')
        titleMonth.textContent = `${month}月`
        return month
    }
    weeks() {
        let putWeeks = ''

        for(let i =0; i < week.length; i++) {
            putWeeks += '<span>'
            putWeeks += week[i]
            putWeeks += '</span>'
        }

        const calendarWeeks = document.getElementById('calendar-weeks')
        calendarWeeks.innerHTML = putWeeks
    }
    days() {
        let cData = calendarData.execute()
        let putDays = ''

        for(let i = 0; i < cData.length; i++) {
            if(cData[i].weekday === 0) {
                putDays += '<div class="week-wrapper">'
                putDays += '<span>'
                putDays += cData[i].day
                putDays += '</span>'
            } else if(cData[i].weekday === 6) {
                putDays += '<span>'
                putDays += cData[i].day
                putDays += '</span>'  
                putDays += '</div>'                              
            } else {
                putDays += '<span>'
                putDays += cData[i].day
                putDays += '</span>'
            }
        }
        return putDays
    }
    makePutData() {
        const change = /<span>(\d+)<\/span>/g
        const newPutDays = this.days().replace(change, '<span class="this-month">$1</span>')

        const todaySpan = new RegExp('<span class="this-month">' + today + '</span>')
        const putToday = newPutDays.replace(todaySpan, '<span class="this-month today-style">' + today + '</span>')

        document.getElementById('calendar-days').innerHTML = putToday

        return putToday
    }
}

const outPut = new OutPut()
outPut.execute()

const changeTodayStyle = ()=> {
    const deleteDay = new RegExp('<span class="this-month today-style">' + today + '</span>')
    const deleteToday = outPut.makePutData().replace(deleteDay, '<span class="this-month">' + today + '</span>')

    document.getElementById('calendar-days').innerHTML = deleteToday
}

const prevBtn =  document.getElementById('calendar-prev')
prevBtn.addEventListener('click',()=> {
    if(month <= 1) {
        year--
        month = 12
    } else {
        month--
    }
    if(outPut.year() !== dat.getFullYear() || outPut.month() !== dat.getMonth()+1) {
        changeTodayStyle()
    } else {
        outPut.execute()
    }
})

const nextBtn = document.getElementById('calendar-next')
nextBtn.addEventListener('click',()=> {
    if(month >= 12) {
        year++
        month = 1
    } else {
        month++
    }
    if(outPut.year() !== dat.getFullYear() || outPut.month() !== dat.getMonth()+1) {
        changeTodayStyle()
    } else {
        outPut.execute()
    }
})


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const hello = ()=> {
    console.log('hello!')
}
/* harmony export (immutable) */ __webpack_exports__["a"] = hello;


/***/ })
/******/ ]);