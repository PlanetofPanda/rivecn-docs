---
title: "自带 S3 存储桶"
description: "配置您自己的 AWS S3 存储桶以配合 Rive 工作"
---

::: info
此功能仅面向企业计划（Enterprise plan）客户提供。如果您有兴趣通过升级解锁此项功能，请[联系我们](https://rive.app/enterprise)。
:::

## 什么是自定义 S3 存储桶？

自定义 S3 存储桶允许企业客户将他们的 Rive 文件和资源数据存储在自己的 AWS 环境中，而不是 Rive 的默认存储中。此项高级功能让您能够更好地控制数据，从而实现：

- 应用您组织的安全性合规政策
- 将数据保留在您现有的 AWS 基础设施内
- 与您现有的备份和灾难恢复流程集成
- 使用 CloudTrail 监控和审计对您存储桶的所有访问

如果您在 Rive 中已有数据，并希望在升级至企业版后将其迁移到自定义 S3 存储桶，我们的团队可以协助协调迁移过程。

## 配置指南

### 在您的 AWS 账户中创建一个 S3 存储桶

按照 [AWS 文档](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html) 创建一个新的 S3 存储桶：

- 为您的存储桶选择一个唯一的名称 <br />
  **注意：** 在本文档后续内容中，请使用该名称替换 `BUCKET_NAME`
- 配置基础存储桶设置
  - 阻止公共访问（Block public access）
  - 您可以选择保留所有默认设置，或者决定启用/自定义：
    - 版本控制（默认禁用）
    - 加密 - 默认情况下，存储桶和新对象由 Amazon 的 S3 托管密钥 (SSE-S3) 使用 AES256 加密
    - 标签（Tags）

### 创建 IAM 策略

- 在 AWS 控制台中，进入 IAM / Policies（策略），点击 _"Create policy"（创建策略）_
- 选择 _"JSON"_ 策略编辑器视图，并粘贴以下内容：
```json
{
  "Statement": [
    {
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:GetBucketLocation",
        "s3:AbortMultipartUpload",
        "s3:ListBucketMultipartUploads",
        "s3:ListMultipartUploadParts"
      ],
      "Effect": "Allow",
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME",
        "arn:aws:s3:::BUCKET_NAME/*"
      ]
    }
  ],
  "Version": "2012-10-17"
}
```

### 创建一个新的 IAM 角色

- 在 AWS 控制台中，进入 IAM / Roles（角色），点击 _"Create role"（创建角色）_
- 在 _"Trusted entity type"（信任实体类型）_ 下选择 _"Custom trust policy"（自定义信任策略）_
- 在出现的 JSON 编辑器中粘贴以下内容：
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "REQUEST_FROM_RIVE"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

**注意：** 您需要向您的 Rive 代表索取用于替换 `REQUEST_FROM_RIVE` 的正确值。

- 点击 _"Next"（下一步）_ 进入 _"Add permissions"（添加权限）_ 部分
- 在 _"Permission policies"（权限策略）_ 下搜索您刚刚创建的 IAM 策略并选择它
- 点击 _"Next"（下一步）_ 进入 _"Name, review, and create"（命名、检查和创建）_
- 选择一个名称，检查信任策略和权限，然后点击 _"Create role"（创建角色）_
- 打开您刚刚创建的角色并记录下 ARN

### 向 Rive 提供信息

共享以下信息给您的 Rive 代表：

- **Region（区域）**：S3 存储桶所在的区域
- **Bucket Name（存储桶名称）**：存储桶的名称
- **Role ARN（角色 ARN）**：您创建的角色的 ARN

在向您的 Rive 代表提供上述所有信息后，我们的团队将配置您的账户以使用您的自定义 S3 存储桶。

一旦一切设置就绪，您将收到确认。届时，您的所有 Rive 资源都将自动存储在您自己的 S3 存储桶中。

## 故障排除

如果您在 S3 存储桶配置方面遇到问题：

- 验证 IAM 角色是否具有正确的信任关系（使用 Rive 提供的数值）
- 确保 IAM 策略具有必要的 S3 权限
- 检查您的存储桶是否位于您提供给 Rive 的同一区域
- 联系您的 Rive 代表以获取更多协助
