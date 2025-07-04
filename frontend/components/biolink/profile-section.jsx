"use client";

import { socialMediaOptions } from "@/constants/social-media-options";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { Button } from "@/components/ui/button";

const ProfileSection = memo(function ProfileSectionComponent({ profileInfo }) {
  console.log(profileInfo, 'profileInfo');
  return (
    <div className="flex flex-col gap-2 items-center">
      {profileInfo?.profilePicture?.url && (
        <Image
          className="w-24 h-24 rounded-full shadow-lg"
          src={profileInfo?.profilePicture?.url || ""}
          alt="Bonnie image"
          width={200}
          height={200}
          priority
        />
      )}
      <h3 className="text-2xl ar-font">
        {profileInfo?.ar_name || ""}
      </h3>
      <h3 className="text-xl ar-font">
        {profileInfo?.name || ""}
      </h3>
      <div className="text-sm text-center ar_bio">
        {profileInfo?.ar_bio || ""}
      </div>
      <div className="text-sm text-center ar_bio">
        {profileInfo?.bio || ""}
      </div>
      {/* Social Media Links Section */}
      {/* Only show if there are social media links */}
      {profileInfo?.socialMediaLinks?.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
          {profileInfo?.socialMediaLinks?.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="icon" className="rounded-full w-12 h-12 socialIcon" variant="outline">
                {socialMediaOptions.find((option) => option.value === link.icon)
                  ?.icon || link.icon}
                <span className="sr-only">{link.icon}</span>
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
});

export default ProfileSection;
