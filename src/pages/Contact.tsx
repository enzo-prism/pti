
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const Contact = () => {
  const { toast } = useToast();
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    toast({
      title: "Consultation Request Received",
      description: "We'll contact you within 1 business day to schedule your consultation.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      receiveSMS: false
    });
  };
  
  return (
    <Layout>
      <div className="pt-28 bg-gradient-to-b from-accent to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 animate-fade-in animate-delay-100">
              Schedule a complimentary consultation or reach out with any questions
              about dental practice transitions.
            </p>
          </div>
        </div>
      </div>

      <Section className="mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                ></textarea>
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
                <Button type="submit" className="w-full md:w-auto">
                  Schedule Consultation
                </Button>
              </div>
            </form>
          </div>
          
          <div className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm h-fit">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-primary mt-1 mr-4" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-primary mt-1 mr-4" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:info@practicetransitions.com" className="text-gray-600 hover:text-primary">
                    info@practicetransitions.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mt-1 mr-4" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-600">
                    Practice Transitions Institute<br />
                    3182 Campus Drive #274<br />
                    San Mateo, CA 94403
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-primary mt-1 mr-4" />
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 8:00 AM - 5:00 PM PST</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-medium mb-2">Response Time</h3>
              <p className="text-gray-600 mb-4">
                We respond to all inquiries within 1 business day. Consultation requests are typically 
                scheduled within 3-5 business days.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Contact;
