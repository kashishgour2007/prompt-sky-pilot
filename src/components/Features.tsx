import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TestTube, FolderOpen, Wand2, History, Share2 } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Improvements",
    description:
      "Transform basic prompts into detailed, effective instructions with one click.",
  },
  {
    icon: TestTube,
    title: "Test Prompts Instantly",
    description:
      "See how your prompts perform in real-time before using them elsewhere.",
  },
  {
    icon: FolderOpen,
    title: "Organized Library",
    description:
      "Save and categorize your best prompts with tags for easy access later.",
  },
  {
    icon: Wand2,
    title: "Smart Suggestions",
    description:
      "Get intelligent recommendations to make your prompts more effective.",
  },
  {
    icon: History,
    title: "Version History",
    description:
      "Track changes and improvements to your prompts over time.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "Share your best prompts with teammates or the community.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features to help you create and manage prompts like a pro
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full card-shadow hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
