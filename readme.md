The Net Ninja AngularJS Tutorial App

per:
https://www.youtube.com/watch?v=FlUCU13dJyo&list=PL4cUxeGkcC9gsJS5QgFT2IvWIX78dV3_v

This AngularJS app was developed using the Net Ninja's tutorial series.  Commented throughout based on tutorial comments and own findings.

Topics
- 2-Way Data Binding
- Directives
- Expressions
- ng-repeat Directive
- Modules
- Filters
- ng-include Directive
- ng-show Directive
- ng-click Directive
- ng-submit Directive
- ng-src Directive
- Views and Routes
- JSON and $http
- Animations
- Form Validation
- Location Service
- Pretty URLs

---

To run this app with "pretty URLs" do the following:
1. Install Node.js
2. Run "npm install" from the same directory as package.json
3. Run "npm start" to serve the app via pushstate-server
4. Use a web browser to browse to "http://localhost:8000"

Now direct URLs (i.e. http://localhost:8000/contact) and page refreshes work properly.

---

Note that this app can be run using Visual Studio Code's Live Server feature (just right-click on index.html and select "Open with Live Server"), but the Pretty URLs functionality does not work properly with VSC's Live Server. In order to "roll back" to standard AngularJS URLs, use the "#!" URLs in header.html and comment out the $locationProvider.html5Mode statement in app.js.