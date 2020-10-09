const eventHandlers = {
  onProxyReq: (proxyReq: any, req: any, res: any) => {
    // console.log('onProxyReq', req.headers, req.url)
    // setProxyHeaders(proxyReq, bffHeader)
    console.log(`targeturl: ${proxyReq.socket._host}${proxyReq.path}`)
  },
  onProxyRes: (proxyRes: any, req: any, res: any) => {
    // console.log('onProxyRes')
  },
  onError: (err: any, req: any, res: any) => {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    })
    res.end(`{ code: -1, msg: ${err}}`)
  },
}

export default {
  '/api': {
    target: 'http://localhost:7001',
    pathRewrite: {
      '': '',
      secure: false,
    },
    ...eventHandlers,
  },
  '/public': {
    target: 'http://localhost:7001',
    pathRewrite: {
      '': '',
      secure: false,
    },
    ...eventHandlers,
  },
}
