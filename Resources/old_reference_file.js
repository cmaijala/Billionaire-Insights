// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    const metaSamp = metadata.filter(object => object.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select("#sample-metadata");
 
    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (keyInstance in metaSamp){
        panel.append("h6").text(`${keyInstance}: ${metaSamp[keyInstance]}`);
    };
  });
}

// function to build pie chart
function buildPie(industry) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Filter the data for objects with the desired industry
    const filtInd = data.filter(object => object.industries === industry)
    console.log(filtInd);

    // Separate the date by whether 'selfMade' was true or false and by gender
    const selfFemale = filtInd.filter(person => person.selfMade === true && person.gender === 'F').length;
    const selfMale = filtInd.filter(person => person.selfMade === true && person.gender === 'M').length;
    const nepoFemale = filtInd.filter(person => person.selfMade === false && person.gender === 'F').length;
    const nepoMale = filtInd.filter(person => person.selfMade === false && person.gender === 'M').length;

    // Build a Pie Chart
    const pieData = [{
        values: [selfFemale, selfMale, nepoFemale, nepoMale],
        labels: ['Self-made Female', 'Self-made Male', 'Nepotistic Female', 'Nepotistic Male'],
        type: 'pie'
      }];

    const PieLayout = {
        title: 'Unearned or Self-earned Wealth and Gender',
        hoverinfo: 'label+percent',
        showlegend: true
      };

    // Render the pie Chart
    Plotly.newPlot('pie', pieData, PieLayout);
  });
}


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    yTicks = otu_ids.map(otu_ids => `OTU ${otu_ids}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    const barData = [{
        x: sample_values.slice(0,10).reverse(),
        y: yTicks,
        text: otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    }];
    const barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        xaxis: { title: "Number of Bacteria" }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the industries field
    const industries = data.industries;

    // Use d3 to select the dropdown with id of `#selDataset`
    const dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++){
        dropdown
            .append("option")
            .text(names[i])
            .property("value", names[i]);
    };

    // Get the first sample from the list
      const firstSample = names[0];

    // Build charts and metadata panel with the first sample
      buildMetadata(firstSample);
      buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
