const _API_KEY = 'f38dc2be6aac8a00a99608ae9af4cdbd';
const _DAYS_OF_WEEK = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

let cityName = 'Hà Nội';
let current = document.getElementById('current');
let forecast = document.getElementById('forecast');
let _CURRENT_WEATHER = cityName => `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${_API_KEY}&lang=vi`;
let _fORECAST_WEATHER = cityName => `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${_API_KEY}&lang=vi`;

async function fetchData(api) {
    try{
        const res = await fetch(api);
        const data = await res.json();
        return data;
    }
    catch(error){
        console.log(error);
        return null;
    }
}

function Weather_forecast(cityName) { 
    fetchData(_CURRENT_WEATHER(cityName)).then(function(data) {
        var html = '';
        var name = data['name'];
        var temp = data['main']['temp'];
        var icon = data['weather'][0]['icon'];
        var date = new Date(data['dt']*1000);
        var description = data['weather'][0]['description'];
        description = description.charAt(0).toUpperCase() + description.slice(1);

        html = `
            <h1>${name}</h1>
            <p class="temperature">${temp.toFixed(0)}</p>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="">
            <h5 class="date">${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</h5>
            <div class="description">
                <p>${_DAYS_OF_WEEK[date.getDay()]}</p>
                <p>${description}</p>
            </div>
            <h4>Theo giờ</h4>
        `;
        current.innerHTML = html;
    })

    fetchData(_fORECAST_WEATHER(cityName)).then(function(data) {
        var html = '';
        for (var i=0;i<6;i++){
            var date = new Date(data['list'][i]['dt']*1000);
            var icon = data['list'][i]['weather'][0]['icon'];
            var temp = data['list'][i]['main']['temp'];

            html += `
                    <div class="box__list">
                        <p>${date.getHours()}h</p>
                        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="">
                        <p class="temperature">${temp.toFixed(0)}</p>
                    </div>
            `;
        }
        forecast.innerHTML = html;
    });
};

Weather_forecast(cityName);

function searchInput() {
    var check = document.getElementById('search_city').value;
    fetchData(_CURRENT_WEATHER(check))
    .then(data => data['cod'])
    .then(function(value) {
        if(value != 200) {
            alert('Không tìm thấy tên tỉnh/thành phố');
             console.log(cod);
        }
        else {
            Weather_forecast(check);
        }
    });
    
}


