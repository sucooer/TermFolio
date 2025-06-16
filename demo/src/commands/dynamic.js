const getTime = () => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${hours}${minutes < 10 ? ':0' : ':'}${minutes}${seconds < 10 ? ':0' : ':'}${seconds}`
}

const introduction = [
  {
    type: 'system',
    label: 'System',
    content: `cd /about`
  },
  {
    type: 'system',
    label: 'System',
    content: 'Thanks for your visit, let me introduce myself.'
  },
  {
    time: getTime(),
    type: 'info',
    label: 'Name:',
    content: 'Anyaer • G.'
  },
  {
    time: getTime(),
    type: 'info',
    label: 'Sex:',
    content: 'Male'
  },
  {
    time: getTime(),
    type: 'info',
    label: 'Age:',
    content: '28'
  },
  {
    time: getTime(),
    type: 'info',
    label: 'Email:',
    content: 'saitobin@outlook.com'
  },
]

export default {
  intro: {
    description: 'Introducting myself again.',
    run(print) {
      let i = 0
      return new Promise(resolve => {
        const interval = setInterval(() => {
          print(introduction[i])
          i++
          if (!introduction[i]) {
            clearInterval(interval)
            resolve({ type: 'success', label: 'Done', content: 'Myself introduction is over!' })
          }
        }, 500)
      })
    }
  },
  echo: {
    description: 'Echoes input.',
    run(print, input) {
      return new Promise(resolve => {
        print({
          time: getTime(),
          label: 'Echo',
          type: 'success',
          content: input
        })
        resolve({ type: 'success', label: '', content: '' })
      })
    }
  },
  open: {
    description: 'Open a specified url in a new tab.',
    run(print, input) {
      return new Promise((resolve) => {
        if (!input) {
          resolve({ type: 'error', label: 'Error', content: 'a url is required!' })
          return
        }
        if (!input.startsWith('http')) {
          resolve({ type: 'error', label: 'Error', content: 'Please add `http` prefix!' })
          return
        }
        print({ type: 'success', label: 'Success', content: 'Opening' })

        window.open(input, '_blank')
        resolve({ type: 'success', label: 'Done', content: 'Page Opened!' })
      })
    }
  },
  blog: {
    description: 'Open my blog in a new tab.',
    run(print) {
      return new Promise((resolve) => {
        print({ type: 'success', label: 'Success', content: 'Opening' })

        window.open('https://sonic.520717.xyz', '_blank')
        resolve({ type: 'success', label: 'Done', content: ':)' })
      })
    }
  },
  music: {
    description: 'Open music player in a new tab.',
    run(print) {
      return new Promise((resolve) => {
        print({ type: 'success', label: 'Success', content: 'Opening' })

        window.open('https://music.520717.xyz/', '_blank')
        resolve({ type: 'success', label: 'Done', content: ':)' })
      })
    }
  },
}
