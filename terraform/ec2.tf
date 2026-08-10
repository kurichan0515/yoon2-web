resource "aws_instance" "web" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.instance_type
  key_name               = var.key_pair_name
  subnet_id              = tolist(data.aws_subnets.default.ids)[0]
  vpc_security_group_ids = [aws_security_group.web.id]
  iam_instance_profile   = aws_iam_instance_profile.web.name

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  # Docker・Nginx・Gitの初期セットアップ
  user_data = <<-EOF
    #!/bin/bash
    set -e
    apt-get update -y
    apt-get install -y docker.io docker-compose-plugin nginx git
    systemctl enable docker
    systemctl start docker
    usermod -aG docker ubuntu
  EOF

  tags = {
    Name    = "${var.project}-web"
    Project = var.project
  }
}
