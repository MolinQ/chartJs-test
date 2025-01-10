import { ChartJsLayout } from "./chartJsLayout.jsx";
import { minCryptoElement } from "./constants/minCryptoElement.js";
import { useRealtimeInfo } from "./helpers/hooks/useRealtimeInfo.js";
import { elementAfterDot } from "./constants/price.js";

function App() {
  const { crypto, newCrypto } = useRealtimeInfo();
  return (
    <>
      {crypto.length < minCryptoElement ? (
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
            <p>
              Last price: {Number(newCrypto.price).toFixed(elementAfterDot)}
            </p>
          </div>
          <ChartJsLayout newCrypto={newCrypto} crypto={crypto} />
        </>
      )}
    </>
  );
}

export default App;
