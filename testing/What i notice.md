- At **COLUMNS** in Report Index.jsx file
    - Should Headers same as name?

- At  `<Card title="Add Report">` in addReport.jsx 

- In editReport.jsx, add setValue() for phoneNumber, address and images
    - Add Image input 


## 27-Mar-2025
- first accept reportSlice.jsx changes
    - get reports and get images
    - merge them in different state
    - pass merged state in company-table
    - also pass merrged state in filtering in Index file
    - also store images in ReportImage state in imageSlice

- after getting images check image field to how it storred.
    - if it not give required result then one thing do  that for perticular report fetch images and store in arr and just first position img display in report table

- For display Report table
    - on image click open model of imageGrid with back button in same route

- For add report,
    - display image field and store their value in images state in reportSlice as well as reportImages in imageSlice.
    - On add report split images from data that we passed in add API
    - that images stored in images/upload API with their other fields

- For edit report,
    - fetch images based on reportCategoryId field from /images/:categoryId API.
    - After changes store images in reportImages in imageslice, images in reportSlice also store another data in reportData in reportSlice. 

- For export CSV


## 28-Mar-2025

- 