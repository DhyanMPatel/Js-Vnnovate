# Real-time Communication

## Real-time Applications for FAANG

### Why Real-time Communication Matters

- **User Experience**: Instant updates and interactions
- **Collaboration**: Multi-user applications and live features
- **Notifications**: Real-time alerts and status updates
- **Data Synchronization**: Keep clients in sync across devices
- **Modern Applications**: Essential for chat, gaming, trading, and collaboration tools

## WebSocket Implementation

### 1. Native WebSocket Server

```javascript
import { WebSocketServer } from "ws";
import http from "http";
import url from "url";

class WebSocketManager {
  constructor(server, options = {}) {
    this.wss = new WebSocketServer({
      server,
      path: options.path || "/ws",
    });

    this.clients = new Map(); // clientId -> client info
    this.rooms = new Map(); // roomId -> Set of clientIds
    this.messageHandlers = new Map(); // message type -> handler
    this.authMiddleware = options.authMiddleware || this.defaultAuth;

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.wss.on("connection", (ws, req) => {
      this.handleConnection(ws, req);
    });

    this.wss.on("error", (error) => {
      console.error("WebSocket server error:", error);
    });
  }

  async handleConnection(ws, req) {
    try {
      // Parse URL and query parameters
      const parsedUrl = url.parse(req.url, true);
      const token = parsedUrl.query.token;
      const roomId = parsedUrl.query.room;

      // Authenticate client
      const user = await this.authMiddleware(token);
      if (!user) {
        ws.close(1008, "Authentication failed");
        return;
      }

      // Generate client ID
      const clientId = this.generateClientId();

      // Store client info
      const clientInfo = {
        id: clientId,
        ws,
        user,
        rooms: new Set([roomId]), // Join default room
        joinedAt: Date.now(),
        lastPing: Date.now(),
        isAlive: true,
      };

      this.clients.set(clientId, clientInfo);

      // Add to room
      if (roomId) {
        this.joinRoom(clientId, roomId);
      }

      console.log(`Client connected: ${clientId} (${user.username})`);

      // Setup client event handlers
      this.setupClientHandlers(clientInfo);

      // Send welcome message
      this.sendToClient(clientId, {
        type: "connected",
        data: {
          clientId,
          user: {
            id: user.id,
            username: user.username,
          },
          timestamp: Date.now(),
        },
      });

      // Notify other clients in room
      this.broadcastToRoom(
        roomId,
        {
          type: "user_joined",
          data: {
            user: {
              id: user.id,
              username: user.username,
            },
            timestamp: Date.now(),
          },
        },
        clientId
      );
    } catch (error) {
      console.error("Connection handling error:", error);
      ws.close(1011, "Internal server error");
    }
  }

  setupClientHandlers(clientInfo) {
    const { ws, id: clientId } = clientInfo;

    // Message handler
    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data);
        await this.handleMessage(clientInfo, message);
      } catch (error) {
        console.error("Message handling error:", error);
        this.sendToClient(clientId, {
          type: "error",
          data: {
            message: "Invalid message format",
            timestamp: Date.now(),
          },
        });
      }
    });

    // Close handler
    ws.on("close", (code, reason) => {
      this.handleDisconnection(clientInfo, code, reason);
    });

    // Error handler
    ws.on("error", (error) => {
      console.error(`Client ${clientId} error:`, error);
      this.handleDisconnection(clientInfo, 1006, "Connection error");
    });

    // Ping/Pong for connection health
    ws.on("pong", () => {
      clientInfo.lastPing = Date.now();
      clientInfo.isAlive = true;
    });
  }

  async handleMessage(clientInfo, message) {
    const { type, data } = message;

    // Update last activity
    clientInfo.lastPing = Date.now();

    // Handle different message types
    switch (type) {
      case "ping":
        this.sendToClient(clientInfo.id, {
          type: "pong",
          data: { timestamp: Date.now() },
        });
        break;

      case "join_room":
        await this.handleJoinRoom(clientInfo, data);
        break;

      case "leave_room":
        await this.handleLeaveRoom(clientInfo, data);
        break;

      case "send_message":
        await this.handleSendMessage(clientInfo, data);
        break;

      case "typing":
        await this.handleTyping(clientInfo, data);
        break;

      default:
        // Custom message handlers
        const handler = this.messageHandlers.get(type);
        if (handler) {
          await handler(clientInfo, data);
        } else {
          this.sendToClient(clientInfo.id, {
            type: "error",
            data: {
              message: `Unknown message type: ${type}`,
              timestamp: Date.now(),
            },
          });
        }
    }
  }

  async handleJoinRoom(clientInfo, { roomId }) {
    if (!roomId) {
      return this.sendToClient(clientInfo.id, {
        type: "error",
        data: { message: "Room ID is required" },
      });
    }

    // Leave current rooms if needed
    for (const currentRoom of clientInfo.rooms) {
      if (currentRoom !== roomId) {
        this.leaveRoom(clientInfo.id, currentRoom);
      }
    }

    // Join new room
    this.joinRoom(clientInfo.id, roomId);

    // Send confirmation
    this.sendToClient(clientInfo.id, {
      type: "room_joined",
      data: {
        roomId,
        timestamp: Date.now(),
      },
    });

    // Notify room members
    this.broadcastToRoom(
      roomId,
      {
        type: "user_joined_room",
        data: {
          user: {
            id: clientInfo.user.id,
            username: clientInfo.user.username,
          },
          roomId,
          timestamp: Date.now(),
        },
      },
      clientInfo.id
    );
  }

  async handleLeaveRoom(clientInfo, { roomId }) {
    if (!roomId) {
      return this.sendToClient(clientInfo.id, {
        type: "error",
        data: { message: "Room ID is required" },
      });
    }

    this.leaveRoom(clientInfo.id, roomId);

    // Send confirmation
    this.sendToClient(clientInfo.id, {
      type: "room_left",
      data: {
        roomId,
        timestamp: Date.now(),
      },
    });

    // Notify room members
    this.broadcastToRoom(roomId, {
      type: "user_left_room",
      data: {
        user: {
          id: clientInfo.user.id,
          username: clientInfo.user.username,
        },
        roomId,
        timestamp: Date.now(),
      },
    });
  }

  async handleSendMessage(clientInfo, { roomId, content, type = "text" }) {
    if (!roomId || !content) {
      return this.sendToClient(clientInfo.id, {
        type: "error",
        data: { message: "Room ID and content are required" },
      });
    }

    // Verify client is in room
    if (!clientInfo.rooms.has(roomId)) {
      return this.sendToClient(clientInfo.id, {
        type: "error",
        data: { message: "Not in room" },
      });
    }

    // Create message object
    const message = {
      id: this.generateMessageId(),
      roomId,
      sender: {
        id: clientInfo.user.id,
        username: clientInfo.user.username,
      },
      content,
      type,
      timestamp: Date.now(),
    };

    // Broadcast to room
    this.broadcastToRoom(roomId, {
      type: "new_message",
      data: message,
    });

    // Store message in database (optional)
    await this.storeMessage(message);
  }

  async handleTyping(clientInfo, { roomId, isTyping }) {
    if (!roomId) {
      return;
    }

    // Broadcast typing status to room (excluding sender)
    this.broadcastToRoom(
      roomId,
      {
        type: "typing_status",
        data: {
          user: {
            id: clientInfo.user.id,
            username: clientInfo.user.username,
          },
          isTyping,
          timestamp: Date.now(),
        },
      },
      clientInfo.id
    );
  }

  // Room management
  joinRoom(clientId, roomId) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }

    this.rooms.get(roomId).add(clientId);

    const clientInfo = this.clients.get(clientId);
    if (clientInfo) {
      clientInfo.rooms.add(roomId);
    }
  }

  leaveRoom(clientId, roomId) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.delete(clientId);

      // Clean up empty rooms
      if (room.size === 0) {
        this.rooms.delete(roomId);
      }
    }

    const clientInfo = this.clients.get(clientId);
    if (clientInfo) {
      clientInfo.rooms.delete(roomId);
    }
  }

  // Message sending
  sendToClient(clientId, message) {
    const clientInfo = this.clients.get(clientId);
    if (clientInfo && clientInfo.ws.readyState === 1) {
      // WebSocket.OPEN
      clientInfo.ws.send(JSON.stringify(message));
    }
  }

  broadcastToRoom(roomId, message, excludeClientId = null) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    for (const clientId of room) {
      if (clientId !== excludeClientId) {
        this.sendToClient(clientId, message);
      }
    }
  }

  broadcast(message, excludeClientId = null) {
    for (const [clientId] of this.clients) {
      if (clientId !== excludeClientId) {
        this.sendToClient(clientId, message);
      }
    }
  }

  // Disconnection handling
  handleDisconnection(clientInfo, code, reason) {
    const { id: clientId, user, rooms } = clientInfo;

    console.log(
      `Client disconnected: ${clientId} (${user.username}) - ${code}: ${reason}`
    );

    // Remove from all rooms
    for (const roomId of rooms) {
      this.leaveRoom(clientId, roomId);

      // Notify room members
      this.broadcastToRoom(roomId, {
        type: "user_disconnected",
        data: {
          user: {
            id: user.id,
            username: user.username,
          },
          timestamp: Date.now(),
        },
      });
    }

    // Remove client
    this.clients.delete(clientId);
  }

  // Utility methods
  generateClientId() {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async defaultAuth(token) {
    if (!token) {
      return null;
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      return user;
    } catch (error) {
      return null;
    }
  }

  async storeMessage(message) {
    // Store message in database for history
    // await Message.create(message);
  }

  // Custom message handlers
  onMessage(type, handler) {
    this.messageHandlers.set(type, handler);
  }

  // Get statistics
  getStats() {
    return {
      totalClients: this.clients.size,
      totalRooms: this.rooms.size,
      clientsByRoom: Array.from(this.rooms.entries()).map(
        ([roomId, clients]) => ({
          roomId,
          clientCount: clients.size,
        })
      ),
    };
  }

  // Health check and cleanup
  startHealthCheck(intervalMs = 30000) {
    setInterval(() => {
      const now = Date.now();

      for (const [clientId, clientInfo] of this.clients) {
        // Check if client is still alive
        if (!clientInfo.isAlive || now - clientInfo.lastPing > 60000) {
          console.log(`Removing inactive client: ${clientId}`);
          clientInfo.ws.terminate();
          this.handleDisconnection(clientInfo, 1000, "Inactive");
        } else {
          // Send ping
          clientInfo.isAlive = false;
          clientInfo.ws.ping();
        }
      }
    }, intervalMs);
  }
}

// Usage example
const server = http.createServer(app);
const wsManager = new WebSocketManager(server, {
  path: "/ws",
  authMiddleware: async (token) => {
    // Custom authentication logic
    return { id: "123", username: "testuser" };
  },
});

// Start health check
wsManager.startHealthCheck();

// Custom message handler
wsManager.onMessage("custom_action", async (clientInfo, data) => {
  // Handle custom message
  console.log("Custom action from", clientInfo.user.username, data);

  wsManager.sendToClient(clientInfo.id, {
    type: "custom_response",
    data: {
      message: "Action processed successfully",
      timestamp: Date.now(),
    },
  });
});
```

### 2. WebSocket Client Implementation

```javascript
class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url;
    this.options = options;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
    this.reconnectInterval = options.reconnectInterval || 1000;
    this.messageHandlers = new Map();
    this.isConnected = false;
    this.queue = []; // Message queue for when disconnected
  }

  connect(token) {
    const wsUrl = `${this.url}?token=${encodeURIComponent(token)}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log("WebSocket connected");
      this.isConnected = true;
      this.reconnectAttempts = 0;

      // Send queued messages
      this.flushQueue();

      // Trigger connect event
      this.emit("connected");
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.handleMessage(message);
      } catch (error) {
        console.error("Message parsing error:", error);
      }
    };

    this.ws.onclose = (event) => {
      console.log("WebSocket disconnected:", event.code, event.reason);
      this.isConnected = false;

      // Trigger disconnect event
      this.emit("disconnected", { code: event.code, reason: event.reason });

      // Attempt reconnection
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.attemptReconnect();
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      this.emit("error", error);
    };
  }

  handleMessage(message) {
    const { type, data } = message;

    // Handle built-in message types
    switch (type) {
      case "connected":
        this.emit("connected", data);
        break;

      case "error":
        this.emit("error", data);
        break;

      case "pong":
        // Handle pong response
        break;

      default:
        // Custom message handlers
        const handler = this.messageHandlers.get(type);
        if (handler) {
          handler(data);
        } else {
          this.emit(type, data);
        }
    }
  }

  send(message) {
    if (this.isConnected && this.ws.readyState === 1) {
      this.ws.send(JSON.stringify(message));
    } else {
      // Queue message for when connected
      this.queue.push(message);
    }
  }

  flushQueue() {
    while (this.queue.length > 0) {
      const message = this.queue.shift();
      this.send(message);
    }
  }

  attemptReconnect() {
    this.reconnectAttempts++;

    console.log(
      `Attempting reconnection (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
    );

    setTimeout(() => {
      this.connect(this.options.token);
    }, this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1)); // Exponential backoff
  }

  // Room operations
  joinRoom(roomId) {
    this.send({
      type: "join_room",
      data: { roomId },
    });
  }

  leaveRoom(roomId) {
    this.send({
      type: "leave_room",
      data: { roomId },
    });
  }

  sendMessage(roomId, content, type = "text") {
    this.send({
      type: "send_message",
      data: { roomId, content, type },
    });
  }

  sendTyping(roomId, isTyping) {
    this.send({
      type: "typing",
      data: { roomId, isTyping },
    });
  }

  // Event handling
  on(type, handler) {
    if (!this.messageHandlers.has(type)) {
      this.messageHandlers.set(type, []);
    }
    this.messageHandlers.get(type).push(handler);
  }

  emit(type, data) {
    const handlers = this.messageHandlers.get(type);
    if (handlers) {
      handlers.forEach((handler) => handler(data));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close(1000, "Client disconnect");
    }
  }
}

// Usage example
const wsClient = new WebSocketClient("ws://localhost:3000/ws", {
  maxReconnectAttempts: 5,
  reconnectInterval: 1000,
  token: "your-jwt-token",
});

// Event handlers
wsClient.on("connected", (data) => {
  console.log("Connected to WebSocket server", data);

  // Join a room
  wsClient.joinRoom("general");
});

wsClient.on("new_message", (data) => {
  console.log("New message:", data);
  // Update UI with new message
});

wsClient.on("user_joined_room", (data) => {
  console.log("User joined room:", data);
  // Update user list
});

wsClient.on("typing_status", (data) => {
  console.log("User typing:", data);
  // Show typing indicator
});

// Connect to server
wsClient.connect();
```

## Socket.io Implementation

### 1. Socket.io Server Setup

```javascript
import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";

class SocketIOManager {
  constructor(server, options = {}) {
    this.io = new Server(server, {
      cors: {
        origin: options.corsOrigin || "*",
        methods: ["GET", "POST"],
      },
      transports: ["websocket", "polling"],
    });

    this.connectedUsers = new Map(); // socketId -> user info
    this.userSockets = new Map(); // userId -> Set of socketIds
    this.rooms = new Map(); // roomId -> Set of userIds

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  setupMiddleware() {
    // Authentication middleware
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
          return next(new Error("Authentication failed"));
        }

        socket.user = user;
        next();
      } catch (error) {
        next(new Error("Authentication failed"));
      }
    });
  }

  setupEventHandlers() {
    this.io.on("connection", (socket) => {
      this.handleConnection(socket);
    });
  }

  handleConnection(socket) {
    const user = socket.user;

    console.log(`User connected: ${user.username} (${socket.id})`);

    // Track user connection
    this.connectedUsers.set(socket.id, {
      socket,
      user,
      joinedAt: Date.now(),
      rooms: new Set(),
    });

    // Track user's sockets (for multi-device support)
    if (!this.userSockets.has(user.id)) {
      this.userSockets.set(user.id, new Set());
    }
    this.userSockets.get(user.id).add(socket.id);

    // Join user to their personal room
    socket.join(`user:${user.id}`);

    // Setup socket event handlers
    this.setupSocketHandlers(socket);

    // Send welcome message
    socket.emit("connected", {
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      },
      socketId: socket.id,
      timestamp: Date.now(),
    });

    // Notify other devices of same user
    socket.to(`user:${user.id}`).emit("device_connected", {
      socketId: socket.id,
      timestamp: Date.now(),
    });
  }

  setupSocketHandlers(socket) {
    const user = socket.user;

    // Join room
    socket.on("join_room", async (data) => {
      const { roomId } = data;

      if (!roomId) {
        return socket.emit("error", { message: "Room ID is required" });
      }

      // Add user to room
      socket.join(roomId);

      // Track room membership
      const userInfo = this.connectedUsers.get(socket.id);
      if (userInfo) {
        userInfo.rooms.add(roomId);
      }

      if (!this.rooms.has(roomId)) {
        this.rooms.set(roomId, new Set());
      }
      this.rooms.get(roomId).add(user.id);

      // Send confirmation
      socket.emit("room_joined", { roomId });

      // Notify room members
      socket.to(roomId).emit("user_joined_room", {
        user: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        },
        roomId,
        timestamp: Date.now(),
      });

      // Send room info to new member
      const roomMembers = this.getRoomMembers(roomId);
      socket.emit("room_members", {
        roomId,
        members: roomMembers,
      });
    });

    // Leave room
    socket.on("leave_room", (data) => {
      const { roomId } = data;
      this.leaveRoom(socket, roomId);
    });

    // Send message
    socket.on("send_message", async (data) => {
      const { roomId, content, type = "text", metadata = {} } = data;

      if (!roomId || !content) {
        return socket.emit("error", {
          message: "Room ID and content are required",
        });
      }

      // Verify user is in room
      const userInfo = this.connectedUsers.get(socket.id);
      if (!userInfo || !userInfo.rooms.has(roomId)) {
        return socket.emit("error", { message: "Not in room" });
      }

      // Create message
      const message = {
        id: this.generateMessageId(),
        roomId,
        sender: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        },
        content,
        type,
        metadata,
        timestamp: Date.now(),
      };

      // Broadcast to room
      this.io.to(roomId).emit("new_message", message);

      // Store in database
      await this.storeMessage(message);

      // Send to offline users (push notifications)
      await this.notifyOfflineUsers(roomId, message);
    });

    // Typing indicators
    socket.on("typing_start", (data) => {
      const { roomId } = data;
      socket.to(roomId).emit("user_typing", {
        user: {
          id: user.id,
          username: user.username,
        },
        roomId,
        isTyping: true,
        timestamp: Date.now(),
      });
    });

    socket.on("typing_stop", (data) => {
      const { roomId } = data;
      socket.to(roomId).emit("user_typing", {
        user: {
          id: user.id,
          username: user.username,
        },
        roomId,
        isTyping: false,
        timestamp: Date.now(),
      });
    });

    // Private message
    socket.on("send_private_message", async (data) => {
      const { recipientId, content, type = "text" } = data;

      if (!recipientId || !content) {
        return socket.emit("error", {
          message: "Recipient ID and content are required",
        });
      }

      // Create private message
      const message = {
        id: this.generateMessageId(),
        sender: {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
        },
        recipient: recipientId,
        content,
        type,
        timestamp: Date.now(),
      };

      // Send to recipient's personal room
      this.io.to(`user:${recipientId}`).emit("private_message", message);

      // Also send to sender's other devices
      socket.to(`user:${user.id}`).emit("private_message", message);

      // Store in database
      await this.storePrivateMessage(message);
    });

    // User status
    socket.on("update_status", (data) => {
      const { status } = data; // 'online', 'away', 'busy', 'offline'

      // Update user status in database
      User.findByIdAndUpdate(user.id, { status, lastSeen: Date.now() });

      // Broadcast status to friends/contacts
      this.broadcastUserStatus(user.id, status);
    });

    // File sharing
    socket.on("share_file", async (data) => {
      const { roomId, fileInfo } = data;

      // Process file upload
      const fileData = await this.processFileUpload(fileInfo, user);

      if (fileData) {
        const message = {
          id: this.generateMessageId(),
          roomId,
          sender: {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
          },
          type: "file",
          content: fileData,
          timestamp: Date.now(),
        };

        this.io.to(roomId).emit("new_message", message);
        await this.storeMessage(message);
      }
    });

    // Disconnection
    socket.on("disconnect", (reason) => {
      this.handleDisconnection(socket, reason);
    });
  }

  leaveRoom(socket, roomId) {
    const user = socket.user;

    socket.leave(roomId);

    // Update tracking
    const userInfo = this.connectedUsers.get(socket.id);
    if (userInfo) {
      userInfo.rooms.delete(roomId);
    }

    const room = this.rooms.get(roomId);
    if (room) {
      room.delete(user.id);

      if (room.size === 0) {
        this.rooms.delete(roomId);
      }
    }

    // Notify room members
    socket.to(roomId).emit("user_left_room", {
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      },
      roomId,
      timestamp: Date.now(),
    });

    // Send confirmation
    socket.emit("room_left", { roomId });
  }

  handleDisconnection(socket, reason) {
    const user = socket.user;
    const userInfo = this.connectedUsers.get(socket.id);

    console.log(
      `User disconnected: ${user.username} (${socket.id}) - ${reason}`
    );

    // Leave all rooms
    if (userInfo) {
      for (const roomId of userInfo.rooms) {
        this.leaveRoom(socket, roomId);
      }
    }

    // Remove socket tracking
    this.connectedUsers.delete(socket.id);

    const userSocketSet = this.userSockets.get(user.id);
    if (userSocketSet) {
      userSocketSet.delete(socket.id);

      // If user has no more connected sockets, mark as offline
      if (userSocketSet.size === 0) {
        this.userSockets.delete(user.id);
        this.broadcastUserStatus(user.id, "offline");
      }
    }

    // Notify other devices
    socket.to(`user:${user.id}`).emit("device_disconnected", {
      socketId: socket.id,
      timestamp: Date.now(),
    });
  }

  // Utility methods
  getRoomMembers(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return [];

    const members = [];
    for (const userId of room) {
      const userSocketSet = this.userSockets.get(userId);
      if (userSocketSet && userSocketSet.size > 0) {
        // User is online, get their info
        const socketId = Array.from(userSocketSet)[0];
        const userInfo = this.connectedUsers.get(socketId);
        if (userInfo) {
          members.push({
            id: userInfo.user.id,
            username: userInfo.user.username,
            avatar: userInfo.user.avatar,
            status: "online",
            joinedAt: userInfo.joinedAt,
          });
        }
      } else {
        // User is offline, get basic info from database
        members.push({
          id: userId,
          status: "offline",
        });
      }
    }

    return members;
  }

  async broadcastUserStatus(userId, status) {
    // Get user's friends/contacts
    const user = await User.findById(userId).populate("friends");

    if (user && user.friends) {
      for (const friend of user.friends) {
        this.io.to(`user:${friend.id}`).emit("friend_status_update", {
          userId,
          status,
          timestamp: Date.now(),
        });
      }
    }
  }

  async notifyOfflineUsers(roomId, message) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    for (const userId of room) {
      const userSocketSet = this.userSockets.get(userId);
      if (!userSocketSet || userSocketSet.size === 0) {
        // User is offline, send push notification
        await this.sendPushNotification(userId, {
          type: "new_message",
          roomId,
          message: message.content.substring(0, 100),
          sender: message.sender.username,
        });
      }
    }
  }

  async sendPushNotification(userId, data) {
    // Implement push notification logic
    // Could use Firebase Cloud Messaging, Apple Push Notifications, etc.
    console.log(`Push notification to user ${userId}:`, data);
  }

  async processFileUpload(fileInfo, user) {
    // Process file upload logic
    // Could use multer, AWS S3, etc.
    return {
      id: this.generateFileId(),
      name: fileInfo.name,
      size: fileInfo.size,
      type: fileInfo.type,
      url: `/uploads/${fileInfo.name}`,
      uploadedBy: user.id,
      uploadedAt: Date.now(),
    };
  }

  async storeMessage(message) {
    // Store message in database
    // await Message.create(message);
  }

  async storePrivateMessage(message) {
    // Store private message in database
    // await PrivateMessage.create(message);
  }

  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateFileId() {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Admin methods
  getStats() {
    return {
      connectedUsers: this.connectedUsers.size,
      totalUsers: this.userSockets.size,
      activeRooms: this.rooms.size,
      rooms: Array.from(this.rooms.entries()).map(([roomId, users]) => ({
        roomId,
        userCount: users.size,
      })),
    };
  }

  // Broadcast to all users
  broadcast(event, data) {
    this.io.emit(event, data);
  }

  // Send to specific user
  sendToUser(userId, event, data) {
    this.io.to(`user:${userId}`).emit(event, data);
  }

  // Send to room
  sendToRoom(roomId, event, data) {
    this.io.to(roomId).emit(event, data);
  }
}

// Usage example
const server = http.createServer(app);
const socketManager = new SocketIOManager(server, {
  corsOrigin: ["http://localhost:3000", "https://yourapp.com"],
});

// Admin endpoints
app.get("/admin/socket-stats", (req, res) => {
  res.json(socketManager.getStats());
});

// Broadcast system messages
app.post("/admin/broadcast", (req, res) => {
  const { message, type = "system" } = req.body;

  socketManager.broadcast("system_message", {
    type,
    content: message,
    timestamp: Date.now(),
  });

  res.json({ success: true });
});
```

## Server-Sent Events (SSE)

### 1. SSE Implementation

```javascript
class SSEManager {
  constructor() {
    this.clients = new Map(); // clientId -> client info
    this.channels = new Map(); // channel -> Set of clientIds
  }

  // Add SSE client
  addClient(res, clientId, channels = []) {
    const clientInfo = {
      id: clientId,
      res,
      channels: new Set(channels),
      connectedAt: Date.now(),
      lastPing: Date.now(),
    };

    this.clients.set(clientId, clientInfo);

    // Add to channels
    for (const channel of channels) {
      this.addToChannel(clientId, channel);
    }

    // Setup SSE headers
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Cache-Control",
    });

    // Send initial connection event
    this.sendToClient(clientId, "connected", {
      clientId,
      channels: Array.from(channels),
      timestamp: Date.now(),
    });

    // Handle client disconnect
    res.on("close", () => {
      this.removeClient(clientId);
    });

    // Keep-alive ping
    const pingInterval = setInterval(() => {
      if (this.clients.has(clientId)) {
        this.sendToClient(clientId, "ping", { timestamp: Date.now() });
      } else {
        clearInterval(pingInterval);
      }
    }, 30000); // Ping every 30 seconds

    return clientInfo;
  }

  // Remove client
  removeClient(clientId) {
    const clientInfo = this.clients.get(clientId);
    if (clientInfo) {
      // Remove from channels
      for (const channel of clientInfo.channels) {
        this.removeFromChannel(clientId, channel);
      }

      // Remove client
      this.clients.delete(clientId);
      console.log(`SSE client disconnected: ${clientId}`);
    }
  }

  // Add client to channel
  addToChannel(clientId, channel) {
    if (!this.channels.has(channel)) {
      this.channels.set(channel, new Set());
    }
    this.channels.get(channel).add(clientId);
  }

  // Remove client from channel
  removeFromChannel(clientId, channel) {
    const channelClients = this.channels.get(channel);
    if (channelClients) {
      channelClients.delete(clientId);

      if (channelClients.size === 0) {
        this.channels.delete(channel);
      }
    }
  }

  // Send event to specific client
  sendToClient(clientId, event, data) {
    const clientInfo = this.clients.get(clientId);
    if (clientInfo && !clientInfo.res.destroyed) {
      try {
        const eventData = this.formatSSEEvent(event, data);
        clientInfo.res.write(eventData);
        clientInfo.lastPing = Date.now();
      } catch (error) {
        console.error(`Error sending to client ${clientId}:`, error);
        this.removeClient(clientId);
      }
    }
  }

  // Broadcast to channel
  broadcastToChannel(channel, event, data) {
    const channelClients = this.channels.get(channel);
    if (channelClients) {
      for (const clientId of channelClients) {
        this.sendToClient(clientId, event, data);
      }
    }
  }

  // Broadcast to all clients
  broadcast(event, data) {
    for (const clientId of this.clients.keys()) {
      this.sendToClient(clientId, event, data);
    }
  }

  // Format SSE event
  formatSSEEvent(event, data) {
    let formatted = `event: ${event}\n`;

    if (typeof data === "object") {
      formatted += `data: ${JSON.stringify(data)}\n\n`;
    } else {
      formatted += `data: ${data}\n\n`;
    }

    return formatted;
  }

  // Get statistics
  getStats() {
    return {
      totalClients: this.clients.size,
      totalChannels: this.channels.size,
      channels: Array.from(this.channels.entries()).map(
        ([channel, clients]) => ({
          channel,
          clientCount: clients.size,
        })
      ),
    };
  }
}

// Express middleware for SSE
function sseMiddleware(sseManager) {
  return (req, res) => {
    const clientId =
      req.query.clientId ||
      `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const channels = req.query.channels ? req.query.channels.split(",") : [];

    sseManager.addClient(res, clientId, channels);
  };
}

// Usage example
const sseManager = new SSEManager();

// SSE endpoint
app.get("/events", sseMiddleware(sseManager));

// Broadcast events
app.post("/events/broadcast", (req, res) => {
  const { event, data, channel } = req.body;

  if (channel) {
    sseManager.broadcastToChannel(channel, event, data);
  } else {
    sseManager.broadcast(event, data);
  }

  res.json({ success: true });
});

// Real-time notifications
app.post("/notifications", async (req, res) => {
  const { userId, message, type } = req.body;

  // Send to specific user channel
  sseManager.broadcastToChannel(`user:${userId}`, "notification", {
    type,
    message,
    timestamp: Date.now(),
  });

  res.json({ success: true });
});

// System status updates
setInterval(() => {
  const stats = sseManager.getStats();
  sseManager.broadcastToChannel("system", "stats", stats);
}, 10000); // Every 10 seconds
```

## WebRTC for Peer-to-Peer Communication

### 1. WebRTC Signaling Server

```javascript
class WebRTCManager {
  constructor() {
    this.peers = new Map(); // peerId -> peer info
    this.rooms = new Map(); // roomId -> Set of peerIds
  }

  // Add peer
  addPeer(peerId, socket, userInfo) {
    this.peers.set(peerId, {
      id: peerId,
      socket,
      userInfo,
      joinedAt: Date.now(),
      rooms: new Set(),
    });

    // Setup peer event handlers
    this.setupPeerHandlers(peerId);

    console.log(`Peer added: ${peerId} (${userInfo.username})`);
  }

  setupPeerHandlers(peerId) {
    const peer = this.peers.get(peerId);
    if (!peer) return;

    const { socket } = peer;

    // Join room
    socket.on("join_room", (data) => {
      this.joinRoom(peerId, data.roomId);
    });

    // Leave room
    socket.on("leave_room", (data) => {
      this.leaveRoom(peerId, data.roomId);
    });

    // WebRTC signaling
    socket.on("rtc_offer", (data) => {
      this.handleRTCMessage(peerId, data, "rtc_offer");
    });

    socket.on("rtc_answer", (data) => {
      this.handleRTCMessage(peerId, data, "rtc_answer");
    });

    socket.on("rtc_ice_candidate", (data) => {
      this.handleRTCMessage(peerId, data, "rtc_ice_candidate");
    });

    // Disconnect
    socket.on("disconnect", () => {
      this.removePeer(peerId);
    });
  }

  joinRoom(peerId, roomId) {
    const peer = this.peers.get(peerId);
    if (!peer) return;

    // Add to room
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId).add(peerId);
    peer.rooms.add(roomId);

    // Notify room members
    this.broadcastToRoom(
      roomId,
      "peer_joined",
      {
        peerId,
        userInfo: peer.userInfo,
        timestamp: Date.now(),
      },
      peerId
    );

    // Send room info to new peer
    const roomPeers = this.getRoomPeers(roomId);
    peer.socket.emit("room_peers", {
      roomId,
      peers: roomPeers.filter((p) => p.id !== peerId),
    });

    console.log(`Peer ${peerId} joined room ${roomId}`);
  }

  leaveRoom(peerId, roomId) {
    const peer = this.peers.get(peerId);
    if (!peer) return;

    // Remove from room
    const room = this.rooms.get(roomId);
    if (room) {
      room.delete(peerId);

      if (room.size === 0) {
        this.rooms.delete(roomId);
      }
    }

    peer.rooms.delete(roomId);

    // Notify room members
    this.broadcastToRoom(roomId, "peer_left", {
      peerId,
      timestamp: Date.now(),
    });

    console.log(`Peer ${peerId} left room ${roomId}`);
  }

  handleRTCMessage(senderPeerId, data, messageType) {
    const { targetPeerId, payload } = data;

    const targetPeer = this.peers.get(targetPeerId);
    if (!targetPeer) {
      return this.peers.get(senderPeerId).socket.emit("error", {
        message: "Target peer not found",
      });
    }

    // Forward RTC message to target peer
    targetPeer.socket.emit(messageType, {
      senderPeerId,
      payload,
    });
  }

  broadcastToRoom(roomId, event, data, excludePeerId = null) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    for (const peerId of room) {
      if (peerId !== excludePeerId) {
        const peer = this.peers.get(peerId);
        if (peer) {
          peer.socket.emit(event, data);
        }
      }
    }
  }

  getRoomPeers(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return [];

    const peers = [];
    for (const peerId of room) {
      const peer = this.peers.get(peerId);
      if (peer) {
        peers.push({
          id: peer.id,
          userInfo: peer.userInfo,
          joinedAt: peer.joinedAt,
        });
      }
    }

    return peers;
  }

  removePeer(peerId) {
    const peer = this.peers.get(peerId);
    if (!peer) return;

    // Leave all rooms
    for (const roomId of peer.rooms) {
      this.leaveRoom(peerId, roomId);
    }

    // Remove peer
    this.peers.delete(peerId);

    console.log(`Peer removed: ${peerId}`);
  }

  getStats() {
    return {
      totalPeers: this.peers.size,
      totalRooms: this.rooms.size,
      rooms: Array.from(this.rooms.entries()).map(([roomId, peers]) => ({
        roomId,
        peerCount: peers.size,
      })),
    };
  }
}

// Socket.io integration
const webrtcManager = new WebRTCManager();

io.on("connection", (socket) => {
  const peerId = socket.handshake.query.peerId;
  const userInfo = {
    username: socket.handshake.query.username,
    avatar: socket.handshake.query.avatar,
  };

  webrtcManager.addPeer(peerId, socket, userInfo);
});
```

## Scaling Real-time Applications

### 1. Horizontal Scaling with Redis Adapter

```javascript
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

class ScalableSocketManager {
  constructor(server, options = {}) {
    // Redis clients for adapter
    this.pubClient = createClient(
      options.redis || { url: process.env.REDIS_URL }
    );
    this.subClient = this.pubClient.duplicate();

    // Create Socket.IO server with Redis adapter
    this.io = new Server(server, {
      adapter: createAdapter(this.pubClient, this.subClient),
    });

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.io.on("connection", (socket) => {
      this.handleConnection(socket);
    });
  }

  handleConnection(socket) {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
      socket.join(data.roomId);
      socket.emit("room_joined", { roomId: data.roomId });
    });

    socket.on("send_message", (data) => {
      // Message will be broadcast to all servers via Redis adapter
      this.io.to(data.roomId).emit("new_message", data);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  }
}
```

### 2. Load Balancing for WebSocket Connections

```javascript
class WebSocketLoadBalancer {
  constructor(servers) {
    this.servers = servers;
    this.currentIndex = 0;
  }

  // Round-robin selection
  getNextServer() {
    const server = this.servers[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.servers.length;
    return server;
  }

  // Least connections selection
  getLeastConnectionsServer() {
    return this.servers.reduce((min, current) =>
      current.connections < min.connections ? current : min
    );
  }

  // Health check
  async healthCheck() {
    const results = await Promise.allSettled(
      this.servers.map((server) =>
        fetch(`${server.url}/health`).then((res) => res.json())
      )
    );

    return this.servers.map((server, index) => ({
      ...server,
      healthy: results[index].status === "fulfilled",
      responseTime: results[index].value?.responseTime || 0,
    }));
  }
}
```

## Real-time Communication Interview Questions

### 1. "How would you handle WebSocket connections in a microservices architecture?"

```javascript
// Answer: Use Redis adapter for Socket.IO, message queues for cross-service
// communication, service discovery for WebSocket servers, and connection
// state management with sticky sessions.
```

### 2. "What's the difference between WebSocket and Server-Sent Events?"

```javascript
// Answer: WebSocket is bidirectional, SSE is unidirectional (server to client).
// WebSocket is better for interactive applications, SSE is simpler for
// notifications and updates.
```

### 3. "How would you implement real-time features across multiple servers?"

```javascript
// Answer: Use Redis pub/sub for message broadcasting, consistent hashing
// for room assignment, and connection state synchronization.
```

## Key Takeaways for FAANG

### Real-time Communication Patterns

- **WebSocket**: Bidirectional, low-latency communication
- **Socket.io**: Enhanced WebSocket with fallbacks and rooms
- **SSE**: Simple server-to-client updates
- **WebRTC**: Peer-to-peer communication
- **Scaling**: Redis adapters and load balancing

### Implementation Best Practices

- **Authentication**: Secure connection establishment
- **Room Management**: Efficient grouping of clients
- **Message Handling**: Robust error handling and validation
- **Scalability**: Horizontal scaling with Redis
- **Performance**: Connection pooling and optimization

### External Resources

- **WebSocket MDN**: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
- **Socket.io Documentation**: https://socket.io/docs/
- **WebRTC Guide**: https://webrtc.org/getting-started/
- **Redis Pub/Sub**: https://redis.io/topics/pubsub
- **Real-time Architecture**: https://github.com/realtime-framework/realtime-architecture
