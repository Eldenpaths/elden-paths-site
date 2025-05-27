
using System.Collections.Generic;
using System.IO;
using UnityEngine;

[System.Serializable]
public class EldenModel
{
    public string name;
    public string type;
    public string status;
    public string notes;
}

[System.Serializable]
public class EldenModelBundle
{
    public List<EldenModel> assets;
}

public class EldenBundleLoader : MonoBehaviour
{
    public string jsonPath = "Assets/elden_parallel_bundle/model_ready_status.json";
    public Transform spawnRoot;
    public GameObject defaultPrefab;

    void Start()
    {
        LoadAndSpawnAssets();
    }

    void LoadAndSpawnAssets()
    {
        if (!File.Exists(jsonPath))
        {
            Debug.LogError("Model status file not found: " + jsonPath);
            return;
        }

        string json = File.ReadAllText(jsonPath);
        EldenModelBundle bundle = JsonUtility.FromJson<EldenModelBundle>(json);

        float offset = 0f;

        foreach (var asset in bundle.assets)
        {
            string modelPath = "elden_parallel_bundle/" + asset.name;
            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Cube); // placeholder object

            go.transform.SetParent(spawnRoot);
            go.transform.position = new Vector3(offset, 0, 0);
            go.name = asset.name + " (" + asset.status + ")";

            offset += 2.5f;

            Debug.Log("Spawned: " + go.name);
        }
    }
}
