(function() {
  'use strict';

  var slider = document.getElementById('slider');
  var label = document.getElementById('label');
  var btn = document.getElementById('btn');
  var result = document.getElementById('result');
  var numbers = document.getElementById('numbers');
  var symbols = document.getElementById('symbols');

  function getPassword() {
    var seed_letters = 'abcdefghijklmnopqrstuvwxyz';
    var seed_numbers = '0123456789';
    var seed_symbols = '!#$%&()';
    var seed;

    var len = slider.value;
    var pwd = '';

    seed = seed_letters + seed_letters.toUpperCase();

    if (numbers.checked === true) {
      seed += seed_numbers;
    }
    if (symbols.checked === true) {
      seed += seed_symbols;
    }

    for (var i = 0; i < len; i++) {
      pwd += seed[Math.floor(Math.random() * seed.length)];
    }

      result.value = pwd;
  }

  slider.addEventListener('change', function() {
    label.innerHTML = this.value;
  });

  btn.addEventListener('click', function() {
    getPassword();
  });

  result.addEventListener('click', function() {
    this.select();
  });

  getPassword();

})();
