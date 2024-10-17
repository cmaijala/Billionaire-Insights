// Load the CSV data
function loadData(callback) {
  d3.csv("Resources/data_clean.csv").then(data => {
    callback(data);
  });
}

// Build the demographic info panel
function buildMetadata(category, data) {
  const filteredData = data.filter(obj => obj.category === category);

  const panel = d3.select("#billionaire-metadata");
  panel.html("");

  // Set a title
  panel.append("h5").text("Industry Profile");

  // Calculate total number of people in the selected category
  const totalPeople = filteredData.length;

  // Calculate total number of billionaires in the dataset
  const totalBillionaires = data.length;

  // Calculate the percentage of billionaires in the selected category
  const percentageInCategory = (totalBillionaires > 0) ? ((totalPeople / totalBillionaires) * 100).toFixed(2) : 0;

  // Calculate average wealth
  const totalWealth = filteredData.reduce((acc, obj) => acc + +obj.finalWorth, 0);
  const averageWealth = (totalPeople > 0) ? (totalWealth / totalPeople).toFixed(2) : 0;

  // Calculate average age
  const totalAge = filteredData.reduce((acc, obj) => acc + +obj.age, 0);
  const averageAge = (totalPeople > 0) ? (totalAge / totalPeople).toFixed(2) : 0;

  // Find the wealthiest billionaire
  const wealthiestBillionaire = filteredData.reduce((max, obj) => (obj.finalWorth > max.finalWorth ? obj : max), filteredData[0]);

  // Prepare fields to display
  const fieldsToDisplay = [
    `Total Number of People: ${totalPeople}`,
    `Percentage of Billionaires in this Industry: ${percentageInCategory}%`,
    `Average Wealth (in millions): ${averageWealth}`,
    `Average Age: ${averageAge}`,
    `Wealthiest Billionaire: ${wealthiestBillionaire.personName} with a net worth of ${wealthiestBillionaire.finalWorth} million dollars`
  ];

  fieldsToDisplay.forEach(field => {
    panel.append("h6").text(field);
  });
}

// function to build pie chart
function buildPie(category, data) {
    const filtInd = data.filter(object => object.category === category)
    console.log('Filtered data length:', filtInd.length);

    // Separate the date by whether 'selfMade' was true or false and by gender
    const selfFemale = filtInd.filter(person => person.selfMade === "True" && person.gender === 'F').length;
    const selfMale = filtInd.filter(person => person.selfMade === "True" && person.gender === 'M').length;
    const nepoFemale = filtInd.filter(person => person.selfMade === "False" && person.gender === 'F').length;
    const nepoMale = filtInd.filter(person => person.selfMade === "False" && person.gender === 'M').length;

    // Define colors for each segment
    const colors = ['#FF9999', '#66B3FF', '#C0392B', '#2980B9'];

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
  const filteredData = data.filter(obj => obj.category === category);

  // Sort by finalWorth in descending order and take the top 10
  const topTen = filteredData.sort((a, b) => b.finalWorth - a.finalWorth).slice(0, 10);

  // Prepare data for the bar chart
  const personNames = topTen.map(obj => obj.personName); // Extract person names
  const netWorths = topTen.map(obj => +obj.finalWorth); // Convert to numbers

  // For the Bar Chart (personName on x-axis and netWorth on y-axis)
  const barData = [{
    type: 'bar',
    x: personNames,  // Person names on the x-axis
    y: netWorths,               // Net worths on the y-axis
    text: personNames,
    orientation: 'v'            // Vertical bars
  }];

  const barLayout = {
    title: 'Top 10 Billionaires by Net Worth',
    xaxis: { title: 'Person Name' },
    yaxis: { title: 'Net Worth (in billions)' },
  };

  // Render the Bar Chart
  Plotly.newPlot('bar', barData, barLayout);
}

// Function to run on page load
function init() {
  loadData(data => {
    const categories = [...new Set(data.map(obj => obj.category))]; // Unique categories
    const sortedCategories = categories.sort(); // Sort categories alphabetically
    const dropdown = d3.select("#selDataset");

    sortedCategories.forEach((category) => {
      dropdown.append("option").text(category).property("value", category);
    });

    const firstCategory = sortedCategories[0];
    buildCharts(firstCategory, data);
    buildMetadata(firstCategory, data);
    buildPie(firstCategory, data);
  });
}

// Function for event listener
function optionChanged(newCategory) {
  loadData(data => {
    buildCharts(newCategory, data);
    buildMetadata(newCategory, data);
    buildPie(newCategory, data);
  });
}

// Initialize the dashboard
init();