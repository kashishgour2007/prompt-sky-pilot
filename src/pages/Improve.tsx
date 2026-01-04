import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Copy, RotateCcw, Check, Lightbulb, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const improvementTips = [
  "Be specific about the desired output format",
  "Include context and background information",
  "Specify the tone and style you want",
  "Break complex tasks into smaller steps",
  "Use examples when possible",
];

const Improve = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [improvedPrompt, setImprovedPrompt] = useState("");
  const [isImproving, setIsImproving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleImprove = async () => {
    if (!originalPrompt.trim()) return;
    setIsImproving(true);
    setImprovedPrompt("");

    try {
      const { data, error } = await supabase.functions.invoke("improve-prompt", {
        body: { prompt: originalPrompt },
      });

      if (error) throw error;

      setImprovedPrompt(data.improvedPrompt || originalPrompt);

      toast({
        title: "Prompt improved!",
        description: "Your prompt has been enhanced with AI.",
      });
    } catch (error: any) {
      console.error("Error improving prompt:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to improve prompt",
        variant: "destructive",
      });
    } finally {
      setIsImproving(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(improvedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied to clipboard!" });
  };

  const reset = () => {
    setOriginalPrompt("");
    setImprovedPrompt("");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
                          <Loader2 className="w-4 h-4 animate-spin" />
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
