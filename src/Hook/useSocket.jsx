import { socketContext } from '@/Provider/SocketProvider';
import React, { useContext } from 'react';

const useSocket = () => {
   const socket = useContext(socketContext);
   // console.log(socket)
   return socket;
};

export default useSocket;