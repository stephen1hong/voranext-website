# Domain Setup & Security Guide
## voranex.ai on GoDaddy → GitHub Pages

---

## 🔐 PART 1: Secure Your GoDaddy Domain (Do This FIRST)

### Step 1: Enable Two-Factor Authentication (2FA)
**CRITICAL - Do this before anything else**

1. Go to: https://account.godaddy.com/security
2. Click on **Two-Step Verification**
3. Choose method:
   - **Authenticator App** (RECOMMENDED - Google Authenticator, Authy)
   - SMS (less secure but better than nothing)
4. Follow setup wizard
5. **Save backup codes** in a secure location

**Status:** ⬜ 2FA Enabled

---

### Step 2: Enable Domain Lock (Transfer Lock)
**Prevents domain theft**

1. Go to: https://dcc.godaddy.com/domains
2. Click on **voranex.ai**
3. Scroll to **Additional Settings** section
4. Find **Domain Lock** or **Transfer Lock**
5. Toggle it to **ON** (locked position)
6. Confirm the action

**What this does:** Prevents anyone from transferring your domain to another registrar without unlocking it first.

**Status:** ⬜ Domain Lock Enabled

---

### Step 3: Update Domain Contact Information
**Make sure it's YOUR email**

1. In domain settings for voranex.ai
2. Go to **Contact Information**
3. Verify these are YOUR email addresses:
   - Registrant Email
   - Admin Email
   - Technical Email
4. If not, update them immediately

**Status:** ⬜ Contact Info Verified

---

### Step 4: Enable Domain Privacy Protection
**Hides your personal info from WHOIS**

1. In domain settings for voranex.ai
2. Look for **Domain Privacy** or **Privacy Protection**
3. Toggle to **ON**
4. This may cost extra (~$10/year) but worth it

**Status:** ⬜ Privacy Protection Enabled (if available)

---

## 🌐 PART 2: Configure DNS for GitHub Pages

### Step 5: Access DNS Management

1. Go to: https://dcc.godaddy.com/domains
2. Click on **voranex.ai**
3. Click **DNS** or **Manage DNS**
4. You'll see a list of DNS records

---

### Step 6: Add CNAME Record for www

**Delete any existing CNAME or A records for 'www' first**

Click **Add** and enter:
```
Type: CNAME
Name: www
Value: stephen1hong.github.io
TTL: 600 seconds (or default)
```

Click **Save**

**Status:** ⬜ CNAME Record Added

---

### Step 7: Add A Records for Apex Domain (voranex.ai)

**Delete any existing A records for '@' first**

Add **FOUR** A records (click Add four times):

**Record 1:**
```
Type: A
Name: @ (or leave blank for root domain)
Value: 185.199.108.153
TTL: 600 seconds
```

**Record 2:**
```
Type: A
Name: @
Value: 185.199.109.153
TTL: 600 seconds
```

**Record 3:**
```
Type: A
Name: @
Value: 185.199.110.153
TTL: 600 seconds
```

**Record 4:**
```
Type: A
Name: @
Value: 185.199.111.153
TTL: 600 seconds
```

Click **Save** after each

**Status:** ⬜ All 4 A Records Added

---

### Step 8: Add CAA Records (Security - Optional but Recommended)

**Prevents unauthorized SSL certificate issuance**

Click **Add**:
```
Type: CAA
Name: @
Tag: issue
Value: letsencrypt.org
TTL: 600
```

Click **Add** again:
```
Type: CAA
Name: @
Tag: issuewild
Value: letsencrypt.org
TTL: 600
```

**What this does:** Only Let's Encrypt (used by GitHub Pages) can issue SSL certificates for your domain.

**Status:** ⬜ CAA Records Added

---

### Step 9: Enable DNSSEC (Advanced Security)

**Prevents DNS spoofing attacks**

1. In GoDaddy DNS management for voranex.ai
2. Look for **DNSSEC** section (might be under "Advanced Features")
3. Click **Manage** or **Enable**
4. Follow the wizard
5. Enable DNSSEC

**Note:** Not all GoDaddy plans include DNSSEC. If you don't see it, that's okay - your other protections are strong.

**Status:** ⬜ DNSSEC Enabled (if available)

---

## 🚀 PART 3: Configure GitHub Pages

### Step 10: Verify Domain on GitHub

1. Go to: https://github.com/stephen1hong/voranex-website/settings/pages
2. Under **Custom domain**, you should see: `www.voranex.ai`
3. Wait for DNS check (can take 5-10 minutes after DNS changes)
4. You'll see a green checkmark when successful

**Status:** ⬜ Domain Verified on GitHub

---

### Step 11: Enable HTTPS Enforcement

**CRITICAL - Must wait for DNS to propagate first**

1. After domain is verified (green checkmark)
2. Wait an additional 5-10 minutes
3. The **Enforce HTTPS** checkbox will become available
4. Check the box
5. Click **Save**

**Status:** ⬜ HTTPS Enforced

---

## ✅ PART 4: Verification & Testing

### Step 12: Test Your Website

**Wait 10-30 minutes after DNS changes, then test:**

1. Open incognito/private browser window
2. Visit: http://www.voranex.ai
   - Should redirect to HTTPS automatically
3. Visit: https://www.voranex.ai
   - Should load your website with green padlock
4. Visit: http://voranex.ai (without www)
   - Should redirect to https://www.voranex.ai

**Status:** ⬜ All URLs Working

---

### Step 13: Check Security Headers

1. Go to: https://securityheaders.com
2. Enter: `https://www.voranex.ai`
3. Click **Scan**
4. You should see **A** or **A+** rating

**Status:** ⬜ Security Headers Verified

---

### Step 14: Check SSL Certificate

1. Go to: https://www.ssllabs.com/ssltest/
2. Enter: `www.voranex.ai`
3. Click **Submit**
4. Wait for scan (takes 2-3 minutes)
5. You should see **A** or **A+** rating

**Status:** ⬜ SSL Certificate Verified

---

## 📊 Final Security Checklist

### GoDaddy Domain Security
- ⬜ Two-Factor Authentication (2FA) enabled
- ⬜ Domain Lock/Transfer Lock enabled
- ⬜ Contact information verified
- ⬜ Privacy Protection enabled
- ⬜ DNSSEC enabled (if available)

### DNS Configuration
- ⬜ CNAME record for www → stephen1hong.github.io
- ⬜ 4 A records for apex domain
- ⬜ CAA records for SSL security

### GitHub Pages
- ⬜ Custom domain verified
- ⬜ HTTPS enforcement enabled

### Testing
- ⬜ Website loads on all URLs
- ⬜ HTTPS redirects working
- ⬜ Security headers rated A/A+
- ⬜ SSL certificate rated A/A+

---

## 🆘 Troubleshooting

### "Domain verification failed"
- Wait 30-60 minutes for DNS propagation
- Clear your browser cache
- Try from different network/device

### "HTTPS checkbox is disabled"
- Domain must be verified first (green checkmark)
- Wait 24 hours after verification
- GitHub needs to provision SSL certificate

### "Website not loading"
- Check DNS records are exactly as listed above
- Wait up to 48 hours for global DNS propagation
- Use https://dnschecker.org to verify propagation

### "Security rating is low"
- Wait for site to fully deploy
- Clear browser cache and test again
- Verify CNAME file contains exactly: `www.voranex.ai`

---

## 🔒 Ongoing Security Maintenance

**Monthly:**
- Check domain lock is still enabled
- Verify 2FA is active

**Quarterly:**
- Review DNS records for unauthorized changes
- Check SSL certificate is renewing automatically

**Annually:**
- Renew domain before expiration
- Review and update contact information
- Audit security settings

---

## 📞 Need Help?

If you get stuck:
1. Check GoDaddy help: https://www.godaddy.com/help
2. Check GitHub Pages docs: https://docs.github.com/en/pages
3. DNS propagation checker: https://dnschecker.org

---

**Estimated Total Time:** 30-45 minutes
**DNS Propagation Time:** 10 minutes - 48 hours
**Full Setup Time:** Up to 48 hours for global propagation
