// Email service using EmailJS to send actual emails
import emailjs from '@emailjs/browser';

// EmailJS configuration
// You'll need to set up a free EmailJS account at https://www.emailjs.com/
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_febjnwn', // Your EmailJS service ID
  TEMPLATE_ID: 'template_lqiba8e', // Your EmailJS template ID
  PUBLIC_KEY: 'G6ImXUSTEP6Jy6pHA', // Your EmailJS public key
};

export interface EmailData {
  to_email: string;
  to_name?: string;
  from_name: string;
  subject: string;
  message: string;
}

export const emailService = {
  // Initialize EmailJS (call this once in your app)
  init() {
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('✅ EmailJS initialized successfully with public key:', EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('📧 Service ID:', EMAILJS_CONFIG.SERVICE_ID);
      console.log('📝 Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
    } catch (error) {
      console.error('❌ Failed to initialize EmailJS:', error);
    }
  },

  // Send newsletter confirmation email
  async sendNewsletterConfirmation(email: string): Promise<boolean> {
    try {
      console.log('🚀 Attempting to send email to:', email);
      console.log('📧 Using service:', EMAILJS_CONFIG.SERVICE_ID);
      console.log('📝 Using template:', EMAILJS_CONFIG.TEMPLATE_ID);

      const templateParams = {
        to_email: email,
        to_name: email.split('@')[0], // Use part before @ as name
        from_name: 'Adejola & Sons Enterprise',
        subject: '🎉 Welcome to FanIce Newsletter!',
        message: `
Thank you for subscribing to our newsletter!

You'll now receive:
• Updates on new FanIce flavors
• Special offers and discounts
• Exclusive product launches
• Ice cream tips and recipes

We're excited to have you as part of the FanIce family!

Best regards,
The Adejola & Sons Team

---
If you didn't subscribe to this newsletter, please ignore this email.
        `.trim(),
        company_name: 'Adejola & Sons Enterprise',
        website: 'https://adejola-global-giant.netlify.app',
        unsubscribe_link: 'https://adejola-global-giant.netlify.app/unsubscribe'
      };

      console.log('📤 Sending email with params:', templateParams);

      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      console.log('✅ Email sent successfully! Response:', response);
      console.log('📬 Status:', response.status);
      console.log('📝 Text:', response.text);
      return true;
    } catch (error) {
      console.error('❌ Failed to send email. Full error:', error);
      console.error('❌ Error details:', {
        name: error.name,
        message: error.message,
        status: error.status,
        text: error.text
      });
      throw error;
    }
  },

  // Send custom email
  async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        emailData
      );

      console.log('Email sent successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  },

  // Test email functionality
  async testEmail(): Promise<boolean> {
    try {
      await this.sendNewsletterConfirmation('test@example.com');
      return true;
    } catch (error) {
      console.error('Email test failed:', error);
      return false;
    }
  }
};

// Alternative: Simple email service using Formspree (no signup required)
export const formspreeService = {
  async sendNewsletterConfirmation(email: string): Promise<boolean> {
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subject: 'Newsletter Subscription Confirmation',
          message: `Thank you for subscribing to FanIce newsletter! You'll receive updates about our latest products and offers.`,
          _replyto: email,
          _subject: 'Welcome to FanIce Newsletter!'
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Formspree email failed:', error);
      return false;
    }
  }
};

// Instructions for setting up EmailJS:
/*
1. Go to https://www.emailjs.com/ and create a free account
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - {{to_email}}
   - {{to_name}}
   - {{from_name}}
   - {{subject}}
   - {{message}}
   - {{company_name}}
   - {{website}}
   - {{unsubscribe_link}}
4. Get your Service ID, Template ID, and Public Key
5. Replace the values in EMAILJS_CONFIG above
6. The emails will be sent from your connected email account

Template example:
Subject: {{subject}}

Hi {{to_name}},

{{message}}

Visit our website: {{website}}

Best regards,
{{from_name}}

Unsubscribe: {{unsubscribe_link}}
*/
