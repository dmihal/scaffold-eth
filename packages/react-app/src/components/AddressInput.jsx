import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { CameraOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Input, Badge } from "antd";
import Blockie from "./Blockie";

export default function AddressInput(props) {
  const [ens, setEns] = useState(0);
  const [value, setValue] = useState();

  const currentValue = typeof props.value !== "undefined" ? props.value : value;

  useEffect(() => {
    setEns("");
    if (currentValue && props.ensProvider) {
      // eslint-disable-next-line no-inner-declarations
      async function getEns() {
        let newEns;
        try {
          console.log("trying reverse ens", newEns);

          newEns = await props.ensProvider.lookupAddress(currentValue);
          console.log("setting ens", newEns);
          setEns(newEns);
        } catch (e) {}
        console.log("checking resolve");
        if (currentValue.indexOf(".eth") > 0 || currentValue.indexOf(".xyz") > 0) {
          try {
            console.log("resolving");
            const possibleAddress = await props.ensProvider.resolveName(currentValue);
            console.log("GOT:L", possibleAddress);
            if (possibleAddress) {
              setEns(currentValue);
              props.onChange(possibleAddress);
            }
            // eslint-disable-next-line no-empty
          } catch (e) {}
        }
      }
      getEns();
    }
  }, [props]);

  const [scan, setScan] = useState(false);

  const scannerButton = (
    <div
      style={{ marginTop: 4, cursor: "pointer" }}
      onClick={() => {
        setScan(!scan);
      }}
    >
      <Badge count={<CameraOutlined style={{ fontSize: 9 }} />}>
        <QrcodeOutlined style={{ fontSize: 18 }} />
      </Badge>{" "}
      Scan
    </div>
  );

  const updateAddress = async newValue => {
    if (typeof newValue !== "undefined") {
      let address = newValue;
      if (address.indexOf(".eth") > 0 || address.indexOf(".xyz") > 0) {
        try {
          const possibleAddress = await props.ensProvider.resolveName(address);
          if (possibleAddress) {
            address = possibleAddress;
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
      setValue(address);
      if (typeof props.onChange === "function") {
        props.onChange(address);
      }
    }
  };

  let scanner = "";
  if (scan) {
    scanner = (
      <div
        style={{
          zIndex: 256,
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
        }}
        onClick={() => {
          setScan(!scan);
        }}
      >
        <QrReader
          delay={250}
          resolution={1200}
          onError={e => {
            console.log("SCAN ERROR", e);
            setScan(!scan);
          }}
          onScan={newValue => {
            if (newValue) {
              console.log("SCAN VALUE", newValue);
              let possibleNewValue = newValue;
              if (possibleNewValue.indexOf("/") >= 0) {
                possibleNewValue = possibleNewValue.substr(possibleNewValue.lastIndexOf("0x"));
                console.log("CLEANED VALUE", possibleNewValue);
              }
              setScan(!scan);
              updateAddress(possibleNewValue);
            }
          }}
          style={{ width: "100%" }}
        />
      </div>
    );
  }

  return (
    <div>
      {scanner}
      <Input
        autoFocus={props.autoFocus}
        placeholder={props.placeholder ? props.placeholder : "address"}
        prefix={<Blockie address={currentValue} size={8} scale={3} />}
        value={ens || currentValue}
        addonAfter={scannerButton}
        onChange={e => {
          updateAddress(e.target.value);
        }}
      />
    </div>
  );
}
