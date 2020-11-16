const HandlerServer = require("./server");

const handlerServer = new HandlerServer();

handlerServer.start()
  .catch(error => console.log(error));