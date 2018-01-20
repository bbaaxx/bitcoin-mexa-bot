let rconInstance;

export default io => {
  if (typeof rconInstance !== 'undefined') return rconInstance;
  if (typeof io === 'undefined') throw new Error('A socket Io instance is required');
  rconInstance = msg => io.sockets.emit('rcon-out', msg);
  return rconInstance;
}