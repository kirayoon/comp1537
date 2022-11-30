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

function serachWeight() {
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

function setup() {
  searchName();
  serachWeight();
  searchFood();
  filterBtn();
}

$(document).ready(setup);
