resource "aws_s3_bucket" "website_bucket" {
    bucket = var.bucket_name

    tags = {
        Name = "Ecommerce Demo Site"
    }
}

resource "aws_s3_bucket_website_configuration" "website_config" {
    bucket = aws_s3_bucket.website_bucket.id

    index_document {
        suffix = var.index_document
    }

    error_document {
        key = var.error_document
    }
}

resource "aws_s3_bucket_public_access_block" "public_access" {
    bucket = aws_s3_bucket.website_bucket.id
    block_public_acls = false
    block_public_policy = false
    ignore_public_acls = false
    restrict_public_buckets = false
}

# Public-read bucket policy
resource "aws_s3_bucket_policy" "public_read" {
    bucket = aws_s3_bucket.website_bucket.id

    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Sid = "PublicReadGetObject"
                Effect = "Allow"
                Principal = "*"
                Action = ["s3:GetObject"]
                Resource = "${aws_s3_bucket.website_bucket.arn}/*"
            }
        ]
    })
}

# Enables ownership controls and ACL for public access
resource "aws_s3_bucket_ownership_controls" "ownership" {
    bucket = aws_s3_bucket.website_bucket.id
    rule {
        object_ownership = "BucketOwnerPreferred"
    }
}


# Upload files from React build
resource "aws_s3_object" "site_files" {
    for_each = fileset("${path.module}/../dist", "**/*")

    bucket = aws_s3_bucket.website_bucket.id
    key = each.value
    source = "${path.module}/../dist/${each.value}"
    etag = filemd5("${path.module}/../dist/${each.value}")
    content_type = lookup({
        html = "text/html",
        css = "text/css",
        js = "application/javascript",
        png = "image/png",
        jpg = "image/jpeg",
        svg = "image/svg+xml"
    }, split(".", each.value)[length(split(".", each.value)) - 1], "binary/octet-stream")
    }