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
        $('#result').html('<pre>' + JSON.stringify(data, null, 2) + '<pre>');
      },
    });

    // alert('Hello, ' + $('#unicornNameHTML').val());
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
        $('#result').html(JSON.stringify(data));
      },

      // alert($('#lowerWeight').val() + ' ~ ' + $('#upperWeight').val());
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
          $('#result').html(JSON.stringify(data));
        },
      });
    }    
  });

  $('.nameCheckbox').change(function () {
    if (this.checked) {
      //   alert('checked');
      newArr = receivedArr.map((item) => {
        return item.name;
      });
      console.log(newArr);
      $('#result').html(JSON.stringify(newArr));
    } else {
      console.log('unchecked');
    }
  });

  $('#filterBtn').click(function () {
    alert($('#filter').val());
  });
}

$(document).ready(setup);
