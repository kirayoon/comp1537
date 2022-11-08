setup = function () {
  $.ajax({
    url: "https://api.themoviedb.org/3/movie/top_rated?api_key=f0a38761eabbbebf5b14fa1c412ba063",
    type: "GET",
    success: function (data) {
      // console.log(data.results[0].title);
      for (i = 0; i < data.results.length; i++) {
        $("main").append(
          `
            <div>
            <h3>${data.results[i].title}</h3>
            <p>
            ${data.results[i].overview}
            </p>
            <img src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" 
            style="width: 80%"><br>
            <button backdropName="${data.results[i].backdrop_path}" name="${data.results[i].title}" class="backdropBtn">BackDrop Image</button>
            <hr>
            </div>
            `
        );
      }
    },
  });
  $("body").on("click", ".backdropBtn", function () {
    $("#backdropImage").html(
      `<img src="http://image.tmdb.org/t/p/w500/${$(this).attr(
        "backdropName"
      )}">`
    );
  });
  $("body").on("click", ".backdropBtn", function () {
    $("#backdropTitle").html("BackDrop Image: " + $(this).attr("name"));
  });
};

$(document).ready(setup);
