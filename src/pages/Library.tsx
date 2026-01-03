import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookmarkPlus, Copy, Star, Folder } from "lucide-react";

interface SavedPrompt {
  id: string;
  title: string;
  prompt: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
}

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<SavedPrompt[]>([
    {
      id: "1",
      title: "Professional Email Template",
      prompt: "Write a professional email that is concise, clear, and maintains a friendly yet formal tone...",
      tags: ["email", "business", "communication"],
      isFavorite: true,
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      title: "Creative Story Starter",
      prompt: "Create an engaging opening paragraph for a story that hooks the reader immediately...",
      tags: ["creative", "writing", "fiction"],
      isFavorite: false,
      createdAt: new Date(Date.now() - 172800000),
    },
    {
      id: "3",
      title: "Code Review Request",
      prompt: "Review this code for best practices, potential bugs, and performance improvements...",
      tags: ["coding", "review", "technical"],
      isFavorite: true,
      createdAt: new Date(Date.now() - 259200000),
    },
    {
      id: "4",
      title: "Marketing Copy Generator",
      prompt: "Generate compelling marketing copy that highlights benefits and creates urgency...",
      tags: ["marketing", "copywriting", "business"],
      isFavorite: false,
      createdAt: new Date(Date.now() - 345600000),
    },
    {
      id: "5",
      title: "Data Analysis Summary",
      prompt: "Analyze this dataset and provide key insights, trends, and actionable recommendations...",
      tags: ["data", "analysis", "business"],
      isFavorite: false,
      createdAt: new Date(Date.now() - 432000000),
    },
  ]);

  const allTags = Array.from(new Set(prompts.flatMap((p) => p.tags)));

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || prompt.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const toggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Prompt Library
                </h1>
                <p className="text-muted-foreground">
                  Your collection of saved and organized prompts
                </p>
              </div>
              <Button className="gap-2">
                <BookmarkPlus className="w-4 h-4" />
                Save New Prompt
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search prompts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt, index) => (
              <motion.div
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="card-shadow h-full hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-primary" />
                        <CardTitle className="text-base">{prompt.title}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleFavorite(prompt.id)}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            prompt.isFavorite
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {prompt.prompt}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {prompt.createdAt.toLocaleDateString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 h-8"
                        onClick={() => copyPrompt(prompt.prompt)}
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPrompts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No prompts found matching your criteria
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Library;
