var PAGE_SIZE;
var CURRENT_PAGE = 1;
var TOTAL_PAGES;

function displayPageNum(total_pages) {
  for (let i = 1; i <= total_pages; i++) {
    $("#pageNum").append(
      `
        <span>
        <button class="page_btn" id="btn${i}" value="${i}">
        ${i}
        </button>
        </span>
      `
    );
  }

  $("#first_btn, #last_btn").css({
    display: "inline-block",
  });

  $(".page_btn").click(() => {
    $("#prev_btn, #next_btn").css({
      display: "inline-block",
    });
  });
}

function displayPage() {
  // empty page when search button or new page size is clicked
  $("#movies, #pageNum").empty();

  // get search term from input
  var movieTitle = $("#searchTerm").val();
  $.ajax({
    url: `https://api.themoviedb.org/3/search/movie?api_key=f0a38761eabbbebf5b14fa1c412ba063&query=${movieTitle}&language=en-US&page=1&include_adult=false`,
    type: "GET",
    success: function (data) {
      // set page numbering
      let result_length = data.results.length;
      TOTAL_PAGES = Math.ceil(result_length / Number(PAGE_SIZE));
      let start_index = PAGE_SIZE * (CURRENT_PAGE - 1);
      let end_index = PAGE_SIZE * (CURRENT_PAGE - 1) + PAGE_SIZE;

      console.log(CURRENT_PAGE, PAGE_SIZE, start_index, end_index, TOTAL_PAGES);

      displayPageNum(TOTAL_PAGES);

      // display movie data
      for (i = start_index; i < end_index; i++) {
        $("#movies").append(
          `
            <div>
              <h4 style="margin-bottom: 0; margin-top: 5px">
              #${i + 1} <br> 
              Title: ${data.results[i].title}</h4>
              <p style="margin-top: 5px">
                Description: ${data.results[i].overview}
              </p>
              <img 
                src="http://image.tmdb.org/t/p/w500/${
                  data.results[i].poster_path
                }" 
                style="width: 100px">
              <button backdropName="${data.results[i].backdrop_path}" 
                name="${
                  data.results[i].title
                }" class="backdropBtn">BackDrop Image
              </button>
              <hr>
            </div>
          `
        );
      }
    },
  });
}

setup = function () {
  PAGE_SIZE = Number($("#pageSize option:selected").val());

  $("#search_btn").click(() => {
    displayPage();
  });

  $("#pageSize").change(() => {
    PAGE_SIZE = Number($("#pageSize option:selected").val());
    displayPage();
  });

  $("#pageNum").on("click", "button", function () {
    CURRENT_PAGE = $(this).val();
    displayPage();
  });

  $("#first_btn").click(() => {
    CURRENT_PAGE = 1;
    displayPage();
  });

  $("#last_btn").click(() => {
    CURRENT_PAGE = TOTAL_PAGES;
    displayPage();
  });

  $("#prev_btn").click(() => {
    if (CURRENT_PAGE > 1) {
      CURRENT_PAGE = CURRENT_PAGE - 1;
      displayPage();
    }
  });

  $("#next_btn").click(() => {
    if (CURRENT_PAGE < TOTAL_PAGES) {
      CURRENT_PAGE = Number(CURRENT_PAGE) + 1;
      displayPage();
    }
  });

  $("body").on("click", ".backdropBtn", function () {
    $("#backdropImage").html(
      `<img src="http://image.tmdb.org/t/p/w500/${$(this).attr(
        "backdropName"
      )}" alt="image not available">`
    );
  });

  $("body").on("click", ".backdropBtn", function () {
    $("#backdropTitle").html(`BackDrop Image: ${$(this).attr("name")}`);
  });
};

$(document).ready(setup);
