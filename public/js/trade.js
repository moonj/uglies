$('.tradeable').click(function(e) {
  var elem = $(this);
  elem.toggleClass('trademarked'); 
});

$("#request").click(function(e) {
  var marked = $('.trademarked');
  var ids = [];
  for(var i = 0; i < marked.length; i++) {
    ids.push($(marked[i]).attr('id'));
  }
  var trade_id = $('.uglie-trade').attr('id');
  var requestee_id = $('.owner-id').attr('id');
  var data = {
    id: trade_id,
    offer: ids,
    requestee: requestee_id
  };
  console.log(data);
  $.ajax({
    type: 'POST',
    url: '/uglie/' + trade_id + '/trade',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify(data),
    success: function(msg) {
      $('#back').click();
    }
  })
});
