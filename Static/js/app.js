// Load the CSV data
function loadData(callback) {
  d3.csv("Resources/data_clean.csv").then(data => {
    callback(data);
  });
}

// Function to filter data based on category
function filterData(category, data) {
  if (category === "All") {
    return data; // Return all data if "All" is selected
  }
  return data.filter(obj => obj.category === category);
}

// Function to initialize dropdown
function initDropdown(data) {
  const categories = [...new Set(data.map(obj => obj.category))]; // Unique categories
  const sortedCategories = ['All', ...categories.sort()]; // Add "All" option

  const categoryDropdown = d3.select("#selDataset");
  categoryDropdown.html(""); // Clear existing options
  sortedCategories.forEach((category) => {
    categoryDropdown.append("option").text(category).property("value", category);
  });
}

// Build the demographic info panel
function buildMetadata(category, data) {
  const filteredData = filterData(category, data);

  const panel = d3.select("#billionaire-metadata");
  panel.html("");

  // Calculate total number of people in the selected category
  const totalPeople = filteredData.length;
  const totalBillionaires = data.length;
  const percentageInCategory = (totalBillionaires > 0) ? ((totalPeople / totalBillionaires) * 100).toFixed(2) : 0;
  const totalWealth = filteredData.reduce((acc, obj) => acc + +obj.finalWorth, 0);
  const averageWealth = (totalPeople > 0) ? (totalWealth / totalPeople).toFixed(2) : 0;
  const totalAge = filteredData.reduce((acc, obj) => acc + +obj.age, 0);
  const averageAge = (totalPeople > 0) ? (totalAge / totalPeople).toFixed(2) : 0;

  const wealthiestBillionaire = filteredData.sort((a, b) => b.finalWorth - a.finalWorth)[0];

  // Prepare fields to display
  const fieldsToDisplay = [
    `Total Number of Billionaires: ${totalPeople}`,
    `Percentage of Billionaires in this Industry: ${percentageInCategory}%`,
    `Average Wealth (in billions): ${averageWealth}`,
    `Average Age: ${averageAge}`,
    `Wealthiest Billionaire: ${wealthiestBillionaire ? `${wealthiestBillionaire.personName} with a net worth of ${wealthiestBillionaire.finalWorth} billion dollars` : "N/A"}`
  ];

  fieldsToDisplay.forEach(field => {
    panel.append("h6").text(field);
  });
}

// Function to build pie chart
function buildPie(category, data) {
  const filtInd = filterData(category, data);
  console.log('Filtered data length:', filtInd.length);

  // Separate the data by selfMade status and gender
  const selfFemale = filtInd.filter(person => person.selfMade === "True" && person.gender === 'F').length;
  const selfMale = filtInd.filter(person => person.selfMade === "True" && person.gender === 'M').length;
  const nepoFemale = filtInd.filter(person => person.selfMade === "False" && person.gender === 'F').length;
  const nepoMale = filtInd.filter(person => person.selfMade === "False" && person.gender === 'M').length;

  // Define colors for each segment
  const colors = ['#FF9999', '#66B3FF', '#C0392B', '#003366'];

  // Build a Pie Chart
  const pieData = [{
      values: [selfFemale, selfMale, nepoFemale, nepoMale],
      labels: ['Self-made Female', 'Self-made Male', 'Nepotistic Female', 'Nepotistic Male'],
      type: 'pie',
      marker: {
        colors: colors
      }
  }];

  const PieLayout = {
      title: 'Unearned or Self-earned Wealth and Gender',
      hoverinfo: 'label+percent',
      showlegend: true
  };

  // Render the pie Chart
  Plotly.newPlot('pie', pieData, PieLayout);
};

// Function to build the bar chart
function buildCharts(category, data) {
  const filteredData = filterData(category, data);

  // Sort by finalWorth in descending order and take the top 10
  const topTen = filteredData.sort((a, b) => b.finalWorth - a.finalWorth).slice(0, 10);
  const personNames = topTen.map(obj => obj.personName);
  const netWorths = topTen.map(obj => +obj.finalWorth);

  // Assign colors based on self-made status and gender
  const colors = topTen.map(person => {
    if (person.selfMade === "True" && person.gender === 'F') return '#FF9999';
    if (person.selfMade === "True" && person.gender === 'M') return '#66B3FF';
    if (person.selfMade === "False" && person.gender === 'F') return '#C0392B';
    if (person.selfMade === "False" && person.gender === 'M') return '#003366';
  });

  // For the Bar Chart
  const barData = [{
    type: 'bar',
    x: personNames,
    y: netWorths,
    text: personNames,
    marker: {
      color: colors
    },
    orientation: 'v'
  }];

  const barLayout = {
    title: 'Top 10 Billionaires by Net Worth',
    xaxis: { title: 'Person Name' },
    yaxis: { title: 'Net Worth (in billions)' },
  };

  // Render the Bar Chart
  Plotly.newPlot('bar', barData, barLayout);
}

// Function to build the scatter chart
function buildScatter(category, data) {
  const filteredData = filterData(category, data);
  const validData = filteredData.filter(person => person.age && +person.age > 0);
  const ages = [];
  const wealths = [];
  const colors = [];

  validData.forEach(person => {
      ages.push(+person.age);
      wealths.push(+person.finalWorth);
      if (person.selfMade === "True" && person.gender === 'F') colors.push('#FF9999');
      if (person.selfMade === "True" && person.gender === 'M') colors.push('#66B3FF');
      if (person.selfMade === "False" && person.gender === 'F') colors.push('#C0392B');
      if (person.selfMade === "False" && person.gender === 'M') colors.push('#003366');
  });

  const scatterData = [{
      x: ages,
      y: wealths,
      mode: 'markers',
      type: 'scatter',
      marker: {
          size: 10,
          color: colors,
          line: { width: 1 }
      }
  }];

  const scatterLayout = {
    title: `Age vs. Wealth in ${category}`,
    xaxis: { title: 'Age' },
    yaxis: { 
        title: 'Wealth (in billions)',
        type: 'log' // Logarithmic scale for y-axis
    },
    showlegend: false
  };

  // Render the scatter chart
  Plotly.newPlot('scatter-plot', scatterData, scatterLayout);
}

function buildBubble(category, data) {
  //const filtInd = data.filter(object => object.category === category);
  const filtInd = filterData(category, data);
  console.log('Filtered data length:', filtInd.length);

  // Extracting latitude, longitude, and countries
  let latitudes = filtInd.map(d => d.country_lat);
  console.log('Latitude:', latitudes);
  let longitudes = filtInd.map(d => d.country_long);
  console.log('Longitude:', longitudes);
  //let billionaireCount = filtInd.length;
  //console.log('Billionaire Count:', billionaireCount);
  let countries = filtInd.map(d => d.country);
  console.log('Countries:', countries);

  //let country = [];
  //let latitude = [];
  //let longitude = [];
  //let billionaireCount = [];

  //for (let i = 0; i < filtInd.length; i++) {
  //  if (country.includes(countries[i]) === false)
  //    country.push(countries[i]);
  //    console.log(country);
  //    latitude.push(latitudes[i]);
  //    console.log(latitude);
  //    longitude.push(longitudes[i]);
  //    console.log(longitude);
  //    billionaireCount.push(1);
    //else if (depth < 30) return "greenyellow";
    //else if (depth < 50) return "yellow";
    //else if (depth < 70) return "gold";
    //else if (depth < 90) return "orange";
  //else billionaireCount[i]++;

  const country_map = countries.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  let country = Array.from(country_map.keys());
  console.log(country);

  const latitude_map = latitudes.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  let latitude = Array.from(latitude_map.keys());
  console.log(latitude);

  const longitude_map = longitudes.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  let longitude = Array.from(longitude_map.keys());
  console.log(longitude);

  let billionaireCount = Array.from(country_map.values()).map(function(x) { return Math.sqrt(x) * 5; });;
  console.log(billionaireCount);

  console.log('Billionaire Count:', billionaireCount);

  // Build a Bubble Chart
  let bubbleMap = {
    type: 'scatter',
    x: longitude,
    y: latitude,
    mode: 'markers',
    marker: {
      size: billionaireCount, // Scale marker size
      color: billionaireCount,
      opacity: 0.75,
      //colorscale: 'Viridis',
      //colorbar: { title: 'Billionaire Count' }
    },
    text: country
  };

  let bubbleLayout = {
    title: `Billionaires by Country`,
    xaxis: { title: 'Longitude' , range: [-180, 180],},
    yaxis: { title: 'Latitude', range: [-90, 90], },
    showlegend: false,
    height: 700,
    width: 1200,
    responsive: false,
    aspectRatio: 2,
    images: [{
      source: "Resources/world_map_equirectangular_projection.png",
      width: 1440,
      height: 720,
      x: 0,
      y: 0,
      xref: "paper",
      yref: "paper",
      sizex: 1,
      sizey: 1,
      xanchor: "left",
      yanchor: "bottom",
      opacity: 1, // Adjust opacity if needed
      layer: "below" // Place the image behind the plot
      }],
  };

  // Render the Bubble Chart
  Plotly.newPlot('bubble', [bubbleMap], bubbleLayout);
};

// Function to run on page load
function init() {
  loadData(data => {
    initDropdown(data); // Initialize dropdown with data
    const firstCategory = d3.select("#selDataset").property("value");
    buildCharts(firstCategory, data);
    buildMetadata(firstCategory, data);
    buildPie(firstCategory, data);
    buildBubble(firstCategory, data);
    buildScatter(firstCategory, data); 
  });
}

// Function for event listener
function optionChanged(newCategory) {
  loadData(data => {
    buildCharts(newCategory, data);
    buildMetadata(newCategory, data);
    buildPie(newCategory, data);
    buildBubble(newCategory, data);
    buildScatter(newCategory, data); 
  });
}

// Initialize the dashboard
init();
