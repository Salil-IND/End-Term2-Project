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

function updateUI() {
    let userData = localStorage.getItem("userData")
    if (!userData) {
        noSheets.style.display = "flex"
        noContents.style.display = "flex"
        yearBlock.style.display = "none"

        return;
    }



}
updateUI()

//Adding fucntionality to the add button
addBtn.addEventListener("click", function (event) {
    //Date
    const date = new Date(datePicker.value)
    //amount
    const expenditure = amountField.value
    //remarks
    const remarks = remarksField.value

    updateDB(date, expenditure, remarks)
    updateUI()
})

function updateDB(date, amount, remark) {
    const record = { date, amount, remark }
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear()

    let yearData = localStorage.getItem(year)

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
    } else {
        yearData["months"][month.toString()]["records"].add(record)
        yearData["total"] += amount
        yearData["months"][month.toString()]["total"] += amount;
    }

    localStorage.setItem(year, yearData)
}

function constructSheet(year){
    const yearData = localStorage.getItem(year)

}











