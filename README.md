<div align="center">
	<h1>React-terminal</h1>
	<sub><a href="https://github.com/SimonAKing/react-terminal/blob/master/README.zh_CN.md">中文文档</a></sub>
</div>
<hr/>
<p align="center">🚀 <strong>A terminal emulator in React</strong></p>
<p align="center">
  <a href="https://github.com/feross/standard">
    <img src="https://img.shields.io/badge/code%20style-standard-green.svg?style=flat-square">
  </a>
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/github/package-json/v/simonaking/react-terminal?style=flat-square">
  </a>
  <a href="https://github.com/SimonAKing/react-terminal/issues"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square"></a>
</p>



## 👀Table of contents

- [🎉Introduction](https://github.com/SimonAKing/react-terminal#introduction)
- [💡Install](https://github.com/SimonAKing/react-terminal#install)
- [✨Usage](https://github.com/SimonAKing/react-terminal#usage)
- [🎨TODO](https://github.com/SimonAKing/react-terminal#todo)
- [🎯Dev](https://github.com/SimonAKing/react-terminal#dev)
- [💚Reward](https://github.com/SimonAKing/react-terminal#reward)
- [📃License](https://github.com/SimonAKing/react-terminal#license)



## 🎉Introduction

![terminal-intro](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2YwcmZlMzhzcmx2YW5tOXQ5ZGdmand6bjVianN5a21zdm04eWRueSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aNmpU6nhm2GR8IXb2r/giphy.gif)

[Try the demo](https://simonaking.com/about/)

[`React-terminal`](https://simonaking.com/about/) is a terminal emulator inspired by [vue-terminal](https://github.com/dongsuo/vue-terminal).

If you are looking for an interactive application that displays information, then `React-terminal` would be a good choice for you.



Some of cool features of this React component are:

1. Built-in system commands：`ls` `cd` `pwd` `echo` etc
2. You can use `tab` to automatically complete the command
3. Command history using arrow up and down
4. Customizable commands, prompt and label style
5. Support callbacks(async/non-async) for commands



Some ideas for using React Terminal in your next project:

- **Personal website**: Make your personal website or web resume a command-line interface.

- **Demos**: Create mock commands in JavaScript for your CLI app, and let users try out commands in their browser with simulated output.



## 💡Install

```sh
npm i react-terminal-app
```

OR

```sh
yarn add react-terminal-app
```

This package also depends on `react` so make sure you've already installed it.



## ✨Usage

```jsx
import Terminal from 'react-terminal-app'

// refer to: https://github.com/SimonAKing/react-terminal/blob/master/demo/src/commands
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

Defaults to `react-terimnal-app`



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
git clone https://github.com/SimonAKing/react-terminal
cd react-terminal
yarn install
yarn start
```

Feel free to open issues or PRs for any problem you may encounter, typos that you see or aspects that are confusing.

Contributions are welcome, open an issue or email me if you have something you want to work on.
