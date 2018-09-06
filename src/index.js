// 基本情報たち
const year = 2018
const month = 10
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

const calendarData = new CalendarData().execute()
console.log(calendarData)

//HTMLに出力
class OutPut {
    execute() {
        this.year()
        this.month()
        this.weeks()
        this.days()
    }
    year() {
        const titleYear = document.getElementById('title-year')
        titleYear.textContent = `${year}年`
    }
    month() {
        const titleMonth = document.getElementById('title-month')
        titleMonth.textContent = `${month}月`
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
        let putDays = ''

        for(let i = 0; i < calendarData.length; i++) {
            if(calendarData[i].weekday === 0) {
                putDays += '<div class="week-wrapper">'
                putDays += '<span>'
                putDays += calendarData[i].day
                putDays += '</span>'
            } else if(calendarData[i].weekday === 6) {
                putDays += '<span>'
                putDays += calendarData[i].day
                putDays += '</span>'  
                putDays += '</div>'                              
            } else  {
                putDays += '<span>'
                putDays += calendarData[i].day
                putDays += '</span>'
            }
        }
        document.getElementById('calendar-days').innerHTML = putDays
    }
}

new OutPut().execute()

//今日の年月日を取得
const dat = new Date()

class GetYMD {
    getYear() {
        return dat.getFullYear()
    }
    getMonth() {
        return dat.getMonth()
    }
    getDate() {
        return dat.getDate()
    }
    getWeek() {
        return week[dat.getDay()]
    }
}
const getYMD = new GetYMD()