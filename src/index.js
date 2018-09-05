const dat = new Date

getCalendarData = (year, month) => {
    // 選択した月の初日の情報
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

const year = 2018
const month = 8
console.log(getCalendarData(year, month))

//今日の年月日を取得
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
