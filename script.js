//Structure of the data to be stored in local Storage
//             {"2025":{
//     "total":5000,
//     "months":{
//         "1":{
//             "total":5000,
//             "records":[
//                 {"id":1245, "date":"20-01-2025", "amount":5000, "reason":"Bought a monitor"},
//             ]
//         }
//     }
// }}





//--------------------------------START------------------------------------------------------//

//Placeholder text when nothings there

const noSheets = document.querySelector("#nothing")
const noContents = document.querySelector("#contents-empty")
const yearBlock = document.querySelector('.year-block')
const addBtn = document.querySelector('#add-log-btn')
const datePicker = document.querySelector("#date-picker")
const amountField = document.querySelector("#amount")
const remarksField = document.querySelector("#remarks")

const monthSliderTrack = document.querySelector(".month-slider-track")
const yearPicker = document


// Inside your loop where you build the HTML string:
// const rowHTML = `
//   <tr data-id="${record.id}">
//       <td>
//           <input type="text" value="${record.date}" readonly style="cursor: default; opacity: 0.7;">
//       </td>

//       <td>
//           <input type="number" 
//                  value="${record.amount}" 
//                  data-field="amount" 
//                  onchange="updateRecord(${record.id}, 'amount', this.value)">
//       </td>

//       <td>
//           <input type="text" 
//                  value="${record.reason}" 
//                  data-field="reason" 
//                  onchange="updateRecord(${record.id}, 'reason', this.value)">
//       </td>

//       <td style="text-align: right;">
//           <button class="delete-btn" onclick="deleteRecord(${record.id})">Delete</button>
//       </td>
//   </tr>
// `;

function updateUI() {
    if (localStorage.length == 0) {
        noSheets.style.display = "flex"
        noContents.style.display = "flex"
        yearBlock.style.display = "none"

        return;
    } else {
        const userData = JSON.parse(localStorage.getItem("userData"))
        if (userData){
            constructSheets(userData.currentYear)

            monthSliderTrack.style.transform = `translate(calc(${userData.currentMonth}*(-100%) ))`
        }
        

    }

   




}
updateUI()

//Adding fucntionality to the add button
addBtn.addEventListener("click", function (event) {
    //Id
    const id = crypto.randomUUID()
    //Date
    const date = new Date(datePicker.value)
    //amount
    const expenditure = amountField.value
    //remarks
    const remarks = remarksField.value

    updateDB(id, date, expenditure, remarks)
    updateUI()
})

function updateDB(id, date, amount, remark) {
    const record = { id, date, amount, remark }
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear()

    let yearData = JSON.parse(localStorage.getItem(year))
    let userData = JSON.parse(localStorage.getItem("userData"))

    if (!userData) {
        userData = { "years": [], "currentYear": "", "currentMonth": 0 }
    }

    if (!yearData) {
        yearData = {
            "total": 0,
            "months": {
                "1": {
                    "total": 0,
                    "records": []
                },
                "2": {
                    "total": 0,
                    "records": []
                },
                "3": {
                    "total": 0,
                    "records": []
                },
                "4": {
                    "total": 0,
                    "records": []
                },
                "5": {
                    "total": 0,
                    "records": []
                },
                "6": {
                    "total": 0,
                    "records": []
                },
                "7": {
                    "total": 0,
                    "records": []
                },
                "8": {
                    "total": 0,
                    "records": []
                },
                "9": {
                    "total": 0,
                    "records": []
                },
                "10": {
                    "total": 0,
                    "records": []
                },
                "11": {
                    "total": 0,
                    "records": []
                },
                "12": {
                    "total": 0,
                    "records": []
                }

            }
        }


        // yearData = {"months":{month :{"total":amount, "record":[record]}}, "total":amount}
    }

    yearData["months"][month.toString()]["records"].push(record)
    yearData["months"][month.toString()]["records"].sort((a, b) => { new Date(a.date) - new Date(b.date) })
    yearData["total"] = NUmber(yearData["total"])+amount //Increasing the total
    yearData["months"][month.toString()]["total"] = Number(yearData["months"][month.toString()]["total"]) + amount; //

    localStorage.setItem(year, JSON.stringify(yearData))

    if (!userData["years"].includes(year)) {
        userData["years"].push(year)
        userData["years"].sort()
    }
    userData.currentYear = year
    userData.currentMonth = month

    localStorage.setItem("userData", JSON.stringify(userData))
}

function constructSheets(year) {
    const yearData = JSON.parse(localStorage.getItem(year))

    const monthsList = Object.keys(yearData["months"])

    monthsList.forEach(function (month) {
        const monthRecords = yearData["months"][month]["records"]
        let sheetRows = ""
        monthRecords.forEach((record) => {
            sheetRows += `
                    <tr data-id="${record.id}">
                        <td>
                            <input type="text" value="${record.date}" readonly style="cursor: default; opacity: 0.7;">
                        </td>

                        <td>
                            <input type="number" 
                                    value="${record.amount}" 
                                    data-field="amount" 
                                    onchange="updateRecord(${record.id}, 'amount', this.value)">
                        </td>

                        <td>
                            <input type="text" 
                                    value="${record.remark}" 
                                    data-field="reason" 
                                    onchange="updateRecord(${record.id}, 'reason', this.value)">
                        </td>

                        <td style="text-align: right;">
                            <button class="delete-btn" onclick="deleteRecord(${record.id})">Delete</button>
                        </td>
                    </tr>
                    `
        })
        //----------------------------------------------MONTH SLIDER----------------------------------------------//
        monthSliderTrack.innerHTML = `<div class="month-slide" data-month=${month.toString()}>
                            <table class="month-sheet" data-month=${month.toString()}>
                                <thead>
                                    <th class="date-header">Date</th>
                                    <th class="amount-header">Amount Spent</th>
                                    <th class="remarks-header">Reason</th>
                                </thead>
                                <tbody>
                                    ${sheetRows}
                                </tbody>
                            </table>
                        </div>`

        
    })

}











