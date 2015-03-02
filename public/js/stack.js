$(document).ready(function() {
  $('img').on('dragstart', function(event) { event.preventDefault(); });
  var stack,
      cards;

      cards = [].slice.call(document.querySelectorAll('ul li'))

      stack = gajus.Swing.Stack({
        throwOutConfidence: function (offset, element) {
          return Math.min(Math.abs(offset) / element.offsetWidth * 2, 1);
        }
      });

      cards.forEach(function (targetElement) {
        stack.createCard(targetElement);
      });

      stack.on('throwout', function (e) {
        console.log('Card has been thrown out of the stack.');
        console.log('Throw direction: ' + (e.throwDirection == gajus.Swing.Card.DIRECTION_LEFT ? 'left' : 'right'));
        $(".photo").not(e.target).addClass("transition");
        setTimeout(function() {
          $(e.target).remove();
          $(".photo").removeClass("transition");
        }, 200);
      });

      stack.on('throwin', function (e) {
        console.log('Card has snapped back to the stack.');
      });
});
