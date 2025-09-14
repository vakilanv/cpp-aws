variable "aws_region" {
  description = "AWS region to deploy EKS cluster"
  default     = "us-west-2"
}

variable "cluster_name" {
  description = "EKS cluster name"
  default     = "cpp-aws-cluster"
}

variable "node_instance_type" {
  description = "Worker node instance type"
  default     = "t3.micro"
}

variable "desired_size" {
  default     = 3
}

variable "min_size" {
  default     = 3
}

variable "max_size" {
  default     = 3
}
