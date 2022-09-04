# Axe Group Code Challenge

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test:coverage`

Launches the test runner to run all tests and generate the coverage report.
The covergae report is available at `coverage/lcov-report/index.html`.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Design

### Redux

The application uses Redux for state management. It uses the hooks `useDispatch` and `useSelector` to integrate Redux in the components.

Reducers, actions and selectors are being used and the trunk is not. The consideration is based on the API calls are immediate responding and won't block the reducer.

### UI Structure

The UI is separated into multiple components:

- App: The basic layout and parent component for all others, and contains a header with titles.
- ProductsCountPerPageSelect: A component presents the products per page select and handles the change selected products number per page event.
- ProductsList: A component wraps the products to display on the page. the layout would change based on different products displaying per page, current page and view port size.
- Product: A component displays a single product. The product tiles and descriptions are truncated if they are more than 2 lines to keep a decent layout.
- Pagination: A component shows the pagination on page and handles page changes events. The function of the component includes jump to the adjust pages.

### CSS

The current solution is using vanilla CSS as the application is relative simple. Using the CSS pre-processors or CSS-in-JS solutions may be a bit overkill IMO.

### API Handling

As the calls of the API endpoints are actually mocked, there is no need to consider the async scenarios. The `services.js` file is designed to simulate API calls and returns the response in a sync way.

### Responsive Handling

A simple solution has been implemented that

1. when the width of the view port is less than or equal to 900px (most of the pad's screen width breakpoint), the products list will have 2 columns at most;
2. when the width of the view port is less than or equal to 450px (most of the mobile's screen width breakpoint), the products list will have 1 column at most;

## Unit Test

- The application uses `Jest` and `react-testing-library` for unit testing. Snapshot matchings are widely used to detect any unexpected changes during further refactors.

## Further Improvements

### Authentication

Optional authentication requirement was listed. To implement an authentication flow, the application should have a login page and a token generating/check mechanism.

### Redux trunks and Sagas

As mentioned before the application does not use trunks at this moment, however the trunks are good at splitting the high cost behaviours from reducers. [Redux Sagas](https://redux-saga.js.org/) are welcomed here too.

### CSS Pre-processors

Consider to use Sass/Less to make css files more compact and readable.

### CSS-in-JS

Alternatively, the CSS-in-JS solutions (e.g. [Styled Components](https://styled-components.com/) and [Legacy MUI makeStyles](https://mui.com/system/styles/basics/)) are popular nowadays to make style calculations easier.

### Storybook

The [Storybook](https://storybook.js.org/) is a powerful tool for testing, debugging and sharing applications and libraries.

### Pagination Improvements

The behaviours of paginating could be improved to add additional buttons for browsing to the first/last pages.

### Tooltips

Additional tooltips could be used associated with the truncated product titles and descriptions to provide completed information for users.

### Accessibility

Color contrast in the whole page and better `aria-label`s could be implemented to the buttons and the select.
