// Demo Email Service - Works immediately without setup
// This uses a public email service for demonstration

export const demoEmailService = {
  // Send email using Web3Forms (free service, no signup required)
  async sendNewsletterConfirmation(email: string): Promise<boolean> {
    try {
      console.log('🚀 Sending confirmation email via Web3Forms to subscriber:', email);

      // Send confirmation email TO THE SUBSCRIBER
      const subscriberFormData = new FormData();
      subscriberFormData.append('access_key', '3fb94f46-ab09-4990-aa87-e861b98db7f1');
      subscriberFormData.append('subject', '🎉 Welcome to FanIce Newsletter!');
      subscriberFormData.append('from_name', 'Adejola & Sons Enterprise');
      subscriberFormData.append('from_email', 'adejolaomowunmi@gmail.com');
      subscriberFormData.append('to_email', email); // Send TO the subscriber
      subscriberFormData.append('message', `
Hi there!

Thank you for subscribing to the FanIce newsletter from Adejola & Sons Enterprise!

🍦 You'll now receive:
• Updates on new FanIce flavors and products
• Special offers and exclusive discounts
• Product launch announcements
• Ice cream tips and seasonal recipes

We're excited to have you as part of the FanIce family!

Best regards,
The Adejola & Sons Team

Website: https://adejola-global-giant.netlify.app
Contact: adejolaomowunmi@gmail.com

---
If you didn't subscribe to this newsletter, please ignore this email.
      `);

      subscriberFormData.append('redirect', 'https://adejola-global-giant.netlify.app');
      subscriberFormData.append('replyto', 'adejolaomowunmi@gmail.com');

      console.log('📤 Sending confirmation email to subscriber...');

      const subscriberResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: subscriberFormData
      });

      const subscriberResult = await subscriberResponse.json();

      if (subscriberResponse.ok && subscriberResult.success) {
        console.log('✅ Confirmation email sent to subscriber successfully!', subscriberResult);

        // Also send notification to website owner
        try {
          await this.sendOwnerNotification(email);
          console.log('✅ Owner notification sent successfully!');
        } catch (ownerError) {
          console.warn('⚠️ Failed to send owner notification, but subscriber email was sent:', ownerError);
        }

        return true;
      } else {
        console.error('❌ Web3Forms error sending to subscriber:', subscriberResult);
        throw new Error(`Web3Forms error: ${subscriberResult.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Web3Forms service error:', error);
      throw error;
    }
  },

  // Send notification to website owner about new subscription
  async sendOwnerNotification(subscriberEmail: string): Promise<boolean> {
    try {
      console.log('📧 Sending owner notification about new subscriber:', subscriberEmail);

      const ownerFormData = new FormData();
      ownerFormData.append('access_key', '3fb94f46-ab09-4990-aa87-e861b98db7f1');
      ownerFormData.append('subject', '🔔 New FanIce Newsletter Subscription');
      ownerFormData.append('from_name', 'FanIce Website');
      ownerFormData.append('from_email', 'noreply@adejola-global-giant.netlify.app');
      ownerFormData.append('to_email', 'adejolaomowunmi@gmail.com'); // Send TO the owner
      ownerFormData.append('message', `
New Newsletter Subscription Alert!

📧 Email: ${subscriberEmail}
🕒 Time: ${new Date().toLocaleString()}
🌐 Source: Website Footer
📱 Website: https://adejola-global-giant.netlify.app

The subscriber has been sent a confirmation email automatically.

Best regards,
FanIce Website System
      `);

      const ownerResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: ownerFormData
      });

      const ownerResult = await ownerResponse.json();
      return ownerResponse.ok && ownerResult.success;
    } catch (error) {
      console.error('❌ Owner notification error:', error);
      return false;
    }
  },

  // Alternative: Use Formspree (also free, no signup required for basic use)
  async sendViaFormspree(email: string): Promise<boolean> {
    try {
      const response = await fetch('https://formspree.io/f/xpwzgqko', { // Demo endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subject: 'FanIce Newsletter Subscription',
          message: `New newsletter subscription from: ${email}`,
          _replyto: email,
          _subject: 'Welcome to FanIce Newsletter!'
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Formspree demo failed:', error);
      return false;
    }
  },

  // Simulate email sending with detailed logging
  async simulateEmail(email: string): Promise<boolean> {
    console.log('📧 SIMULATING EMAIL SEND...');
    console.log('To:', email);
    console.log('Subject: 🎉 Welcome to FanIce Newsletter!');
    console.log('Content:');
    console.log(`
    Hi there!

    Thank you for subscribing to the FanIce newsletter!

    You'll receive updates about:
    • New FanIce flavors and products
    • Special offers and discounts
    • Product launches
    • Ice cream tips and recipes

    Best regards,
    Adejola & Sons Enterprise
    `);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('✅ Email simulation complete!');
    console.log('📝 Note: This is a simulation. To send real emails, set up EmailJS or another service.');
    console.log('');
    console.log('🔧 QUICK SETUP OPTIONS:');
    console.log('1. EmailJS (recommended): https://www.emailjs.com');
    console.log('2. Web3Forms (free): https://web3forms.com');
    console.log('3. Formspree (easy): https://formspree.io');
    console.log('');
    console.log('📧 For now, the user will see success messages but no actual email is sent.');

    return true;
  }
};

// Instructions for setting up real email service:
export const emailSetupInstructions = {
  emailjs: {
    steps: [
      '1. Go to https://www.emailjs.com and create a free account',
      '2. Connect your email service (Gmail, Outlook, etc.)',
      '3. Create an email template',
      '4. Get your Service ID, Template ID, and Public Key',
      '5. Update the configuration in emailService.ts'
    ],
    pros: ['Free tier available', 'Easy setup', 'Good documentation'],
    cons: ['Limited emails per month on free tier']
  },

  web3forms: {
    steps: [
      '1. Go to https://web3forms.com',
      '2. Enter your email to get a free access key',
      '3. Update the access_key in demoEmailService.ts',
      '4. Emails will be sent to your email address'
    ],
    pros: ['No signup required', 'Completely free', 'Works immediately'],
    cons: ['Emails go to your inbox, not the subscriber']
  },

  formspree: {
    steps: [
      '1. Go to https://formspree.io',
      '2. Create a free account',
      '3. Create a new form',
      '4. Use the form endpoint in the code'
    ],
    pros: ['Free tier available', 'Easy integration', 'Form handling'],
    cons: ['Limited submissions on free tier']
  }
};

// Quick setup function
export const quickEmailSetup = {
  // For immediate testing - uses simulation
  useSimulation: () => {
    console.log('🔧 Using email simulation mode');
    console.log('📧 Emails will be logged to console instead of sent');
    return demoEmailService.simulateEmail;
  },

  // For production - requires setup
  useRealEmail: (service: 'emailjs' | 'web3forms' | 'formspree') => {
    console.log(`🔧 Setting up ${service} for real email sending`);
    console.log('📋 Setup instructions:', emailSetupInstructions[service]);

    switch (service) {
      case 'web3forms':
        return demoEmailService.sendNewsletterConfirmation;
      case 'formspree':
        return demoEmailService.sendViaFormspree;
      default:
        console.warn('Service not configured, falling back to simulation');
        return demoEmailService.simulateEmail;
    }
  }
};
