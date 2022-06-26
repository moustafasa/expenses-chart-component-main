// get chart element
let chart = document.querySelector(".container .body .chart");
let totalThisWeek = 200 / 4;

//  add column to chart
//  and add now class to now day column
function columnToChart(dayValue, dayName, progress) {
  let DateApp = new Date();
  let nowDate = DateApp.toLocaleDateString("en-us", { weekday: "short" });
  chart.innerHTML += `<div 
  class="column ${
    nowDate.toLowerCase() === dayName.toLowerCase() ? "now" : ""
  }">
    <span class="day-value-cont">
        <span class="day-value"
        style="height:${progress}%" 
        data-day-value="$${dayValue}"></span>
    </span>
    <span class="day-name">${dayName}</span>
 </div>`;
}
//  get data from api
async function fetchData() {
  let dataApp = await fetch("data.json");
  return dataApp.json();
}

// set data to column element
fetchData().then((dataApp) => {
  for (let i = 0; i < dataApp.length; i++) {
    let progress = ((dataApp[i].amount / totalThisWeek) * 100).toFixed(2);
    columnToChart(dataApp[i].amount, dataApp[i].day, Math.min(progress, 100));
  }
});

// change the top of container depend on the footer and h1 dimensions
let attribution = document.querySelector(".attribution");
let h1 = document.querySelector("h1");
let container = document.querySelector(".container");
container.style.cssText = `top:calc(50vh - ${
  attribution.clientHeight / 2 + h1.clientHeight / 2
}px)`;
window.onresize = () => {
  container.style.cssText = `top:calc(50vh - ${
    attribution.clientHeight / 2 + h1.clientHeight / 2
  }px)`;
};
