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
  'Flabbergasted',
  'Diarrhea',
  'Disgusted',
  'Horrified',
  'Basic',
  'Turnt',
  'Stupendous',
  'Juvenile',
  'Jesting',
  'Petrified',
  'Schwasted',
  'Tripping',
  'Dirty',
  'Shocked',
  'Flying',
  'Gargling',
  'Phallic',
  'Fuzzy',
  'Shaggy',
  'Uptight',
  'Damp',
  'Greasy',
  'Nosy',
  'Anxious',
  'Troubled',
  'Sore',
  'Confused',
  'Fierce',
  'Helpless',
  'Hissing',
  'Dangerous',
  'Flippant',
  'Cranky',
  'Mysterious',
  'Kooky',
  'Clownish',
  'Caustic',
  'Barbaric',
  'Cynical',
  'Eraconian',
  'Elated',
  'Fabulous',
  'Crackhead'
  ];

var nouns = [
  'Jofish',
  'Phillip',
  'Bernstein',
  'Ken',
  'Jay',
  'Josh',
  'Chipmunk',
  'Otter',
  'Wolf',
  'Stoner',
  'Giraffe',
  'Chihuahua',
  'Whale',
  'Chinchilla',
  'Bat',
  'Penguin',
  'Bear',
  'Platypus',
  'Tarantula',
  'Armadillo',
  'Mole',
  'Yeti',
  'Zebra',
  'Blob',
  'Mantis',
  'Duck',
  'Buffalo',
  'Crab',
  'Chimpanzee',
  'Owl',
  'Toad',
  'Cow',
  'Hedgehog',
  'Shark',
  'Jellyfish',
  'Octopus',
  'Meerkat',
  'Poodle',
  'Dragon',
  'Starfish',
  'Sloth'
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
