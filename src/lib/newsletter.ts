// Newsletter service for handling email subscriptions
import { emailService } from './emailService';
import { demoEmailService } from './demoEmailService';

export interface NewsletterSubscription {
  email: string;
  timestamp: Date;
  source: string; // where they subscribed from
}

// Mock storage using localStorage for demo purposes
const STORAGE_KEY = 'newsletter_subscriptions';

export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(email: string, source: string = 'footer'): Promise<boolean> {
    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email address');
      }

      // Check if already subscribed
      const existingSubscriptions = this.getSubscriptions();
      const isAlreadySubscribed = existingSubscriptions.some(sub => sub.email === email);

      if (isAlreadySubscribed) {
        throw new Error('Email already subscribed');
      }

      // Create new subscription
      const subscription: NewsletterSubscription = {
        email,
        timestamp: new Date(),
        source
      };

      // Store subscription (in real app, this would be sent to your backend)
      const subscriptions = [...existingSubscriptions, subscription];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));

      // Send confirmation email using Web3Forms
      try {
        await demoEmailService.sendNewsletterConfirmation(email);
        console.log('✅ Real confirmation email sent successfully via Web3Forms!');
      } catch (emailError) {
        console.warn('⚠️ Failed to send confirmation email, but subscription was saved:', emailError);
        console.log('📧 Falling back to email simulation...');
        try {
          await demoEmailService.simulateEmail(email);
          console.log('Demo confirmation email sent successfully');
        } catch (demoError) {
          console.error('Both real and demo email services failed:', demoError);
        }
      }

      return true;
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      throw error;
    }
  },

  // Get all subscriptions (for admin purposes)
  getSubscriptions(): NewsletterSubscription[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  // Check if email is subscribed
  isSubscribed(email: string): boolean {
    const subscriptions = this.getSubscriptions();
    return subscriptions.some(sub => sub.email === email);
  },

  // Unsubscribe (for future use)
  async unsubscribe(email: string): Promise<boolean> {
    try {
      const subscriptions = this.getSubscriptions();
      const filtered = subscriptions.filter(sub => sub.email !== email);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  }
};

// Example integration with popular email services:
/*
// Mailchimp integration example:
export const mailchimpService = {
  async subscribe(email: string) {
    const response = await fetch('/api/mailchimp/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.ok;
  }
};

// EmailJS integration example:
export const emailJSService = {
  async sendConfirmation(email: string) {
    // EmailJS configuration would go here
    // This sends emails directly from the frontend
  }
};

// ConvertKit integration example:
export const convertKitService = {
  async subscribe(email: string) {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email
      })
    });
    return response.ok;
  }
};
*/
