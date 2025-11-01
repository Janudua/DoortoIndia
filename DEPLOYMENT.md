# DoortoIndia - DigitalOcean Deployment Guide

## Quick Links
- **GitHub Repo**: https://github.com/Janudua/DoortoIndia
- **Tech Stack**: Next.js 16 + React 19 + TypeScript + Tailwind CSS

---

## 🚀 Option 1: DigitalOcean App Platform (Recommended - Easiest)

### Steps:

1. **Sign up for DigitalOcean**
   - Go to https://www.digitalocean.com/
   - Create an account (get $200 free credit if first time)

2. **Create App from GitHub**
   - Click **Create** → **Apps**
   - Select **GitHub** as source
   - Authorize DigitalOcean to access your GitHub
   - Select repository: `Janudua/DoortoIndia`
   - Select branch: `main`

3. **Configure Build Settings**
   - DigitalOcean will auto-detect Next.js
   - Verify these settings:
     - **Build Command**: `pnpm install && pnpm build`
     - **Run Command**: `pnpm start`
     - **HTTP Port**: 3000
   
4. **Select Plan**
   - **Basic Plan - $5/month** (512MB RAM, 1 vCPU) - Perfect for small traffic
   - **Professional - $12/month** (1GB RAM, 1 vCPU) - For moderate traffic

5. **Environment Variables** (Optional)
   - Add any env vars your app needs
   - Already set: `NODE_ENV=production`

6. **Deploy!**
   - Click **Create Resources**
   - Wait 3-5 minutes for deployment
   - Your app will be live at: `https://doortoindia-xxxxx.ondigitalocean.app`

7. **Custom Domain** (Optional)
   - Go to **Settings** → **Domains**
   - Add your domain
   - Update DNS records as shown
   - Free SSL certificate included!

### Features You Get:
✅ Automatic deployments on git push  
✅ Free SSL certificate (HTTPS)  
✅ Built-in CDN  
✅ Auto-scaling  
✅ Health checks & monitoring  
✅ Zero server management  

---

## 🐳 Option 2: DigitalOcean Droplet with Docker

### Prerequisites:
- A DigitalOcean account
- Basic command line knowledge

### Steps:

#### 1. Create a Droplet
```bash
# Login to DigitalOcean and create:
# - Ubuntu 22.04 LTS
# - Basic Plan: $6/month (1GB RAM)
# - Choose datacenter region closest to users
# - Add SSH key for security
```

#### 2. SSH into Droplet
```bash
ssh root@YOUR_DROPLET_IP
```

#### 3. Install Docker
```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y
```

#### 4. Clone and Deploy
```bash
# Install Git
apt install git -y

# Clone your repo
git clone https://github.com/Janudua/DoortoIndia.git
cd DoortoIndia

# Build Docker image
docker build -t doortoindia .

# Run container
docker run -d \
  --name doortoindia \
  --restart unless-stopped \
  -p 80:3000 \
  doortoindia

# Check if running
docker ps
docker logs doortoindia
```

#### 5. Set up Nginx (Optional but recommended)
```bash
# Install Nginx
apt install nginx -y

# Create Nginx config
cat > /etc/nginx/sites-available/doortoindia << 'EOF'
server {
    listen 80;
    server_name YOUR_DOMAIN.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/doortoindia /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 6. Install SSL with Let's Encrypt
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d YOUR_DOMAIN.com

# Auto-renewal is set up automatically
```

### Update Your App
```bash
cd DoortoIndia
git pull origin main
docker build -t doortoindia .
docker stop doortoindia
docker rm doortoindia
docker run -d --name doortoindia --restart unless-stopped -p 80:3000 doortoindia
```

---

## 📊 Cost Comparison

| Method | Monthly Cost | Best For |
|--------|--------------|----------|
| **App Platform (Basic)** | $5 | Quick start, auto-scaling |
| **App Platform (Pro)** | $12 | Production, more resources |
| **Droplet (1GB)** | $6 | Learning Docker, multiple apps |
| **Droplet (2GB)** | $12 | Better performance |

---

## 🎯 My Recommendation

**Start with App Platform ($5/month)**
- Fastest to deploy
- Zero server management
- Automatic SSL & deployments
- Perfect for MVPs and small projects

**Switch to Droplet later if:**
- You want to run multiple apps on one server
- You need more control
- You want to learn DevOps

---

## 🔧 Troubleshooting

### Build Fails
- Check build logs in DigitalOcean dashboard
- Ensure `pnpm-lock.yaml` is committed
- Try locally: `pnpm install && pnpm build`

### App Won't Start
- Check if port 3000 is exposed
- Verify `pnpm start` command works locally
- Check environment variables

### Slow Performance
- Upgrade to larger plan
- Enable caching
- Optimize images

---

## 📝 Next Steps

1. ✅ Code pushed to GitHub
2. 🚀 Choose deployment method (App Platform recommended)
3. 🌐 Deploy your app
4. 🎨 Add custom domain (optional)
5. 📈 Set up monitoring & analytics

---

## 🆘 Need Help?

- DigitalOcean Docs: https://docs.digitalocean.com/
- DigitalOcean Community: https://www.digitalocean.com/community
- Next.js Deployment: https://nextjs.org/docs/deployment

Good luck with your deployment! 🎉
