function respondToRequest(response) {
  var request_id = $('.header').attr('id');
  var data = {
    response: response
  }
  $.ajax({
    type: 'POST',
    url: '/request/' + request_id,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(msg) {
      window.location.href = '/';
    }
  });
}

$('#decline').click(function(e) {
  respondToRequest('decline');
});

$('#accept').click(function(e) {
  respondToRequest('accept');
});
