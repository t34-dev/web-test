import { createWalletClient, http, recoverTypedDataAddress } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const walletClient = createWalletClient({
  account: privateKeyToAccount(generatePrivateKey()),
  chain: mainnet,
  transport: http(),
});

(async () => {
  console.log(walletClient.account);

  const domain = {
    name: 'User login',
    version: '1',
  } as const;

  const types = {
    Login: [
      { name: 'messageVersion', type: 'string' },
      { name: 'timestamp', type: 'uint256' },
    ],
  } as const;

  const signature = await walletClient.signTypedData({
    domain,
    types,
    primaryType: 'Login',
    message: {
      messageVersion: 'v1',
      timestamp: 1729611863n * 10n ** 3n,
    },
  });

  console.log(signature);

  const address = await recoverTypedDataAddress({
    domain,
    types,
    primaryType: 'Login',
    message: {
      messageVersion: 'v1',
      timestamp: 1729611863n * 10n ** 3n,
    },
    signature,
  });

  console.log(address);
})();
