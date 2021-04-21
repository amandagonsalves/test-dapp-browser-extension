import { sendMessage } from 'containers/auth/helpers';

export interface IConnectionsController {
  getWalletState: () => any;
  getConnectedAccount: () => any;
  transferSYS: (sender: string, receiver: string, amount: number, fee: number) => any;
}

const ConnectionsController = (): IConnectionsController => {
  const getWalletState = async () => {
    return await sendMessage({
      type: 'SEND_STATE_TO_PAGE', 
      target: 'connectionsController',
      freeze: true,
      eventResult: 'state'
    }, {
      type: 'SEND_STATE_TO_PAGE',
      target: 'contentScript'
    });
  }

  const getConnectedAccount = async () => {
    return await sendMessage({
      type: 'SEND_CONNECTED_ACCOUNT',
      target: 'connectionsController',
      freeze: true,
      eventResult: 'connectedAccount'
    }, { 
      type: 'SEND_CONNECTED_ACCOUNT',
      target: 'contentScript'
    });
  }

  const transferSYS = async (sender: string, receiver: string, amount: number, fee: number) => {
    return await sendMessage({
      type: 'TRANSFER_SYS',
      target: 'connectionsController',
      freeze: true,
      eventResult: 'complete'
    }, {
      type: 'TRANSFER_SYS',
      target: 'contentScript',
      fromActiveAccountId: sender,
      toAddress: receiver,
      amount,
      fee
    });
  }

  return {
    getWalletState,
    getConnectedAccount,
    transferSYS
  }
};

export default ConnectionsController;