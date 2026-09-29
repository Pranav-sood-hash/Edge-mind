import { DeviceConfig } from "./types";

export const DEVICES: Record<string, DeviceConfig> = {
  "device-a": {
    id: "device-a",
    name: "Device A - Plant North",
    site: "Plant North",
    port: 8001,
    techName: "Asha K.",
    techId: "TK-904",
    role: "Slurry Pump P-204 Monitor",
    storageUsed: "4.2",
    storageTotal: "64 GB",
    rttMs: 4,
    vectorChunks: 14820,
  },
  "device-b": {
    id: "device-b",
    name: "Device B - Plant South",
    site: "Plant South",
    port: 8002,
    techName: "Ravi M.",
    techId: "TK-812",
    role: "Gas Turbine T-34 Thermal Array Node",
    storageUsed: "3.8",
    storageTotal: "64 GB",
    rttMs: 6,
    vectorChunks: 12110,
  },
};

export const DEFAULT_DEVICE = DEVICES["device-a"];
