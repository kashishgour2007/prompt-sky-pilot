import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Zap, Heart } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We're on a mission to democratize AI by making prompt engineering accessible to everyone, regardless of technical background.",
  },
  {
    icon: Users,
    title: "Community-Focused",
    description:
      "Our platform is built with and for our community. We listen, learn, and evolve based on real user feedback.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We continuously push the boundaries of what's possible with AI-assisted prompt optimization and testing.",
  },
  {
    icon: Heart,
    title: "User Experience",
    description:
      "Every feature we build prioritizes simplicity and effectiveness, ensuring you can focus on creating, not learning complex tools.",
  },
];

const team = [
  { name: "Alex Chen", role: "Founder & CEO", initials: "AC" },
  { name: "Sarah Miller", role: "Head of Product", initials: "SM" },
  { name: "James Wilson", role: "Lead Engineer", initials: "JW" },
  { name: "Emily Brown", role: "AI Research", initials: "EB" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl font-bold text-foreground mb-4">
              About PromptPilot
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe everyone should be able to harness the power of AI. PromptPilot
              was created to bridge the gap between complex AI systems and everyday
              users, making prompt engineering intuitive and effective.
            </p>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <Card className="card-shadow overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    PromptPilot was born out of frustration. As AI tools became more
                    powerful, we noticed that getting great results often required
                    expertise in "prompt engineering" – a skill that most people didn't
                    have time to develop.
                  </p>
                  <p>
                    We asked ourselves: what if there was a tool that could help anyone
                    write better prompts? What if we could make the art of communicating
                    with AI as natural as having a conversation?
                  </p>
                  <p>
                    That question led to PromptPilot – a platform designed to help you
                    create, test, and improve AI prompts without needing to become a
                    prompt engineering expert. Whether you're a writer, marketer,
                    developer, or just curious about AI, PromptPilot is here to help you
                    get the most out of every interaction.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="card-shadow h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">
              Meet the Team
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="card-shadow text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                        <span className="text-lg font-bold text-primary-foreground">
                          {member.initials}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
