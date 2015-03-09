$('.delete').click(function() {
  var id = $('.id').text();
  $.ajax({
    type: 'DELETE',
    url: '/uglie/' + id}).
    done(function(msg) {
      window.location.replace("/");
    }); 
});

$('.like').click(function() {
  var id = $('.id').text();
  console.log('eyyyyy');
  $.ajax({
    type: 'POST',
    url: '/uglie/' + id + '/like'}).
    done(function(msg) {
      window.location.reload(true);
    });
});
