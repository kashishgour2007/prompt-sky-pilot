import { motion } from "framer-motion";
import { Layers, Zap, GitBranch, Shield, BarChart3, Users } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Prompt Library",
    description: "Organize all your prompts in one place with smart categorization and tagging.",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Track changes, compare versions, and rollback to previous prompts instantly.",
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: Zap,
    title: "AI Optimization",
    description: "Get intelligent suggestions to improve prompt performance and clarity.",
    gradient: "from-yellow-500/20 to-yellow-500/5",
    iconColor: "text-yellow-500",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Measure prompt effectiveness with detailed performance metrics.",
    gradient: "from-green-500/20 to-green-500/5",
    iconColor: "text-green-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share prompts with your team and collaborate in real-time.",
    gradient: "from-pink-500/20 to-pink-500/5",
    iconColor: "text-pink-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and SOC 2 compliance for your data.",
    gradient: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-500",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-4 block">Features</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need to{" "}
            <span className="gradient-text">pilot your prompts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed to streamline your AI workflow and boost productivity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
