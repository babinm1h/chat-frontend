import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};
