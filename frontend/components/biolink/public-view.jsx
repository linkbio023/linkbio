import { apiUrls } from "@/constants/api-urls";
import { notFound } from "next/navigation";
import ProfileSection from "@/components/biolink/profile-section";
import Image from "next/image";
import PublicViewFooter from "@/components/biolink/public-view-footer";
import Link from "next/link";
import QrCode from "@/components/qr-code/qr-code";

export default async function PublicView({ username }) {
  const url = `${apiUrls.biolink.publicView}${username}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data, 'datadatadatadatadata');
  // If the response status is not 200 or the data is not successful, return a 404 page
  if (response.status !== 200 || !data.success) {
    return notFound();
  }

  const { biolink, biolinkDesign } = data.data;
  const { buttonDesign, backgroundDesign } = biolinkDesign;

  const buttonLinksList = biolink?.links;

  // Profile Info
  const profileInfo = {
    name: biolink?.name,
    ar_name: biolink?.ar_name,
    ar_bio: biolink?.ar_bio,
    bio: biolink?.bio,
    profilePicture: biolink?.profilePicture,
    socialMediaLinks: biolink?.socialMediaLinks,
  };

  // Button Style
  const buttonStyle = {
    padding: buttonDesign.height + "rem",
    borderWidth: buttonDesign.borderWidth + "rem",
    borderRadius: buttonDesign.borderRadius + "rem",
    borderColor: buttonDesign.borderColor,
    color: buttonDesign.textColor,
    boxShadow: buttonDesign.shadow,
    width: "100%",
  };

  if (buttonDesign.type == "solid") {
    buttonStyle.backgroundColor = buttonDesign.backgroundColor;
  } else if (buttonDesign.type == "gradient") {
    buttonStyle.backgroundImage = buttonDesign.backgroundColor;
  }

  return (
    <main>
      <div className="relative w-full h-[calc(100vh-200px)] overflow-hidden">
        {/* Background Image or Color */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Background Image */}
          {backgroundDesign.backgroundType == "image" && (
            <Image
              src={backgroundDesign?.backgroundImage?.url}
              alt={backgroundDesign?.backgroundImage?.alt}
              width={720}
              height={1280}
              className="object-cover fixed w-full h-full"
              priority
              placeholder="data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff9e8' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E"
            />
          )}

          {/* Background Solid Color */}
          {backgroundDesign.backgroundType == "solid" && (
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{ backgroundColor: backgroundDesign.backgroundColor }}
            ></div>
          )}

          {/* Background Gradient Color*/}
          {backgroundDesign.backgroundType == "gradient" && (
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{ backgroundImage: backgroundDesign.backgroundColor }}
            ></div>
          )}
        </div>

        {/* Content */}
        <div className="relative h-full">
          <div className="flex flex-col gap-4 w-full p-4 bg-transparent h-full max-w-6xl mx-auto">
            {/* Profile Section */}
            <ProfileSection profileInfo={profileInfo} />

            {/* Saved QR Code (from merged customizer) */}
            {biolink.qrCode && (
              <div className="flex justify-center mb-4">
                <QrCode currentDesign={{ ...biolink.qrCode, width: 150, height: 150 }} />
              </div>
            )}

            {/* Button Map */}
            <div className="flex flex-col justify-center gap-4 text-center">
              {buttonLinksList?.map((link, index) => {
                if (link.type === "qr") {
                  return (
                    <div key={index} className="flex justify-center">
                      <QrCode
                        currentDesign={{
                          data: typeof window !== 'undefined' && biolink?.username ? `${window.location.origin}/${biolink?.username}` : '',
                          width: 150,
                          height: 150,
                        }}
                      />
                    </div>
                  );
                } else if (link.type === "custom-qr" && link.qrConfig) {
                  return (
                    <div key={index} className="flex justify-center">
                      <QrCode currentDesign={link.qrConfig} />
                    </div>
                  );
                } else {
                  return (
                    <Link href={link?.url} key={index} target="_blank">
                      <button style={buttonStyle}>{link?.title}</button>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <PublicViewFooter biolinkId={biolink?.id} />
    </main>
  );
}
