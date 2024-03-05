
import {io} from "../index.js"
import { fetchLikesCount } from "./fetchLikesCount.js";



// io.on("connection", (socket) => {
//   console.log("New user connected", socket.id);
//   // socket.emit("data", "hello from server");

//   socket.on("likescount", (data) => {
//     console.log("Client-->", data);
//     io.emit("likescount", 20);
//     //  socket.emit("new-message", "Hello from server");
//   });
// });





// Server-side code
const activeConnections = {}; // Map to store active connections for each post ID

console.log("this is object of active connections", activeConnections)

// Function to emit likes count to active connections for a post
function emitLikesCount(postId, likesCount) {
  const connections = activeConnections[postId] || [];

  console.log("this is a connection array for sockets" , connections)
  connections.forEach((socket) => {
    // socket.emit("likes-count-update", likesCount);
    io.to(socket).emit("likes-count-update", likesCount);

  });
}





export const connectToWebSocketClients =  ()=>{



    io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Example handling of WebSocket messages
  socket.on("message", async (data) => {


    console.log('client se message aaya ')
    try {
      const { action, postId } = JSON.parse(data);
      if (action === "like" || action === "unlike") {
        console.log(`User ${action} post ${postId}`);
        // Process like action for the specified post
        // Update like count, notify other users, etc.
        const newLikesCount = await fetchLikesCount(postId)
        socket.emit("likes-count-update",newLikesCount);
        // emitLikesCount(postId, newLikesCount);
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  });

  // Add the socket to the list of active connections for the post ID
  socket.on("subscribe", (postId) => {
    if (!activeConnections[postId]) {
      activeConnections[postId] = [];
    }

    if(!activeConnections[postId].includes(socket.id)){
      activeConnections[postId].push(socket.id);

    }
  });

  // Remove the socket from the list of active connections when disconnected
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    Object.keys(activeConnections).forEach((postId) => {
      activeConnections[postId] = activeConnections[postId].filter(
        (s) => s !== socket.id
      );
    });
  });
});



















}






