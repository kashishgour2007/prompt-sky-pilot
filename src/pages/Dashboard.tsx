import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Sparkles, Clock, Copy, Trash2 } from "lucide-react";

interface PromptHistoryItem {
  id: string;
  prompt: string;
  result: string;
  timestamp: Date;
}

const Dashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([
    {
      id: "1",
      prompt: "Write a professional email asking for project deadline extension",
      result: "Subject: Request for Project Deadline Extension...",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      prompt: "Create a marketing tagline for an AI productivity app",
      result: "\"Unlock Your Potential with AI-Powered Productivity\"",
      timestamp: new Date(Date.now() - 7200000),
    },
  ]);

  const handleTestPrompt = () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      const mockResult = `This is a simulated response to your prompt: "${prompt.slice(0, 50)}..."`;
      setResult(mockResult);
      setHistory((prev) => [
        {
          id: Date.now().toString(),
          prompt,
          result: mockResult,
          timestamp: new Date(),
        },
        ...prev,
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const handleImprove = () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setPrompt(
        `[Enhanced] ${prompt}\n\nContext: Be specific and detailed.\nTone: Professional yet friendly.\nFormat: Structured response with clear sections.`
      );
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Create, test, and improve your AI prompts
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Prompt Area */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="card-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">Prompt Input</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Enter your prompt here... Be as specific as possible for better results."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[150px] resize-none"
                    />
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={handleTestPrompt}
                        disabled={isLoading || !prompt.trim()}
                        className="gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Test Prompt
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleImprove}
                        disabled={isLoading || !prompt.trim()}
                        className="gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Improve with AI
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="card-shadow border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">Result</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(result)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground whitespace-pre-wrap">{result}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* History Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Prompts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {history.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-8">
                      No prompts yet. Start testing!
                    </p>
                  ) : (
                    history.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg bg-secondary/50 border border-border group"
                      >
                        <p className="text-sm text-foreground line-clamp-2 mb-2">
                          {item.prompt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => setPrompt(item.prompt)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0 text-destructive"
                              onClick={() => deleteFromHistory(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
