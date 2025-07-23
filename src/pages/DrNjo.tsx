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
        <Section className="py-8 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center min-h-[calc(100vh-4rem)] md:min-h-[80vh]">
            
            {/* Content */}
            <ScrollReveal direction="blur-in" delay={0}>
              <div className="space-y-6 md:space-y-8 order-2 md:order-1 max-w-2xl mx-auto md:mx-0">
                <div className="space-y-3 md:space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-center md:text-left">
                    Dr. Michael Njo
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light text-center md:text-left">
                    Dental Practice Transition Expert
                  </p>
                </div>
                
                <div className="h-px bg-gradient-to-r from-primary/20 via-primary to-primary/20 max-w-md mx-auto md:mx-0"></div>
                
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-center md:text-left max-w-xl mx-auto md:mx-0">
                  With over 30 years in clinical dentistry, Dr. Njo personally guides every practice transition with the expertise of a practicing dentist and the insights of a published author.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 justify-center md:justify-start">
                  <Button 
                    size="lg" 
                    className="font-medium min-h-[48px] text-base w-full sm:w-auto"
                    onClick={() => window.location.href = 'tel:+1-555-0123'}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="min-h-[48px] text-base w-full sm:w-auto"
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
              <div className="flex justify-center order-1 md:order-2">
                <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 xl:w-[400px]">
                  <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl"></div>
                  <div 
                    className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl overflow-hidden shadow-2xl"
                    style={{ aspectRatio: '4/5' }}
                  >
                    {/* Placeholder for Dr. Njo's photo */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xl sm:text-2xl font-bold text-primary">MN</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">Professional Photo</p>
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
      <Section background="light" className="py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="font-bold mb-4" style={{
                fontSize: 'clamp(1.875rem, 4vw, 2.5rem)'
              }}>
                Ready to Discuss Your Practice Transition?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                lineHeight: 'clamp(1.5, 1.6, 1.7)'
              }}>
                Schedule a confidential consultation to explore your options with personalized guidance from an experienced practitioner.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <ScrollReveal direction="elastic" delay={100}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Direct Phone</h3>
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                      Speak directly with Dr. Njo for immediate consultation
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full min-h-[44px] text-sm sm:text-base"
                      onClick={() => window.location.href = 'tel:+1-555-0123'}
                    >
                      (555) 012-3456
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal direction="elastic" delay={200}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-6 sm:p-8 text-center space-y-4 sm:space-y-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Email Consultation</h3>
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                      Send your questions for a detailed written response
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full min-h-[44px] text-sm sm:text-base"
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
      <Section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="morphing" delay={0}>
            <h2 className="font-bold mb-8 sm:mb-12" style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)'
            }}>
              Trusted Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              <div className="space-y-3 sm:space-y-4">
                <div className="font-bold text-primary" style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)'
                }}>30+</div>
                <p className="text-muted-foreground text-sm sm:text-base">Years in Clinical Dentistry</p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="font-bold text-primary" style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)'
                }}>1</div>
                <p className="text-muted-foreground text-sm sm:text-base">Published Handbook Author</p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="font-bold text-primary" style={{
                  fontSize: 'clamp(2rem, 5vw, 3rem)'
                }}>100+</div>
                <p className="text-muted-foreground text-sm sm:text-base">Successful Transitions</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
};

export default DrNjo;