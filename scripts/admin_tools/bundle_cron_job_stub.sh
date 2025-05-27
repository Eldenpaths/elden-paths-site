
#!/bin/bash
# Bundle Cron Job for Elden Parallel Build
cd /mnt/data/elden_echo_compiler
python3 world_bundler.py
python3 run_bundler_server.py
python3 bundle_export.py  # hypothetical if broken into stages
