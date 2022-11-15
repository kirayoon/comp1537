var PAGE_SIZE;
var CURRENT_PAGE = 1;

display_page = function () {
  // empty page when search button or new page size is clicked
  $("#movies").empty();
  $("#pageNum").empty();

  // get search term from input
  var movieTitle = $("#searchTerm").val();
  $.ajax({
    url: `https://api.themoviedb.org/3/search/movie?api_key=f0a38761eabbbebf5b14fa1c412ba063&query=${movieTitle}&language=en-US&page=1&include_adult=false`,
    type: "GET",
    success: function (data) {
      // set page number buttons
      let result_length = data.results.length;
      let total_pages = Math.ceil(result_length / PAGE_SIZE);

      $("section").css({
        display: "block",
      });

      for (let i = 1; i <= total_pages; i++) {
        $("#pageNum").append(
          `
            <span>
            <button id="btn${i}">
            ${i}
            </button>
            </span>
          `
        );
      }

      // display first page of movie data
      let start_index = PAGE_SIZE * (CURRENT_PAGE - 1);
      let end_index = PAGE_SIZE * (CURRENT_PAGE - 1) + PAGE_SIZE;
      for (i = start_index; i < end_index; i++) {
        $("#movies").append(
          `
            <div>
            <h4 style="margin-bottom: 0; margin-top: 5px">${data.results[i].title}</h4>
            <p style="margin-top: 5px">
            ${data.results[i].overview}
            </p>
            <img src="http://image.tmdb.org/t/p/w500/${data.results[i].poster_path}" 
            style="width: 100px">
            <button backdropName="${data.results[i].backdrop_path}" name="${data.results[i].title}" class="backdropBtn">BackDrop Image</button>
            <hr>
            </div>
          `
        );
      }
    },
  });
};

setup = function () {
  PAGE_SIZE = $("#pageSize option:selected").val();

  $("#search_btn").click(() => {
    display_page();
  });

  $("#pageSize").change(() => {
    PAGE_SIZE = $("#pageSize option:selected").val();
    display_page();
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
