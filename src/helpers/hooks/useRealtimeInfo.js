import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { CutArray } from "../cutArray.js";
import { baseUrl } from "../../constants/baseUrl.js";

export const useRealtimeInfo = () => {
  const [crypto, setCrypto] = useState([]);
  const [newCrypto, setNewCrypto] = useState({});
  const { lastJsonMessage } = useWebSocket(baseUrl, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    const day = new Date(`December 17, 1995 03:24:00`);
    if (lastJsonMessage) {
      const lastMessage = {
        price: lastJsonMessage.p,
        name: lastJsonMessage.s,
        date: day,
      };
      setCrypto((prevState) => CutArray([...prevState, lastMessage]));
      setNewCrypto(lastMessage);
    }
  }, [lastJsonMessage]);
  return { crypto, newCrypto };
};
