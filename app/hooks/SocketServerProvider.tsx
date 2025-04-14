import React, { ReactNode, useEffect } from "react";
import socketIo from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socketId = socketIo(ENDPOINT, { transports: ["websocket"] });
const SocketServerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    socketId.on(`connection`, () => {});
  }, []);
  return <div>{children}</div>;
};

export default SocketServerProvider;
