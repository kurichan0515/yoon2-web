output "elastic_ip" {
  description = "EC2のElastic IP（ドメインのAレコードにこれを設定）"
  value       = aws_eip.web.public_ip
}

output "ec2_instance_id" {
  description = "EC2インスタンスID"
  value       = aws_instance.web.id
}

output "s3_bucket_name" {
  description = "S3バケット名（env.example の AWS_S3_BUCKET に設定）"
  value       = aws_s3_bucket.images.id
}

output "s3_bucket_arn" {
  description = "S3バケットARN"
  value       = aws_s3_bucket.images.arn
}

output "aws_account_id" {
  description = "AWSアカウントID"
  value       = data.aws_caller_identity.current.account_id
}
