import { motion } from "framer-motion";
import { PenLine, Wand2, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: PenLine,
    title: "Create Your Prompts",
    description: "Write and save your AI prompts with our intuitive editor. Add tags, categories, and notes for easy organization.",
  },
  {
    step: "02",
    icon: Wand2,
    title: "Optimize with AI",
    description: "Let our AI analyze your prompts and suggest improvements for better results and clearer instructions.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Deploy & Share",
    description: "Use your optimized prompts across any AI platform. Share with your team or keep them private.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">How it Works</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple steps to{" "}
            <span className="gradient-text">prompt perfection</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/50 to-accent/50" />
              )}

              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
