import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Sparkles, Clock, Copy, Trash2, Save, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PromptHistoryItem {
  id: string;
  prompt: string;
  result: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from("prompt_history")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching history:", error);
    } else {
      setHistory(data || []);
    }
  };

  const handleTestPrompt = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResult("");

    try {
      const { data, error } = await supabase.functions.invoke("test-prompt", {
        body: { prompt },
      });

      if (error) throw error;

      const aiResult = data.result || "No response received";
      setResult(aiResult);

      // Save to history
      const { error: historyError } = await supabase
        .from("prompt_history")
        .insert({
          user_id: user?.id,
          prompt,
          result: aiResult,
        });

      if (historyError) {
        console.error("Error saving to history:", historyError);
      } else {
        fetchHistory();
      }

      toast({
        title: "Prompt tested!",
        description: "Your prompt has been processed successfully.",
      });
    } catch (error: any) {
      console.error("Error testing prompt:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to test prompt",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImprove = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("improve-prompt", {
        body: { prompt },
      });

      if (error) throw error;

      setPrompt(data.improvedPrompt || prompt);

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
      setIsLoading(false);
    }
  };

  const handleSaveToLibrary = async () => {
    if (!prompt.trim()) return;
    setIsSaving(true);

    try {
      const { error } = await supabase.from("prompts").insert({
        user_id: user?.id,
        title: prompt.substring(0, 50) + (prompt.length > 50 ? "..." : ""),
        content: prompt,
        tags: [],
      });

      if (error) throw error;

      toast({
        title: "Saved to library!",
        description: "Your prompt has been saved.",
      });
    } catch (error: any) {
      console.error("Error saving prompt:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save prompt",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const deleteFromHistory = async (id: string) => {
    const { error } = await supabase.from("prompt_history").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete from history",
        variant: "destructive",
      });
    } else {
      setHistory((prev) => prev.filter((item) => item.id !== id));
      toast({ title: "Deleted from history" });
    }
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
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        Test Prompt
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleImprove}
                        disabled={isLoading || !prompt.trim()}
                        className="gap-2"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        Improve with AI
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleSaveToLibrary}
                        disabled={isSaving || !prompt.trim()}
                        className="gap-2"
                      >
                        {isSaving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Save to Library
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
                            {new Date(item.created_at).toLocaleTimeString()}
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
