variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "project" {
  type    = string
  default = "yoon2"
}

variable "instance_type" {
  type    = string
  default = "t3.small"
}

variable "key_pair_name" {
  type        = string
  description = "EC2に使用するキーペア名（事前にAWSコンソールで作成しておく）"
}

variable "allowed_ssh_cidr" {
  type        = string
  description = "SSHを許可するCIDR（例: 自宅のグローバルIP/32）"
  default     = "0.0.0.0/0"
}

variable "s3_bucket_prefix" {
  type        = string
  default     = "yoon2"
  description = "S3バケット命名: {prefix}-images-{account_id}"
}
