# Email Setup Guide
## Zoho Mail Free for voranex.ai

Complete guide to setting up professional email addresses using Zoho Mail's free plan.

---

## 📧 Email Addresses to Create

1. `info@voranex.ai` - General inquiries
2. `steveh@voranex.ai` - Steve's email
3. `bethx@voranex.ai` - Beth's email

---

## 🚀 PART 1: Sign Up for Zoho Mail

### Step 1: Create Zoho Account

1. Go to: https://www.zoho.com/mail/
2. Click **Sign Up Now** or **Get Started Free**
3. You'll see pricing plans - select **Forever Free Plan**:
   - Up to 5 users
   - 5 GB per user
   - 25 MB attachment limit
   - Web access only (no desktop/mobile apps on free plan)
4. Click **Sign Up** under Forever Free Plan

**Status:** ⬜ Zoho Account Created

---

### Step 2: Enter Your Domain

During signup, Zoho will ask for your domain:

1. Enter: `voranex.ai` (without www)
2. Choose your organization name: `Voranex`
3. Click **Add Domain**

**Status:** ⬜ Domain Added to Zoho

---

### Step 3: Create Admin Account

Zoho will ask you to create the first user (admin account):

1. Choose which email to make admin (recommend: `steveh@voranex.ai`)
2. Enter details:
   - **Email prefix:** `steveh`
   - **Password:** (create strong password - save it securely)
   - **First name:** Steve
   - **Last name:** H
3. Click **Create Account**

**Status:** ⬜ Admin Account Created

---

## 🔐 PART 2: Verify Domain Ownership

Zoho needs to verify you own voranex.ai before you can use it for email.

### Step 4: Choose Verification Method

Zoho will show verification options:

1. **CNAME Verification (RECOMMENDED)** - Easiest and safest
2. TXT Record Verification - Alternative method
3. HTML File Upload - Not recommended for GitHub Pages

Choose: **CNAME Method**

---

### Step 5: Get Your Verification CNAME Record

Zoho will provide a CNAME record like this:

```
Type: CNAME
Host: zb12345678 (unique code - yours will differ)
Points to: zmverify.zoho.com
```

**Copy this information** - you'll add it to GoDaddy next.

**Status:** ⬜ Verification Code Obtained

---

### Step 6: Add CNAME to GoDaddy DNS

1. Go to: https://dcc.godaddy.com/domains
2. Click on **voranex.ai**
3. Click **DNS** or **Manage DNS**
4. Scroll down and click **Add Record**
5. Enter the CNAME details from Zoho:
   ```
   Type: CNAME
   Name: zb12345678 (your unique code from Zoho)
   Value: zmverify.zoho.com
   TTL: 600 seconds (or 1 hour)
   ```
6. Click **Save**

**Status:** ⬜ Verification CNAME Added

---

### Step 7: Verify Domain in Zoho

1. Go back to Zoho setup page
2. Click **Verify by CNAME**
3. Wait 2-10 minutes for DNS propagation
4. Click **Verify** button
5. If it fails, wait another 10 minutes and try again

**Status:** ⬜ Domain Verified

---

## 📮 PART 3: Configure Email DNS Records (GoDaddy)

Now configure the DNS records so emails can be sent/received.

### Step 8: Get MX Records from Zoho

After verification, Zoho will show you MX records. They look like:

```
Priority 10: mx.zoho.com
Priority 20: mx2.zoho.com
Priority 50: mx3.zoho.com
```

**Keep this page open** - you'll need these values.

---

### Step 9: Delete Existing MX Records (if any)

**IMPORTANT:** Remove old MX records first to avoid conflicts.

1. In GoDaddy DNS management for voranex.ai
2. Look for any existing **MX** records
3. If you see any (like GoDaddy email forwarding), **delete them**
4. Click the trash icon next to each MX record
5. Confirm deletion

**Status:** ⬜ Old MX Records Removed

---

### Step 10: Add Zoho MX Records

Add three MX records to GoDaddy:

**MX Record 1:**
```
Type: MX
Name: @ (or leave blank for root domain)
Value: mx.zoho.com
Priority: 10
TTL: 1 Hour
```
Click **Save**

**MX Record 2:**
```
Type: MX
Name: @
Value: mx2.zoho.com
Priority: 20
TTL: 1 Hour
```
Click **Save**

**MX Record 3:**
```
Type: MX
Name: @
Value: mx3.zoho.com
Priority: 50
TTL: 1 Hour
```
Click **Save**

**Status:** ⬜ All 3 MX Records Added

---

### Step 11: Add SPF Record (Anti-Spam)

SPF (Sender Policy Framework) prevents email spoofing.

1. In GoDaddy DNS, click **Add Record**
2. Enter:
   ```
   Type: TXT
   Name: @ (or leave blank)
   Value: v=spf1 include:zoho.com ~all
   TTL: 1 Hour
   ```
3. Click **Save**

**Important:** If you already have an SPF record (starts with "v=spf1"), you need to **edit** it instead:
- Find existing TXT record with "v=spf1"
- Edit it to include: `include:zoho.com` before the "~all"
- Example: `v=spf1 include:zoho.com ~all`

**Status:** ⬜ SPF Record Added

---

### Step 12: Add DKIM Record (Email Authentication)

DKIM (DomainKeys Identified Mail) verifies email authenticity.

1. In Zoho, go to **Email Configuration** > **DKIM**
2. Zoho will generate a DKIM record like:
   ```
   Type: TXT
   Name: zmail._domainkey
   Value: v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3... (long string)
   ```
3. Copy this information
4. In GoDaddy DNS, click **Add Record**
5. Enter the DKIM details from Zoho:
   ```
   Type: TXT
   Name: zmail._domainkey
   Value: (paste the long DKIM value from Zoho)
   TTL: 1 Hour
   ```
6. Click **Save**

**Status:** ⬜ DKIM Record Added

---

### Step 13: Add DMARC Record (Email Policy)

DMARC (Domain-based Message Authentication) tells email servers what to do with suspicious emails.

1. In GoDaddy DNS, click **Add Record**
2. Enter:
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:info@voranex.ai
   TTL: 1 Hour
   ```
3. Click **Save**

**What this does:**
- `p=none` - Monitor only (good for starting out)
- `rua=mailto:info@voranex.ai` - Send reports to this email

**Status:** ⬜ DMARC Record Added

---

## 👥 PART 4: Create Additional Email Accounts

### Step 14: Access Zoho Admin Console

1. Log in to: https://mail.zoho.com
2. Use your admin account: `steveh@voranex.ai`
3. Click on **Admin Console** or **Organization** (top-right)
4. Go to **User Details** or **Users**

**Status:** ⬜ Admin Console Accessed

---

### Step 15: Create info@voranex.ai

1. Click **Add User** or **Create User**
2. Enter details:
   - **Email prefix:** `info`
   - **First name:** Info
   - **Last name:** Voranex
   - **Password:** (create strong password - save it securely)
3. Click **Create** or **Add**

**Status:** ⬜ info@voranex.ai Created

---

### Step 16: Create bethx@voranex.ai

1. Click **Add User** again
2. Enter details:
   - **Email prefix:** `bethx`
   - **First name:** Beth
   - **Last name:** X
   - **Password:** (create strong password - save it securely)
3. Click **Create** or **Add**

**Status:** ⬜ bethx@voranex.ai Created

---

## ✅ PART 5: Verify & Test Email Setup

### Step 17: Check DNS Propagation

Wait 10-30 minutes after adding DNS records, then verify:

1. Go to: https://mxtoolbox.com/SuperTool.aspx
2. Enter: `voranex.ai`
3. Select **MX Lookup**
4. Click **MX Lookup**
5. You should see 3 Zoho MX records:
   - mx.zoho.com (Priority 10)
   - mx2.zoho.com (Priority 20)
   - mx3.zoho.com (Priority 50)

**Status:** ⬜ MX Records Verified

---

### Step 18: Verify SPF Record

1. On MXToolbox, select **SPF Record Lookup**
2. Enter: `voranex.ai`
3. Click **SPF Record Lookup**
4. You should see: `v=spf1 include:zoho.com ~all`
5. Status should be green/passed

**Status:** ⬜ SPF Verified

---

### Step 19: Test Sending Email

1. Log in to https://mail.zoho.com
2. Log in as: `steveh@voranex.ai`
3. Click **Compose** or **New Mail**
4. Send a test email to your personal email (Gmail, Outlook, etc.)
5. Check if it arrives in inbox (not spam)
6. Reply to that email from your personal account
7. Check if reply arrives in Zoho inbox

**Status:** ⬜ Sending Email Works

---

### Step 20: Test All Three Accounts

Repeat Step 19 for each account:

1. Log in as `info@voranex.ai` - send/receive test email
2. Log in as `bethx@voranex.ai` - send/receive test email

**Status:** ⬜ All Accounts Tested

---

### Step 21: Check Email Deliverability Score

1. Go to: https://www.mail-tester.com
2. Send an email from `info@voranex.ai` to the address shown
3. Click **Check your score**
4. Aim for 8/10 or higher
5. Fix any issues shown

**Status:** ⬜ Deliverability Score Checked

---

## 📋 Complete DNS Records Summary

After setup, your GoDaddy DNS for voranex.ai should have:

### Website Records (Existing)
```
CNAME: www → stephen1hong.github.io
A: @ → 185.199.108.153
A: @ → 185.199.109.153
A: @ → 185.199.110.153
A: @ → 185.199.111.153
```

### Email Records (New)
```
MX: @ → mx.zoho.com (Priority 10)
MX: @ → mx2.zoho.com (Priority 20)
MX: @ → mx3.zoho.com (Priority 50)
TXT: @ → v=spf1 include:zoho.com ~all
TXT: zmail._domainkey → v=DKIM1; k=rsa; p=... (DKIM key)
TXT: _dmarc → v=DMARC1; p=none; rua=mailto:info@voranex.ai
```

### Verification Record (Can keep or delete after verification)
```
CNAME: zb12345678 → zmverify.zoho.com
```

---

## 🔐 PART 6: Secure Your Email Accounts

### Step 22: Enable Two-Factor Authentication (2FA)

For each email account:

1. Log in to https://mail.zoho.com
2. Click profile icon (top-right)
3. Go to **My Account** > **Security**
4. Enable **Two-Factor Authentication**
5. Choose method:
   - **Authenticator App** (RECOMMENDED - Authy, Google Authenticator)
   - SMS/Email backup
6. Save backup codes securely

Do this for:
- ⬜ steveh@voranex.ai (admin)
- ⬜ info@voranex.ai
- ⬜ bethx@voranex.ai

---

### Step 23: Set Up Email Forwarding (Optional)

If you want emails to `info@voranex.ai` to also go to Steve:

1. Log in as `info@voranex.ai`
2. Go to **Settings** > **Mail** > **Forwarding**
3. Add forwarding address: `steveh@voranex.ai`
4. Verify forwarding
5. Choose: Keep copy in inbox OR Delete after forwarding

**Status:** ⬜ Forwarding Configured (if desired)

---

### Step 24: Configure Email Signature

For professional emails, add signatures:

1. Log in to each account
2. Go to **Settings** > **Mail** > **Signature**
3. Create signature, example:
   ```
   Steve H
   Voranex.ai
   https://www.voranex.ai
   steveh@voranex.ai
   ```
4. Enable **Append signature to all outgoing emails**
5. Click **Save**

Do this for:
- ⬜ steveh@voranex.ai
- ⬜ info@voranex.ai
- ⬜ bethx@voranex.ai

---

## 📱 PART 7: Access Your Email

### Webmail (Always Available)
- URL: https://mail.zoho.com
- Works on any browser
- Mobile-friendly web interface

### Mobile Apps (Limitations on Free Plan)
Zoho Mail free plan has restrictions:
- **Android/iOS apps:** Limited functionality on free plan
- **IMAP/POP access:** Not available on free plan
- **Workaround:** Use mobile browser to access https://mail.zoho.com

### Desktop Apps
- Not available on free plan
- Use web browser to access https://mail.zoho.com

---

## 🆘 Troubleshooting

### "Domain verification failed"
- Wait 30-60 minutes for DNS propagation
- Check CNAME record is entered exactly as Zoho provided
- Use https://dnschecker.org to verify CNAME propagation

### "Cannot send emails"
- Verify MX records are added correctly
- Check SPF record exists
- Wait up to 24 hours for DNS propagation
- Check spam folder on recipient side

### "Emails going to spam"
- Add DKIM record if not done
- Add DMARC record if not done
- Check deliverability score at mail-tester.com
- Ask recipients to mark as "Not Spam"
- Takes time to build sender reputation

### "Cannot receive emails"
- Verify MX records using mxtoolbox.com
- Check priority values are correct (10, 20, 50)
- Wait up to 48 hours for global DNS propagation
- Send test email from multiple providers (Gmail, Outlook)

### "Forgot password"
- Go to https://accounts.zoho.com/signin
- Click **Forgot Password**
- Follow reset instructions
- Admin can reset any user's password from Admin Console

---

## 📊 Final Checklist

### Zoho Setup
- ⬜ Zoho account created
- ⬜ Domain added and verified
- ⬜ steveh@voranex.ai created (admin)
- ⬜ info@voranex.ai created
- ⬜ bethx@voranex.ai created

### DNS Configuration (GoDaddy)
- ⬜ Verification CNAME added
- ⬜ 3 MX records added
- ⬜ SPF (TXT) record added
- ⬜ DKIM (TXT) record added
- ⬜ DMARC (TXT) record added

### Testing
- ⬜ MX records verified (mxtoolbox.com)
- ⬜ SPF record verified
- ⬜ All 3 accounts can send email
- ⬜ All 3 accounts can receive email
- ⬜ Deliverability score 8+ (mail-tester.com)

### Security
- ⬜ 2FA enabled on all accounts
- ⬜ Strong passwords set
- ⬜ Email signatures configured
- ⬜ Forwarding set up (if needed)

---

## 🔄 Update Contact Form

### Step 25: Update Website Contact Form Email

Your contact form currently uses Web3Forms. You may want to:

1. Keep Web3Forms (it's already working)
2. OR update Web3Forms to forward to your new Zoho emails

To update Web3Forms settings:
1. Go to: https://web3forms.com
2. Log in to your account
3. Find your form with access key: `c32b6ad3-9447-4cb9-b115-de956dfc77dd`
4. Update email recipient to: `info@voranex.ai`
5. Save changes

**Status:** ⬜ Contact Form Email Updated

---

## 📞 Need Help?

**Zoho Support:**
- Help: https://help.zoho.com/portal/en/home
- Community: https://help.zoho.com/portal/community

**DNS Tools:**
- MX Lookup: https://mxtoolbox.com
- DNS Checker: https://dnschecker.org
- Email Tester: https://www.mail-tester.com

**GoDaddy Support:**
- Help: https://www.godaddy.com/help

---

## 📝 Important Notes

1. **Free Plan Limits:**
   - 5 users maximum
   - 5 GB storage per user
   - 25 MB attachment limit
   - No IMAP/POP access
   - Web interface only

2. **Email Best Practices:**
   - Don't send mass emails (spam)
   - Gradually build sending volume
   - Always include unsubscribe link for newsletters
   - Monitor deliverability score

3. **Backup:**
   - Regularly download important emails
   - Free plan has limited storage
   - Consider periodic exports

4. **Upgrading:**
   - If you need more features, upgrade to Zoho Mail Standard
   - Costs ~$1-3/user/month
   - Adds IMAP/POP, mobile apps, more storage

---

**Estimated Setup Time:** 45-60 minutes
**DNS Propagation Time:** 10 minutes - 48 hours
**Full Email Setup:** Up to 48 hours for global DNS propagation
