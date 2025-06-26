# EmailJS Setup Guide

This project uses EmailJS to handle form submissions. Follow these steps to set up email functionality:

## 1. Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Verify your email address

## 2. Set up Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## 3. Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Design your email template using these variables:

    - `{{from_name}}` - sender's name
    - `{{from_email}}` - sender's email
    - `{{from_phone}}` - sender's phone
    - `{{subject}}` - email subject
    - `{{message}}` - email message content
    - `{{car_type}}` - for rental forms
    - `{{date_from}}` - for rental forms
    - `{{date_to}}` - for rental forms
    - `{{purpose}}` - for rental forms
    - `{{location}}` - for rental forms
    - `{{inquiry_type}}` - for contact forms

4. Save the template and note down your **Template ID**

## 4. Get Public Key

1. Go to **Account** settings
2. Find your **Public Key** in the API Keys section

## 5. Environment Variables

Create a `.env.local` file in your project root with these variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual EmailJS credentials.

## 6. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to any form on your website
3. Fill out and submit a form
4. Check if you receive the email

## Troubleshooting

-   Make sure your environment variables are correctly set
-   Check the browser console for any error messages
-   Verify that your EmailJS service is properly configured
-   Ensure your email template uses the correct variable names

## Forms with Email Integration

The following forms now have email functionality:

-   **Rental Form** (`/components/rental-form.tsx`) - Used on rental and wedding pages
-   **Contact Form** (`/app/kontakt/page.tsx`) - Contact page
-   **Sale Inquiry Form** (`/app/prodej/page.tsx`) - Sale page

All forms include:

-   Form validation with Zod schemas
-   Loading states during submission
-   Success/error messages
-   Proper error handling
