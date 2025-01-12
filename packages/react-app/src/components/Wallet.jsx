import React, { useState, useEffect } from "react";
import { WalletOutlined, QrcodeOutlined, SendOutlined } from "@ant-design/icons";
import { Tooltip, Spin, Modal, Button } from "antd";
import QR from "qrcode.react";
import { parseEther } from "@ethersproject/units";
import { Transactor } from "../helpers";
import Address from "./Address";
import Balance from "./Balance";
import AddressInput from "./AddressInput";
import EtherInput from "./EtherInput";

export default function Wallet(props) {
  const [open, setOpen] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const [, setSigner] = useState();
  const [qr, setQr] = useState();

  let providerSend = "";
  if (props.provider) {
    providerSend = (
      <Tooltip title="Wallet">
        <WalletOutlined
          onClick={() => {
            setOpen(!open);
          }}
          rotate={-90}
          style={{
            padding: 7,
            color: props.color ? props.color : "#1890ff",
            cursor: "pointer",
            fontSize: 28,
            verticalAlign: "middle",
          }}
        />
      </Tooltip>
    );
  }

  const [amount, setAmount] = useState();
  const [toAddress, setToAddress] = useState();

  useEffect(() => {
    const getAddress = async () => {
      if (props.provider) {
        let loadedSigner;
        try {
          // console.log("SETTING SIGNER")
          loadedSigner = props.provider.getSigner();
          setSigner(loadedSigner);
        } catch (e) {
          // console.log(e)
        }
        if (props.address) {
          setSelectedAddress(props.address);
        } else if (!selectedAddress && loadedSigner) {
          // console.log("GETTING ADDRESS FOR WALLET PROVIDER",loadedSigner)
          const result = await loadedSigner.getAddress();
          if (result) {
            setSelectedAddress(result);
          }
        }
      }
      // setQr("")
    };
    getAddress();
  }, [props]);

  let display;
  let receiveButton;
  if (qr) {
    display = (
      <QR
        value={selectedAddress}
        size="450"
        level="H"
        includeMargin
        renderAs="svg"
        imageSettings={{ excavate: false }}
      />
    );
    receiveButton = (
      <Button
        key="hide"
        onClick={() => {
          setQr("");
        }}
      >
        <QrcodeOutlined /> Hide
      </Button>
    );
  } else {
    const inputStyle = {
      padding: 10,
    };

    display = (
      <div>
        <div style={inputStyle}>
          <AddressInput
            autoFocus
            ensProvider={props.ensProvider}
            placeholder="to address"
            value={toAddress}
            onChange={setToAddress}
          />
        </div>
        <div style={inputStyle}>
          <EtherInput
            price={props.price}
            value={amount}
            onChange={value => {
              setAmount(value);
            }}
          />
        </div>
      </div>
    );
    receiveButton = (
      <Button
        key="receive"
        onClick={() => {
          setQr(selectedAddress);
        }}
      >
        <QrcodeOutlined /> Receive
      </Button>
    );
  }

  return (
    <span>
      {providerSend}
      <Modal
        visible={open}
        title={
          <div>
            {selectedAddress ? <Address value={selectedAddress} ensProvider={props.ensProvider} /> : <Spin />}
            <div style={{ float: "right", paddingRight: 25 }}>
              <Balance address={selectedAddress} provider={props.provider} dollarMultiplier={props.price} />
            </div>
          </div>
        }
        onOk={() => {
          setOpen(!open);
        }}
        onCancel={() => {
          setOpen(!open);
        }}
        footer={[
          receiveButton,
          <Button
            key="submit"
            type="primary"
            disabled={!amount || !toAddress || qr}
            loading={false}
            onClick={() => {
              const tx = Transactor(props.provider);
              tx({
                to: toAddress,
                value: parseEther("" + amount),
              });
              setOpen(!open);
            }}
          >
            <SendOutlined /> Send
          </Button>,
        ]}
      >
        {display}
      </Modal>
    </span>
  );
}
