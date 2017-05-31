    jQuery(function($){
       $("#first-train-time").mask("99:99");
       $("#frequency-minutes").mask("9?99999");
    });


// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyD83WphS-D1UhIEE9fbxBpOlMWb6LGpprU",
    authDomain: "train-scheduler-8e12a.firebaseapp.com",
    databaseURL: "https://train-scheduler-8e12a.firebaseio.com",
    projectId: "train-scheduler-8e12a",
    storageBucket: "train-scheduler-8e12a.appspot.com",
    messagingSenderId: "484611075211"
  };

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input to add a Train
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#train-destination-input").val().trim();
  var trainStart = moment($("#first-train-time").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-minutes").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs most everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes in the form
  $("#train-name-input").val("");
  $("#train-destination-input").val("");
  $("#first-train-time").val("");
  $("#frequency-minutes").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an new train entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStartPretty);
  console.log(trainFrequency);


  // SECRET TO CORRECT MATH IS IN THE FORMULA BELOW
  // Calculate the months worked using hardcore math
  // To calculate the months worked

  // var empMonths = moment().diff(moment.unix(trainStart, "X"), "months");
  // console.log(empMonths);

  // Calculate the total frequency

  var trainNext = trainStart + trainFrequency;
  console.log(trainNext);

  var currentTime = moment();
  var minutesAway = trainNext - currentTime;

  // Prettify the train start time
  var trainStartPretty = moment.unix(trainStart).format("HH:mm a");
  var trainNextPretty = moment.unix(trainNext).format("HH:mm a");
  var minutesAwayPretty = moment.unix(minutesAway).format("mm");

  // Add each train's data into the table
  $("#train-table-body").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainStartPretty + "</td><td>" + trainFrequency + "</td><td>" + trainNextPretty + "</td><td>" + minutesAwayPretty + "</td></tr>");
});