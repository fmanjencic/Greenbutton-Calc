let monthStrings = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June'
}

let arr = [
  {date:'2/3/2025', start_time: '2025-02-03 00:00:00-05:00', end_time: '2025-02-03 00:59:59-05:00', usage: 0.2274},
  {date:'2/3/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.249},
  {date:'3/1/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.275},
  {date:'3/1/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.4756},
  {date:'4/1/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.275},
  {date:'5/1/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.275},
]

//Create vars for first month to start off, first year marker too?
let firstEntry = new Date(arr[0].date);
let startingYear = parseInt(firstEntry.getFullYear()); //2025

console.log(firstEntry.getFullYear())
//Create object to house monthly usage information. 
let yearData = {startingYear: startingYear};

//Arr to hold additional year objects as they come about
let dataYears = [yearData]

//Populate Usage Object
for (let i = 0; i < arr.length; ++i) {
  let dataDate = new Date(arr[i].date);
  if (dataDate.getFullYear() === startingYear) {
    if (!yearData.hasOwnProperty(dataDate.getMonth())) {
    yearData[dataDate.getMonth()] = {'offpeakkwh': 0, 'onpeakkwh' : 0, monthNum: dataDate.getMonth(), monthName: monthStrings[dataDate.getMonth()]}
  }
  //yearData[dataDate.getMonth()] += { : arr[i].usage};
  console.log(yearData[dataDate.getMonth()] + " This is...", i)
  yearData[dataDate.getMonth()].onpeakkwh += arr[i].usage
  } else {
    let newYear = {startingYear: startingYear++}
    if (!newYear.hasOwnProperty(dataDate.getMonth())) {
    newYear[dataDate.getMonth()] = {'offpeakkwh': 0, 'onpeakkwh' : 0, monthNum: dataDate.getMonth(), monthName: monthStrings[dataDate.getMonth()]}
  }
  //yearData[dataDate.getMonth()] += { : arr[i].usage};
  console.log(newYear[dataDate.getMonth()] + " This is...", i)
  newYear[dataDate.getMonth()].onpeakkwh += arr[i].usage
  dataYears.append(newYear)
  }
}

console.log(yearData)
//Output Year Bill Data Totals

console.log(dataYears)

//TO-DO:
//Output data and assign to variables to use for rate calculation
//Implement mechanism to prevent data from over 12 months












