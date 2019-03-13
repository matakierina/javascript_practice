(function() {
  'use strict';

  var btn = document.getElementById('btn');

  btn.addEventListener('click', function(){
    var n = Math.random();
    if(n < 0.02) {
      this.textContent = '大吉';
    } else if (n < 0.12){
      this.textContent = '吉';
    } else {
      this.textContent = '大凶';
    }
    /*
    var results = ['大吉', '中吉', '吉', '小吉', '末吉', '凶', '大凶'];
    var n = Math.floor(Math.random() * results.length);
    this.textContent = results[n];
    */
  });

  btn.addEventListener('mousedown', function(){
    this.className = 'pushed';
  });

  btn.addEventListener('mouseup', function(){
    this.className = '';
  });

})();
