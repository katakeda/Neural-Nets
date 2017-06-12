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

// It will be inputs and outputs for XOR on default
var trainingSet = [
  {input: [0,0], output: [0]},
  {input: [0,1], output: [1]},
  {input: [1,0], output: [1]},
  {input: [1,1], output: [0]}
]

// Get weights from neuron in input layer to neurons in hidden layer
function getInputWeights() {
  var neuron1ProjectedTo = inputLayer.list[0].connections.projected;
  var neuron2ProjectedTo = inputLayer.list[1].connections.projected;
  var weights = {
    w1: neuron1ProjectedTo[6].weight.toFixed(4),
    w2: neuron1ProjectedTo[7].weight.toFixed(4),
    w3: neuron1ProjectedTo[8].weight.toFixed(4),
    w4: neuron2ProjectedTo[9].weight.toFixed(4),
    w5: neuron2ProjectedTo[10].weight.toFixed(4),
    w6: neuron2ProjectedTo[11].weight.toFixed(4)
  }

  return weights;
}

// Get weights from neurons in hidden layer to neurons in output layer
function getHiddenWeights() {
  var neuron1ProjectedTo = hiddenLayer.list[0].connections.projected;
  var neuron2ProjectedTo = hiddenLayer.list[1].connections.projected;
  var neuron3ProjectedTo = hiddenLayer.list[2].connections.projected;
  var weights = {
    w1: neuron1ProjectedTo[12].weight.toFixed(4),
    w2: neuron2ProjectedTo[13].weight.toFixed(4),
    w3: neuron3ProjectedTo[14].weight.toFixed(4)
  }

  return weights;
}

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
  var input1, input2;
  var targetVal = $('#target-val');
  var outputVal = $('#output-val');

  // Setup slider for rate
  setSlider('r');

  // Setup slider for iterations
  setSlider('i');

  // Setup slider for error
  setSlider('e');

  // Detect change in the input values
  window.setInterval(function(){
    var inputVal = $('#input-select').val();
    if(inputVal == "00") {
      input1 = 0;
      input2 = 0;
      targetVal.text(0);
    } else if(inputVal == "01") {
      input1 = 0;
      input2 = 1;
      targetVal.text(1);
    } else if(inputVal == "10") {
      input1 = 1;
      input2 = 0;
      targetVal.text(1);
    } else {
      input1 = 1;
      input2 = 1;
      targetVal.text(0);
    }
  }, 300)

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
    outputVal.text(myNetwork.activate([input1, input2]));
  })
})
