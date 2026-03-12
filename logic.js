let monthStrings = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}

let greenButtonData = [
  {date:'1/1/2025', start_time: '2025-02-03 00:00:00-05:00', end_time: '2025-02-03 00:59:59-05:00', usage: 0.2274},
  {date:'2/3/2025', start_time: '2025-02-03 00:00:00-05:00', end_time: '2025-02-03 00:59:59-05:00', usage: 0.2274},
  {date:'2/3/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.249},
  {date:'2/3/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.249},
  {date:'2/25/2025', start_time: '2025-02-03 17:00:00-05:00', end_time: '2025-02-03 19:00:00-05:00', usage: 0.249},
  {date:'2/3/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.249},
  {date:'2/3/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.249},
  {date:'3/1/2025', start_time: '2025-02-03 13:00:00-05:00', end_time: '2025-02-03 14:59:59-05:00', usage: 0.275},
  {date:'3/1/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.4756},
  {date:'4/1/2025', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.275},
  {date:'5/1/2025', start_time: '2025-02-03 07:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.275},
  {date:'2/1/2026', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.275},
  {date:'12/1/2027', start_time: '2025-02-03 01:00:00-05:00', end_time: '2025-02-03 01:59:59-05:00', usage: 0.275}
]

//Helper function to check if during peak hours
const isOnPeak = (dataStart, dataEnd) => {
  if (dataStart >= 17 && dataEnd < 20) {
    //console.log('Returned True******************************')
    return true;
  } else {
    //console.log('Returned False', dataStart, dataEnd)
    return false;
  }
}


//First month variables
let firstEntry = new Date(greenButtonData[0].date);

let startingYear = parseInt(firstEntry.getFullYear()); //2025

//Initial object to house monthly usage information. 
let firstYear = {dataYear: startingYear};

//Array to hold additional year objects as they come about
let allDataYears = [firstYear]

//Populate Usage Object
for (let i = 0; i < greenButtonData.length; ++i) {
  //Create date object per entry
  let dataDate = new Date(greenButtonData[i].date);
  if (dataDate.getFullYear() === startingYear) {
    //Check if current month data already exists, create key if not. 
    if (!firstYear.hasOwnProperty(dataDate.getMonth())) {
    firstYear[dataDate.getMonth()] = {'offpeakkwh': 0, 'onpeakkwh' : 0, monthNum: dataDate.getMonth(), monthName: monthStrings[dataDate.getMonth()], year: dataDate.getFullYear()}
  }

  //TO-DO: Insert logic to determine if time data-snippet was between 5:00-8:00pm. 
  dataStart = new Date(greenButtonData[i].start_time);
  dataEnd = new Date(greenButtonData[i].end_time);
  //console.log('Start Hour: ', dataStart.getHours())
  //console.log('End Hour: ', dataEnd.getHours())

  const isOnPeakBool = isOnPeak(dataStart.getHours(), dataEnd.getHours());

  if (isOnPeakBool) {
    //Add kwH data to month
    firstYear[dataDate.getMonth()].onpeakkwh += greenButtonData[i].usage
  } else {
    //Add kwH data to month
    firstYear[dataDate.getMonth()].offpeakkwh += greenButtonData[i].usage
  }

  

  } 
  //Start new year of data
  else {
    let newYear = {dataYear: startingYear + 1}
    startingYear = startingYear + 1;
    if (!newYear.hasOwnProperty(dataDate.getMonth())) {
    newYear[dataDate.getMonth()] = {'offpeakkwh': 0, 'onpeakkwh' : 0, monthNum: dataDate.getMonth(), monthName: monthStrings[dataDate.getMonth()], year: dataDate.getFullYear()}
  }
  //Add kwh hours to month in new data year
  newYear[dataDate.getMonth()].onpeakkwh += greenButtonData[i].usage
  allDataYears.push(newYear)
  }
}


//Output all data divided by year
console.log('Displaying all Data: ', allDataYears)

//TO-DO:
//DONE: Insert logic to determine if kWH was on or off-peak.
//Devise logic to test on-peak versus off-peak charging quality control
//Add logic to insert a two-year limit.
//Brainstorm other data validation/safeguards
//Insert logic to prevent any non-csv files from uploading. 











