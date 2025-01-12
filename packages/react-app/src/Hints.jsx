/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useEffect } from "react";
import { formatEther } from "@ethersproject/units";
import { Address, AddressInput } from "./components";

export default function Hints(props) {
  return (
    <div>
      <p style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>👷</span>
        Edit your <b>contract</b> in
        <span style={{ marginLeft: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          packages/buidler/contracts
        </span>
      </p>

      <p>
        <span style={{ marginRight: 8 }}>🛰</span>
        <b>compile/deploy</b> with
        <span style={{ marginLeft: 4, backgroundColor: "#f1f1f1", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn run deploy
        </span>
      </p>

      <p>
        <span style={{ marginRight: 8 }}>🚀</span>
        Your <b>contract artifacts</b> are automatically injected into your frontend at
        <span style={{ marginLeft: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          packages/react-app/src/contracts/
        </span>
      </p>

      <p>
        <span style={{ marginRight: 8 }}>🎛</span>
        Edit your <b>frontend</b> in
        <span style={{ marginLeft: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          packages/reactapp/src/App.js
        </span>
      </p>

      <p style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>🔭</span>
        explore the
        <span
          style={{
            marginLeft: 4,
            marginRight: 4,
            backgroundColor: "#f9f9f9",
            padding: 4,
            borderRadius: 4,
            fontWeight: "bolder",
          }}
        >
          🖇 hooks
        </span>
        and
        <span style={{ marginLeft: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          📦 components
        </span>
      </p>

      <p style={{ marginTop: 32 }}>
        for example, the
        <span style={{ margin: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          useBalance()
        </span>{" "}
        hook keeps track of your balance: <b>{formatEther(props.yourLocalBalance)}</b>
      </p>

      <p style={{ marginTop: 32 }}>
        as you build your app you'll need web3 specific components like an
        <span style={{ margin: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          {"<AddressInput/>"}
        </span>
        component:
        <div style={{ width: 350, padding: 16, margin: "auto" }}>
          <AddressInput ensProvider={props.mainnetProvider} />
        </div>
        <div>(try putting in your address, an ens address, or scanning a QR code)</div>
      </p>

      <p style={{ marginTop: 32 }}>
        this balance could be multiplied by
        <span style={{ margin: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          price
        </span>{" "}
        that is loaded with the
        <span style={{ margin: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          usePrice
        </span>{" "}
        hook with the current value: <b>${props.price}</b>
      </p>

      <p style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>💧</span>
        use the <b>faucet</b> to send funds to
        <span style={{ marginLeft: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          <Address value={props.address} minimized /> {props.address}
        </span>
      </p>

      <p style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>📡</span>
        depoly to a testnet or mainnet by editing
        <span style={{ marginLeft: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          packages/buidler/buidler.config.js
        </span>
        and running
        <span style={{ marginLeft: 4, backgroundColor: "#f1f1f1", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn run deploy
        </span>
      </p>

      <p style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>⚙️</span>
        build your app with
        <span style={{ marginLeft: 4, backgroundColor: "#f1f1f1", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn run build
        </span>
      </p>

      <p style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>🚢</span>
        ship it!
        <span style={{ marginLeft: 4, backgroundColor: "#f1f1f1", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn run surge
        </span>
        or
        <span style={{ marginLeft: 4, backgroundColor: "#f1f1f1", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn run s3
        </span>
        or
        <span style={{ marginLeft: 4, backgroundColor: "#f1f1f1", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          yarn run ipfs
        </span>
      </p>

      <p style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>💬</span>
        for support, join this
        <span style={{ marginLeft: 4, backgroundColor: "#f9f9f9", padding: 4, borderRadius: 4, fontWeight: "bolder" }}>
          <a target="_blank" rel="noopener noreferrer" href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA">
            Telegram Chat
          </a>
        </span>
      </p>
      <div style={{ padding: 128 }}>
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/austintgriffith/scaffold-eth">
          🛠
        </a>
      </div>
    </div>
  );
}
