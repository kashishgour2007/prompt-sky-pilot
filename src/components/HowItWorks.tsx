import { motion } from "framer-motion";
import { Edit3, Sparkles, Save, Rocket } from "lucide-react";

const steps = [
  {
    icon: Edit3,
    step: "01",
    title: "Write Your Prompt",
    description: "Start with a basic idea or rough draft of what you want to achieve.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "Enhance with AI",
    description: "Let our AI transform your prompt into a detailed, effective instruction.",
  },
  {
    icon: Save,
    step: "03",
    title: "Test & Refine",
    description: "Test your prompt and iterate until you get the perfect results.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Save & Use",
    description: "Save to your library and use your optimized prompts anywhere.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to create prompts that get results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-border -translate-x-1/2 z-0" />
              )}
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 rounded-2xl bg-card border border-border card-shadow flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <span className="text-sm font-bold text-primary mb-2 block">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
