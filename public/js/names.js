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

var name = adjectives[Math.floor(Math.random() * adjectives.length)] + ' ' + nouns[Math.floor(Math.random() * nouns.length)];

$('.uglie-name').val(name);
$('#file-upload').click(function() {
  $('.photo-upload').click();
});
