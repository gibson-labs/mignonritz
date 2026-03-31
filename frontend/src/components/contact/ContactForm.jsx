import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
        <p className="text-muted-foreground font-body">Thank you for reaching out. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-body text-sm font-medium">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="font-body"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="font-body text-sm font-medium">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="font-body"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="font-body text-sm font-medium">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell me about your project..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={5}
          className="font-body resize-none"
        />
      </div>
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </Button>
    </form>
  );
}