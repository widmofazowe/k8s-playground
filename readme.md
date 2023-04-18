Minikube

Docker registry: 
1. Set the environment variables with `eval $(minikube docker-env)`
2. Build the image with the Docker daemon of Minikube (eg docker build -t my-image .)
3. Set the image in the pod spec like the build tag (eg my-image)
4. Set the imagePullPolicy to Never, otherwise Kubernetes will try to download the image.

OR `minikube image load my-image`

Entrypoint: minikube service arroyo-entrypoint --url
`kc port-forward service arroyo-entrypoint 3001:3000`

`echo "$(minikube ip) sps.local" | sudo tee -a /etc/hosts`
minikube ip -> 192.168.49.2

prometheus -> `admin / prom-operator`

TODO:
ingress
octant
helm
vsc kubernator
k9s
https://nip.io/
promotheus + loki + grafana
port: http
open-telemetry + grafana tempo
kubevious