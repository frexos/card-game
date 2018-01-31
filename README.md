Encode Assignment: card-game

This is a repository containing the code for the Encode assignment, build with AngularJS and Webpack

Getting started:

What you need to run this app:
* `node` and `npm`
* Ensure you're running Node (`v4.1.x`+) and NPM (`2.14.x`+)

# clone the repo
$ git clone https://github.com/frexos/card-game.git

# change directory card-game/
$ cd card-game


# install the dependencies with npm
$ npm install

# start the server
$ npm start

go to [http://localhost:8080](http://localhost:8080) in your browser.

### Build files

* single run: `npm run build`

The built files will be found under the dist folder. Within this folder the developer will find css and js bundles as well as the related html files. Currently the html files are separate and will have to be manually unified into one single index.html. This must be fixed through proper webpack configuration

* build files and watch: `npm start`

## Testing

#### Unit Tests

* single run: `npm test`

#### Brief description of the development process

The development of this assignment was carried out using AngularJS with a basically configured Webpack bundler.
Sass pre-processor has been used along with Bootstrap framework and a jquery plugin for the use of custom scrollbar (by malihu). The application's functionality has been separated in two components as described in the assignment requirements. The components are responsible for the rendering of the list of cards to the left, and the details of each selected card to the right. Both components are attached to the main directive 'app' and communicate with each other with the use of a service (via their controllers). The service is responsible for rendering the required data from the remote json - and the components' inter-communication.
