# E-Commerce Site (Vite + Terraform + AWS S3)

A demo e-commerce website built with **React (Vite)**, hosted as a **static site on AWS S3**. The project uses **Terraform** to provision AWS infrastructure, including S3 buckets for hosting and public access configuration. This setup demonstrates **Infrastructure as Code (IaC)** best practices and a modern front-end workflow.

---

## 🚀 Features

- Fully functional **React e-commerce frontend** scaffolded with **Vite**.
- Static site hosting on **AWS S3** with website configuration.
- Terraform-managed **Infrastructure as Code**:
  - S3 bucket creation
  - Bucket policy for public-read access
  - Optional website index/error document configuration
- Supports **deployment automation**: React build artifacts can be uploaded to S3 using Terraform.
- Modular and **reusable Terraform code** with variables for easy environment changes.

---

## 🛠 Tech Stack

- **Frontend:** React + Vite  
- **Infrastructure:** Terraform  
- **Cloud Provider:** AWS (S3 static website hosting)  
- **Version Control:** Git  


## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-vite-terraform.git
cd ecommerce-vite-terraform
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Build React App
```bash
npm run build
```
### 4.Configure AWS Credentials

Ensure AWS CLI is configured with a user that has S3 permissions:
```bash
aws configure
```

### 5. Deploy Infrastructure with Terraform
```bash
cd infra
terraform init
terraform plan
terraform apply
```
