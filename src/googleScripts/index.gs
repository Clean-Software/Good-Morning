/**
* Funtion to send good morning
/
function sendGoodMorning() {
  sendPhrase("Bom dia");
}

/**
* Funtion to send good afternoon
/
function sendGoodAfternoon() {
  sendPhrase("Boa Tarde");
}

/**
* Funtion to send good night
/
function sendGoodNight() {
  sendPhrase("Boa noite");
}

/**
* function to trigger actions for running in determinated time
/
function trigger() {
  ScriptApp.newTrigger("sendGoodMorning")
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();

  ScriptApp.newTrigger("sendGoodAfternoon")
    .timeBased()
    .everyDays(1)
    .atHour(14)
    .create();

  ScriptApp.newTrigger("sendGoodNight")
    .timeBased()
    .everyDays(1)
    .atHour(22)
    .create();
}

/**
* function to clear all triggers
/
function deleteAllTriggers() {
  // Deletes all triggers in the current project.
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}
