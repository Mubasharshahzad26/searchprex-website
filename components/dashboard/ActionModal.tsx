"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export interface MsoPageData {
  url: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface ActionModalProps {
  page: MsoPageData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ActionModal({ page, isOpen, onClose }: ActionModalProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [selectedActions, setSelectedActions] = useState<Record<string, boolean>>({});

  if (!page) return null;

  const toggleAction = (key: string) => {
    setSelectedActions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApply = async () => {
    const actionsToApply = Object.keys(selectedActions).filter(k => selectedActions[k]);
    if (actionsToApply.length === 0) {
      toast.error("Please select at least one action");
      return;
    }

    setIsApplying(true);
    // Simulate API call to background AI jobs
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsApplying(false);

    toast.success("AI actions scheduled successfully!");
    onClose();
    setSelectedActions({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Optimize: {page.url.replace("https://www.searchprex.com", "")}</DialogTitle>
          <DialogDescription>
            Current Stats: {page.clicks} Clicks | {page.impressions} Impressions | {page.ctr}% CTR | Pos {page.position}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase">On-Page AI Actions</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="action-title" 
                  checked={selectedActions["title"] || false}
                  onCheckedChange={() => toggleAction("title")}
                />
                <Label htmlFor="action-title">Rewrite Title Tag</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="action-meta" 
                  checked={selectedActions["meta"] || false}
                  onCheckedChange={() => toggleAction("meta")}
                />
                <Label htmlFor="action-meta">Optimize Meta Desc</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="action-content" 
                  checked={selectedActions["content"] || false}
                  onCheckedChange={() => toggleAction("content")}
                />
                <Label htmlFor="action-content">Expand / Rewrite Content</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase">Schema Generation</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="schema-faq" 
                  checked={selectedActions["schema-faq"] || false}
                  onCheckedChange={() => toggleAction("schema-faq")}
                />
                <Label htmlFor="schema-faq">Add FAQ Schema</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="schema-product" 
                  checked={selectedActions["schema-product"] || false}
                  onCheckedChange={() => toggleAction("schema-product")}
                />
                <Label htmlFor="schema-product">Add Product Schema</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="schema-local" 
                  checked={selectedActions["schema-local"] || false}
                  onCheckedChange={() => toggleAction("schema-local")}
                />
                <Label htmlFor="schema-local">Add Local Business Schema</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase">Off-Page Opportunities</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="link-guest" 
                  checked={selectedActions["link-guest"] || false}
                  onCheckedChange={() => toggleAction("link-guest")}
                />
                <Label htmlFor="link-guest">Target Guest Posts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="link-niche" 
                  checked={selectedActions["link-niche"] || false}
                  onCheckedChange={() => toggleAction("link-niche")}
                />
                <Label htmlFor="link-niche">Niche Directories</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="link-web2" 
                  checked={selectedActions["link-web2"] || false}
                  onCheckedChange={() => toggleAction("link-web2")}
                />
                <Label htmlFor="link-web2">Web 2.0 Properties</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isApplying}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={isApplying}>
            {isApplying ? "Applying..." : "Apply Actions"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
