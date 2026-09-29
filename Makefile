# EdgeMind Root Makefile
# Offline-First Industrial Edge Vector Memory Platform

.PHONY: help doctor seed device-a device-b hub ui demo eval test clean

help:
	@echo "=========================================================================="
	@echo "  EDGEMIND AUTOMATION CONTROL"
	@echo "=========================================================================="
	@echo "  make doctor     Check Python, Qdrant Edge, SQLite WAL, disk, and ports"
	@echo "  make seed       Generate reproducible 450+ fleet corpus memories"
	@echo "  make device-a   Launch Device A (Plant North) on port 8001"
	@echo "  make device-b   Launch Device B (Plant South) on port 8002"
	@echo "  make hub        Launch Fleet Central Control Plane on port 8000"
	@echo "  make ui         Start Next.js industrial telemetry console on port 3000"
	@echo "  make demo       Execute deterministic 6-beat demo scenario runner"
	@echo "  make eval       Run complete pytest verification suite (12/12 tests)"
	@echo "  make test       Alias for make eval"
	@echo "=========================================================================="

doctor:
	python scripts/doctor.py

seed:
	python scripts/seed_data.py

device-a:
	python -m uvicorn device.app.main:app --host 0.0.0.0 --port 8001 --reload

device-b:
	python -m uvicorn device.app.main:app --host 0.0.0.0 --port 8002 --reload

hub:
	python -m uvicorn hub.app.main:app --host 0.0.0.0 --port 8000 --reload

ui:
	cd ui && npm run dev

demo:
	python scripts/demo.py

eval:
	pytest device/tests -v

test: eval

clean:
	rm -rf .pytest_cache ui/.next eval/demo_device_a.db*
