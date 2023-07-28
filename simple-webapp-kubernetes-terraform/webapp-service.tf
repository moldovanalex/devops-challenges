resource "kubernetes_service" "webapp-service" {
  metadata {
    name = "webapp-service"
    labels = {
      name = "webapp-service"
    }
  }

  spec {
    selector = {
      name = "webapp-service"
    }

    type = "NodePort"

    port {
      port = 8080
      target_port = 80
      node_port = 30080
    }
  }
}