"use client";
import { useChat } from "@ai-sdk/react";
import Image from "next/image";
import "./md.css";
import Markdown from "react-markdown";
import { useEffect, useRef } from "react";
import {
  AlertCircle,
  Copy,
  Loader2,
  Send,
  Sparkles,
  User2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Chatbox = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/ai/chat",
    });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto flex h-[90dvh] w-full max-w-5xl flex-col">
      <div className="max-h-full flex-1 overflow-y-auto rounded-lg border border-border/40 bg-muted/30 p-4 text-sm leading-6 sm:text-base sm:leading-7">
        {messages.length > 0 ? (
          messages.map((m) => (
            <div key={m.id} className="whitespace-pre-wrap">
              {m.role === "user" ? (
                <div className="flex flex-row px-2 py-4 sm:px-4">
                  <div className="mr-4 grid size-8 place-content-center overflow-clip rounded-full bg-muted">
                    <User2Icon size={24} />
                  </div>
                  <div className="markdown-body max-w-3xl">
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
              ) : (
                <div className="relative mb-4 flex rounded-xl bg-gray-100 px-2 py-6 dark:bg-accent sm:px-4">
                  <div className="terabot-icon mr-2 flex size-6 rounded-full bg-[length:200%_200%] sm:mr-4 md:size-8" />
                  <div className="markdown-body w-full max-w-3xl overflow-x-auto rounded-xl">
                    <Markdown>{m.content}</Markdown>
                  </div>
                  <Button
                    type="button"
                    title="copy"
                    variant={"secondary"}
                    size={"icon"}
                    className="absolute right-2 top-2"
                    onClick={() => {
                      navigator.clipboard.writeText(m.content);
                      toast.success("Copied to clipboard");
                    }}
                  >
                    <Copy size={16} />
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="m-auto flex h-full flex-col items-center justify-center">
            <p className="mx-auto px-2 py-10 text-center text-xl font-semibold tracking-tight text-muted-foreground sm:text-2xl lg:text-3xl">
              Start Chatting with
              <br />
              <span className={"text-2xl text-primary md:text-4xl"}>
                MintBot
              </span>{" "}
              Now!
            </p>
            <Image
              src="/terabot.svg"
              id="terabot"
              alt="terabot"
              width={300}
              height={300}
              className="mt-2 transition-all duration-500 hover:scale-110 active:scale-95"
            />
          </div>
        )}
        {isLoading && (
          <div className="flex items-center gap-2 px-10">
            <span className="animate-bg-pan bg-gradient-to-r from-muted/50 via-foreground to-muted/50 bg-[length:200%_200%] bg-clip-text text-transparent">
              Generating...
            </span>
            <Sparkles size={18} className="animate-pulse" />
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 px-10">
            Oops an error occurred:
            <span className="animate-bg-pan bg-gradient-to-r from-destructive via-destructive to-red-500/80 bg-[length:200%_200%] bg-clip-text text-transparent">
              {" "}
              {error.message}.
            </span>
            Try refreshing the page.
            <AlertCircle className="animate-pulse" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        className="mt-2"
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Enter your prompt
        </label>
        <div className="relative">
          <Textarea
            id="chat-input"
            placeholder="Enter your prompt"
            rows={1}
            value={input}
            required
            onChange={handleInputChange}
          />
          <Button
            title="submit"
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-2"
          >
            {isLoading ? (
              <>
                Loading
                <Loader2 className="ml-2 animate-spin" size={18} />
              </>
            ) : (
              <>
                Send <Send className="ml-2" size={18} />
              </>
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Chatbox;
