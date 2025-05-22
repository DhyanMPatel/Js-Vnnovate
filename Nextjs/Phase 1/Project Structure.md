## Folder and file conventions

### Top-level folders

- There folders organize the application's code and static assets.

  ![folder structure](../screenshorts/project%20structure/folder/folder%20structure.png)

  - **App** :- App Router
  - **Pages** :- Pages Router
  - **Public** :- Static assets to be served
  - **src** :- Optional application source folder

### Top-level files

- Top-level files are used to configure the application, manage dependencies, run middleware, integrate monitoring tools, and define environment variables.

  ![Top-level files](../screenshorts/project%20structure/file/top-level%20files.png)

- Routing Files

  ![Routing files](../screenshorts/project%20structure/file/routing%20page.png)

- Nested routes

  ![Nested routes](../screenshorts/project%20structure/file/Nested%20routes.png)

- Dynamic routes

  ![Dynamic routes](../screenshorts/project%20structure/file/Dynamic%20routes.png)

- Route Groups and private folders

  ![Route Groups and private folders](../screenshorts/project%20structure/file/Route%20Groups%20and%20private%20folders.png)

- Parallel and Intercepted Routes

  ![Parallel and Intercepted Routes](../screenshorts/project%20structure/file/Parallel%20and%20Intercepted%20Routes.png)

- Metadata file conventions

  - App icon
    ![App icon](../screenshorts/project%20structure/file/App%20icons.png)

  - Open Graph and Twitter images
    ![Open Graph and Twitter images](../screenshorts/project%20structure/file/Open%20Graph%20&%20Twitter%20images.png)

  - SEO
    ![SEO](../screenshorts/project%20structure/file/SEO.png)

## Organizing Structure

- The components are rendered recursively in nested routes, meaning the components of a route segment will be nested inside the components of its parent segment.

  ![Rendered recursively approach](../screenshorts/project%20structure/Orgazing%20structure/Rendered%20recursively%20approach.png)

- However, even though route structure is defined through folders, a route is not publicly accessible until a page.js or route.js file is added to a route segment.

  ![Wrong way of routing](../screenshorts/project%20structure/Orgazing%20structure/Not%20right%20way%20to%20route.png)

- And, even when a route is made publicly accessible, only the content returned by `page.js` or `route.js is sent to the client.`

  ![Correct way of routing](../screenshorts/project%20structure/Orgazing%20structure/Correct%20way%20of%20routing.png)

  **Note** :- While you can colocate your project files in app you don't have to. If you prefer, you can `keep them outside the app directory`.

### Private folders

- Private folders can be created by prefixing a folder with an underscore: `_folderName`.
- This indicates the folder is a private implementation detail and should not be considered by the routing system, thereby **opting the folder and all its subfolders** out of routing.

  ![Private folders](../screenshorts/project%20structure/Orgazing%20structure/Private%20comp.png)

  **Note** :-

  - While not a framework convention, you might also consider marking files outside private folders as "private" using the same underscore pattern.
  - You can create URL segments that start with an underscore by prefixing the folder name with `%5F` (the URL-encoded form of an underscore): `%5FfolderName`.
  - If you don't use private folders, it would be helpful to know Next.js [special file conventions (Routing files)](../screenshorts/project%20structure/file/routing%20page.png) to prevent unexpected naming conflicts.

### Route Group

- Route groups can be created by wrapping a folder in parenthesis: `(folderName)`
