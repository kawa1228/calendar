const year = 2018
const month = 8

class CalendarData {
    execute() {
        const firstArray =  this.makeFirstData()
        const mainArray = this.makeData(year, month)
        const lastArray = this.makeLastData()

        return firstArray.concat(mainArray, lastArray)
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
        const week = ['日','月','火','水','木','金','土']
        return week[dat.getDay()]
    }
}

const getYMD = new GetYMD()
const titleYear = document.getElementById('title-year')
const titleMonth = document.getElementById('title-month')

//HTMLに出力
class OutPut {
    year() {
        titleYear.textContent = `${getYMD.getYear()}年`
    }
    month() {
        titleMonth.textContent = `${getYMD.getMonth()+1}月`
    }
}

const outPut = new OutPut()
outPut.year()
outPut.month()
