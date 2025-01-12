import { KubeConfig, CoreV1Api, AppsV1Api, NetworkingV1Api, AppsV1ApiCreateNamespacedDeploymentRequest, CoreV1ApiCreateNamespacedServiceRequest, NetworkingV1ApiCreateNamespacedIngressRequest } from "@kubernetes/client-node";
import fs from "fs/promises";
import yaml from "yaml";

const kubeconfig = new KubeConfig();
kubeconfig.loadFromDefault();

const coreV1Api = kubeconfig.makeApiClient(CoreV1Api);
const appsV1Api = kubeconfig.makeApiClient(AppsV1Api);
const networkingV1Api = kubeconfig.makeApiClient(NetworkingV1Api);

const readAndParseKubeYaml = async (path: string, replId: string) => {
    const file = await fs.readFile(path, "utf8");
    const doc = yaml.parseAllDocuments(file).map((doc) => {
        let docString = doc.toString();
        docString = docString.replace(/service_name/g, replId);
        return yaml.parse(docString);
    });
    return doc;
};

export const deploy = async (replId: string) => {
    try {
        replId = replId.toString();
        const kubeManifests = await readAndParseKubeYaml("./k8s/runner.yaml", replId);
        const namespace = "default";
        for (const manifest of kubeManifests) {
            switch (manifest.kind) {
                case "Deployment":
                    const deploymentRequest: AppsV1ApiCreateNamespacedDeploymentRequest = {
                        body: manifest,
                        namespace,
                    };
                    await appsV1Api.createNamespacedDeployment(deploymentRequest);
                    break;
                case "Service":
                    const serviceRequest: CoreV1ApiCreateNamespacedServiceRequest = {
                        body: manifest,
                        namespace,
                    };
                    await coreV1Api.createNamespacedService(serviceRequest);
                    break;
                case "Ingress":
                    const ingressRequest: NetworkingV1ApiCreateNamespacedIngressRequest = {
                        body: manifest,
                        namespace,
                    };
                    await networkingV1Api.createNamespacedIngress(ingressRequest);
                    break;
                default:
                    console.error(`Unsupported kind: ${manifest.kind}`);
            }
        }
        return true;
    } catch (error) {
        console.error("Error deploying repl", replId);
        console.error(error);
        return false;
    }
};


