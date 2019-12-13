const data = {
  data: [
    {
      "type": "div",
      "value": "test1"
    },
    {
      "type": "div",
      "value": "test2"
    }
  ]
}

export default {
  get(url) {
    if (url === '/list.json') {
      return new Promise((res, rej) => {
        if (this.success) {
          res({ data })
        } else {
          rej({ data })
        }
      })
    }
  }
}
