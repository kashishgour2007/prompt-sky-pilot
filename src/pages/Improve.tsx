import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Copy, RotateCcw, Check, Lightbulb } from "lucide-react";

const improvementTips = [
  "Be specific about the desired output format",
  "Include context and background information",
  "Specify the tone and style you want",
  "Break complex tasks into smaller steps",
  "Use examples when possible",
];

const Improve = () => {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [isImproving, setIsImproving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleImprove = () => {
    if (!originalPrompt.trim()) return;
    setIsImproving(true);

    setTimeout(() => {
      const enhanced = `## Enhanced Prompt

**Objective:** ${originalPrompt}

**Context:** 
Please approach this task as an expert in the field. Consider all relevant aspects and provide a comprehensive response.

**Instructions:**
1. Begin with a clear summary of the main points
2. Provide detailed explanations with examples where appropriate
3. Consider potential edge cases or alternative perspectives
4. Conclude with actionable recommendations

**Format:**
- Use clear headings and bullet points
- Include relevant examples
- Keep the response structured and easy to follow

**Tone:** Professional yet accessible, informative but engaging`;

      setImprovedPrompt(enhanced);
      setIsImproving(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(improvedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setOriginalPrompt("");
    setImprovedPrompt("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Enhancement</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Improve Your Prompts
            </h1>
            <p className="text-muted-foreground">
              Transform basic prompts into powerful, detailed instructions that get better results
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="card-shadow h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm">
                      1
                    </span>
                    Original Prompt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Enter your basic prompt here... For example: 'Write a blog post about AI'"
                    value={originalPrompt}
                    onChange={(e) => setOriginalPrompt(e.target.value)}
                    className="min-h-[200px] resize-none"
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={handleImprove}
                      disabled={isImproving || !originalPrompt.trim()}
                      className="gap-2 flex-1"
                    >
                      {isImproving ? (
                        <>
                          <Sparkles className="w-4 h-4 animate-spin" />
                          Improving...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Improve with AI
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={reset} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className={`card-shadow h-full ${improvedPrompt ? "border-primary/30" : ""}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">
                        2
                      </span>
                      Enhanced Prompt
                    </CardTitle>
                    {improvedPrompt && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="gap-2"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {improvedPrompt ? (
                    <div className="p-4 rounded-lg bg-secondary/30 min-h-[200px]">
                      <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                        {improvedPrompt}
                      </pre>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                      <ArrowRight className="w-8 h-8 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">
                        Your enhanced prompt will appear here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Prompt Writing Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {improvementTips.map((tip, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="py-2 px-4 text-sm"
                    >
                      {tip}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Improve;
