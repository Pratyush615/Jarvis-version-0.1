var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
//var mn = 0;
var M;
var l = 0;
var amountOfTimesUsed = -1;
var phrases = [
  'what is the time'
];
var name = "Pratyush"
var phrasePara = document.querySelector('.phrase');
var resultPara = document.querySelector('.result');
var diagnosticPara = document.querySelector('.output');
 
var testBtn = document.querySelector('button');
var hr;
var mn;


function check(){
if(hr % 12 === 12&&second() >= 1 <=4&&M === "PM"){
  amountOfTimesUsed = -1;
  console.log('hey')
}

}
check();
function randomPhrase() {
  var number = Math.floor(Math.random() * phrases.length);
  return number;
}
 
function testSpeech() {
  testBtn.disabled = true;
  testBtn.textContent = 'Processing...';
 
  var phrase = phrases[randomPhrase()];
  // To ensure case consistency while checking with the returned output text
  phrase = phrase.toLowerCase();
  resultPara.textContent = 'Please Wait. Processing command';
  resultPara.style.background = 'rgba(0,0,0,0.2)';
  diagnosticPara.textContent = '';
 
  var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase +';';
  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 200
  recognition.start();
  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object 
    var speechResult = event.results[0][0].transcript.toLowerCase();
    diagnosticPara.textContent = 'Speech received: ' + speechResult + '.';
     x = speechResult
     if(speechResult.indexOf("time") !== -1){
      console.log("Value exists!")
  } else{
      console.log("Value does not exists!")
  }
   
//////////////////////////////////////////////////////////////////////////////////////////////////////
if(speechResult.indexOf('time') !== -1) {
  hr = hour();
  mn = minute();
    resultPara.textContent = 'The time is '+currentTime;
    console.log(speechResult); 


  resultPara.style.background = 'lime';
} else {
  resultPara.textContent = 'Im sorry, I did not quite hear you. May you repeat the command.';
  resultPara.style.background = 'red';
}
///////////////////////////////////////////////////////////////////////////////////////
if(speechResult.indexOf('name') !== -1) {
  resultPara.textContent = 'Your name is '+ name;
  console.log(speechResult); 


resultPara.style.background = 'lime';
}else {
resultPara.textContent = 'Im sorry, I did not quite hear you. May you repeat the command.';
resultPara.style.background = 'red';
}


///////////////////////////////////////////////////////////////////////////////////////
/*if(speechResult.indexOf('time') !== -1) {
    amountOfTimesUsed = amountOfTimesUsed+1;
    check();
if(amountOfTimesUsed === 0){
    good = 'Have a nice Monday';
  }
  else{
    good = ' ';
  }
  resultPara.textContent = 'Hello there, '+name +"." + " "+ good;
  resultPara.style.background = 'lime';
} else {
  resultPara.textContent = 'Im sorry, I did not quite hear you. May you repeat the command.';
  resultPara.style.background = 'red';
}*/
///////////////////////////////////////////////////////////////////////////////////////
    
 
    console.log('Confidence: ' + event.results[0][0].confidence);
  }
  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
  }
 
  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.textContent = 'Start new test';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }
  
 
 
 
 
  recognition.onaudiostart = function(event) {
      //Fired when the user agent has started to capture audio.
      console.log('SpeechRecognition.onaudiostart');
  }
  
  recognition.onaudioend = function(event) {
      //Fired when the user agent has finished capturing audio.
      console.log('SpeechRecognition.onaudioend');
  }
  
  recognition.onend = function(event) {
      //Fired when the speech recognition service has disconnected.
      console.log('SpeechRecognition.onend');
  }
  
  recognition.onnomatch = function(event) {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      console.log('SpeechRecognition.onnomatch');
  }
  
  recognition.onsoundstart = function(event) {
      //Fired when any sound — recognisable speech or not — has been detected.
      console.log('SpeechRecognition.onsoundstart');
  }
  
  recognition.onsoundend = function(event) {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      console.log('SpeechRecognition.onsoundend');
  }
  
  recognition.onspeechstart = function (event) {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      console.log('SpeechRecognition.onspeechstart');
  }
  recognition.onstart = function(event) {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      console.log('SpeechRecognition.onstart');
  }
}
 
testBtn.addEventListener('click', testSpeech);
 


////////////////////Vocalization functions 
/*
function populateVoiceList() {
  voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (speechResult.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(speechResult);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    for(i = 0; i < voices.length ; i++) {
      if(voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    synth.speak(utterThis);
  }
}

inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
}

rate.onchange = function() {
  rateValue.textContent = rate.value;
}

voiceSelect.onchange = function(){
  speak();
}
*/