# Permanent Hosting Checklist for voranex.ai

## 🌐 GitHub Pages - Free Forever Hosting

GitHub Pages is **permanently free** for public repositories with these limits:
- ✅ 100GB soft bandwidth limit per month
- ✅ 100GB repository size limit
- ✅ 10 builds per hour
- ✅ Custom domain support (www.voranex.ai)
- ✅ Free HTTPS/SSL certificates (auto-renewed)

**Your current usage:** Static site (~5MB) = **0.005%** of limit
**Bandwidth estimate:** ~100K monthly visitors = well within free tier

---

## ✅ Permanent Hosting Requirements

### 1. GitHub Account Protection

**Required Actions:**
- [ ] Enable Two-Factor Authentication (2FA): https://github.com/settings/security
- [ ] Add recovery phone number
- [ ] Save recovery codes in secure location
- [ ] Use strong, unique password
- [ ] Enable security alerts

**Verify now:**
```bash
# Check if 2FA is enabled
gh auth status
```

---

### 2. Repository Protection

**Repository:** https://github.com/stephen1hong/voranext-website

**Required Settings:**
- [ ] Repository must remain **PUBLIC** (for free GitHub Pages)
- [ ] Enable branch protection for `main`
- [ ] Enable Dependabot alerts (if dependencies added)
- [ ] Add repository backup/mirror (optional)

**Branch Protection Settings:**
- Go to: Settings → Branches → Add rule for `main`
- Enable: "Require status checks to pass before merging"
- Enable: "Require deployments to succeed before merging"

---

### 3. Domain Renewal (GoDaddy)

**Critical - Domain must stay active:**

**Action Items:**
1. Log into GoDaddy: https://account.godaddy.com
2. Go to: My Products → Domains → voranex.ai
3. **Enable Auto-Renewal** (CRITICAL)
4. Add credit card or PayPal for auto-payment
5. Set renewal alerts: 90, 60, 30 days before expiration

**Domain Expiration Monitoring:**
- [ ] Check expiration date: _____________
- [ ] Auto-renewal enabled
- [ ] Payment method active
- [ ] Contact email verified

**Annual Cost:** ~$20-30/year (varies by registrar)

**Calendar Reminders:**
- Set reminder 90 days before expiration
- Set reminder 30 days before expiration
- Set reminder on expiration date

---

### 4. DNS Configuration Verification

**DNS records must stay configured (see DOMAIN_SETUP.md):**

**Required Records:**
- 4 A records pointing to GitHub Pages IPs
- 1 CNAME record: www → stephen1hong.github.io

**Verify DNS health:**
```bash
# Check A records
nslookup voranex.ai

# Check CNAME
nslookup www.voranex.ai

# Or use online tool
# https://dnschecker.org
```

**Schedule quarterly DNS verification:**
- March, June, September, December
- Verify records haven't been changed/deleted

---

### 5. SSL Certificate Auto-Renewal

**GitHub Pages automatically renews SSL certificates:**
- Certificate provider: Let's Encrypt
- Renewal: Automatic every 90 days
- **No action required** (as long as DNS is correct)

**Verify SSL status:**
- Visit: https://www.voranex.ai
- Check for green padlock
- Test at: https://www.ssllabs.com/ssltest/

---

### 6. Uptime Monitoring (Optional but Recommended)

**Free monitoring services:**

**Option 1: UptimeRobot (Free)**
1. Sign up: https://uptimerobot.com
2. Add monitor: https://www.voranex.ai
3. Set check interval: Every 5 minutes
4. Add email alerts

**Option 2: Better Uptime (Free)**
1. Sign up: https://betterstack.com/better-uptime
2. Add monitor: https://www.voranex.ai
3. Configure alerts

**Option 3: GitHub Actions Monitor**
- Already included in your deploy workflow
- Emails on failed deployments

---

### 7. Backup Strategy

**Automatic backups (already in place):**
- ✅ Git repository = full version history
- ✅ GitHub stores all code permanently
- ✅ Can restore any previous version

**Additional backup (optional):**
```bash
# Clone to local machine
git clone https://github.com/stephen1hong/voranext-website.git

# Or create a mirror on GitLab/Bitbucket
git remote add gitlab https://gitlab.com/yourusername/voranex-backup.git
git push gitlab main --mirror
```

---

### 8. Deployment Automation (Already Configured)

**Your workflow:** `.github/workflows/deploy.yml`

**How it works:**
1. Push to `main` branch
2. GitHub Actions runs automatically
3. Site deploys to GitHub Pages
4. Available at www.voranex.ai within 2-3 minutes

**Zero maintenance required** ✅

---

## 📊 Monthly Maintenance Checklist

**Every Month (5 minutes):**
- [ ] Visit https://www.voranex.ai - verify site loads
- [ ] Check GitHub Actions: https://github.com/stephen1hong/voranext-website/actions
- [ ] Review any security alerts
- [ ] Verify HTTPS certificate is valid

---

## 📋 Quarterly Checklist (Every 3 Months)

**Quarterly Review (15 minutes):**
- [ ] Verify DNS records unchanged at GoDaddy
- [ ] Test all website functionality
- [ ] Check SSL rating: https://www.ssllabs.com/ssltest/
- [ ] Review GitHub security alerts
- [ ] Verify domain auto-renewal is still enabled
- [ ] Update contact forms/email if needed

---

## 🔔 Annual Checklist

**Once Per Year (30 minutes):**
- [ ] Domain renewal (automatic if auto-renewal enabled)
- [ ] Verify payment method is current
- [ ] Review all security settings (GitHub + GoDaddy)
- [ ] Update contact information if changed
- [ ] Review and update content
- [ ] Run full security audit
- [ ] Test site on multiple browsers/devices

---

## 🆘 Disaster Recovery Plan

### Scenario 1: Website Goes Down

**Immediate Actions:**
1. Check GitHub Actions for failed deployments
2. Verify DNS records at GoDaddy
3. Check domain expiration status
4. Test from different network/device

**Fix:**
```bash
# Re-trigger deployment
git commit --allow-empty -m "Trigger redeployment"
git push origin main
```

### Scenario 2: Domain Expired

**Immediate Actions:**
1. Log into GoDaddy immediately
2. Renew domain (may have 30-day grace period)
3. Verify DNS records after renewal
4. Wait 24-48 hours for propagation

### Scenario 3: GitHub Account Compromised

**Immediate Actions:**
1. Reset GitHub password
2. Revoke all access tokens
3. Review recent commits for unauthorized changes
4. Restore from backup if needed:
```bash
git reset --hard <last-good-commit-hash>
git push origin main --force
```

### Scenario 4: Repository Deleted

**Recovery:**
1. GitHub keeps deleted repos for 90 days
2. Contact GitHub support to restore
3. Or restore from local backup:
```bash
cd path/to/local/backup
git remote set-url origin https://github.com/stephen1hong/voranext-website.git
git push origin main --force
```

---

## 💰 Costs Summary

**Total Annual Cost:** ~$20-30/year

**Breakdown:**
- GitHub Pages hosting: **$0** (free forever)
- SSL certificate: **$0** (free via Let's Encrypt)
- Domain registration (voranex.ai): ~$20-30/year (GoDaddy)
- Domain privacy: ~$10/year (optional)
- Total: **$20-40/year maximum**

---

## 📞 Emergency Contacts

**GitHub Support:**
- Help: https://support.github.com
- Status: https://www.githubstatus.com

**GoDaddy Support:**
- Phone: 480-505-8877
- Help: https://www.godaddy.com/help

**Domain/DNS Issues:**
- DNS Checker: https://dnschecker.org
- WHOIS Lookup: https://whois.domaintools.com

---

## ✅ Setup Completion Checklist

**Complete these to ensure permanent hosting:**

### GitHub
- [ ] 2FA enabled on GitHub account
- [ ] Recovery codes saved
- [ ] Repository is public
- [ ] GitHub Actions workflow running
- [ ] Latest commit deployed successfully

### Domain (GoDaddy)
- [ ] 2FA enabled on GoDaddy account
- [ ] Domain lock enabled
- [ ] Auto-renewal enabled
- [ ] Payment method active
- [ ] DNS records configured correctly

### Monitoring
- [ ] Set up uptime monitoring (UptimeRobot/Better Uptime)
- [ ] Configure email alerts
- [ ] Set calendar reminders for quarterly checks

### Backups
- [ ] Local backup cloned
- [ ] Optional: Mirror on GitLab/Bitbucket

---

## 🎯 You're Done!

Once all checkboxes above are complete:
- Your site will stay online **permanently** (as long as domain is renewed annually)
- Automatic deployments on every push
- Free HTTPS certificate (auto-renewed)
- Zero maintenance required
- Total cost: ~$20-30/year for domain only

**Your site is now production-ready and protected for the long term.**

Last updated: 2026-08-06
