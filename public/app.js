// references:
// https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation_watchposition
// https://developers.google.com/maps/documentation/geocoding/start?csw=1#ReverseGeocoding
//APPLICANT NAME: CALEB TONY-ENWIN



$(document).ready(function(){
  getLocation();

});

var lat;
var lng;
var googleApiKey = ""
var openWeatherApiKey = ""


//get location using ReverseGeocoding(latitude and longitude) and ajax
function getLocation(){
  var city;
  var country;
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){
        ///    console.log(position);  debugging
                  lat = position.coords.latitude;
                   lng = position.coords.longitude;

                   console.log(lat);
                   if(lat && lng){
                     $.ajax({

                       url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +","+ lng + "&key=" + googleApiKey,
                       type: "GET",
                       dataType: "json",
                       success: function(data){
                         city = data.results[0].address_components[4].short_name;
                         country = data.results[0].address_components[7].short_name;
                    //     console.log(city);
                          viewWeather(city,country);
                       }

                     })
                   }
                   else{
                     $("#message").text("Cannot find geoLocation");
                   }

          });
      } else {
          $("#message").text("Cannot find geoLocation");
      }
}

//function to view the weather of a particular city using the openweathermap api
function viewWeather(city,country){
//  var city =   getLocation();
  var d = new Date();
  var days = ["Sun","Mon","Tues","Wed","Thu","Fri","Sat"];
  var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  var day = days[d.getDay()];
  var hour = d.getHours();
  var min = d.getMinutes();
  var date = d.getDate();
  var month = months[d.getMonth()];

          $("#day").html(day + ", ");

          console.log(hour);

          if(hour < 12){
              $("#hour").html(hour +":");
            if(min < 10){
                $("#minute").html("0" + min + 'am');
            }
            else{
                $("#minute").html(min + "am");
            }
          }

          else if(hour-12 == 0){
            $("#hour").html(hour +":");
            if(min < 10){
                $("#minute").html("0" + min + 'pm');
            }
            else{
                $("#minute").html(min + "pm");
            }
          }

          else{
            $("#hour").html(hour-12 +":");
            if(min < 10){
                $("#minute").html("0" + min + 'pm');
            }
            else{
                $("#minute").html(min + "pm");
            }
          }




          $("#date").html(date);
          $("#month").text(month);
          $("#author").text("By CALEB TONY-ENWIN");
  console.log(city);
    $.ajax({

      url: "http://api.openweathermap.org/data/2.5/weather?q=" + city +","+country + "&units=metric" + "&APPID=" + openWeatherApiKey,
      type: "GET",
      dataType: "json",
      success: function(data){
        console.log(data);
        console.log(data.main.temp);
          console.log(data.weather[0].main);
            console.log(data.weather[0].description);
            console.log(data.weather[0].icon);

        $("#city").text(data.name.toUpperCase()+ ", " +data.sys.country);
        $("#temperature").html(data.main.temp - (data.main.temp % 1) + "&#176;c");
        $("#description").html(data.weather[0].main + " , " + data.weather[0].description);
        $("#icon").attr("src",'http://openweathermap.org/img/w/' + data.weather[0].icon + ".png");
        }
    })

}
