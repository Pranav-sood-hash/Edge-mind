from __future__ import annotations

import json
import random
import uuid
from pathlib import Path


def generate_fleet_corpus(output_path: str = "data/seed/fleet_corpus.json") -> list[dict]:
    random.seed(42)

    assets = [
        ("P-204", "Centrifugal Slurry Pump", "Plant North"),
        ("C-112", "Reciprocating Gas Compressor", "Plant South"),
        ("R-07", "Autonomous Tank Crawler", "Plant North"),
        ("V-33", "High-Pressure Globe Valve", "Plant North"),
        ("T-34", "Heavy Industrial Gas Turbine", "Plant South"),
        ("M-50", "Deepwater Production Manifold", "Plant South"),
        ("H-03", "Hull Ultrasonic Crawler", "Plant North"),
        ("P-101", "Boiler Feed Pump", "Plant North"),
    ]

    components = ["bearing housing", "mechanical seal", "suction impeller", "drive coupling", "thrust collar", "discharge flange"]
    issues = [
        "high-frequency acoustic harmonic vibration at 1,750 RPM",
        "eccentric shaft deflection and runout exceeding 0.38mm",
        "thermal excursion rising beyond 85 C operating threshold",
        "suction pressure cavitation under 88% operational load",
        "coupling torque loosening below 145 Nm specification",
        "barrier fluid pressure drop across tandem seal faces"
    ]
    remediations = [
        "cross-pattern torquing in 40 Nm increments to 145 Nm final",
        "replace outboard roller bearing SKF-7314 and pack with ISO VG 220 synthetic",
        "re-align flexible drive coupling to within 0.04mm tolerance",
        "flush cooling jacket line and adjust clearance shims to 0.45mm",
        "re-calibrate dynamic balancing protocol Rev 4.1"
    ]

    corpus: list[dict] = []
    idx = 1000

    # 1. Manuals (~150)
    for i in range(150):
        asset_id, asset_type, site = assets[i % len(assets)]
        comp = components[i % len(components)]
        rem = remediations[i % len(remediations)]
        m_id = f"10000000-0000-0000-0000-{idx:012d}"
        idx += 1
        content = (
            f"Technical Manual OEM Standard for {asset_id} ({asset_type}) at {site}. "
            f"Section 4.{i%12 + 1} {comp.title()} Assembly Specification: "
            f"Mandatory procedure requires {rem}. Ensure safety lockouts are applied."
        )
        corpus.append({
            "mem_id": m_id,
            "title": f"OEM Manual: {asset_id} {comp.title()} Spec",
            "content": content,
            "kind": "manual",
            "authority": 2,
            "status": "active",
            "sync_state": "synced",
            "scope": "fleet",
            "site_id": site,
            "asset_id": asset_id,
            "asset_type": asset_type,
            "source_device": "OEM Fleet Base",
            "target_shard": "fleet_mirror",
            "payload": {"title": f"OEM Manual: {asset_id} {comp.title()} Spec", "doc_ref": f"#MAN-{i+100}"},
        })

    # 2. Bulletins (~40)
    for i in range(40):
        asset_id, asset_type, site = assets[i % len(assets)]
        comp = components[i % len(components)]
        m_id = f"20000000-0000-0000-0000-{idx:012d}"
        idx += 1
        content = (
            f"CRITICAL ENGINEERING DIRECTIVE #{i+1} for {asset_id} ({asset_type}). "
            f"Issued by Central Fleet Reliability: Mandatory revision for {comp}. "
            f"Supersedes prior baselines. Specified torque mandate is 145 Nm in star pattern."
        )
        corpus.append({
            "mem_id": m_id,
            "title": f"Fleet Bulletin: {asset_id} {comp.title()} Directive",
            "content": content,
            "kind": "bulletin",
            "authority": 3,
            "status": "active",
            "sync_state": "synced",
            "scope": "fleet",
            "site_id": site,
            "asset_id": asset_id,
            "asset_type": asset_type,
            "source_device": "Fleet Central",
            "target_shard": "fleet_mirror",
            "payload": {"title": f"Fleet Bulletin: {asset_id} Directive", "doc_ref": f"#OEM-ROOT-{i+80}"},
        })

    # 3. Incidents (~120)
    for i in range(120):
        asset_id, asset_type, site = assets[i % len(assets)]
        comp = components[i % len(components)]
        iss = issues[i % len(issues)]
        m_id = f"30000000-0000-0000-0000-{idx:012d}"
        idx += 1
        tech = "Asha K. (TK-904)" if site == "Plant North" else "Ravi M. (TK-812)"
        content = (
            f"Operational Incident Report on {asset_id} ({comp}) logged at {site} by {tech}. "
            f"Telemetry anomaly detected: {iss}. Unit tripped offline during high load sweep."
        )
        corpus.append({
            "mem_id": m_id,
            "title": f"Incident #{i+101}: {asset_id} {comp.title()} Anomaly",
            "content": content,
            "kind": "incident",
            "authority": 1,
            "status": "active",
            "sync_state": "synced",
            "scope": "site",
            "site_id": site,
            "asset_id": asset_id,
            "asset_type": asset_type,
            "source_device": "Device A" if site == "Plant North" else "Device B",
            "target_shard": "device_memory",
            "payload": {"title": f"Incident #{i+101}: {asset_id} Anomaly", "doc_ref": f"#IN-{i+8000}"},
        })

    # 4. Fixes (~80)
    for i in range(80):
        asset_id, asset_type, site = assets[i % len(assets)]
        comp = components[i % len(components)]
        rem = remediations[i % len(remediations)]
        m_id = f"40000000-0000-0000-0000-{idx:012d}"
        idx += 1
        content = (
            f"Field Fix Procedure verified for {asset_id} {comp} at {site}. "
            f"Applied corrective remediation: {rem}. Shaft balance verified; vibration settled to normal baseline."
        )
        corpus.append({
            "mem_id": m_id,
            "title": f"Verified Fix: {asset_id} {comp.title()} Protocol",
            "content": content,
            "kind": "fix",
            "authority": 1,
            "status": "active",
            "sync_state": "synced",
            "scope": "site",
            "site_id": site,
            "asset_id": asset_id,
            "asset_type": asset_type,
            "source_device": "Device A" if site == "Plant North" else "Device B",
            "target_shard": "device_memory",
            "payload": {"title": f"Verified Fix: {asset_id} Protocol", "doc_ref": f"#FL-{i+2000}", "provenance": "learned from Device A - verified"},
        })

    # 5. Sensitive items (20)
    for i in range(20):
        asset_id, _, site = assets[i % len(assets)]
        m_id = f"50000000-0000-0000-0000-{idx:012d}"
        idx += 1
        phone = f"+49 171 555 {i+1000:04d}"
        email = f"operator_{i}@offshore-plant.corp"
        content = f"Field technician contact note for {asset_id} at {site}. Representative Hans mobile: {phone}, email {email}. API token: sk-live9948271{i:04d}."
        corpus.append({
            "mem_id": m_id,
            "title": f"Sensitive Contact Note #{i+1}",
            "content": content,
            "kind": "note",
            "authority": 0,
            "status": "active",
            "sync_state": "local_only",
            "scope": "device",
            "site_id": site,
            "asset_id": asset_id,
            "source_device": "Device A",
            "target_shard": "device_memory",
            "payload": {"has_pii": True, "pii_flags": {"phone": [phone], "email": [email]}},
        })

    # 6. Duplicates (30)
    for i in range(30):
        orig = corpus[i * 2]  # duplicate of an existing manual or incident
        m_id = f"60000000-0000-0000-0000-{idx:012d}"
        idx += 1
        corpus.append({
            "mem_id": m_id,
            "title": f"Duplicate of #{orig['mem_id'][:8]}",
            "content": orig["content"],
            "kind": orig["kind"],
            "authority": orig["authority"],
            "status": "active",
            "sync_state": "local_only",
            "scope": "device",
            "site_id": orig["site_id"],
            "asset_id": orig.get("asset_id"),
            "source_device": "Device A",
            "target_shard": "device_memory",
            "payload": {"is_duplicate": True, "target_original": orig["mem_id"]},
        })

    # 7. Conflicts (20 pairs = 40 items)
    for i in range(20):
        asset_id, asset_type, site = assets[i % len(assets)]
        shared_id = f"70000000-0000-0000-0000-{i:012d}"
        # Pair Item 1 (Lower authority local)
        corpus.append({
            "mem_id": shared_id,
            "title": f"Conflicting Baseline: {asset_id} Spec",
            "content": f"Local procedure for {asset_id} specifies tightening torque of 40 Nm using cross-pattern tightening.",
            "kind": "manual",
            "authority": 1,
            "version": 1,
            "status": "superseded",
            "sync_state": "synced",
            "scope": "site",
            "site_id": site,
            "asset_id": asset_id,
            "source_device": "Device A",
            "target_shard": "device_memory",
            "payload": {"conflict_pair_id": i, "claim_torque": 40},
        })
        # Pair Item 2 (Higher authority fleet bulletin)
        corpus.append({
            "mem_id": shared_id,
            "title": f"Conflicting Directive: {asset_id} Fleet Spec",
            "content": f"Mandatory fleet directive for {asset_id} specifies final torque of 45 Nm using cross-pattern tightening.",
            "kind": "bulletin",
            "authority": 3,
            "version": 2,
            "status": "active",
            "sync_state": "synced",
            "scope": "fleet",
            "site_id": site,
            "asset_id": asset_id,
            "source_device": "Fleet Central",
            "target_shard": "fleet_mirror",
            "payload": {"conflict_pair_id": i, "claim_torque": 45},
        })

    p = Path(output_path)
    p.parent.mkdir(parents=True, exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(corpus, f, indent=2)

    print(f"Generated {len(corpus)} total reproducible memories (seed=42) to {output_path}")
    return corpus


if __name__ == "__main__":
    generate_fleet_corpus()
