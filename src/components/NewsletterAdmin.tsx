// Newsletter Admin Component - For demonstration purposes
// This shows how you could view newsletter subscriptions
// In a real app, this would be protected by authentication

import { useState, useEffect } from "react";
import { newsletterService, NewsletterSubscription } from "@/lib/newsletter";
import { Mail, Calendar, MapPin, Download } from "lucide-react";

const NewsletterAdmin = () => {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);

  useEffect(() => {
    // Load subscriptions on component mount
    const loadSubscriptions = () => {
      const subs = newsletterService.getSubscriptions();
      setSubscriptions(subs);
    };

    loadSubscriptions();
    
    // Refresh every 5 seconds to show new subscriptions
    const interval = setInterval(loadSubscriptions, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const exportToCSV = () => {
    if (subscriptions.length === 0) {
      alert("No subscriptions to export");
      return;
    }

    const csvContent = [
      "Email,Date Subscribed,Source",
      ...subscriptions.map(sub => 
        `${sub.email},${sub.timestamp.toISOString()},${sub.source}`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearAllSubscriptions = () => {
    if (window.confirm("Are you sure you want to clear all subscriptions? This cannot be undone.")) {
      localStorage.removeItem('newsletter_subscriptions');
      setSubscriptions([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Newsletter Subscriptions</h2>
        <div className="flex gap-2">
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={clearAllSubscriptions}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">
          <strong>Total Subscriptions:</strong> {subscriptions.length}
        </p>
        <p className="text-blue-600 text-sm mt-1">
          This is a demo implementation using localStorage. In production, you'd use a real database and authentication.
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">No newsletter subscriptions yet</p>
          <p className="text-sm">Subscriptions will appear here when users sign up</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Date Subscribed</th>
                <th className="border border-gray-200 px-4 py-2 text-left">Source</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {subscription.email}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(subscription.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="capitalize">{subscription.source}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Integration Notes:</h3>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• In production, integrate with Mailchimp, ConvertKit, or similar services</li>
          <li>• Add email validation and confirmation emails</li>
          <li>• Implement proper authentication for this admin panel</li>
          <li>• Store subscriptions in a secure database</li>
          <li>• Add unsubscribe functionality with unique tokens</li>
        </ul>
      </div>
    </div>
  );
};

export default NewsletterAdmin;
