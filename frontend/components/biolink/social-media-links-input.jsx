"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { socialMediaOptions } from "@/constants/social-media-options";

function SocialMediaInputBox({
  handleRemoveLink,
  handleSocialLinkChange,
  socialMediaLink,
  handleIconChange,
  index,
  defaultSocialMediaIcon,
}) {
  const handleLinkChange = (e) => {
    const value = e.target.value;
    handleSocialLinkChange(index, value);
  };

  const handleSocialIconChange = (value) => {
    handleIconChange(index, value);
  };

  return (
    <div className="grid gap-2 p-4 rounded-lg bg-primary/10 border border-gray-200">
      <div className="flex flex-row gap-2 justify-between">
        <Select
          defaultValue={defaultSocialMediaIcon}
          className="w-full"
          onValueChange={handleSocialIconChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Social Media" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectGroup>
              {socialMediaOptions.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={handleRemoveLink}>
          <X size={16} />
          <span className="sr-only">Remove</span>
        </Button>
      </div>

      <Input
        placeholder="Enter URL"
        type="url"
        className="w-full"
        onChange={handleLinkChange}
        value={socialMediaLink?.url}
      />
    </div>
  );
}

export default function SocialMediaLinksInput({
  handleSocialMediaChange,
  currentSocialMediaLinks,
}) {
  const defaultSocialMediaIcon = "facebook";

  const handleRemoveLink = (index) => {
    const updatedLinks = [...currentSocialMediaLinks];
    updatedLinks.splice(index, 1);
    handleSocialMediaChange(updatedLinks);
  };

  const handleAddLink = () => {
    const updatedLinks = [
      ...currentSocialMediaLinks,
      { url: "", icon: defaultSocialMediaIcon },
    ];
    handleSocialMediaChange(updatedLinks);
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...currentSocialMediaLinks];
    updatedLinks[index].url = value;
    handleSocialMediaChange(updatedLinks);
  };

  const handleIconChange = (index, value) => {
    const updatedLinks = [...currentSocialMediaLinks];
    updatedLinks[index].icon = value;
    handleSocialMediaChange(updatedLinks);
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 p-4 rounded-lg bg-white border border-gray-200">
        <h3 className="text-lg font-semibold">Social Media Links</h3>
        {currentSocialMediaLinks.map((link, index) => (
          <SocialMediaInputBox
            key={index}
            handleRemoveLink={() => handleRemoveLink(index)}
            handleSocialLinkChange={handleLinkChange}
            handleIconChange={handleIconChange}
            socialMediaLink={link}
            index={index}
            defaultSocialMediaIcon={link.icon || defaultSocialMediaIcon}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          className="w-full"
          onClick={handleAddLink}
        >
          <Plus size={16} />
          <span>Add Social Media Link</span>
        </Button>
      </div>
    </div>
  );
}
