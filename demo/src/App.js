import { useEffect, useState } from "react";

const App = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [list, setList] = useState([]);
  const [showButton, setShowButton] = useState(true);


  const handleMessageExtension = () => {
    window.postMessage({ type: "FROM_PAGE" }, "*");
  }

  useEffect(() => {
    const detect = function (base, installed, notInstalled) {
      const s = document.createElement('script');
      s.onerror = notInstalled;
      s.onload = installed;
      document.body.appendChild(s);
      s.src = base + '/manifest.json';
    }

    detect('chrome-extension://gkkgaphhfkeklibjfphckifmmhnfnmhf', () => {
      setIsInstalled(true);

      window.addEventListener("message", (event) => {
        if (event.data.type == 'RESPONSE_FROM_EXTENSION') {
          console.log('response in webpage', event.data.controller)
          setList(event.data.controller.wallet.accounts)

          // if (event.data.response.controller.wallet.firstConnection) {
          //   setShowButton(true)
          // }

          // setShowButton(false)
          // console.log('response in webpage from content script', event.data.response)
        }
      });
    }, () => {
      setIsInstalled(false);
    });
  }, [
    list
  ]);

  const RenderList = (props) => {
    return props.list.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.label}</td>
          <td>{item.balance}</td>
          <td>No transactions</td>
          <td>{item.address.main}</td>
        </tr>
      )
    });
  }

  return (
    <div className="App">
      {!isInstalled && (<h1>You need to install Syscoin Wallet</h1>)}

      <table id="table">
        <thead>
          <tr>
            <td>Accounts</td>
            <td>Balance</td>
            <td>Transactions</td>
            <td>Address</td>
          </tr>
        </thead>

        <tbody id="tbody">
          {list.length > 0 && (<RenderList list={list} />)}
        </tbody>
      </table>

      <button
        id="buttonConnect"
        onClick={handleMessageExtension}
        disabled={!isInstalled}
      >
        Connect to Syscoin Wallet
      </button>
    </div>
  );
}

export default App;
