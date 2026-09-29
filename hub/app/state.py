from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from pydantic import BaseModel, Field


class DeviceRegistration(BaseModel):
    device_id: str
    site_id: str
    role: str
    model: str
    link_state: str = "online"
    heartbeat_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    local_chunks: int = 14820
    queued_sync: int = 0


class HubState:
    def __init__(self, state_file: str | Path | None = None):
        self.state_file = Path(state_file) if state_file else Path("data/hub_state.json")
        self.state_file.parent.mkdir(parents=True, exist_ok=True)
        self.devices: dict[str, DeviceRegistration] = {}
        self.inbox_items: dict[str, dict[str, Any]] = {}
        self.knowledge_items: dict[str, dict[str, Any]] = {}
        self.conflicts: list[dict[str, Any]] = []
        self._load()

    def _load(self) -> None:
        if self.state_file.exists():
            try:
                with open(self.state_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    for d in data.get("devices", []):
                        reg = DeviceRegistration(**d)
                        self.devices[reg.device_id] = reg
                    self.inbox_items = data.get("inbox_items", {})
                    self.knowledge_items = data.get("knowledge_items", {})
                    self.conflicts = data.get("conflicts", [])
            except Exception:
                self._seed_default_devices()
        else:
            self._seed_default_devices()

    def _seed_default_devices(self) -> None:
        defaults = [
            DeviceRegistration(device_id="Device A", site_id="Plant North", role="Slurry Pump Monitor", model="P-204 Monitor", link_state="synced", local_chunks=14820, queued_sync=0),
            DeviceRegistration(device_id="Device B", site_id="Plant South", role="Thermal Array Node", model="Gas Turbine T-34", link_state="air-gapped", local_chunks=12110, queued_sync=18),
            DeviceRegistration(device_id="Device C", site_id="Refinery Unit 2", role="Main Valve Feed", model="Hydraulic Actuators", link_state="synced", local_chunks=9480, queued_sync=2),
            DeviceRegistration(device_id="Device D", site_id="Drone Rig 03", role="Hull Ultrasonic 02", model="Autonomous Crawlers", link_state="handshake", local_chunks=6120, queued_sync=5),
            DeviceRegistration(device_id="Device E", site_id="Subsea Manifold", role="Sub-ambient Array", model="Flow Valves & Risers", link_state="air-gapped", local_chunks=16400, queued_sync=24),
        ]
        for dev in defaults:
            self.devices[dev.device_id] = dev
        self._save()

    def _save(self) -> None:
        data = {
            "devices": [d.model_dump() for d in self.devices.values()],
            "inbox_items": self.inbox_items,
            "knowledge_items": self.knowledge_items,
            "conflicts": self.conflicts,
        }
        with open(self.state_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def record_heartbeat(self, profile: dict[str, Any]) -> DeviceRegistration:
        dev_id = profile.get("device_id", "Unknown Device")
        site_id = profile.get("site_id", "Plant North")
        reg = self.devices.get(dev_id) or DeviceRegistration(
            device_id=dev_id,
            site_id=site_id,
            role=profile.get("role", "Field Edge Node"),
            model=profile.get("model", "Industrial Copilot"),
        )
        reg.heartbeat_at = datetime.now(timezone.utc).isoformat()
        reg.link_state = "online"
        self.devices[dev_id] = reg
        self._save()
        return reg
