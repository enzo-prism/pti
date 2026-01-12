export type AuthorProfile = {
  name: string;
  type: "Person" | "Organization";
  role?: string;
  bio?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
};

const AUTHOR_PROFILES: Record<string, AuthorProfile> = {
  "Michael Njo, DDS": {
    name: "Michael Njo, DDS",
    type: "Person",
    role: "Founder, Practice Transitions Institute",
    bio: "Dental practice transition expert with 30+ years in clinical dentistry, guiding dentists through valuations, sales, and ownership transitions.",
    url: "/drnjo",
    image: "/lovable-uploads/7f7f714e-f3e5-4943-a190-b0a9ed982709.png",
  },
  "Practice Transitions Institute": {
    name: "Practice Transitions Institute",
    type: "Organization",
    role: "Practice Transitions Institute",
    bio: "A team of transition advisors helping dentists navigate valuations, sales, partnerships, and associateships.",
    url: "/about",
  },
};

export const getAuthorProfile = (name: string): AuthorProfile | undefined => {
  return AUTHOR_PROFILES[name];
};
