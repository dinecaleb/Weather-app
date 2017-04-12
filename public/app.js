// references:
// https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation_watchposition
// https://developers.google.com/maps/documentation/geocoding/start?csw=1#ReverseGeocoding
//APPLICANT NAME: CALEB TONY-ENWIN



$(document).ready(function(){
  getLocation();

});

var lat;
var lng;
var key = "AIzaSyD6VqOEVWwJ9U3svYdEhiFtx3Gb-1nqTQ4"

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

                       url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat +","+ lng + "&key=" + key,
                       type: "GET",
                       dataType: "json",
                       success: function(data){
                         city = data.results[0].address_components[4].long_name;
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
          $("#hour").html(hour +":");
          if(min < 10){
              $("#minute").html("0" + min);
          }
          else{
              $("#minute").text(min);
          }

          $("#date").html(date);
          $("#month").text(month);
          $("#author").text("By CALEB TONY-ENWIN");
  console.log(city);
    $.ajax({

      url: "http://api.openweathermap.org/data/2.5/weather?q=" + city +"," + "&units=metric" + "&APPID=41623a15a0cdc370ddff8399326b1ec7",
      type: "GET",
      dataType: "json",
      success: function(data){
        console.log(data);
        console.log(data.main.temp);
          console.log(data.weather[0].main);
            console.log(data.weather[0].description);
            console.log(data.weather[0].icon);

        $("#city").text(city.toUpperCase()+ ", " +country);
        $("#temperature").html(Math.round(data.main.temp) + "&#176;c");
        $("#description").html(data.weather[0].main + " , " + data.weather[0].description);
        $("#icon").attr("src",'http://openweathermap.org/img/w/' + data.weather[0].icon + ".png");
        }
    })

}
