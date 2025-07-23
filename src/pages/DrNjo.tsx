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
      
      {/* Hero Section - Mobile First Design */}
      <div className="min-h-[100dvh] bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="min-h-[100dvh] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center py-8 lg:py-0">
            
            {/* Content - Mobile First */}
            <ScrollReveal direction="blur-in" delay={0}>
              <div className="lg:col-span-7 xl:col-span-6 2xl:col-span-6 order-2 lg:order-1 text-center lg:text-left space-y-6 md:space-y-8 lg:space-y-10">
                
                {/* Title Section */}
                <div className="space-y-4 lg:space-y-6">
                  <h1 className="font-bold leading-[1.1] text-foreground" style={{
                    fontSize: 'clamp(2.25rem, 8vw, 4.5rem)'
                  }}>
                    Dr. Michael Njo
                  </h1>
                  <p className="font-light text-muted-foreground" style={{
                    fontSize: 'clamp(1.125rem, 3vw, 2rem)'
                  }}>
                    Dental Practice Transition Expert
                  </p>
                </div>
                
                {/* Decorative Line */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent lg:from-primary/20 lg:via-primary lg:to-primary/20 max-w-md mx-auto lg:mx-0"></div>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  lineHeight: 'clamp(1.5, 1.6, 1.75)'
                }}>
                  With over 30 years in clinical dentistry, Dr. Njo personally guides every practice transition with the expertise of a practicing dentist and the insights of a published author.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button 
                    size="lg" 
                    className="font-medium min-h-[52px] px-8 text-base sm:text-lg flex-1 sm:flex-initial"
                    onClick={() => window.location.href = 'tel:+1-555-0123'}
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    Call Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="min-h-[52px] px-8 text-base sm:text-lg flex-1 sm:flex-initial"
                    onClick={() => window.location.href = 'mailto:dr.njo@practicetransitions.com'}
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    Send Email
                  </Button>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Photo Container - Mobile First */}
            <ScrollReveal direction="parallax" delay={200}>
              <div className="lg:col-span-5 xl:col-span-6 2xl:col-span-6 order-1 lg:order-2 flex justify-center lg:justify-end xl:justify-center 2xl:justify-end">
                <div className="relative" style={{
                  width: 'clamp(16rem, 35vw, 28rem)',
                  maxWidth: '28rem'
                }}>
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 lg:-inset-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-75"></div>
                  
                  {/* Photo Container */}
                  <div 
                    className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
                    style={{ 
                      aspectRatio: '4/5',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {/* Placeholder Content */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div 
                          className="mx-auto bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                          style={{
                            width: 'clamp(4rem, 8vw, 6rem)',
                            height: 'clamp(4rem, 8vw, 6rem)'
                          }}
                        >
                          <span 
                            className="font-bold text-primary"
                            style={{
                              fontSize: 'clamp(1.25rem, 3vw, 2rem)'
                            }}
                          >
                            MN
                          </span>
                        </div>
                        <p 
                          className="text-muted-foreground"
                          style={{
                            fontSize: 'clamp(0.75rem, 1.5vw, 1rem)'
                          }}
                        >
                          Professional Photo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
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