# grunt-release
[Grunt](http://gruntjs.com) plugin for releasing a new version of a library, with optional publishing to npm.  

## Repetition Killed the Cat
Releasing a new version of your killer Node lib looks like this:

1. bump the version in your `package.json` file.
2. stage the package.json file's change.
3. commit that change with a message like "release 0.6.22".
4. create a new git tag for the release. 
5. push the changes out to github.
6. also push the new tag out to github.
7. publish the new version to npm.

Cool, right? No! What's wrong with you? Automate all that:

```shell
grunt release
```

Done. No more github issues reminding you how often you forget to do one or more of the steps.

## Setup
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-release --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-release');
```

## Using grunt-release

**Patch Release:**
```shell
grunt release
```
or
```shell
grunt release:patch
```

**Minor Release:**
```shell
grunt release:minor
```

**Major Release:**
```shell
grunt release:major
```

## Options
You can disable any of the steps if you want, by adding this to your Gruntfile:

```js
  release: {
    options: {
      bump: false,
      add: false,
      commit: false,
      tag: false,
      push: false,
      pushTags: false,
      npm: false
    }
  }
```

## Credits
Inspired by Vojta Jina's [grunt-bump](https://github.com/vojtajina/grunt-bump).

## License
MIT