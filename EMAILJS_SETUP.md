# EmailJS Setup Guide for Maia Technologies Contact Form

The contact form is now ready for EmailJS integration! Follow these steps to complete the setup:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service
1. In your EmailJS dashboard, click **"Add New Service"**
2. Choose **Gmail** (recommended) or your preferred email provider
3. Connect your email account (use info@maiatech.ai if possible)
4. Note down your **Service ID** (looks like: `service_xxxxxx`)

## Step 3: Create Email Template
1. Click **"Create New Template"**
2. Use this template content:

### Subject:
```
New Contact Form Submission from {{from_name}}
```

### Body:
```
New message from Maia Technologies website:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Inquiry Type: {{inquiry_type}}

Message:
{{message}}

---
This message was sent from the Maia Technologies contact form.
```

3. Save the template and note down your **Template ID** (looks like: `template_xxxxxx`)

## Step 4: Get Public Key
1. Go to **Account Settings** → **API Keys**
2. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxx`)

## Step 5: Update the Code
In `src/pages/Contact.tsx`, replace these placeholders around line 31-42:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',     // Replace with your Service ID
  'YOUR_TEMPLATE_ID',    // Replace with your Template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    company: formData.company,
    inquiry_type: formData.type,
    message: formData.message,
    to_name: 'Maia Technologies Team',
  },
  'YOUR_PUBLIC_KEY'      // Replace with your Public Key
);
```

## Step 6: Test the Form
1. Save the changes and restart your development server
2. Fill out the contact form on your website
3. Check your email inbox for the message

## Features Included:
- ✅ Form validation
- ✅ Loading states ("Sending..." button)
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ Professional email template
- ✅ All form fields included in email

## Troubleshooting:
- **403 Error**: Check that your Public Key is correct
- **No email received**: Check spam folder, verify template variables match
- **Network Error**: Ensure EmailJS service is connected properly

## Free Tier Limits:
- 200 emails per month (perfect for contact forms)
- If you need more, EmailJS has affordable paid plans

Your contact form will be fully functional once you complete these steps!

---

## Access Request Template (for AlphaAI and AlphaPoker)

The `AccessRequestModal` component (`src/components/AccessRequestModal.tsx`) submits to a dedicated EmailJS template separate from the contact form. Create this template in the EmailJS dashboard before the live launch.

### Template Variables (must match the `emailjs.send()` payload in code)

- `product_name`: "AlphaAI" or "AlphaPoker"
- `from_name`
- `company`
- `from_email`
- `city`
- `reason`

### Suggested Subject

```
New access request for {{product_name}} from {{from_name}}
```

### Suggested Body

```
New access request from the Maia Technologies website:

Product:   {{product_name}}
Name:      {{from_name}}
Company:   {{company}}
Email:     {{from_email}}
City:      {{city}}

Reason for request:
{{reason}}

This message was sent from the Request Access form on maiatech.ai.
```

### Recipient

The recipient (`support@maiatech.ai`) is configured on the EmailJS template, not in code.

### Wiring the Template ID

After creating the template, copy the Template ID and replace the placeholder constant `EMAILJS_ACCESS_TEMPLATE_ID` in `src/components/AccessRequestModal.tsx` (currently set to `'TEMPLATE_ID_FROM_TIM'`).