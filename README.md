# CompanyValuationApp

This app is a basic CRUD, prototype web app that is used to help track and analyze potential target companies for inorganic growth through acquistion. The form requires you to enter financial history data on the companies and renders a basic chart for each financial category using ngx-charts. In the future I would build out the charting and analytics further to add different chart types and more flexibility on the financial data history. There will also be a page where you can compare metrics from companies against each other in various charts via the compare link. There will be a lot of flexibility on that page in terms of which companies get charted, what years are taken into account and also what type of chart and financial metrics you want to look at.

# Installion
To run this project simply clone the repository and then run an npm install to get all the dependencies. This web app relies on json-server to mock a back end with json data.

After installing the node modules you will need to execute 2 scripts to run the app
# npm run json:server (mock back-end)
# npm-start (angular ng-serve)

Navigate to localhost:4200 and its good to good.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
