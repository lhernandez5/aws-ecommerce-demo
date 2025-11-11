variable "aws_region" {
  description = "AWS region for the resources"
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Unique S3 bucket name for the website"
  default     = "my-ecommerce-demo-site"
}

variable "index_document" {
  default = "index.html"
}

variable "error_document" {
  default = "index.html"
}