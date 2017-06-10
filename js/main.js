const Neuron = synaptic.Neuron;
const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;

// Input layer with 2 neurons
var inputLayer = new Layer(2);

// Hidden layer with 3 neurons
var hiddenLayer = new Layer(3);

// Output layer with 1 neuron
var outputLayer = new Layer(1);

// Connect the layers
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

// Construct a network with all-to-all connection between every neuron in each layer
var myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});

// Wrapper for activating the network and propagating
var trainer = new Trainer(myNetwork);

// Training set will be changed dynamically upon users request
// It will be inputs and outputs for XOR on default
var trainingSet = [
  {input: [0,0], output: [0]},
  {input: [0,1], output: [1]},
  {input: [1,0], output: [1]},
  {input: [1,1], output: [0]}
]


// General function for slider setup
function setSlider(c) {
  var max, step, value;
  if(c == 'r') {
    max = 1;
    value = 0.5;
    step = 0.001;
  } else if(c == 'i'){
    max = 1000;
    value = 500;
    step = 1;
  } else {
    max = 0.1;
    value = 0.05;
    step = 0.001;
  }
  $('#slider-'.concat(c)).slider({
    min: 0,
    max: max,
    step: step,
    value: value,
    create: function() {
      $('#handler-'.concat(c)).text($(this).slider('value'));
    },
    slide: function(event, ui) {
      $('#handler-'.concat(c)).text(ui.value);
    }
  })
}

$(document).ready(function() {
  // Setup slider for rate
  setSlider('r');

  // Setup slider for iterations
  setSlider('i');

  // Setup slider for error
  setSlider('e');

  // Train with values from sliders
  $('#btn-train').click(function() {
    // Options for training
    var options = {
      rate: $('#slider-r').slider('value'),
      iterations: $('#slider-i').slider('value'),
      error: $('#slider-e').slider('value'),
    }

    // Asynchronously train trainingSet to myNetwork
    trainer.trainAsync(trainingSet, options).then(results => {
      console.log(results);
    })
  })

  // Run with given input
  $('#btn-run').click(function() {
    window.localStorage.setItem('result', myNetwork.activate([1, 1]));
  })
})
