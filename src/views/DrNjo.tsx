"use client";

import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Section, SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { DrNjoPhotoCard } from "@/components/DrNjoPhotoCard";
import {
  drNjoLeadershipCommunityImages,
  drNjoRelationshipImages,
  drNjoSpeakingAuthorshipImages,
} from "@/data/drNjoGallery";
import { PHONE_NUMBER, PHONE_NUMBER_TEL } from "@/lib/constants";

const [
  bluePrintFlyer,
  publicationSpread,
  handbookCoverSpread,
  backstageQuote,
] = drNjoSpeakingAuthorshipImages;

const [
  communityGroupPhoto,
  strategyMeetingPhoto,
  mayflowerTrio,
  officeSelfieGroup,
  blackTieMedalPortrait,
] = drNjoLeadershipCommunityImages;

const DrNjo = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center py-12 md:py-16">
            <div className="text-center md:text-left space-y-6 md:space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  Dr. Michael Njo
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-light text-muted-foreground">
                  Dental Practice Transition Expert
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent md:from-primary/20 md:via-primary md:to-primary/20 max-w-md mx-auto md:mx-0" />

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0">
                With over 30 years in clinical dentistry, Dr. Njo personally
                guides every practice transition with the expertise of a
                practicing dentist, the perspective of a published author, and
                the trust built through decades of leadership across the dental
                community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Button
                  size="lg"
                  className="font-medium px-8 text-base"
                  onClick={() => window.location.href = `tel:${PHONE_NUMBER_TEL}`}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 text-base"
                  onClick={() => window.location.href = "mailto:dentalstrategies@gmail.com"}
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Send Email
                </Button>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="relative w-72 sm:w-80 md:w-72 lg:w-80 xl:w-96">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-75" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src="/lovable-uploads/7f7f714e-f3e5-4943-a190-b0a9ed982709.png"
                    alt="Dr. Michael Njo - Dental Practice Transition Expert"
                    fill
                    sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 640px) 288px, 256px"
                    className="object-cover object-top"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section background="light" className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-8 lg:gap-12 items-start">
          <ScrollReveal direction="up" delay={0}>
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                Speaking & Authorship
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-foreground">
                A public body of work built around education, clarity, and trust.
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Dr. Njo&apos;s authority is grounded in practical education. He
                speaks with dentists and residents about contracts, ownership,
                transitions, and long-term practice planning, and he has
                translated that experience into published resources that make
                complex decisions easier to understand.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                These materials and moments show a consistent pattern: he teaches
                from lived experience, communicates clearly, and helps dentists
                make high-stakes career decisions with more confidence.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-sm font-semibold text-foreground">Published author</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Wrote the <em>Dental Practice Transitions Handbook</em>.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-sm font-semibold text-foreground">Frequent educator</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Speaks with residents, students, and doctors about ownership decisions.
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <p className="text-sm font-semibold text-foreground">Trusted voice</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Recognized publicly for pairing clinical credibility with practical guidance.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100}>
            <div className="grid gap-4 sm:grid-cols-2">
              <DrNjoPhotoCard
                image={handbookCoverSpread}
                className="sm:col-span-2"
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
              <DrNjoPhotoCard
                image={publicationSpread}
                sizes="(min-width: 1024px) 20vw, 100vw"
              />
              <DrNjoPhotoCard
                image={bluePrintFlyer}
                sizes="(min-width: 1024px) 20vw, 100vw"
              />
              <DrNjoPhotoCard
                image={backstageQuote}
                className="sm:col-span-2"
                sizes="(min-width: 1024px) 44vw, 100vw"
              />
            </div>
          </ScrollReveal>
        </div>
      </Section>

      <Section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="max-w-3xl mb-8 sm:mb-10">
              <SectionTitle className="mb-4">Leadership & Community</SectionTitle>
              <SectionSubtitle className="mb-0">
                Dr. Njo&apos;s work reaches beyond a single transaction. He teaches,
                mentors, collaborates, and stays active in the relationships that
                shape the profession.
              </SectionSubtitle>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <ScrollReveal direction="scale" delay={80} intensity="subtle">
              <DrNjoPhotoCard
                image={officeSelfieGroup}
                priority
                sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 44vw, 100vw"
              />
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {[communityGroupPhoto, strategyMeetingPhoto, mayflowerTrio, blackTieMedalPortrait].map(
                (image, index) => (
                  <ScrollReveal
                    key={image.id}
                    direction="scale"
                    delay={140 + index * 80}
                    intensity="subtle"
                  >
                    <DrNjoPhotoCard
                      image={image}
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 44vw, 100vw"
                    />
                  </ScrollReveal>
                )
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section background="light" className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="max-w-3xl mb-8 sm:mb-10">
              <SectionTitle className="mb-4">Relationships Built Over Time</SectionTitle>
              <SectionSubtitle className="mb-0">
                These photos stay intentionally lower-emphasis. They are here to
                show the human side of trust, friendship, and long-view
                professional relationships without pulling focus from the work
                itself.
              </SectionSubtitle>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {drNjoRelationshipImages.map((image, index) => (
              <ScrollReveal
                key={image.id}
                direction="scale"
                delay={100 + index * 80}
                intensity="subtle"
              >
                <DrNjoPhotoCard
                  image={image}
                  sizes="(min-width: 1024px) 28vw, 100vw"
                  frameClassName="bg-white/90"
                  captionClassName="text-gray-500"
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      <Section background="light" className="py-12 sm:py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Ready to Discuss Your Practice Transition?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Schedule a confidential consultation to explore your options with
                personalized guidance from an experienced practitioner.
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
                      onClick={() => window.location.href = `tel:${PHONE_NUMBER_TEL}`}
                    >
                      {PHONE_NUMBER}
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
                      onClick={() => window.location.href = "mailto:dentalstrategies@gmail.com"}
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

      <Section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal direction="morphing" delay={0}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12">
              Trusted Expertise
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
              <div className="space-y-3 sm:space-y-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">30+</div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Years in Clinical Dentistry
                </p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">1</div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Published Handbook Author
                </p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">100+</div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Successful Transitions
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
};

export default DrNjo;
