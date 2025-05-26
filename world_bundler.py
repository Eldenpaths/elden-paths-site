
import os
import zipfile
from pathlib import Path
import datetime

# Paths
CACHE_DIR = Path("builder_cache")
EXPORT_DIR = Path("export/world_bundle")
EXPORT_DIR.mkdir(parents=True, exist_ok=True)

timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
bundle_name = f"elden_world_export_{timestamp}.zip"
bundle_path = EXPORT_DIR / bundle_name

# Create a new zip file
with zipfile.ZipFile(bundle_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for tile_dir in CACHE_DIR.glob("*_voxel.json"):
        tile_id = tile_dir.stem.replace("_voxel", "")
        base_files = [
            f"{tile_id}_voxel.json",
            f"{tile_id}_sketch.png",
            f"{tile_id}_fogmask.png",
            f"{tile_id}_struct.gltf",
            f"{tile_id}_trace.json"
        ]
        for fname in base_files:
            fpath = CACHE_DIR / fname
            if fpath.exists():
                arcname = f"tiles/{tile_id}/{fname}"
                zipf.write(fpath, arcname)
                print(f"Added: {arcname}")

    # Add meta files if they exist
    for meta_file in ["index.json", "readme.txt"]:
        fpath = CACHE_DIR / meta_file
        if fpath.exists():
            zipf.write(fpath, meta_file)
            print(f"Added meta: {meta_file}")

print(f"✅ World bundle created: {bundle_path}")
