"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { DeviceConfig } from "../lib/types";
import { DEFAULT_DEVICE, DEVICES } from "../lib/devices";

interface DeviceContextType {
  device: DeviceConfig;
  setDeviceId: (id: string) => void;
  linkState: "online" | "offline";
  toggleLink: () => void;
  simulateHandshake: () => void;
  isHandshaking: boolean;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export function DeviceProvider({
  children,
  initialDeviceId = "device-a",
}: {
  children: React.ReactNode;
  initialDeviceId?: string;
}) {
  const [deviceId, setDeviceId] = useState<string>(initialDeviceId);
  const [linkState, setLinkState] = useState<"online" | "offline">("online");
  const [isHandshaking, setIsHandshaking] = useState(false);

  const device = DEVICES[deviceId] || DEFAULT_DEVICE;

  useEffect(() => {
    // Set data attribute on document body for theme styling
    document.body.setAttribute("data-link-state", linkState);
  }, [linkState]);

  const toggleLink = () => {
    setLinkState((prev) => (prev === "online" ? "offline" : "online"));
  };

  const simulateHandshake = () => {
    setIsHandshaking(true);
    setTimeout(() => {
      setLinkState("online");
      setIsHandshaking(false);
    }, 1200);
  };

  return (
    <DeviceContext.Provider
      value={{
        device,
        setDeviceId,
        linkState,
        toggleLink,
        simulateHandshake,
        isHandshaking,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const ctx = useContext(DeviceContext);
  if (!ctx) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return ctx;
}
