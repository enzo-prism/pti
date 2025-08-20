import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEO from "@/components/layout/SEO";

const blogPosts = [
  {
    id: 1,
    title: "So Much to be Thankful For",
    excerpt: "As we enter the holiday season, I love this time of year because it always gives me an opportunity to pause and reflect. It provides me an opportunity to be thankful for all the blessings I have. A heartfelt reflection on gratitude, loss, fear, and giving back to our profession.",
    category: "Personal Reflections",
    date: "2024-12-26",
    readTime: "8 min read",
    gradient: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-400",
    slug: "so-much-to-be-thankful-for",
    author: "Michael Njo, DDS",
    content: `As we enter the holiday season, did I just say that? Where did this year go? I love this time of year, although I do miss the summer months. The reason I love this time of year is it always gives me an opportunity to pause and reflect. It provides me an opportunity to be thankful for all the blessings I have. I wanted to share that I lost a dear friend this year at the young age of 51 who battled cancer for several years, leaving a wonderful wife and two loving children, a freshman and junior in college. Unfortunately, my story is not too uncommon. If you speak to enough people, one would come across a similarly tragic story, and some have come close to losing a loved one. In reflecting on this year, I came across this inscription, that I sent a book to him - "The Boy, the mole, the fox and the horse"

Dear Kevin, You have had a long-fought journey, and this journey is continuing, because your life will continue. I thought this book would be helpful with this journey. My niece gave this book to me, she knows that I enjoy things that make me view life in different ways and make me think. I hope this book provides inspiration and strength as you soldier on. But does this journey need to be a fight, do you need to be a soldier? One of our greatest freedoms is how we react to things - it is our choice. Sometimes just getting up and carrying on is magnificent. When the big things feel out of control...focus on what you love right under your nose, your amazing family and your friends who love you!!! Life is all about mindset. As you read through this book, hopefully these thoughts will be uplifting. The ending of the book shares that this book is about friendship and indeed Renee and our family will always be by your and your family's side. It is an honor to call you, my friend!

Our family will be forever thankful he was a part of our lives.

Recently I had the opportunity to be one of the speakers in an Annual Leadership Retreat held in Deer Valley, Utah. It was an amazing group. The attendees were all Pride Institute Alumnus practicing and retired. What a beautiful place! It was a perfect setting for the featured speaker, Kristen Ulmer, who is the author of the "Art of Fear" and was the number one Big Mountain Skier for 12 years. She addressed fear and how different people manage it. She shared the exercises of really understanding people and how we can all interact better with our patients, team, friends and family. Kristen shares with the group that treatment for anxiety disorders is more resistance. These are not mental health issues, she expresses. Furthermore, these anxiety disorders can manifest itself into physical ailments. We should not try to suppress or bury fear. If you are in flow with your fear than you can be in flow with yourself. The awful feeling we associate with fear is not fear it is the feeling of the resistance. Our society loves to fear shame. We need to embrace fear and work with it. How does fear factor in your personal life, with your patients and with your team? It is too large of a concept to address in this article, but it should give you pause and a time of self-reflection. It was an amazing talk. If you are interested in attending the next one, please reach out to me.

I also had the honor to speak to the dental students at the Dugoni School of Dentistry at the start of the school year. The topic was advice on navigating dental school and career paths after dental school. I truly enjoy interacting and presenting to these groups. It was wonderful to see the number of Freshman students, as well as each class being well represented. The group was engaging, asked very thoughtful questions and their curiosity and zest for knowledge was off the charts. They have their whole career ahead of them. Their energy, excitement, and fear of what their future holds was palpable. I highlighted my former Dean, Dr. Art Dugoni's, message of be involved, be a leader, and give back to our profession. As organized dentistry is facing a variety of challenges it is now more important than ever to be part of a movement to be involved. As we reflect on our own blessings in life, we can show our gratitude now by paying forward. There are so many opportunities to be involved. Many hands make light work! I know the individuals reading this article echo my sentiment and charge. It is us that need to get the word out! I am thankful to my profession, to the San Mateo County Dental Society and its awesome team and constituents, and to all who have touched my life! Wishing you all a very joyous holiday season!

Please email me at dentalstrategies@gmail.com for any questions or suggestions for future article topics.`
  },
  {
    id: 2,
    title: "Work Staff Shortages in Dentistry... What can we do?",
    excerpt: "I get calls, texts, and questions almost every day complaining, asking questions and conveying concerns about work staff shortages in the dental profession. The dental assisting workforce has been shattered by the pandemic, and the situation isn't going to get better anytime soon.",
    category: "Practice Management",
    date: "2024-09-09",
    readTime: "6 min read",
    gradient: "bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-500",
    slug: "work-staff-shortages-dentistry",
    author: "Michael Njo, DDS",
    content: `I get calls, texts, and questions almost every day complaining, asking questions and conveying concerns about work staff shortages in the dental profession. Questions such as "Do you know any dental assistants looking for work?" "It is so hard to get great candidates for our position" "Where are all the quality team members?"

The answer is, I don't know anyone, and this is the state of the profession. They simply aren't out there as much, so you can stop expecting a quick fix. Specifically, the dental assisting workforce has been shattered by the pandemic, and the situation isn't going to get better anytime soon. It will be years before dental practices recuperate and can find dental team members to round out their teams.

Many older professionals decided during the pandemic to retire and/or cut back on their workload. I spoke to a dentist recently wanting to sell his practice. In getting to know his practice, I asked him to share with me information about his team. His response was I work alone. I queried him further to clarify his response and he said, "I have no employees". What!??? The same goes for many other dental professionals-sales forces, college and trade school instructors, office managers, and hygienists. We experienced a mass exodus, much of it to retirement. Those who stayed moved to the next level to fill vacancies and parted ways with some offices to advance their careers in another office. That left many practices short on people, with no way to find experienced individuals because they're few and far between, and good employers are doing what they can to hang onto their good ones. In the midst of it all, many dental assisting schools closed, which helped lead to one of the biggest shortages of oral healthcare workers in a very long time.

What can you do about this situation?

We are a resilient profession! You start from scratch. For instance, visit a local restaurant and find the waiter or waitress who hustles, and hire them. Visit your bank and find an employee who smiles and goes above and beyond to help you and hire them. Take a look at your patient base, find the patient everyone loves to see, and hire them. You need to look for good people and then train them! The days of interviewing, then having a second interview, then having a working interview are over. If you are lucky enough that a candidate shows up, they present well, they are trainable/coachable, are well spoken, and appear to have a "reasonable" work ethic. Hire them on the spot!!!

Is all of this a big pain?

Yes, but it's what we need to do to keep moving forward. Training from scratch is not ideal because I know everyone in the office is busy, but what else can we do? The inconvenience pays off in the long run.

When you bring in someone, don't overload them. Set them up for success. Be patient! If they're an assistant, start them with small tasks in sterilization and have them shadow. You will have to lengthen your appointments to assure a positive working environment. This will allow you to explain the procedure and debrief the new team member about the appointment and about what is about to happen. The post appointment is needed to review and reflect on what went well and what to improve upon. If it's a new front desk person, find something they can accomplish quickly so they feel productive, then you can add more tasks as people grow confident. Don't overwhelm and overload anyone with information too quickly.

Have constant "growth meetings" and check-ins. These interactions are designed to be purposeful, empowering and educational. This will provide opportunities to assure a successful assimilation to your practice and procedures.

I often hear from team members who say they are worked so hard and get few to no breaks and no lunch. Understandable, because generally these individuals are thrown in to an existing tough situation, most often alone with no other team or dentist support. Basically, a sink or swim mentality. They generally sink, at no fault of their own. Don't put your team through this because everyone needs a break, everybody needs support, everybody needs the feeling of success and accomplishment. We all need a few minutes each day to breathe and compose ourselves. We all need clear guidelines and clear expectations to be successful.

Have written protocols/SOPs (standard operating protocols) that team members can refer to so they don't feel lost and worried about asking too many questions. If instructions are written out, the team can refer to this often and work independently. Written protocols are the best way to keep your team on task. Team members need to know what to do and when to do it. Written protocols are the best way to convey how you want your business run.

Your protocols should be clear and concise, not too fancy or full of garbage, just easy to read. They're a huge boost for the newbies as well as for the veterans who may think they know what you want. Protocols keep team members on the same page at all times. Have your team cross trained, many hands make light work!

Finally, value your team! If they're good, hang on to them. Show appreciation, and by all means, be kind. Sounds simple, unfortunately it is not common. Team members want to work where they're valued and respected. Show your team and coworkers how much you appreciate them, and they will stay! By following these suggestions, hopefully the dental staffing shortage will not have a huge impact on you.

Remember, knowledge is power. Please email me at dentalstrategies@gmail.com for any questions. I would be happy to schedule a call.`
  }
];

const categories = ["All", "Personal Reflections", "Practice Management"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  const togglePostExpansion = (postId: number) => {
    setExpandedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <>
      <SEO 
        title="Blog - Practice Transitions Institute | Dental Practice Insights & Expert Guidance"
        description="Stay informed with expert insights on dental practice transitions, valuations, and business strategies. Get the latest tips and trends from industry professionals."
      />

      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Dental Practice Insights & Expert Guidance
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Stay informed with the latest trends, strategies, and insights for successful dental practice transitions
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <Section className="py-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2.5 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium 
                transition-all duration-200 min-h-[44px] min-w-[60px]
                border-2 hover:scale-105 active:scale-95
                ${selectedCategory === category 
                  ? 'bg-primary text-white border-primary shadow-lg' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary hover:shadow-md'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </Section>

      {/* Featured Post */}
      {(selectedCategory === "All" || blogPosts[0].category === selectedCategory) && (
        <Section className="py-0">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <div className="grid md:grid-cols-2 gap-0">
                <div className={`aspect-video md:aspect-square ${blogPosts[0].gradient}`}>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="mb-4 w-fit">{blogPosts[0].category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{new Date(blogPosts[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-6">
                    By {blogPosts[0].author}
                  </div>
                  <Button 
                    className="w-fit group"
                    onClick={() => togglePostExpansion(blogPosts[0].id)}
                  >
                    {expandedPosts.includes(blogPosts[0].id) ? 'Show Less' : 'Read Full Article'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  {expandedPosts.includes(blogPosts[0].id) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="prose prose-gray max-w-none">
                        {blogPosts[0].content.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Blog Posts Grid - Only show if there are additional posts beyond the featured one */}
      {blogPosts.slice(1).filter(post => selectedCategory === "All" || post.category === selectedCategory).length > 0 && (
        <Section>
          <SectionTitle centered>Latest Articles</SectionTitle>
          <SectionSubtitle centered>
            Expert insights and practical guidance for dental practice owners
          </SectionSubtitle>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogPosts.slice(1).filter(post => selectedCategory === "All" || post.category === selectedCategory).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className={`aspect-video overflow-hidden ${post.gradient}`}>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  {expandedPosts.includes(post.id) && (
                    <div className="mb-4 pt-4 border-t border-gray-100">
                      <div className="prose prose-sm max-w-none">
                        {post.content.split('\n\n').slice(0, 3).map((paragraph, index) => (
                          <p key={index} className="mb-3 text-gray-700 text-sm leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                        {post.content.split('\n\n').length > 3 && (
                          <p className="text-gray-500 text-xs italic">
                            ...continue reading in full article view
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto text-primary hover:text-primary-dark"
                      onClick={() => togglePostExpansion(post.id)}
                    >
                      {expandedPosts.includes(post.id) ? 'Show Less' : 'Read More'} 
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Newsletter Signup */}
      <Section background="light">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Informed</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Subscribe to our newsletter for the latest insights on dental practice transitions, valuations, and industry trends delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button className="whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Blog;