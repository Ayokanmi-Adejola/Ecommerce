// Email Test Component - For debugging email functionality
import { useState } from "react";
import { emailService } from "@/lib/emailService";
import { demoEmailService } from "@/lib/demoEmailService";
import { toast } from "sonner";

const EmailTest = () => {
  const [testEmail, setTestEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const testEmailService = async () => {
    if (!testEmail) {
      toast.error("Please enter an email address");
      return;
    }

    setIsLoading(true);
    console.log("🧪 Starting Web3Forms email test...");

    try {
      // Test Web3Forms email sending
      console.log("📧 Testing Web3Forms email sending...");
      await demoEmailService.sendNewsletterConfirmation(testEmail);

      toast.success("✅ Test email sent successfully via Web3Forms! Check your inbox and console for details.");
    } catch (error: any) {
      console.error("❌ Web3Forms test failed:", error);

      if (error.message.includes('access_key')) {
        toast.error("❌ Web3Forms access key needed. Get a free key from web3forms.com");
      } else {
        toast.error(`❌ Email test failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testEmailJS = async () => {
    if (!testEmail) {
      toast.error("Please enter an email address");
      return;
    }

    setIsLoading(true);
    console.log("🧪 Starting EmailJS test...");

    try {
      // Test EmailJS initialization
      console.log("🔧 Testing EmailJS initialization...");
      emailService.init();

      // Test email sending
      console.log("📧 Testing EmailJS email sending...");
      await emailService.sendNewsletterConfirmation(testEmail);

      toast.success("✅ EmailJS test email sent successfully! Check your inbox and console for details.");
    } catch (error: any) {
      console.error("❌ EmailJS test failed:", error);

      if (error.status === 400) {
        toast.error("❌ EmailJS configuration error. Check your Service ID, Template ID, or Public Key.");
      } else if (error.status === 401) {
        toast.error("❌ EmailJS authentication failed. Check your Public Key.");
      } else if (error.status === 404) {
        toast.error("❌ EmailJS service or template not found. Check your Service ID and Template ID.");
      } else {
        toast.error(`❌ EmailJS test failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const checkEmailJSStatus = () => {
    console.log("🔍 EmailJS Configuration Check:");
    console.log("Service ID:", "service_febjnwn");
    console.log("Template ID:", "template_lqiba8e");
    console.log("Public Key:", "G6ImXUSTEP6Jy6pHA");
    console.log("");
    console.log("🔗 Troubleshooting Steps:");
    console.log("1. Verify your EmailJS account is active");
    console.log("2. Check that the service is connected to an email provider");
    console.log("3. Ensure the template exists and is published");
    console.log("4. Verify the public key is correct");
    console.log("5. Check EmailJS dashboard for any error logs");

    toast.info("Check the console for detailed configuration info");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📧 Email Service Test</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Email Address:
          </label>
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Enter your email to test"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={testEmailService}
            disabled={isLoading}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "🚀 Test Web3Forms"}
          </button>

          <button
            onClick={testEmailJS}
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "📧 Test EmailJS"}
          </button>

          <button
            onClick={checkEmailJSStatus}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
          >
            🔍 Check Config
          </button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">🌐 Web3Forms Setup (Recommended):</h3>
        <ol className="text-green-700 text-sm space-y-1">
          <li>1. Go to <a href="https://web3forms.com" target="_blank" className="underline">web3forms.com</a></li>
          <li>2. Enter your email to get a free access key</li>
          <li>3. Replace 'YOUR_WEB3FORMS_ACCESS_KEY' in the code</li>
          <li>4. Emails will be sent to subscribers immediately!</li>
        </ol>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">📧 EmailJS Configuration:</h3>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li><strong>Service ID:</strong> service_febjnwn</li>
          <li><strong>Template ID:</strong> template_lqiba8e</li>
          <li><strong>Public Key:</strong> G6ImXUSTEP6Jy6pHA</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">🔧 Troubleshooting:</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Check browser console for detailed error messages</li>
          <li>• Verify EmailJS service is connected to Gmail/Outlook</li>
          <li>• Ensure template variables match the code</li>
          <li>• Check EmailJS dashboard for usage limits</li>
          <li>• Try sending from EmailJS dashboard first</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">✅ Template Variables Needed:</h3>
        <div className="text-green-700 text-sm grid grid-cols-2 gap-2">
          <div>• {{to_email}}</div>
          <div>• {{to_name}}</div>
          <div>• {{from_name}}</div>
          <div>• {{subject}}</div>
          <div>• {{message}}</div>
          <div>• {{company_name}}</div>
          <div>• {{website}}</div>
          <div>• {{unsubscribe_link}}</div>
        </div>
      </div>
    </div>
  );
};

export default EmailTest;
