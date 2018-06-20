# Contents

* [Introduction](#introduction)
* [Setup](#setup)
	* [Adding apps](#adding-apps) 
	* [Development](#development) 
	* [Build](#build)
	* [npm tasks](#all-npm-tasks)
* [Auth](#auth)
	* [Tokens](#tokens)
	* [Auth Context](#auth-context)
	* [AuthWrapper](#authwrapper) 
* [Server side fetching](#server-side-fetching)
	* [APOLLO](#apollo)
	* [REDUX](#redux) 
		* [getInitialProps()](#getinitialprops)
		* [componentDidMount()](#componentdidmount)
* [Credit](#credit)
	* [Contributors](#contributors)
* [License](#license)

	
# Introduction 

This application is based on the react-redux-stater built previously. The idea of this application is to provide a proof of concept of how a universally rendered multi react instance might work. The motivation for this is:

- allow the splitting of large applications without multiple repos
- maintain simple dependency management
- allow encapsulated, flexible application structures suitable for customisation of individual apps whilst keeping a single repo
- allow simple sharing of render methods and centralised config
- implement a full node/express router to allow additional services to be run within the application. In theory you could serve a simple node website with React portals available on additional routes e.g. a CMS with front end where the two can be built in the most appropriate way

There are two boilerplates included, one for using redux and the other for using apollo. These are basic examples but should give you the starting point for a universally rendered application with either of these libraries.

### The react goodness

A simple **S**ingle **P**age **A**pplication (SPA) relies on fetching and rendering all the data on the client side. For some applications this is fine, especially hobby projects, but for any application that needs to be accessible, shareable or SEO friendly then we need to be able to pre-fetch data on the server side and render a fully formed view without loading the app first. 

Having worked on a number of React-Redux apps recently that require localisations, server side rendering and pre-fetches I have put together this project. I have deliberately avoided things such as razzle and next.js so as to retain full control of the process and not become tied into these libraries ways of structuring applications, routing and auth handling.

The main features are: 

* React-Redux based application
* React-Apollo based application
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

## Adding apps

The repo has centralised config files for handling the rendering and store configuration for the react apps. The react `source/js/apps` live inside the apps folder, namespace relative to the stub url they will be served on. These are pulled together via `source/js/server/routes.js` and then individual controllers for each application found in `source/js/server/controllers`. In order to build the apps you must also add your application to the array at the top of the `webpack.config.js` file.

You can manually add apps, routes and contollers as you need, especially if you have your own app structures or need a route that isn't for react. However, for ease there is a helper script to automatically generate the new applications for you. Simply run the below and it will clone the contents of the base app in the lib folder for you replacing the config as needed: 

```
$ yarn add:app
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
* `add:app` - adds a new application to node along with routes and controller

there are additional tasks that are run as part of build and dev tasks but these should not be run in isolation. There are also 2 aliases currently in place for legacy build tasks

# Auth

At the moment the auth is encapsulated in a provider context wrapping the entire application which is hydrated via cookies in both the server and client builds. At the moment the login/logout buttons on the home route simply set and remove two dummy cookies for example purposes.

## Tokens

The example in this app uses two auth cookies, one called `user` which has some basic user info in it and another called `jwt` which contains a dummy JWT. You can replace either of these as you see fit but make sure to update the helpers and controller functions where the cookies are referenced as well as the context itself in the `auth` folder. References to the cookies are in: -

* `auth/helpers/tokens`
* `auth/context/index`
* `auth/context/provider`
* `server/middleware/cookies`

## Auth Context

To document still

## AuthWrapper

The AuthWrapper is a simple component that can be used in the app to show or hide content based on whether a user is logged in or not and has certain permissions. It takes two props: -

* a bool for `authenticated`. When this is set to false it will only render its children if there is no logged in user. By default it is true and will only render its children if there is a logged in user.
* an array for `permissions` which is empty by default. If a user is logged in and a permissions array is passed to the component then the provider will compare those two arrays (expects `int` or `string` values within) and return the children to the user if they have adequate permissions. Currently this function uses the mock roles array set by the login action but could be modified to check whatever is needed. *n.b.* if `authenticate` is false then the permission check will not be run as the component assumes only logged in users have permissions

```javascript
<AuthWrapper authenticated={ false }>
	// ... my components requiring people not to be logged in
</AuthWrapper>
```

```javascript
<AuthWrapper permissions={ [2, 3] }>
	// ... my components requiring permissions
</AuthWrapper>
```

# Server side fetching

## APOLLO

This is configured and will work out of the box with any of the Query components in your app.

## REDUX

### getInitialProps()

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

### componentDidMount()

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
│   └── dashboard.json
└── es
    └── dashboard.json
```

By default, it is configured to load the applications namespace e.g. 'dashboard' namespace which means it will look for dashboard.json. It caches these files into local storage. dashboard.json contains a list of keys and values:

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
- [ ] Implement an error boundary
- [x] Implement `@salocreative/react-redux-alerts example`
- [ ] Implement Loading wrapper
- [x] Document actions approach
- [x] Flesh out auth example
- [ ] Upgrade `react-redux-middleware`


# Credit

Thanks to [Work & Co](https://github.com/workco/marvin) for the starting point for this project. Workco's starter project gave the basic structure and approach for this starter kit

## Contributors

* [Work & Co](https://github.com/worko)
* [James Bliss](https://github.com/jamesbliss)
* [Tim Stone](https://github.com/fetimo)

# License

[MIT License](https://github.com/SaloCreative/react-redux-starter/blob/master/LICENSE)