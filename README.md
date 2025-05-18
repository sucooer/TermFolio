<div align="center">
	<h1>TermFolio</h1>
	<sub><a href="https://github.com/SimonAKing/termfolio/blob/master/README.zh_CN.md">中文文档</a></sub>
</div>
<hr/>
<p align="center">🚀 <strong>An elegant terminal-style portfolio component for developers</strong></p>
<p align="center">
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-green.svg?style=flat-square">
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/github/package-json/v/SimonAKing/termfolio?style=flat-square">
  </a>
  <a href="https://github.com/SimonAKing/termfolio/issues"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square"></a>
</p>



## 👀Table of contents

- [🎉Introduction](https://github.com/SimonAKing/termfolio#introduction)
- [💡Install](https://github.com/SimonAKing/termfolio#install)
- [✨Usage](https://github.com/SimonAKing/termfolio#usage)
- [🎨TODO](https://github.com/SimonAKing/termfolio#todo)
- [🎯Dev](https://github.com/SimonAKing/termfolio#dev)
- [💚Reward](https://github.com/SimonAKing/termfolio#reward)
- [📃License](https://github.com/SimonAKing/termfolio#license)



## 🎉Introduction

![terminal-intro](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2YwcmZlMzhzcmx2YW5tOXQ5ZGdmand6bjVianN5a21zdm04eWRueSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aNmpU6nhm2GR8IXb2r/giphy.gif)

[Live Demo](https://simonaking.com/about/)

[`TermFolio`](https://simonaking.com/about/) is a terminal-style portfolio component designed specifically for developers, inspired by the [vue-terminal](https://github.com/dongsuo/vue-terminal) project.

If you're looking for a unique way to showcase your personal information, project experience, or technical skills, `TermFolio` is your perfect choice. It beautifully combines the geek aesthetics of a terminal with personal presentation, creating a distinctive interactive experience.

Key Features of `TermFolio`:

1. Built-in System Commands: `ls`, `cd`, `pwd`, `echo`, etc., allowing visitors to browse your information like using a real terminal
2. Smart Command Completion: Supports `tab` auto-completion
3. Command History: Navigate through previous commands using arrow keys
4. Highly Customizable: Customize command styles and display content
5. Flexible Extension: Create any custom display commands through JS

Recommended Use Cases:

- **Personal Homepage**: Create a unique personal introduction page
- **Online Resume**: Present your professional experience through an interactive terminal
- **Project Showcase**: Display your portfolio projects via command-line interface


## 💡Install

```sh
npm i termfolio
```

OR

```sh
yarn add termfolio
```

This package also depends on `react` so make sure you've already installed it.



## ✨Usage

```jsx
import Terminal from 'termfolio'

// refer to: https://github.com/SimonAKing/termfolio/blob/master/demo/src/commands
import dynamicList from 'command/dynamic'
import staticList from 'command/static'

const cmd = {
  dynamicList,
  staticList
}

const config = {
  prompt: '➜  ~ ',
  version: '1.0.0',
  initialDirectory: 'workspace',
  bootCmd: 'intro'
}

function App() {
   return <Terminal cmd={cmd} config={config} />
}
```



### DataStruct

#### PropTypes

```js
{
	cmd: PropTypes.shape({
      dynamicList: PropTypes.object,
      staticList: PropTypes.object
    }).isRequired,

    config: PropTypes.shape({
      initialDirectory: PropTypes.string,
      prompt: PropTypes.string,
      version: PropTypes.string,
      bootCmd: PropTypes.string
    }),

    className: PropTypes.string,
}
```



#### Command

>  Command is an object, used to define message showed in terminal:

```ts
interface ICommand {
    time?: string; // time to show time before command body
	type?: string; // label to show a label before command body
	label?: string; // type to set command's type, will set a class to command's label part, there is 7 builtin types: error, success, info, warning, system, black, time
    content?: string; // the main text showed in terminal.
    [propName: string]: any;
}
type command = ICommand | string
```



### Props

#### className

The class name of the root node, you can customize the style.

Defaults to `termfolio`



#### config

1. prompt

   The text to show before the prompt.

   Defaults to `➜  ~ `.

2. initialDirectory

   Directory opened by default in the terminal.

   Defaults to `src`.

3. version

   The version number of the terminal, you can execute the `version` command to view.

   Defaults to `1.0.0`.

4. bootCmd

   The name of the command to be executed when the terminal is initialized.

   Defaults to `intro`.



#### cmd

1. dynamicList

   > The list of interactive commands.

   ```js
   {
     commandName: {
     	description: '...',
       run(print, input) {
         // print: a function that allow you to print command to the terminal
         // input: Command parameters currently entered
         // eg: echo HelloWorld, input The value passed in is 'HelloWorld'
         return new Promise((resolve,reject) => {
           // do something
         })
       }
     }
   }
   ```

   Example: Define an `open` command to open the entered URL.

   ```js
   export default {
     open: {
       description: 'Open a specified url in a new tab.',
       run(print, input) {
         return new Promise((resolve,reject) => {
           if (!input) {
             return reject({ type: 'error', label: 'Error', content: 'a url is required!' })
           }
           if (!input.startsWith('http')) {
             return reject({ type: 'error', label: 'Error', content: 'Please add `http` prefix!' })
           }
           print({ type: 'success', label: 'Success', content: 'Opening' })
           window.open(input, '_blank')
           resolve({ type: 'success', label: 'Done', content: 'Page Opened!' })
         })
       }
     }
   }
   ```

2. staticList

   > The list of commands that only show data

   ```js
   {
     commandName: {
     	description: '...',
       list: [ <command> ]
     }
   }
   ```

	Example: Define a `skills` command to display the skills you master.

	```js
	  skill: {
	    description: 'Return a list of my skills and my rating of them.',
	    list: [
	      { type: 'success', label: 'A', content: '· JavaScript 99/100' },
	      { type: 'success', label: 'A', content: '· Go 90/100' },
	      { type: 'success', label: 'A', content: '· Java 80/100' },
	      { type: 'success', label: 'A', content: '· Kotlin 80/100' }
	   ]}
	```



### Built-in command

#### System commands

  - `clear | cls` - clears the screen
   - `help | ls` - list all the commands
   - `exit | back` - exit the current session
   - `pwd` - print name of current directory
   - `cd` - change the current directory
   - `version` - print the version of current app



#### Tip commands

- When jumping to the page - `Jumping page...`

- When the command is not found

  ````js
  command => `Command '${command}' not found`
  ````

- The prompt of the help command - `Here is a list of supporting command.`

- When the command is wrong - `'Something went wrong!'`



## 🎨TODO

1. Add the button click function in the upper left corner of the terminal.
2. Add more system commands.
3. Make terminal themes customizable.
4. Add multi-line input feature.
5. Add plug-in system support.



## 🎯Dev

This project was generated with [nwb](https://github.com/insin/nwb).

```sh
git clone https://github.com/SimonAKing/termfolio
cd termfolio
yarn install
yarn start
```

Feel free to open issues or PRs for any problem you may encounter, typos that you see or aspects that are confusing.

Contributions are welcome, open an issue or email me if you have something you want to work on.
