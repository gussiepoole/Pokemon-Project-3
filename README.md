# Project-3 - An interactive Pokemon dashboard

![image](https://user-images.githubusercontent.com/115706722/219479357-49d4c9a6-e6a2-4135-aa6f-64a103782955.jpeg)


## Contents

* [Dataset](#dataset-header)
* [Project Outline](#project-header)
* [Tools used](#reports-header)
* [Inight into the Process](#process-header)
* [Challenges](#challenge-header)
* [Team](#team-header)



## <a id="dataset-header"></a>Dataset

## <a id="project-header"></a>Project Outline

This project is an interactive page about Pokemon. We pulled elements from an API  and built a SQLite database to house the data. We then used javascript to generate a wide variety of visulisations. Our interactive page houses a search bar, drop down menu, interactive maps and visualisations that change with the users interaction.


 ## :wrench: <a id="reports-header"></a>Tools used :wrench:
  * Jupyter Notebook
  * Javascript (d3, leaflet)
  * SQLite
  * Flask-powered API
  * HTML/CSS
  



 ## :computer: <a id="process-header"></a>An Inight into the Process :computer:

 **Steps in the process of plotting Pokemon  

- First we pulled the data from the API and made a dataframe in Jupyter Notebook
!<img width="697" alt="Data extraction" src="https://user-images.githubusercontent.com/115706722/220992514-06006d4f-9078-4765-85b6-fe9415e48d0a.png">

- This was then exported to a csv
- Then we looked at the world map and assigned each fiction Pokemon location a real city name from the world map, with corresponding coordinates so we were able to plot the fiction Pokemon location by latitude and longitude
- Next we created another csv for the Pokemon names and the latitude and longitude data (this was later converted in json format so it may be pulled in javascript
-  We created a dataframe from the new location data and merged it with the previous dataframe
- We then exported the clean, updated DataFrame to SQLite
!<img width="736" alt="SQLite" src="https://user-images.githubusercontent.com/115706722/220993712-881f3e21-466a-4644-9880-2f9bb2a988c4.png">
- Once our database was completed, we started the process of using Flask to work on the interactivity of our page using Javascript
!<img width="903" alt="image" src="https://user-images.githubusercontent.com/115706722/220994654-231f5b53-e141-4962-bc85-e1660a52f779.png">
!<img width="643" alt="Flask image" src="https://user-images.githubusercontent.com/115706722/220995070-0813c2e5-2c24-44dd-afd9-3c663fadc9e6.png">
- We then created a variety of visualtions looking at different features of Pokemon that we gathered from the API, including: 
     - Pokemon growth grate
     - Pokemon gender
     - Poken attack type
     - Pokemon location - by invidiual coordinates and also grouped by location in heatmap
     - Pokemon location plotted with plot size and colour by height and attack strength 
     - A dropdown menu which shows a table of Pokemon stats
<img width="461" alt="Screenshot 2023-03-05 at 17 23 34" src="https://user-images.githubusercontent.com/115706722/222975924-0dba98f0-8e27-476c-9a68-30e7b8713c57.png">

    
- Finally we used HTML and CSS to create a visually appealing interface for the user to view the data.

Here are some of the different views we have created on our interactive page:
<img width="1221" alt="Screenshot 2023-03-05 at 17 14 32" src="https://user-images.githubusercontent.com/115706722/222975811-626a57a9-f9f0-466b-85e0-8280279c37c2.png">

<img width="977" alt="Screenshot 2023-03-05 at 17 19 50" src="https://user-images.githubusercontent.com/115706722/222975805-cb75b2f9-437b-4cba-a985-bd8eff2addef.png">

!<img width="617" alt="Screenshot 2023-02-22 at 16 30 27" src="https://user-images.githubusercontent.com/115706722/220922160-574e8db6-844e-498a-8e4a-fe6e69fbc83f.png">
_

 ## :stop_sign: <a id="challenge-header"></a>**Challenges** :stop_sign:

#1 - Data restriction
  -  At the beginning of our project we found it challegning to find an API that did not requiure payment for usage
  -  We were also put off from web scraping because we found that a lot of the data tables we wanted to scrape were in the format of image rather than raw text
  

 ## :dancing_women: <a id="team-header"></a> Team :dancing_women:
[Siobhan Brindley](https://github.com/SBrindley),
[Hardip Jandu](https://github.com/HJandu),
[Hamda  Mohamoud](https://github.com/hamdamoha),
[Gussie Poole](https://github.com/gussiepoole)
