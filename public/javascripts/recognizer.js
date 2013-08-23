var recognizer = function(continuous, interimResults,lang) {
   var recognition = new webkitSpeechRecognition();
   recognition.continuous = continuous;
   recognition.interimResults = interimResults;
   recognition.lang = lang;
   recognition.onerror = function(event) { console.log('err'); }
   recognition.onend = function() { console.log('end');  }
   recognition.onstart = function() { console.log('start'); }

   var onInterim = [];
   var onFinal = [];
   function trigger(funcs, data) {
      funcs.forEach(function(func,k) {
         func.apply(this,data); 
      })
   }
   recognition.onresult = function(event) {
      console.log(event);
      var final_transcript = "";
      var interim_transcript = "";
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      var isInterim = interim_transcript !== "";
      if (isInterim) {
         trigger(onInterim, {message:iterim_transcript});
      }
      else {
         trigger(onFinal, {message:final_transcript});
      }
   }
   return {
      onInterim: function(func) {
         onInterim.push(func);
      },
      onFinal: function(func) {
         onFinal.push(func);
      },
      start: function() {
         recognition.start();
      }
   }
}
