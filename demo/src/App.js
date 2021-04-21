import { useEffect, useState } from "react";
import logo from "./assets/images/logosys.svg";

const App = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [canConnect, setCanConnect] = useState(true);
  const [balance, setBalance] = useState(0);
  const [controller, setController] = useState();
  const [connectedAccount, setConnectedAccount] = useState({});
  const [connectedAccountAddress, setConnectedAccountAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [fee, setFee] = useState(0.0000001);
  const [toAddress, setToAddress] = useState('');
  let componentMounted = true;

  useEffect(() => {
    const callback = (event) => {
      if (event.detail.SyscoinInstalled) {
        setIsInstalled(true);

        if (event.detail.ConnectionsController) {
          setController(window.ConnectionsController);

          return;
        }

        return;
      }

      setIsInstalled(false);

      window.removeEventListener('SyscoinStatus', callback);
    }

    window.addEventListener('SyscoinStatus', callback);
  }, []);

  useEffect(() => {
    if (controller) {
      controller.getConnectedAccount()
        .then((data) => {
          if (!data) {
            return;
          }
      
          if (componentMounted && data) {
            setConnectedAccount(data);
            setConnectedAccountAddress(data.address.main);
            setBalance(data.balance);
      
            return;
          }
      
          return;
        })
    }

    return () => {
      componentMounted = false;
    }
  }, [
    controller,
    componentMounted
  ]);

  const handleMessageExtension = () => {
    window.postMessage({ type: "FROM_PAGE" }, "*");
  }

  const handleGetWalletState = async () => {
    return await controller.getWalletState();
  }

  const transferSYS = (sender, receiver, amount, fee) => {
    controller.transferSYS(sender, receiver, amount, fee).then(res => {
      console.log('res transfer', res)
    })
  }

  return (
    <div className="app">
      {!controller && (<p>...</p>)}

      {controller && (
        <div>
          <header className="header">
            <img src={logo} alt="logo" className="header__logo" />

            <div className="header__info">
              <p className="header__balance">{balance}</p>

              <button
                className="header__buttonConnect"
                onClick={canConnect ? handleMessageExtension : undefined}
                disabled={!isInstalled}
              >
                {connectedAccountAddress === '' ? 'Connect to Syscoin Wallet' : connectedAccountAddress}
              </button>
            </div>
          </header>

          {!isInstalled && (<h1 className="app__title">You need to install Syscoin Wallet.</h1>)}

          <table className="table">
            <thead>
              <tr>
                <td>Accounts</td>
                <td>Balance</td>
                <td>Address</td>
              </tr>
            </thead>

            <tbody id="tbody">
              {connectedAccount && (
                <tr>
                  <td>{connectedAccount.label}</td>
                  <td>{connectedAccount.balance}</td>
                  <td>{connectedAccountAddress}</td>
                </tr>                
              )}
            </tbody>
          </table>

          <input
            placeholder="amount"
            type="number"
            onBlur={(event) => setAmount(event.target.value)}
          />

          <input
            placeholder="fee"
            type="number"
            onBlur={(event) => setFee(event.target.value)}
          />

          <input
            placeholder="to address"
            type="text"
            onBlur={(event) => setToAddress(event.target.value)}
          />

          <button
            onClick={() => transferSYS(connectedAccountAddress, toAddress, amount, fee)}
          >
            send sys
          </button>

          <button
            onClick={handleGetWalletState}
          >
            console wallet state
          </button>
        </div>
      ) }
    </div>
  );
}

export default App;
