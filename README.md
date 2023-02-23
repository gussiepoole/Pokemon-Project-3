# Project-3 - An interactive Pokemon dashboard

![image](https://user-images.githubusercontent.com/115706722/219479357-49d4c9a6-e6a2-4135-aa6f-64a103782955.jpeg)


## Contents

* [Dataset](#dataset-header)
* [Project Outline](#project-header)
* [Tools used](#reports-header)
* [Dependencies and Setup Required](#dependencies-header)
* [File Guide](#file-header)
* [Inight into the Process](#process-header)
* [Challenges](#challenge-header)
* [Team](#team-header)



## <a id="dataset-header"></a>Dataset

We decided to use a Pokemon dataset which includes different information about each Pokemon, e.g h

## <a id="project-header"></a>Project Outline

This project is the creation of an interactive dashboard that allows the user to search for a Pokemon and view their stats or alternatively use the dropdown menu to nagivate this information. The user may also access the maps page which displays where Pokemon characters live and also see how well they hold their territory by the visualisation of their power of attack vs their height!

  * An interactive map using 
  * A SQLlite databse

 ## :wrench: <a id="reports-header"></a>Tools used :wrench:
  * Javascript (d3, leaflet,
  * SQLlite
  * API
  * HTML/CSS
  
 ## :inbox_tray: <a id="dependencies-header"></a>Dependencies and Setup Required :inbox_tray:
*
*


 ## :open_file_folder: <a id="file-header"></a>**File Guide** :open_file_folder:

**location_with_lat_long.ipynb** --> 
**Final Notebook.ipynb --> **

 ## :computer: <a id="process-header"></a>An Inight into the Process :computer:

 **Steps in the process of plotting of Pokemon  

- First we exported the data to a csv
- Then we created a pivot table because there were several locations with similar names, so it was important to ensure that those locations have the same latitude and longitude, in order for the interactive map to reflect this
-  Then we looked at world map to decide where to plot the fiction Pokemon location, gave each fiction Pokemon location a real city name from different countries and assigned the latitude and longitude of the real city
-  We then created another csv for the Pokemon names and the latitude and longitude data (this was later converted in json format so it may be pulled in javascript
-  Finally we created dataframe from the new location data and merged with previous dataframe
-  ** insert screenshot ** 

 ## :stop_sign: <a id="challenge-header"></a>**Challenges** :stop_sign:

#1 - Data restriction
  -  At the beginning of our project we found it challegning to find an API that did not requiure payment for usage. 
  -  We were also put off from web scraping because we found that a lot of the data tables we wanted to scrape were in the format of image rather than raw
     text
  
Difficulties with connecting to sqlite, even though tables exist. Flask stops working when its had enough lol
11:17
We could mention about downloading the sqlite db browser to see tables in there. Probably use PGadmin next t

 ## :dancing_women: <a id="team-header"></a> Team :dancing_women:
[Siobhan Brindley](https://github.com/SBrindley),
[Hardip Jandu](https://github.com/HJandu),
[Hamda  Mohamoud](https://github.com/hamdamoha),
[Gussie Poole](https://github.com/gussiepoole)
