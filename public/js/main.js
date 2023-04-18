const cityNameInfo = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const cityName = document.getElementById('city_name');
const day = document.getElementById('day');
const today_data = document.getElementById('today_data');

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
  };

  day.innerText = getCurrentDay();

  const getCurrentTime = () => {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();

    let hours = now.getHours();
    let mins = now.getMinutes();

    let periods = "AM";

    if (hours > 11) {
      periods = "PM";
      if (hours > 12) hours -= 12;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }

    return `${month} ${date} | ${hours}:${mins}${periods}`;
  };



  today_data.innerText = getCurrentTime();


const getInfo = async(event) =>{
    
    // alert('hi');
    event.preventDefault();
    //async await
    //let cityVal = cityNameInfo.value;
    if(cityNameInfo.value === ""){
        cityName.innerText = "Please type the city name";
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityNameInfo.value}&units=metric&appid=7e9c2cf2b252acafad6bf1271e7c7d0e`;
            const response = await fetch(url);
            const data = await response.json()
            // console.log(data);
            const arrData = [data];

            temp.innerText = arrData[0].main.temp;
            // temp_status.innerText = arrData[0].weather[0].main;
            cityName.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;

            //condition to check sunny or cloudy

            const tempMood = arrData[0].weather[0].main;

            if(tempMood == "Clear"){
                temp_status.innerHTML = 
                "<i class = 'fas fa-sun' style = 'color: #eccc68;'></i>";
            }else if(tempMood == "Clouds"){
                temp_status.innerHTML = 
                "<i class = 'fas fa-cloud' style = 'color: #f1f2f6;'></i>";
            }else if(tempMood == "Rain"){
                temp_status.innerHTML = 
                "<i class = 'fas fa-cloud-rain' style = 'color: #a4b0be;'></i>";
            }else{
                temp_status.innerText = arrData[0].weather[0].main;
            }

        }catch{
            cityName.innerText = "Please type the city name properly"; 
        }
        
    }





}

//api call
// 

submitBtn.addEventListener('click', getInfo);

