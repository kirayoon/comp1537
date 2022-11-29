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
        $('#result').html(JSON.stringify(data));
      },
    });

    // alert('Hello, ' + $('#unicornNameHTML').val());
  });

  $('#unicornWeightBtn').click(function () {
    alert($('#lowerWeight').val() + ' ~ ' + $('#upperWeight').val());
  });

  $('#foodBtn').click(function () {
    if ($('#appleCheckbox').is(':checked')) {
      alert('Apple');
    }
  });

  $('#nameFilter').change(function () {
    if (this.checked) {
      //   alert('checked');
      newArr = receivedArr.map((item) => {
        return item.name;
      });
      console.log(newArr);
      $('#result').html(JSON.stringify(newArr[0]));
    } else {
      alert('unchecked');
    }
  });

  $('#filterBtn').click(function () {
    alert($('#filter').val());
  });
}

$(document).ready(setup);
