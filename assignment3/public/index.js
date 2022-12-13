receivedArr = [];

function searchName() {
  $('#unicornNameBtn').click(function () {
    $.ajax({
      url: 'http://localhost:5000/filteredUnicorns',
      type: 'POST',
      data: {
        unicornNameFromHTTPbody: $('#unicornNameHTML').val(),
      },
      success: function (data) {
        receivedArr = data;
        result = '';
        result += '<table>';
        data.map((aUnicorn) => {
          result += `<tr>`;
          for (var field in aUnicorn) {
            result += `<td>${aUnicorn[field]}</td>`;
          }
          result += `</tr>`;
        });
        result += '</table>';

        // $('#result').html('<pre>' + JSON.stringify(data, null, 2) + '<pre>');
        $('#result').html(result);
      },
    });
  });
}

function searchWeight() {
  $('#unicornWeightBtn').click(function () {
    $.ajax({
      url: 'http://localhost:5000/weightUnicorns',
      type: 'POST',
      data: {
        lowerWeightFromHTTPbody: $('#lowerWeight').val(),
        upperWeightFromHTTPbody: $('#upperWeight').val(),
      },
      success: function (data) {
        receivedArr = data;
        result = '';
        result += '<table>';
        data.map((aUnicorn) => {
          result += `<tr>`;
          for (var field in aUnicorn) {
            result += `<td>${aUnicorn[field]}</td>`;
          }
          result += `</tr>`;
        });
        result += '</table>';

        // $('#result').html('<pre>' + JSON.stringify(data, null, 2) + '<pre>');
        $('#result').html(result);
      },
    });
  });
}

function searchFood() {
  $('#foodBtn').click(function () {
    if (
      $('#appleCheckbox').is(':checked') ||
      $('#carrotCheckbox').is(':checked')
    ) {
      let lovesArr = [];
      if ($('#appleCheckbox').is(':checked')) {
        lovesArr.push('apple');
      }
      if ($('#carrotCheckbox').is(':checked')) {
        lovesArr.push('carrot');
      }
      $.ajax({
        url: 'http://localhost:5000/foodUnicorns',
        type: 'POST',
        data: {
          lovesFromHTTPbody: lovesArr,
        },
        success: function (data) {
          receivedArr = data;
          result = '';
          result += '<table>';
          data.map((aUnicorn) => {
            result += `<tr>`;
            for (var field in aUnicorn) {
              result += `<td>${aUnicorn[field]}</td>`;
            }
            result += `</tr>`;
          });
          result += '</table>';

          // $('#result').html('<pre>' + JSON.stringify(data, null, 2) + '<pre>');
          $('#result').html(result);
        },
      });
    }
  });
}

function filterBtn() {
  $('#filterBtn').click(function () {
    result = '';
    result += '<table>';
    receivedArr.map((aUnicorn) => {
      result += `<tr>`;
      if (
        $('#nameFilter').is(':checked') &&
        $('#weightFilter').is(':checked')
      ) {
        result += `<td>${aUnicorn['name']}</td>`;
        result += `<td>${aUnicorn['weight']}</td>`;
      } else if ($('#nameFilter').is(':checked')) {
        result += `<td>${aUnicorn['name']}</td>`;
      } else if ($('#weightFilter').is(':checked')) {
        result += `<td>${aUnicorn['weight']}</td>`;
      } else {
        for (var field in aUnicorn) {
          result += `<td>${aUnicorn[field]}</td>`;
        }
      }
      result += `</tr>`;
    });
    result += '</table>';
    $('#result').html(result);
  });
}

function genderSelect() {
  $('#genderSelect').change(function () {
    $.ajax({
      url: 'http://localhost:5000/genderUnicorns',
      type: 'POST',
      data: {
        unicornGenderFromHTTPbody: $('#genderSelect').val(),
      },
      success: function (data) {
        receivedArr = data;
        result = '';
        result += '<ul>';
        data.map((aUnicorn) => {
          result += `<li>${aUnicorn['name']}</li>`;
          result += `<button class='showDetailsBtn'>show details</button>`;
          result += `<div class='unicornDetails' style="display:none;">`;
          result += `<button class="hideDetailsBtn">hide details</button>`;
          result += `<ul><li>dob: ${aUnicorn['dob']}</li></ul>`;
          result += `<ul><li>loves: `;
          aUnicorn['loves'].map((aLove) => {
            result += `<ul><li>${aLove}</li></ul>`;
          });
          result += `</li></ul>`;
          result += `<ul><li>weight: ${aUnicorn['weight']}</li></ul>`;
          result += `<ul><li>gender: ${aUnicorn['gender']}</li></ul>`;
          result += `<ul><li>vampires: ${aUnicorn['vampires']}</li></ul></div>`;
        });
        result += '</ul>';

        $('#result').html(result);
      },
    });
  });
}

// console log 'clicked' if detailsBtn is clicked
$(document).on('click', '.showDetailsBtn', function () {
  $('.unicornDetails').css({
    display: 'block',
  });
  $('.showDetailsBtn').css({
    display: 'none',
  });
  $('.hideDetailsBtn').css({
    display: 'block',
  });
});

$(document).on('click', '.hideDetailsBtn', function () {
  $('.showDetailsBtn').css({
    display: 'block',
  });
  $('.unicornDetails').css({
    display: 'none',
  });
  $('.hideDetailsBtn').css({
    display: 'none',
  });
});

function setup() {
  searchName();
  searchWeight();
  searchFood();
  genderSelect();
  filterBtn();
}

$(document).ready(setup);

// receivedArr = [];

// function displayTable(data) {
//   result = '';
//   result += '<table>';

//   // display the table header
//   result += `<tr>`;
//   for (var field in data[0]) {
//     if (field != '_id') {
//       result += `<th>${field}</th>`;
//     }
//   }
//   result += `</tr>`;

//   data.map((aUnicorn) => {
//     if (aUnicorn['gender'] == 'f') {
//       result += `<tr class=red>`;
//     } else {
//       result += `<tr class=''>`;
//     }

//     // don't display the id field
//     for (var field in aUnicorn) {
//       if (field != '_id') {
//         result += `<td>${aUnicorn[field]}</td>`;
//       }
//     }

//     // for (var field in aUnicorn) {
//     //   result += `<td>${aUnicorn[field]}</td>`;
//     // }
//     result += `</tr>`;
//   });
//   result += '</table>';
// }

// function searchName() {
//   $('#unicornNameBtn').click(function () {
//     $.ajax({
//       url: 'http://localhost:5000/filteredUnicorns',
//       type: 'POST',
//       data: {
//         unicornNameFromHTTPbody: $('#unicornNameHTML').val(),
//       },
//       success: function (data) {
//         console.log(data);
//         receivedArr = data;
//         displayTable(data);
//         $('#result').html(result);
//       },
//     });
//   });
// }

// function searchWeight() {
//   $('#unicornWeightBtn').click(function () {
//     $.ajax({
//       url: 'http://localhost:5000/weightUnicorns',
//       type: 'POST',
//       data: {
//         lowerWeightFromHTTPbody: $('#lowerWeight').val(),
//         upperWeightFromHTTPbody: $('#upperWeight').val(),
//       },
//       success: function (data) {
//         receivedArr = data;
//         displayTable(data);
//         $('#result').html(result);
//       },
//     });
//   });
// }

// function searchFood() {
//   $('#foodBtn').click(function () {
//     if (
//       $('#appleCheckbox').is(':checked') ||
//       $('#carrotCheckbox').is(':checked')
//     ) {
//       let lovesArr = [];
//       if ($('#appleCheckbox').is(':checked')) {
//         lovesArr.push('apple');
//       }
//       if ($('#carrotCheckbox').is(':checked')) {
//         lovesArr.push('carrot');
//       }
//       $.ajax({
//         url: 'http://localhost:5000/foodUnicorns',
//         type: 'POST',
//         data: {
//           lovesFromHTTPbody: lovesArr,
//         },
//         success: function (data) {
//           receivedArr = data;
//           displayTable(data);
//           $('#result').html(result);
//         },
//       });
//     }
//   });
// }

// function filterBtn() {
//   $('#filterBtn').click(function () {
//     result = '';
//     result += '<table>';
//     receivedArr.map((aUnicorn) => {
//       result += `<tr>`;
//       if (
//         $('#nameFilter').is(':checked') &&
//         $('#weightFilter').is(':checked')
//       ) {
//         result += `<td>${aUnicorn['name']}</td>`;
//         result += `<td>${aUnicorn['weight']}</td>`;
//       } else if ($('#nameFilter').is(':checked')) {
//         result += `<td>${aUnicorn['name']}</td>`;
//       } else if ($('#weightFilter').is(':checked')) {
//         result += `<td>${aUnicorn['weight']}</td>`;
//       } else {
//         for (var field in aUnicorn) {
//           result += `<td>${aUnicorn[field]}</td>`;
//         }
//       }
//       result += `</tr>`;
//     });
//     result += '</table>';
//     $('#result').html(result);
//   });
// }

// function setup() {
//   searchName();
//   searchWeight();
//   searchFood();
//   searchYear();
//   filterBtn();
// }

// $(document).ready(setup);
