
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/constants";

export const ContactInfo = () => {
  return (
    <div className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-lg border border-gray-100 shadow-sm h-fit">
      <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <Phone className="w-5 h-5 text-primary mt-1 mr-4" />
          <div>
            <h3 className="font-medium">Phone</h3>
            <p className="text-gray-600">{PHONE_NUMBER}</p>
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
          We respond to all inquiries within 24 hours or sooner. Your practice transition 
          needs are important to us, and we're committed to providing prompt, 
          professional assistance.
        </p>
      </div>
    </div>
  );
};
