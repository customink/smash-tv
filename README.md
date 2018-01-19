# Big money! Big prizes! I love it!

Smash TV is a slideshow built from an rss feed to display wows on our dashboard

## Usage
You can define an array of departments in the query parameters with mulitple `d[]`

```bash
http://customink.com/smash-tv?d[]=1-engineering&d[]=2-sales
```
## Development

We are using [yarn](https://yarnpkg.com/en/) and [parcel.js](https://parceljs.org/) to package the application.

```bash
$ git clone git@github.com:customink/smash-tv.git
$ cd smash-tv
$ yarn install
$ yarn serve
```

## Production

To clean the dist directory, build the project and deploy to the gh-pages branch run:

```
$ yarn deploy
```

![screen shot 2018-01-18 at 3 10 32 pm](https://user-images.githubusercontent.com/2381/35119054-c3b3cb48-fc61-11e7-9524-1983bd4ebc3c.png)
