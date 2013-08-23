var recognizer = function(continuous, interimResults,lang) {
   var recognition = new webkitSpeechRecognition();
   recognition.continuous = continuous;
   recognition.interimResults = interimResults;
   recognition.lang = lang;
   recognition.onerror = function(event) { console.log('err'); }
   recognition.onend = function() { console.log('end');  }
   recognition.onstart = function() { console.log('start'); }

   var interimEvents = [];
   var finalEvents = [];
   function trigger(funcs, data) {
      funcs.forEach(function(func,k) {
         func.apply(this,[data]); 
      })
   }
   recognition.onresult = function(event) {
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
         trigger(interimEvents, {message:interim_transcript});
      }
      else {
         trigger(finalEvents, {message:final_transcript});
      }
   }
   return {
      onInterim: function(func) {
         interimEvents.push(func);
      },
      onFinal: function(func) {
         finalEvents.push(func);
      },
      start: function() {
         recognition.start();
      }
   }
}
