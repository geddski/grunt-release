# grunt-release
[Grunt](http://gruntjs.com) plugin for automating all the release steps of your node lib or bower component, with optional publishing to npm.  

## Repetition Killed the Cat
Releasing a new version of your killer Node/Bower/Component/JS lib looks something like this:

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

**Pre-release**
```shell
grunt release:prerelease
```

`prerelease` will just update the number after `MAJOR.MINOR.PATCH` (eg: `1.0.0-1`)
If you want to add an alphanumeric identifier, you will need to add it by hand.
Example: add `-alpha.0` to get something like `1.0.0-alpha.0`. Calling `grunt release:prerelease` will just update the last number to `1.0.0-alpha.1`.

**Releasing Unstable/Beta Versions**
Sometimes it is useful to publish an 'unstable' or 'beta' version to `npm`, while leaving your last stable release as the default that gets installed on an `npm install`. 
`npm` accomplishes this using the `--tag myUnstableVersion` flag. You can enable this flag in grunt-release either by setting the `npmtag` option:

```js
  release: {
    options: {
      npmtag: 'canary',
    }
  }
```

or by passing the CLI arg:

```shell
grunt release --npmtag canary
```

NOTE: If the tag you pass is **true**, then the tag will be the *new* version number after the bump. Otherwise it will be the string you provided.


**Dry Run:**
To see what grunt-release does, without really changing anything, use `--no-write` option.

```shell
grunt --no-write -v release
```

You'll see something like:
```
Parsing package.json...OK
Not actually writing package.json...OK
>> Version bumped to 0.2.6
Not actually running: git add package.json
Not actually running: git commit package.json -m "release 0.2.6"
>> package.json committed
Not actually running: git tag 0.2.6 -m "version 0.2.6"
>> New git tag created: 0.2.6

Done, without errors.
```

## Options
The following are all the release steps, you can disable any you need to:

```js
  release: {
    options: {
      bump: false, //default: true
      file: 'component.json', //default: package.json
      add: false, //default: true
      commit: false, //default: true
      tag: false, //default: true
      push: false, //default: true
      pushTags: false, //default: true
      npm: false, //default: true
      npmtag: true, //default: no tag
      folder: 'folder/to/publish/to/npm', //default project root
      tagName: 'some-tag-<%= version %>', //default: '<%= version %>'
      commitMessage: 'check out my release <%= version %>', //default: 'release <%= version %>'
      tagMessage: 'tagging version <%= version %>', //default: 'Version <%= version %>',
      github: { 
        repo: 'geddski/grunt-release', //put your user/repo here
        usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains Github username 
        passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains Github password
      }
    }
  }
```

### Notes on Github Releases:
1. Yes, you have to use environment variables. I would be a terrible person if I let you check in your username and password into your source code.
2. The [Github Releases API](http://developer.github.com/v3/repos/releases/) is still unstable and may change in the next couple months or so.
3. You can use an [access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use) if you'd rather.

For node libs, leave `file` option blank as it will default to `package.json`. For Bower components, set it to `bower.json`.

## License
MIT
