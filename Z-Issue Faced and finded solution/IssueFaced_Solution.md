## issue faced

1: Formating createAt and updatedAt
Problem: Difficult to format date in required type in less code
solution: Using dayjs package it become quite simple

2: Grid set Dynamically
Problem: display fixed rows and collumns in grid is quit difficult to solve
Solution: solved using another state (rowsPerPage, colsPerPage).

3. change data of perticular row in Grid task
   Problem: when click on right button in any row it change all rows data not only perticular row
   Solution: not solved

4. Images get in report
   problem: Images come from different id and other data come from different id
   Solution: need to merge data come from report api and images api and set based on reports with their order

5. get CSV data from backend
   Problem: first time handle csv data in life
   solution: getting `response.data` which is blob data. then needs to creat object URL of **blob data**. At last create link that has attribute `download` that is use to download any file in `href` attribute.

   ```js
   // Convert response to Blob (Binary Large Object)
   const blob = await response.data;
   const url = window.URL.createObjectURL(blob);

   console.log(`url: `, url); // output look like:  blob:http://localhost:5173/1543a798-8b0e-4b4a-87bd-d027b33348a5

   // // Create a temporary download link
   const link = document.createElement("a"); // create a tag.
   link.href = url;
   link.setAttribute("download", "report_data.csv"); // Filename from API
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   ```

6. Not Render Report page
   Problem: Infinite re-rendering issue of report table page
   Solution: When user comes from add Report to Reports page then UI not render because
   use async with useEffect.

7. Node version change
   Problem: In Comp pc there are 20V of node and for Theme Integration project need 18V.
   Solution: Change node version using nvm package.

### Dealer Data

8. Can't login when 2FA is Enable
   Problem: When 2FA is Enable then 2FA page will open during login but after enter otp or recovery code not redirect to dashboard page.
   Solution: import `getHomeRouteForLoggedInUser` which is use to redirect to dashboard page.

9. Not display QrCode after login if it is enable.
   Problem: when user login with 2FA then can't generate QrCode.
   Solution: create new func that generate QrCode just need `google2fa` and `recoveryCode`. and called from `enable2FA` func and on starting.

10. `twoFA.recoveryCodes` are not array.
    Problem: `twoFA.recoveryCodes` give String value instead of Array
    Solution: use **JSON.parse()** that gives array from localStorage.

11. During image Persist in SMS learning project
    Problem: blob data stored in memmory so it is not permenent url as well as file is can't pass in persist. To display image in student list we need permenent url.

    Solution: i pass base64Data that can be large but using promise. by the way use fileReader() then readAsDataURL(). It will create 64BaseData that can pass in Persist and then pass as src in image tag in student list model.

```js
const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
```
