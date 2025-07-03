"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MediaSelect from "@/components/media/media-select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import SocialMediaLinksInput from "@/components/biolink/social-media-links-input";

const ProfileInput = memo(function ProfileInputComponent({
  currentProfileInfo,
  handleProfileArArNameChange,
  handleProfileNameChange,
  handleProfileArBioChange,
  handleProfileBioChange,
  handleProfilePictureChange,
  handleSocialMediaLinkChange,
}) {
  function handleArNameChange(e) {
    handleProfileArArNameChange(e.target.value);
  }

  function handleArBioChange(e) {
    handleProfileArBioChange(e.target.value);
  }
  function handleNameChange(e) {
    handleProfileNameChange(e.target.value);
  }

  function handleBioChange(e) {
    handleProfileBioChange(e.target.value);
  }

  function handleSelectedMedia(media) {
    handleProfilePictureChange(media);
  }

  function handleRemoveMedia() {
    handleProfilePictureChange(null);
  }

  function handleSocialMediaChange(socialMedia) {
    handleSocialMediaLinkChange(socialMedia);
  }

  return (
    <div className="grid gap-4">
      {/* Select profile picture if not selected before */}
      {!currentProfileInfo?.profilePicture?.url && (
        <MediaSelect handleSelectedMedia={handleSelectedMedia} />
      )}

      {/* Profile picture preview with change button and remove button */}
      {currentProfileInfo?.profilePicture?.url && (
        <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-white">
          <Image
            src={currentProfileInfo?.profilePicture?.url}
            alt="Profile Picture"
            width={250}
            height={250}
            unoptimized
            className="h-auto max-w-full rounded-lg"
          />
          <div className="flex gap-2">
            {/* Change Media */}
            <MediaSelect handleSelectedMedia={handleSelectedMedia} />

            {/* Remove Media */}
            <Button variant="outline" onClick={handleRemoveMedia}>
              Remove
            </Button>
          </div>
        </div>
      )}
      <Input
        type="text"
        id="ar_name"
        maxLength={30}
        placeholder="Arabic Name"
        onChange={handleArNameChange}
        value={currentProfileInfo.ar_name || ""}
      />
      <Input
        type="text"
        id="name"
        maxLength={30}
        placeholder="Name"
        onChange={handleNameChange}
        value={currentProfileInfo.name || ""}
      />

      <div className="grid w-full gap-2">
        <Textarea
          maxLength={150}
          placeholder="Write your bio here."
          id="ar_bio"
          onChange={handleArBioChange}
          value={currentProfileInfo.ar_bio || ""}
        />
        <p className="text-sm text-muted-foreground">
          Bio must be less than 150 characters.
        </p>
      </div>
      <div className="grid w-full gap-2">
        <Textarea
          maxLength={150}
          placeholder="Write your bio here."
          id="bio"
          onChange={handleBioChange}
          value={currentProfileInfo.bio || ""}
        />
        <p className="text-sm text-muted-foreground">
          Bio must be less than 150 characters.
        </p>
      </div>
      {/* Social Media */}
      <SocialMediaLinksInput
        handleSocialMediaChange={handleSocialMediaChange}
        currentSocialMediaLinks={currentProfileInfo.socialMediaLinks || []}
      />
    </div>
  );
});
export default ProfileInput;
