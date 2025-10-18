import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

export interface IContactForm {
  __component: "blocks.contact-form";
  id: number;
  heading: string;
  subheading?: string;
  buttonText?: string;
  showPhone?: boolean;
  showMessage?: boolean;
}

export function ContactForm(props: IContactForm) {
  const { 
    heading = "Get Pre-Approved Today", 
    subheading = "Take the first step towards your dream home. Get pre-approved in minutes with our quick and easy process.",
    buttonText = "Get Pre-Approved Now",
    showPhone = true,
    showMessage = true
  } = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyValue: "",
    downPayment: "",
    employmentStatus: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Strapi API
      const response = await fetch('http://localhost:1337/api/form-submissions/public', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType: 'pre-approval',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Form submitted successfully:", data);
        setIsSuccess(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({ 
            name: "", 
            email: "", 
            phone: "", 
            message: "", 
            propertyValue: "", 
            downPayment: "", 
            employmentStatus: "" 
          });
          setIsSuccess(false);
        }, 3000);
      } else {
        console.error("Form submission failed:", data);
        alert("There was an error submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact-form-section" className="py-20 bg-gradient-to-br from-blue-50 to-slate-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                {heading}
              </CardTitle>
              {subheading && (
                <CardDescription className="text-lg text-slate-600">
                  {subheading}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-slate-600">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  {showPhone && (
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-slate-700">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(416) 555-0123"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="h-12"
                      />
                    </div>
                  )}

                  {/* Mortgage-Specific Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Property Value */}
                    <div className="space-y-2">
                      <Label htmlFor="propertyValue" className="text-slate-700">
                        Estimated Property Value
                      </Label>
                      <Input
                        id="propertyValue"
                        name="propertyValue"
                        type="text"
                        placeholder="$500,000 - $1,000,000"
                        value={formData.propertyValue}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>

                    {/* Down Payment */}
                    <div className="space-y-2">
                      <Label htmlFor="downPayment" className="text-slate-700">
                        Down Payment Amount
                      </Label>
                      <Input
                        id="downPayment"
                        name="downPayment"
                        type="text"
                        placeholder="$50,000 - $100,000"
                        value={formData.downPayment}
                        onChange={handleChange}
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Employment Status */}
                  <div className="space-y-2">
                    <Label htmlFor="employmentStatus" className="text-slate-700">
                      Employment Status
                    </Label>
                    <select
                      id="employmentStatus"
                      name="employmentStatus"
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      className="w-full h-12 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select your employment status</option>
                      <option value="employed">Employed (Full-time)</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="contract">Contract Worker</option>
                      <option value="retired">Retired</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  {showMessage && (
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-700">
                        How can we help you?
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us about your home buying goals, timeline, preferred neighborhoods, or any specific mortgage questions..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="resize-none"
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      buttonText
                    )}
                  </Button>

                  <p className="text-center text-sm text-slate-500">
                    By submitting this form, you agree to our{" "}
                    <a href="/pages/privacy-policy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                    . We'll contact you within 24 hours.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Licensed Agent</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">24-Hour Response</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">No Cost to You</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

