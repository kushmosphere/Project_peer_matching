export function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    socket.on("conversation:join", ({ conversationId }) => {
      socket.join(conversationId);
    });

    socket.on("message:send", ({ conversationId, message }) => {
      socket.to(conversationId).emit("message:new", message);
    });

    socket.on("typing:start", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("typing:update", { userId, isTyping: true });
    });

    socket.on("typing:stop", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("typing:update", { userId, isTyping: false });
    });

    socket.on("message:seen", ({ conversationId, messageId, userId }) => {
      socket.to(conversationId).emit("message:seen", { messageId, userId, seenAt: new Date() });
    });
  });
}

