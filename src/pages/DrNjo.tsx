import SEO from "@/components/layout/SEO";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Calendar, MapPin } from "lucide-react";

const DrNjo = () => {
  return (
    <>
      <SEO 
        title="Dr. Michael Njo - Personal Consultation"
        description="Schedule a personal consultation with Dr. Michael Njo, leading dental practice transition expert with 30+ years of experience. Author, speaker, and trusted advisor."
        path="/drnjo"
      />
      
      {/* Hero Section */}
      <div className="min-h-screen flex items-center bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <Section className="py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
            
            {/* Content */}
            <ScrollReveal direction="blur-in" delay={0}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Dr. Michael Njo
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground font-light">
                    Dental Practice Transition Expert
                  </p>
                </div>
                
                <div className="h-px bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  With over 30 years in clinical dentistry, Dr. Njo personally guides every practice transition with the expertise of a practicing dentist and the insights of a published author.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="font-medium"
                    onClick={() => window.location.href = 'tel:+1-555-0123'}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.location.href = 'mailto:dr.njo@practicetransitions.com'}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Photo */}
            <ScrollReveal direction="parallax" delay={200}>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                  <div className="relative w-80 h-96 md:w-96 md:h-[480px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Placeholder for Dr. Njo's photo */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-24 h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">MN</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Professional Photo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Section>
      </div>

      {/* Contact Information */}
      <Section background="light" className="py-20">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Discuss Your Practice Transition?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Schedule a confidential consultation to explore your options with personalized guidance from an experienced practitioner.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal direction="elastic" delay={100}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Direct Phone</h3>
                    <p className="text-muted-foreground mb-4">
                      Speak directly with Dr. Njo for immediate consultation
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = 'tel:+1-555-0123'}
                    >
                      (555) 012-3456
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal direction="elastic" delay={200}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Consultation</h3>
                    <p className="text-muted-foreground mb-4">
                      Send your questions for a detailed written response
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.location.href = 'mailto:dr.njo@practicetransitions.com'}
                    >
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Credentials */}
      <Section className="py-20">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal direction="morphing" delay={0}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Trusted Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary">30+</div>
                <p className="text-muted-foreground">Years in Clinical Dentistry</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary">1</div>
                <p className="text-muted-foreground">Published Handbook Author</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-primary">100+</div>
                <p className="text-muted-foreground">Successful Transitions</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
};

export default DrNjo;