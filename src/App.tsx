import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Mail, Wrench } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Background } from "./components/background";

interface Tool {
  title: string;
  url: string;
  description: string;
  image: string;
  tags?: string[];
}

const tools: Tool[] = [
  {
    title: "Truth Table Generator",
    url: "https://truth-table.sudharshans.me/",
    description:
      "Generate logical truth tables easily with this intuitive tool. Perfect for digital logic design and Boolean algebra studies.",
    image: "/images/truth-table.png",
    tags: ["Logic", "Boolean", "Digital"],
  },
  {
    title: "Base Converter",
    url: "https://base-converter.sudharshans.me/",
    description:
      "Convert between binary, decimal, hex, and more. Essential tool for programmers and computer science students.",
    image: "/images/base-converter.png",
    tags: ["Math", "Programming", "Converter"],
  },
  {
    title: "Confusion Matrix Visualizer",
    url: "https://confusion-matrix.sudharshans.me/",
    description:
      "Visualize and understand ML confusion matrices with ease. Analyze your machine learning model performance.",
    image: "/images/confusion-matrix.png",
    tags: ["ML", "Data Science", "Visualization"],
  },
  {
    title: "Convolution Matrix Editor",
    url: "https://convolution-matrix.sudharshans.me/",
    description:
      "Experiment with convolution filters in image processing. Perfect for computer vision and image manipulation tasks.",
    image: "/images/convolution-matrix.png",
    tags: ["Image Processing", "Computer Vision", "Filters"],
  },
  {
    title: "Markdown Editor",
    url: "https://markdown-editor.sudharshans.me/",
    description:
      "Write and preview Markdown in real-time. Ideal for documentation, blogging, and note-taking.",
    image: "/images/markdown-editor.png",
    tags: ["Markdown", "Writing", "Preview"],
  }
];

function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring" as const,
        stiffness: 400,
      },
    },
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="toolset-theme">
      <Background />
      <div className="min-h-screen text-foreground relative z-10">
        {/* Header */}
        <motion.header
          className="border-b sticky top-0 z-50 bg-background/50 backdrop-blur-md"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Wrench className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">The Toolset</h1>
                <p className="text-sm text-muted-foreground">By Sudharshan S</p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <Button
                variant="default"
                size="default"
                asChild
                className="font-medium"
              >
                <a
                  href="https://www.sudharshans.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  My Website
                </a>
              </Button>
              <ModeToggle />
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-4xl font-bold mb-4"
              variants={itemVariants}
            >
              Developer Tools & Utilities
            </motion.h2>
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              variants={itemVariants}
            >
              A collection of useful tools and utilities for developers,
              students, and tech enthusiasts. Click on any tool to learn more
              and access it.
            </motion.p>
          </motion.div>

          {/* Tools Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {tools.map((tool) => (
              <motion.div
                key={tool.title}
                variants={cardVariants}
                whileHover="hover"
                className="cursor-pointer"
                onClick={() => setSelectedTool(tool)}
              >
                <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={tool.image}
                        alt={tool.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.parentElement!.innerHTML = `
                            <div class="flex items-center justify-center w-full h-full bg-muted">
                              <Wrench class="h-12 w-12 text-muted-foreground" />
                            </div>
                          `;
                        }}
                      />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {tool.description}
                    </p>

                    {tool.tags && (
                      <div className="flex flex-wrap gap-1">
                        {tool.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>

        {/* Footer */}
        <motion.footer
          className="border-t mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-muted-foreground">
                  © {new Date().getFullYear()} Sudharshan S. All rights
                  reserved.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="https://github.com/sudharshans2009"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    @sudharshans2009
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href="mailto:mail@sudharshans.me">
                    <Mail className="h-4 w-4 mr-2" />
                    mail@sudharshans.me
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.footer>

        {/* Tool Detail Dialog */}
        <Dialog
          open={!!selectedTool}
          onOpenChange={() => setSelectedTool(null)}
        >
          <DialogContent className="max-w-2xl">
            {selectedTool && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {selectedTool.title}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-2">
                    {selectedTool.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <div className="aspect-video bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedTool.image}
                      alt={selectedTool.title}
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement!.innerHTML = `
                          <div class="flex items-center justify-center w-full h-full bg-muted rounded-lg">
                            <div class="text-center">
                              <Wrench class="h-16 w-16 text-muted-foreground" />
                            </div>
                          </div>
                        `;
                      }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {selectedTool.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {selectedTool.description}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Button variant="default" asChild>
                        <a
                          href={selectedTool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Go to Tool
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default App;
