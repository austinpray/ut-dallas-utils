UT Dallas Utils
=========================

A collection of JSON API endpoints for UT Dallas.

# Public API

base: http://ut-dallas-utils.herokuapp.com

## GET `/is_student/:name`

Checks if a person is in the [UTD Student Directory](http://www.utdallas.edu/directory/).

`curl http://ut-dallas-utils.herokuapp.com/is_student/Austin%20Pray`

```javascript
{
  "error": false,
  "request": {
    "name": "Austin Pray"
  },
  "isStudent": true
}
```

# TODO

More endpoints coming. Please submit a [feature request](https://github.com/austinpray/ut-dallas-utils/issues) or [sling some code my way](https://github.com/austinpray/ut-dallas-utils/pulls).

:heart: Austin Pray <austin@austinpray.com>
