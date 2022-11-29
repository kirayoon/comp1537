receivedArr = [];

function setup() {
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

  $('#filterBtn').click(function () {});

  $('#nameCheckbox').change(function () {
    if (this.checked) {
      newArr = receivedArr.map((item) => {
        return item.name;
      });
      console.log(newArr);
      $('#result').html(JSON.stringify(newArr));
    } else {
      console.log('unchecked');
    }
  });
}

$(document).ready(setup);
