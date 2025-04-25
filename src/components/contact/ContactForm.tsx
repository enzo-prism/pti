
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";

// Get Supabase environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client only if URL and key are available
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    receiveSMS: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, receiveSMS: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Check if Supabase is configured
    if (!supabase) {
      toast({
        title: "Configuration Error",
        description: "Supabase is not properly configured. Please set the required environment variables.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          receive_sms: formData.receiveSMS
        }]);
        
      if (error) throw error;
      
      toast({
        title: "Thank you for reaching out!",
        description: "We'll respond to your inquiry within 24 hours or sooner.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        receiveSMS: false
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If Supabase is not configured, show an alternative form or message
  if (!supabase) {
    return (
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold mb-6">Request a Consultation</h2>
        <div className="p-6 border border-red-300 bg-red-50 rounded-lg">
          <p className="text-red-700 mb-4">
            <strong>⚠️ Configuration Required:</strong> Please configure Supabase environment variables.
          </p>
          <p className="text-gray-700">
            To enable the contact form, you need to set the following environment variables:
          </p>
          <ul className="list-disc ml-6 mt-2 mb-4 text-gray-700">
            <li>VITE_SUPABASE_URL</li>
            <li>VITE_SUPABASE_ANON_KEY</li>
          </ul>
          <p className="text-gray-700">
            In the meantime, please reach out to us directly via email or phone.
          </p>
        </div>
      </div>
    );
  }

  // Regular form when Supabase is configured
  return (
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-semibold mb-6">Request a Consultation</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. John Smith"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="youremail@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message or Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Please share any specific questions or details about your situation that would help us prepare for your consultation."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="receiveSMS"
            checked={formData.receiveSMS}
            onCheckedChange={handleSwitchChange}
          />
          <label
            htmlFor="receiveSMS"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I'm ok with receiving text messages from the PTI team
          </label>
        </div>
        
        <div>
          <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Schedule Consultation"}
          </Button>
        </div>
      </form>
    </div>
  );
};
