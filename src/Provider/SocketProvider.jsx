'use client'

import { io } from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const socketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const userData = useSelector(state => state.user.userData);
  const [socket, setSocket] = useState(null);
  const [online,setOnline]=useState([])

  useEffect(() => {
    
    const newSocket = io("http://localhost:7000", {
      autoConnect: true,
      transports: ["websocket"],
      withCredentials: true,
    });

    const onConnect = () => {
      console.log("Socket connected:", newSocket.id);
      newSocket.emit("user_info", { user: userData?.id});
    };
    newSocket.on("connect", onConnect);
    setSocket(newSocket);

    return () => {
      newSocket.off("connect", onConnect);
      // newSocket.disconnect(); // optional if you want to close connection on unmount
    };
  }, [userData]);

  return (
    <socketContext.Provider value={{socket,online,}}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;


