# Contents

* [Introduction](#introduction)
* [Setup](#setup)
	* [Development](#development) 
	* [Build](#build)
	* [npm tasks](#all-npm-tasks)
* [Server side fetching](#server-side-fetching)
	* [getInitialProps()](#getinitialprops)
	* [componentDidMount()](#componentdidmount)
* [Credit](#credit)
	* [Contributors](#contributors)
* [License](#license)

	
# Introduction 

A simple **S**ingle **P**age **A**pplication (SPA) relies on fetching and rendering all the data on the client side. For some applications this is fine, especially hobby projects, but for any application that needs to be accessible, shareable or SEO friendly then we need to be able to pre-fetch data on the server side and render a fully formed view without loading the app first. 

Having worked on a number of React-Redux apps recently that require localisations, server side rendering and pre-fetches I have put together this project. I have deliberately avoided things such as razzle and next.js so as to retian full control of the process and not become tied into these libraries ways of structuring applications, routing and auth handling.

The main features are: 

* React-Redux based application
* reducers (redux)
* actions (async)
* SASS (with autoprefixer)
* React Router 4
* Middleware/Auth handling
* Universal rendering
* Server side fetches
* Multi-lingual and translatable

# Setup

first of all clone down the repo and then run `yarn` to pull in all the dependencies

```
$ yarn
```

## Development

There are two development environments for this application. 

### Client development

There is a basic develoment mode that hot reloads the client application with no need for refreshing and does not utilise any of the server side code. This can be started by simply running 

```
$ npm start
```

and then visiting `http://localhost:8001/` from your browser of choice.

### Universal development

Universal development allows for development on both the client and server application concurrently with watch tasks to rebuild the files. Hot reload will not work, so you need to refresh the page manually after changing the code

```
$ npm run universal:dev
```

and then visit `http://localhost:8080/` from your browser of choice.


## Build

Build will be placed in the `build` folder. As with the development mode there are two build processes, one for client only and one for a server side rendered application. 

### Client

For a simple client only build you can run

```
$ npm run client:build
```

and then just serve `index.html` from the build folder and voila your application is minified and running in production. No need for a node process or anything clever

### Server Side / Universal build

The server build also relies on the client undles but creates a lightweight node/express app that handles initial requests so we can perform pre-fetches etc. To build the app simply run:

```
$ npm run universal:build
```

Now we need to run the server.js in the build folder through node as per

```
$ node build/server.js
```
Currently this will run the application. in production mode on port 8080


## All npm tasks

* `start` - starts client app only in development mode, using webpack dev server
* `client:dev` - same as `start` plus fancy webpack dashboard
* `client:build` - builds client application for `production` environment
* `server:dev` - starts server app only in development mode (use for testing server responses)
* `universal:dev` - runs both server and client in watch mode, automatically restarts server on changes
* `universal:build` - builds both server and client for `production` environment

there are additional tasks that are run as part of build and dev tasks but these should not be run in isolation. There are also 2 aliases currently in place for legacy build tasks

# Server side fetching

## getInitialProps()

In order to perform the server side fetches I have stolen the approach utilised by next.js. Available in the top level route components (home, 404 etc) you can call `getInitialProps` as a static method. This method is picked up in the express application and passes down some context to enable fetches to be made and update the redux store on the server side pre-render.

```
class MyClass extends Component {

	static getInitialProps(store, match, token) {
	    return Promise.all([
	      store.dispatch(testFetch()),
	      store.dispatch(usersFetch())
	    ]);
	  }
	  
	  // The rest of my class...
}
```
In the `getInitialProps` method the express app will pass in an instance of the store so we can dispatch actions directly as if we were using the client methods meaning we can use the same action creators for both the server and the client. It also means that each route can manage its own fetches rather than having to edit and fiddle around in the express application each time a new route is added. We need to use store in all dispatches but the server also makes the follwoing values available:

* `match` - this is an object containing any paramaters that are in the route for dynamic routing (e.g. language, id etc)
* `token` - this is a custom object containg an object with a `JWT` key that contains a JSON Web Token for authorised requests. This looks for a cookie named `authToken` but this can be edited in `source/js/helpers/server.js` to use whatever cookie or keys you need or just ignored if not applicable to your application

You will notice that the getInitialProps returns an array of promises which is important to ensure that the render is held until all required async actions are resolved before the html is returned to the client. Without this promise the dispatches will be made but the view rendered before they resolve

## componentDidMount()

As you change routes the subsequent requests are made on the client side so you need to make sure that any data that should be fetched in `getInitialProps` is validated in `componentDidMount` (componentWillMount runs on the server so no use in this instance) as well to ensure the application works in all instances e.g.

```
class MyClass extends Component {

	// getInitialProps code
	
	componentDidMount() {
		const { users } = this.props;
		if (!users.fetching && !users.error && users.data.length) {
			this.props.usersFetch();
		}
	}
}
```

# Internationalisation

Internationalisation is handled by [i18next](https://react.i18next.com/). There is a locales folder where each language is a folder within it, e.g.

```
locales
├── en
│   └── common.json
└── es
    └── common.json
```

By default, it is configured to load the 'common' namespace which means it will look for common.json. It caches these files into local storage. common.json contains a list of keys and values:

```
{
  "LOGGED_IN": "Logged in"
}
```

Where `t('LOGGED_IN')` would output `Logged in` if the language is set to English. `t` is a prop that will be passed to your component when it is passed through the `translate` HOC (see components/dashboard-tiles/index.js for an example of this).

The client and server configuration is separated as the files are loaded in differently between the two. Languages are only loaded if the language code is in the config/index.js array.

# Todo

- [x] Document internationalisation
- [ ] Add a language switcher
- [ ] Fix menu links for `de` site
- [ ] Add example of language fetches
- [ ] Add an about route
- [ ] Implement an error boundary
- [x] Implement `@salocreative/react-redux-alerts example`
- [ ] Implement Loading wrapper
- [ ] Document actions approach
- [ ] Flesh out auth example
- [ ] Upgrade `react-redux-middleware`


# Credit

Thanks to [Work & Co](https://github.com/workco/marvin) for the starting point for this project. Workco's starter project gave the basic structure and approach for this starter kit

## Contributors

* [Work & Co](https://github.com/worko)
* [James Bliss](https://github.com/jamesbliss)
* [Tim Stone](https://github.com/fetimo)

# License

[MIT License](https://github.com/SaloCreative/react-redux-starter/blob/master/LICENSE)