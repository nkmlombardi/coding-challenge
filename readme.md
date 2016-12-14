# Elsen Project
A project assigned by Elsen to complete.

## Requirements
* Displays a table showing each unique identifier and the oldest, 
    newest and total count of data points in the corresponding timeseries. 
    The table should be sortable by any of the four column headers.

* Allows a user to search the table for a given identifier. As a user 
    types in their search query, only rows with identifiers matching the 
    query should continue to be displayed.

* Selecting a row in the table plots the timeseries of the identifier in 
    the selected row somewhere on the page.

* The application should be built using Angular.js and the Highstock 
    (http://www.highcharts.com/products/highstock) library.

## Shortcomings
The project was completed in the interest of speed, getting it done as fast as possible. There are a few shortcomings I am aware of.
* Highcharts is not wrapped in as an Angular module
* The client-side data management could be a little better
* Smart table library is a little overkill, saves time, but makes me have multiple arrays

## Conclusion
In the event that you wanted the original CSV file and my JSON conversion wasn't allowed, I would use a CSVtoJSON converter such as this (https://www.npmjs.com/package/csvtojson) to handle it.