# <div align="center"> 2023 Billionaire Insights: A Wealth Landscape Unveiled </div>

![jacob-vizek-FCSQRPEtXVI-unsplash](https://github.com/user-attachments/assets/cd3d4044-9105-47fe-94b6-8a0e296b4f3d)

Photo by <a href="https://unsplash.com/@jakevizek?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jacob Vizek</a> on <a href="https://unsplash.com/photos/white-porsche-911-parked-in-front-of-building-FCSQRPEtXVI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## Project 3 for the University of Minnesota Data Visualization Boot Camp

##### Collaborators: 
- Micah Korinek || [GitHub](https://github.com/micah230)
- Mysee Kathy Lee || [GitHub](https://github.com/myseekl)
- Zane Huttinga || [GitHub](https://github.com/ZaneHuttinga)
- Chinna Maijala || [GitHub](https://github.com/cmaijala)

### Overview:

The Data Visualization Track for the 2023 Billionaire Insights dataset seeks to uncover and communicate essential insights about wealth distribution, demographics, and industry representation among the world’s billionaires. Our dataset comprises **over 2000 unique records**, stored efficiently in a **PostgreSQL** database. Leveraging a combination of Python and JavaScript libraries, we developed interactive visualizations, including a dropdown bar chart, pie chart, scatterplot, and map chart. These visualizations will enable users to filter data by industry, dynamically generating new visuals to populate the bar chart, pie chart, and scatterplot, thus enhancing the user experience and deepening the understanding of wealth trends.

### Good to know: 
In our project, we used the Altair Python library to create interactive and visually appealing charts, leveraging its declarative syntax for efficient data visualization. Altair was not covered in class, making it a new and valuable tool for our analysis. In order to create visualizations with Altair, we also used the library vega-datasets.

### Instructions for Use:

Users can interact with the project by selecting an industry from the dropdown menu, which presents various industry categories in alphabetical order. Upon selection, the visualizations will dynamically update to reflect the chosen parameters, displaying insights such as the total number of billionaires, the percentage of billionaires within specific industries, average wealth (in billions), average age, and a list of the wealthiest billionaires.

Our bar chart highlights the top 10 billionaires based on the selected industry. The pie chart illustrates the distribution of self-made versus inherited billionaires by gender within that industry. The scatterplot compares age and wealth (in billions), with distinctions made by gender. Finally, our map chart visualizes the geographical distribution of billionaires by country, showcasing their global spread.

<div align="center">
    <img src="https://github.com/user-attachments/assets/d0a69a10-12c0-4554-aeed-b15dc4b3d900" alt="Image 1" width="1000"/>
    <img src="https://github.com/user-attachments/assets/b5598f84-b889-48c7-8962-2fc6f4ad91fc" alt="Image 2" width="1000"/>
    <img src="https://github.com/user-attachments/assets/d3d24ea6-6df4-4e44-bdf2-a0ad226812da" alt="Image 3" width="900"/>
</div>




### Ethical Considerations:

In developing this project, we have made significant efforts to address ethical considerations surrounding data usage. The dataset includes anonymized personal information to protect the identities of individuals while still providing insights into wealth trends. We emphasize transparency by documenting data sources and methodologies, ensuring users understand the context of the information presented. Additionally, we are committed to inclusive representation, ensuring that our visualizations highlight disparities and promote discussions around economic inequality and diversity in wealth creation.

### References:

- Nidula Elgiriyewithana. (2023). Billionaires Statistics Dataset (2023) [Data set]. Kaggle. [Link](https://doi.org/10.34740/KAGGLE/DSV/6570253)
- This project utilized ChatGPT, a language model developed by OpenAI, for generating text and answering questions. For more information about ChatGPT, visit OpenAI's ChatGPT.
- Google Presentation [Link](https://docs.google.com/presentation/d/1t6iQwTEpcZBjWVPv7MWkNNq1fEHFKdrD1qW3QYJatUY/edit?usp=sharing)
- Altair. (n.d.). Stacked Bar Chart with Sorted Segments. Retrieved from https://altair-viz.github.io/gallery/stacked_bar_chart_sorted_segments.html
- Altair. (n.d.). Normalized Stacked Bar Chart. Retrieved from https://altair-viz.github.io/gallery/normalized_stacked_bar_chart.html
- World map background image by Wikimedia user TUBS, accessed via Wikimedia Commons (https://en.m.wikipedia.org/wiki/File:World_location_map_%28equirectangular_180%29.svg)
- Code to run SQL queries using SQLAlchemy from the top answer (by user joris) to this StackOverflow question: https://stackoverflow.com/questions/27884268/return-pandas-dataframe-from-postgresql-query-with-sqlalchemy

