
(function(global) {
  var Recorder;

  var RECORDED_AUDIO_TYPE = "audio/wav";

  Recorder = {
    recorder: null,
    recorderOriginalWidth: 0,
    recorderOriginalHeight: 0,
    uploadFormId: null,
    uploadFieldName: null,
    isReady: false,

    connect: function(name, attempts) {
      if(navigator.appName.indexOf("Microsoft") != -1) {
        Recorder.recorder = window[name];
      } else {
        Recorder.recorder = document[name];
      }

      if(attempts >= 40) {
        return;
      }

      // flash app needs time to load and initialize
      if(Recorder.recorder && Recorder.recorder.init) {
        Recorder.recorderOriginalWidth = Recorder.recorder.width;
        Recorder.recorderOriginalHeight = Recorder.recorder.height;
        if(Recorder.uploadFormId && $) {
          var frm = $(Recorder.uploadFormId); 
          Recorder.recorder.init(frm.attr('action').toString(), Recorder.uploadFieldName, frm.serializeArray());
        }
        return;
      }

      setTimeout(function() {Recorder.connect(name, attempts+1);}, 100);
    },

    playBack: function(name) {
      Recorder.recorder.playBack(name);
    },

    pausePlayBack: function(name) {
      Recorder.recorder.pausePlayBack(name);
    },
    
    playBackFrom: function(name, time) {
      Recorder.recorder.playBackFrom(name, time);
    },

    record: function(name, filename) {
      Recorder.recorder.record(name, filename);
    },

    observeLevel: function() {
      Recorder.recorder.observeLevel();
    },

    stopObservingLevel: function() {
      Recorder.recorder.stopObservingLevel();
    },

    observeSamples: function() {
      Recorder.recorder.observeSamples();
    },

    stopObservingSamples: function() {
      Recorder.recorder.stopObservingSamples();
    },

    resize: function(width, height) {
      Recorder.recorder.width = width + "px";
      Recorder.recorder.height = height + "px";
    },

    defaultSize: function(width, height) {
      Recorder.resize(Recorder.recorderOriginalWidth, Recorder.recorderOriginalHeight);
    },

    show: function() {
      Recorder.recorder.show();
    },

    hide: function() {
      Recorder.recorder.hide();
    },

    duration: function(name) {
      return Recorder.recorder.duration(name || Recorder.uploadFieldName);
    },

    getBase64: function(name) {
      var data = Recorder.recorder.getBase64(name);
      return 'data:' + RECORDED_AUDIO_TYPE + ';base64,' + data;
    },

    getBlob: function(name) {
      var base64Data = Recorder.getBase64(name).split(',')[1];
      return base64toBlob(base64Data, RECORDED_AUDIO_TYPE);
    },

    getCurrentTime: function(name) {
    	return Recorder.recorder.getCurrentTime(name);
    },

    updateForm: function() {
      var frm = $(Recorder.uploadFormId); 
      Recorder.recorder.update(frm.serializeArray());
    },

    setAuthenHeaders: function(signature, timestamp) {
      Recorder.recorder.setAuthenHeaders(signature, timestamp);
    },

    showPermissionWindow: function() {
      Recorder.resize(240, 160);
      // need to wait until app is resized before displaying permissions screen
      var recorder = Recorder.recorder;
      setTimeout(function(){recorder.permit();}, 1);
    },

    configure: function(rate, gain, silenceLevel, silenceTimeout) {
      rate = parseInt(rate || 22);
      gain = parseInt(gain || 100);
      silenceLevel = parseInt(silenceLevel || 0);
      silenceTimeout = parseInt(silenceTimeout || 4000);
      switch(rate) {
      case 44:
      case 22:
      case 11:
      case 8:
      case 5:
        break;
      default:
        throw("invalid rate " + rate);
      }

      if(gain < 0 || gain > 100) {
        throw("invalid gain " + gain);
      }

      if(silenceLevel < 0 || silenceLevel > 100) {
        throw("invalid silenceLevel " + silenceLevel);
      }

      if(silenceTimeout < -1) {
        throw("invalid silenceTimeout " + silenceTimeout);
      }

      Recorder.recorder.configure(rate, gain, silenceLevel, silenceTimeout);
    },

    setUseEchoSuppression: function(val) {
      if(typeof(val) != 'boolean') {
        throw("invalid value for setting echo suppression, val: " + val);
      }

      Recorder.recorder.setUseEchoSuppression(val);
    },

    setLoopBack: function(val) {
      if(typeof(val) != 'boolean') {
        throw("invalid value for setting loop back, val: " + val);
      }

      Recorder.recorder.setLoopBack(val);
    }
  };

  function base64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  }


  global.FWRecorder = Recorder;


})(this);
