terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket       = "yoon2-tfstate-344693946629"
    key          = "yoon2-web/terraform.tfstate"
    region       = "ap-northeast-1"
    profile      = "terraform-admin"
    use_lockfile = true
  }
}

provider "aws" {
  region  = var.aws_region
  profile = "terraform-admin"
}

data "aws_caller_identity" "current" {}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}
