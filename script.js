const noSheets = document.querySelector("#nothing")
const noContents = document.querySelector("#contents-empty")
const contentsList = document.querySelector(".contents-list")
const yearBlock = document.querySelector('.year-block')
const addBtn = document.querySelector('#add-log-btn')
const datePicker = document.querySelector("#date-picker")
const amountField = document.querySelector("#amount")
const remarksField = document.querySelector("#remarks")

const monthSliderTrack = document.querySelector(".month-slider-track")
const yearPicker = document.getElementById("year-selector")
const currentMonthDisplay = document.getElementById("current-month")
const leftNavBtn = document.querySelector("#nav-prev")
const rightNavBtn = document.querySelector("#nav-next")

const monthMap = {
  "1": "January", "2": "February", "3": "March", "4": "April",
  "5": "May", "6": "June", "7": "July", "8": "August",
  "9": "September", "10": "October", "11": "November", "12": "December"
};

function updateContents() {
    const userData = JSON.parse(localStorage.getItem("userData"))
    if (!userData || userData.years.length === 0) {
        noContents.style.display = "flex"
        contentsList.innerHTML = '<p id="contents-empty">Nothing to see here</p>'
        return
    }
    
    noContents.style.display = "none"
    let sidebarHTML = ""
    
    userData.years.forEach(year => {
        const yearData = JSON.parse(localStorage.getItem(year))
        if(yearData) {
            let monthsHTML = ""
            for (let i = 1; i <= 12; i++) {
                const mKey = i.toString()
                if (yearData.months[mKey] && yearData.months[mKey].total > 0) {
                    monthsHTML += `
                        <div style="padding: 5px 10px; font-size: 0.9rem; color: #ccc; display: flex; justify-content: space-between;">
                            <span>${monthMap[mKey]}</span>
                            <span>${yearData.months[mKey].total}</span>
                        </div>`
                }
            }
            if (monthsHTML !== "") {
                sidebarHTML += `
                    <div style="margin-bottom: 15px; width: 100%;">
                        <div style="padding: 5px; background: rgba(255,255,255,0.1); border-radius: 4px; font-weight: bold; display: flex; justify-content: space-between;">
                            <span>${year}</span>
                            <span>${yearData.total}</span>
                        </div>
                        ${monthsHTML}
                    </div>`
            }
        }
    })
    contentsList.innerHTML = sidebarHTML
}

function deleteRecord(id) {
    const userData = JSON.parse(localStorage.getItem("userData"))
    let yearData = JSON.parse(localStorage.getItem(userData.currentYear))
    const currentMonthKey = userData.currentMonth.toString()
    
    const recordIndex = yearData.months[currentMonthKey].records.findIndex(r => r.id === id)
    
    if (recordIndex !== -1) {
        const record = yearData.months[currentMonthKey].records[recordIndex]
        const amount = Number(record.amount)
        
        yearData.months[currentMonthKey].total = Number(yearData.months[currentMonthKey].total) - amount
        yearData.total = Number(yearData.total) - amount
        
        yearData.months[currentMonthKey].records.splice(recordIndex, 1)
        
        localStorage.setItem(userData.currentYear, JSON.stringify(yearData))
        updateUI()
    }
}

function constructSheets(year) {
    let yearData = JSON.parse(localStorage.getItem(year))
    if (!yearData) yearData = { months: {} }
    
    let allSlides = ""

    for (let i = 1; i <= 12; i++) {
        const monthKey = i.toString()
        let sheetRows = ""
        
        if (yearData.months && yearData.months[monthKey] && yearData.months[monthKey].records.length > 0) {
            yearData.months[monthKey].records.forEach((record) => {
                sheetRows += `
                    <tr data-id="${record.id}">
                        <td>
                            <input type="text" value="${new Date(record.date).toLocaleDateString()}" readonly style="cursor: default; opacity: 0.7;">
                        </td>
                        <td>
                            <input type="number" 
                                   value="${record.amount}" 
                                   data-field="amount" 
                                   onchange="updateRecord('${record.id}', 'amount', this.value)">
                        </td>
                        <td>
                            <input type="text" 
                                   value="${record.remark}" 
                                   data-field="reason" 
                                   onchange="updateRecord('${record.id}', 'remark', this.value)">
                        </td>
                        <td style="text-align: right;">
                            <button class="delete-btn" onclick="deleteRecord('${record.id}')">Delete</button>
                        </td>
                    </tr>`
            })
        } else {
            sheetRows = `<tr><td colspan="4" style="text-align:center; padding:20px; color:gray;">No records found</td></tr>`
        }

        allSlides += `
            <div class="month-slide">
                <table class="month-table">
                    <thead>
                        <tr>
                            <th width="20%">Date</th>
                            <th width="20%">Amount</th>
                            <th width="50%">Reason</th>
                            <th width="10%"></th> 
                        </tr>
                    </thead>
                    <tbody>${sheetRows}</tbody>
                </table>
            </div>`
    }
    monthSliderTrack.innerHTML = allSlides
}

function updateUI() {
    updateContents()
    if (localStorage.length === 0) {
        noSheets.style.display = "block"
        yearBlock.style.display = "none"
        return
    } 
    
    const userData = JSON.parse(localStorage.getItem("userData"))
    if (!userData) {
        noSheets.style.display = "block"
        yearBlock.style.display = "none"
        return
    }

    noSheets.style.display = "none"
    yearBlock.style.display = "block"

    constructSheets(userData.currentYear)

    monthSliderTrack.style.transform = `translateX(calc(${(userData.currentMonth - 1)} * -100%))`
    currentMonthDisplay.innerText = monthMap[userData.currentMonth]
    
    yearPicker.innerHTML = ""
    userData.years.forEach(function(year){
        yearPicker.innerHTML += `<option ${(year == userData.currentYear) ? "selected" : ''} value="${year}">${year}</option>`
    })

    if (userData.currentMonth == 1){
        leftNavBtn.disabled = true
        leftNavBtn.style.opacity = 0.3
    } else {
        leftNavBtn.disabled = false
        leftNavBtn.style.opacity = 1
    }

    if (userData.currentMonth == 12){
        rightNavBtn.disabled = true
        rightNavBtn.style.opacity = 0.3
    } else {
        rightNavBtn.disabled = false
        rightNavBtn.style.opacity = 1
    }
}

function updateDB(id, date, amount, remark) {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const record = { id, date, amount, remark }

    let yearData = JSON.parse(localStorage.getItem(year))
    let userData = JSON.parse(localStorage.getItem("userData"))

    if (!userData) {
        userData = { "years": [], "currentYear": year, "currentMonth": month }
    }

    if (!yearData) {
        yearData = { "total": 0, "months": {} }
        for(let i=1; i<=12; i++) {
            yearData.months[i] = { "total": 0, "records": [] }
        }
    }

    yearData["months"][month.toString()]["records"].push(record)
    yearData["months"][month.toString()]["records"].sort((a, b) => new Date(a.date) - new Date(b.date))
    
    yearData["total"] = Number(yearData["total"]) + amount 
    yearData["months"][month.toString()]["total"] = Number(yearData["months"][month.toString()]["total"]) + amount

    localStorage.setItem(year, JSON.stringify(yearData))

    if (!userData["years"].includes(year.toString())) {
        userData["years"].push(year.toString())
        userData["years"].sort()
    }
    userData.currentYear = year
    userData.currentMonth = month

    localStorage.setItem("userData", JSON.stringify(userData))
}

function updateRecord(id, type, value) {
    const userData = JSON.parse(localStorage.getItem("userData"))
    let yearData = JSON.parse(localStorage.getItem(userData.currentYear))
    const currentMonthKey = userData.currentMonth.toString()

    const records = yearData.months[currentMonthKey].records
    const record = records.find(r => r.id === id)

    if (record) {
        if (type === "amount") {
            const oldVal = Number(record.amount)
            const newVal = Number(value)
            yearData.months[currentMonthKey].total = Number(yearData.months[currentMonthKey].total) - oldVal + newVal
            yearData.total = Number(yearData.total) - oldVal + newVal
            record.amount = newVal
        } else {
            record[type] = value
        }
    }
    localStorage.setItem(userData.currentYear, JSON.stringify(yearData))
    updateUI()
}

//= = == = = = = = = = = = = = = = = = = = =    ____  _____    _    _        ____ ___  ____  _____ _  - - - - - - - - - - - - - - - - - -
//= = == = = = = = = = = = = = = = = = = = =   |  _ \| ____|  / \  | |      / ___/ _ \|  _ \| ____| | - - - - - - - - - - - - - - - - - -
//= = == = = = = = = = = = = = = = = = = = =   | |_) |  _|   / _ \ | |     | |  | | | | | | |  _| | | - - - - - - - - - - - - - - - - - -
//= = == = = = = = = = = = = = = = = = = = =   |  _ <| |___ / ___ \| |___  | |__| |_| | |_| | |___|_| - - - - - - - - - - - - - - - - - -
//= = == = = = = = = = = = = = = = = = = = =   |_| \_\_____/_/   \_\_____|  \____\___/|____/|_____(_) - - - - - - - - - - - - - - - - - -

addBtn.addEventListener("click", function (event) {
    if(!datePicker.value || !amountField.value) return
    const id = crypto.randomUUID()
    const date = new Date(datePicker.value)
    const expenditure = Number(amountField.value)
    const remarks = remarksField.value

    updateDB(id, date, expenditure, remarks)
    updateUI()

    datePicker.value = ""
    amountField.value = ""
    remarksField.value = ""
})

yearPicker.addEventListener("change", function(event){
    const year = yearPicker.value
    let userData = JSON.parse(localStorage.getItem("userData"))
    userData.currentYear = year
    userData.currentMonth = 1 
    localStorage.setItem("userData", JSON.stringify(userData))
    updateUI()
})

leftNavBtn.addEventListener("click", function(event){
    let userData = JSON.parse(localStorage.getItem("userData"))
    if (userData.currentMonth > 1) {
        userData.currentMonth = Number(userData.currentMonth) - 1
        localStorage.setItem("userData", JSON.stringify(userData))
        updateUI()
    }
})

rightNavBtn.addEventListener("click", function(event){
    let userData = JSON.parse(localStorage.getItem("userData"))
    if (userData.currentMonth < 12) {
        userData.currentMonth = Number(userData.currentMonth) + 1
        localStorage.setItem("userData", JSON.stringify(userData))
        updateUI()
    }
})

updateUI()