import { ChartJsLayout } from "./chartJsLayout.jsx";
import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { baseUrl } from "./constants/baseUrl.js";
import { CutArray } from "./helpers/cutArray.js";

function App() {
  const [crypto, setCrypto] = useState([]);
  const [newCrypto, setNewCrypto] = useState({});
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    baseUrl,
    {
      share: false,
      shouldReconnect: () => true,
      heartbeat: {
        timeout: 50000,
      },
    },
  );

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
  return (
    <>
      {crypto.length < 1 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>Currency: {newCrypto.name}</p>
            <p>Last price: {Number.parseFloat(newCrypto.price)}</p>
          </div>
          <ChartJsLayout newCrypto={newCrypto} crypto={crypto} />
        </>
      )}
    </>
  );
}

export default App;
