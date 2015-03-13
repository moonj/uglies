var adjectives = [
  'Silly',
  'Angry',
  'Exasperated',
  'Fuming',
  'Hustling',
  'Vexed',
  'Inquisitive',
  'Constipated',
  'Stodgy',
  'Cruddy',
  'Sappy',
  'Whacky',
  'Zany',
  'Airheaded',
  'Ravenous',
  'Gluttonous',
  'Cornered',
  'Hurried',
  'Weirded-out',
  'Flabbergasting',
  'Diarrhea',
  'Disgusted',
  'Horrified',
  'Basic',
  'Turnt',
  'Stupendous',
  'Juvenile',
  'Jesting'
  ];

var nouns = [
  'Josh',
  'Phillip',
  'Gustavo',
  'Jofish',
  'Bernstein',
  'Ken',
  'Jay',
  'Chipmunk',
  'Otter',
  'Wolf',
  'Stoner',
  'Henry',
  'Steve',
  'Giraffe',
  'Adam',
  'Johnny',
  'Florentine',
  'Stella',
  'Victoria',
  'Debbie',
  'Becca'
];

function generateName() {
  return adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' + nouns[Math.floor(Math.random() * nouns.length)];
}

function setName() {
  $('.uglie-name').val(generateName());
}

setName();

$('#file-upload').click(function() {
  $('.photo-upload').click();
});

function readURL(input) {
  if(input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#file-upload').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$('.photo-upload').change(function() {
  readURL(this);
});

$('#refresh').click(function(e) {
  setName();
});
