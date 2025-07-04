"use client";
import { useEffect, useId, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Check, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Content from "@/components/dashboard/content";
import SortableBioItem from "@/components/biolink/bio-item";
import PhoneMockup from "@/components/biolink/phone-mockup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ButtonPresets from "@/components/biolink/button-presets";
import ButtonCustomizer from "@/components/biolink/button-customizer";
import ThemePresets from "@/components/biolink/theme-presets";
import ProfileSection from "@/components/biolink/profile-section";
import ThemeCustomizer from "@/components/biolink/theme-customizer";
import { useUpdateBiolink, useViewBiolink } from "@/services/biolink-services";
import {
  BiolinkBackgroundDesignDTO,
  BiolinkButtonDesignDTO,
  BiolinkDesignDTO,
  BiolinkDTO,
  LinkDTO,
} from "@/DTO/biolink";
import ProfileInput from "@/components/biolink/profile-input";
import BackButton from "@/components/shared/buttons/back-button";
import Image from "next/image";
import ErrorAlert from "@/components/shared/alert/error-alert";
import { useCustomClaims } from "@/services/user-services";
import { toast } from "sonner";
import QrCode from "@/components/qr-code/qr-code";
import QrCodeInputFields from "@/components/qr-code/qr-code-input-fields";
import QrCodeCustomizer from "@/components/qr-code/qr-code-customizer";

const FREE_USER_LINK_LIMIT = parseInt(process.env.NEXT_PUBLIC_FREE_USER_LINK_LIMIT, 10) || 30;
const MAX_USER_LINK_LIMIT = parseInt(process.env.NEXT_PUBLIC_MAX_USER_LINK_LIMIT, 10) || 40;

export default function BioLinkUpdate({ id }) {
  const { userSubscription } = useCustomClaims();
  const uniqueId = useId();
  const {
    biolink,
    biolinkDesign,
    isLoading,
    isValidating,
    mutate,
    success,
    message,
  } = useViewBiolink(id);
  const { trigger, isMutating } = useUpdateBiolink();
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState(1);
  const [itemsSet, setItemsSet] = useState(false); // Flag to ensure items are only set once
  const [profileInfo, setProfileInfo] = useState({
    ar_name: "",
    ar_bio: "",
    name: "",
    bio: "",
    profilePicture: "",
    socialMediaLinks: [],
  });
  const [buttonDesign, setButtonDesign] = useState({
    name: "Deafult",
    design: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#ffffff",
      borderWidth: 0.125,
      borderRadius: 0.5,
      borderColor: "#e2e8f0",
      textColor: "#000000",
      shadow: "",
    },
  });
  const [theme, setTheme] = useState({
    name: "Minimalist",
    themeDesign: {
      backgroundType: "solid",
      backgroundImage: "",
      backgroundColor: "#f5f5f4",
      backgroundGradient: "",
    },
    buttonDesign: {
      type: "solid",
      height: 0.5,
      backgroundColor: "#ffffff",
      borderWidth: 0.125,
      borderRadius: 0.5,
      borderColor: "#e2e8f0",
      textColor: "#000000",
      shadow: "",
    },
  });

  // Add state for the merged QR code customizer
  const [mergedQrCodeType, setMergedQrCodeType] = useState("text");
  const [mergedQrCodeDesign, setMergedQrCodeDesign] = useState({
    type: "svg",
    shape: "square",
    width: 300,
    height: 300,
    margin: 4,
    data: "Hello World",
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      crossOrigin: "anonymous",
      margin: 15,
    },
    dotsOptions: {
      type: "square",
      color: "#000",
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#000" },
          { offset: 1, color: "#000" },
        ],
      },
    },
    cornersSquareOptions: {
      type: "square",
      color: "#000",
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#000" },
          { offset: 1, color: "#000" },
        ],
      },
    },
    cornersDotOptions: {
      type: "dot",
      color: "#000",
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#000" },
          { offset: 1, color: "#000" },
        ],
      },
    },
    backgroundOptions: {
      round: 0,
      color: "#fff",
      gradient: {
        type: "linear",
        rotation: 45,
        colorStops: [
          { offset: 0, color: "#FAACA8" },
          { offset: 1, color: "#DDD6F3" },
        ],
      },
    },
  });

  // Update items when biolink data is fetched from the server
  useEffect(() => {
    if (!isLoading && !isValidating && biolink && !itemsSet) {
      if (biolink?.links) {
        const linkDTO = biolink?.links.map((link, index) => {
          return {
            id: index + 1,
            blockId: link?.id,
            biolink: link?.biolink,
            title: link?.title,
            description: link?.description,
            link: link?.url,
            image: link?.image,
            design: link?.design,
            layout: link?.layout,
            schedule: link?.schedule,
            protected: link?.protected,
          };
        });

        const profileInfo = {
          name: biolink.name,
          bio: biolink.bio,
          ar_name: biolink.ar_name,
          ar_bio: biolink.ar_bio,
          profilePicture: biolink.profilePicture,
          socialMediaLinks: biolink.socialMediaLinks,
        };

        setItemId(biolink.links.length + 1 || 1);
        setItems(linkDTO);
        setItemsSet(true);
        setProfileInfo(profileInfo);
        setButtonDesign({
          ...buttonDesign,
          design: biolinkDesign?.buttonDesign,
        });
        setTheme({
          ...theme,
          themeDesign: biolinkDesign?.backgroundDesign,
        });
      }
    }
  }, [
    biolink,
    isLoading,
    isValidating,
    itemsSet,
    itemId,
    biolinkDesign,
    theme,
    buttonDesign,
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  // Return error message if the request is not successful
  if (success == false) {
    return (
      <Content
        title={`Error`}
        extra={<BackButton />}
        isValidating={isValidating}
      >
        <ErrorAlert title={`Error`} message={message} />
      </Content>
    );
  }

  function handleAddNewBlock() {
    const userPlan = userSubscription?.plan;
    const itemLength = items?.length;
    // Restrict free user for up to FREE_USER_LINK_LIMIT links
    if (userPlan == "free" && itemLength >= FREE_USER_LINK_LIMIT) {
      toast.warning(`Free users are allowed to create up to ${FREE_USER_LINK_LIMIT} blocks.`);
      return;
    }

    // Restrict Pro user for up to MAX_USER_LINK_LIMIT links
    if (itemLength >= MAX_USER_LINK_LIMIT) {
      toast.warning(`Up to ${MAX_USER_LINK_LIMIT} blocks are allowed.`);
      return;
    }

    setItemId((id) => id + 1);

    setItems((items) => [
      ...items,
      {
        id: itemId,
        blockId: "",
        type: "button",
        title: "New Block",
        link: "",
        design: "primary", // default, highlight etc
        layout: "classic", // classic, block etc
        schedule: { enabled: false, start: "", end: "" },
        protected: { enabled: false, password: "" },
      },
    ]);
  }

  function chnageButtonDesign(newDesign) {
    setButtonDesign((buttonDesign) => {
      return {
        ...buttonDesign,
        ...newDesign,
      };
    });
  }

  function changeThemeDesign(newThemeDesign, newButtonDesign) {
    setTheme((themeDesign) => {
      return {
        themeDesign: {
          ...themeDesign.themeDesign,
          ...newThemeDesign,
        },
        buttonDesign: {
          ...themeDesign.buttonDesign,
          ...newButtonDesign,
        },
      };
    });
    setButtonDesign((buttonDesign) => {
      return {
        ...buttonDesign,
        design: { ...buttonDesign.design, ...newButtonDesign },
      };
    });
  }

  function changeThemeBackground(themeDesign) {
    setTheme((theme) => ({
      ...theme,
      themeDesign: {
        ...theme.themeDesign,
        ...themeDesign,
      },
    }));
  }

  function handleDeleteItem(item) {
    setItems((items) => items.filter((i) => i !== item));
  }

  function handleChangeItemTitle(item, title) {
    item.title = title;
    setItems([...items]);
  }

  function handleChangeItemLink(item, link) {
    item.link = link;
    setItems([...items]);
  }

  function handleProfileNameChange(name) {
    profileInfo.name = name;
    setProfileInfo({ ...profileInfo });
  }
  function handleProfileArArNameChange(ar_name) {
    profileInfo.ar_name = ar_name;
    setProfileInfo({ ...profileInfo });
  }

  function handleProfileBioChange(bio) {
    setProfileInfo({ ...profileInfo, bio });
  }
  function handleProfileArBioChange(ar_bio) {
    setProfileInfo({ ...profileInfo, ar_bio  });
  }

  function handleSocialMediaLinkChange(socialMediaLinks) {
    setProfileInfo({ ...profileInfo, socialMediaLinks });
  }

  function handleProfilePictureChange(profilePicture) {
    setProfileInfo({ ...profileInfo, profilePicture });
  }

  const buttonDesignConfig = buttonDesign?.design;
  const themeConfig = theme?.themeDesign;

  async function handleUpdateBiolink() {
    const linkDTO = items.map((item) => {
      return new LinkDTO()
        .setId(item?.blockId)
        .setBiolink(item?.biolink)
        .setTitle(item?.title)
        .setDescription(item?.description)
        .setUrl(item?.link)
        .setImage(item?.image)
        .build();
    });

    const biolinkDTO = new BiolinkDTO()
      .setId(biolink?.id)
      .setName(profileInfo?.name)
      .setArName(profileInfo?.ar_name)
      .setProfilePicture(profileInfo?.profilePicture?.id)
      .setSocialMediaLinks(profileInfo?.socialMediaLinks)
      .setBio(profileInfo?.bio)
      .setArBio(profileInfo?.ar_bio)
      .setQrCode(mergedQrCodeDesign)
      .setLinks(linkDTO)
      .build();

    const biolinkBackgroundDesignDTO = new BiolinkBackgroundDesignDTO()
      .setBackgroundType(themeConfig?.backgroundType)
      .setBackgroundImage(themeConfig?.backgroundImage?.id)
      .setBackgroundColor(themeConfig?.backgroundColor)
      .setBackgroundGradient(themeConfig?.backgroundGradient)
      .build();

    const biolinkButtonDesignDTO = new BiolinkButtonDesignDTO()
      .setType(buttonDesignConfig?.type)
      .setHeight(buttonDesignConfig?.height)
      .setBackgroundColor(buttonDesignConfig?.backgroundColor)
      .setBorderWidth(buttonDesignConfig?.borderWidth)
      .setBorderRadius(buttonDesignConfig?.borderRadius)
      .setBorderColor(buttonDesignConfig?.borderColor)
      .setTextColor(buttonDesignConfig?.textColor)
      .setShadow(buttonDesignConfig?.shadow)
      .build();

    const biolinkDesignDTO = new BiolinkDesignDTO()
      .setBiolink(biolink?.id)
      .setBackgroundDesign(biolinkBackgroundDesignDTO)
      .setButtonDesign(biolinkButtonDesignDTO)
      .build();

    // Ensure QR code is always 200x200 when saving
    const qrCodeToSave = {
      ...mergedQrCodeDesign,
      width: 150,
      height: 150,
    };

    const payload = {
      biolink: {
        ...biolinkDTO,
        qrCode: qrCodeToSave,
      },
      design: biolinkDesignDTO,
    };

    await trigger(payload);

    await mutate();
  }

  function SaveBioLinkButton() {
    return (
      <div className="flex gap-2 flex-row items-center">
        <BackButton />
        <Button
          className="gap-1"
          onClick={handleUpdateBiolink}
          disabled={isMutating || isLoading}
          size="sm"
        >
          {isMutating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          <span>Update</span>
        </Button>
      </div>
    );
  }

  // Add this function to handle QR code config changes for a block
  function handleCustomQrChange(itemId, key, value) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              qrConfig: {
                ...item.qrConfig,
                [key]: value,
              },
            }
          : item
      )
    );
  }

  function changeMergedQrDesign(key, value) {
    setMergedQrCodeDesign((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleMergedQrCodeTypeChange(value) {
    setMergedQrCodeType(() => value);
  }

  function handleMergedQrCodeDataChange(value) {
    changeMergedQrDesign("data", value);
  }

  return (
    <Content
      title={biolink?.username}
      extra={<SaveBioLinkButton />}
      isValidating={isValidating}
    >
      <style jsx>
        {`
          .block_button {
            padding: ${buttonDesignConfig?.height}rem 0;
            border: ${buttonDesignConfig?.borderWidth}rem solid
              ${buttonDesignConfig?.borderColor};
            border-radius: ${buttonDesignConfig?.borderRadius}rem;
            color: ${buttonDesignConfig?.textColor};
            box-shadow: ${buttonDesignConfig?.shadow};
            ${buttonDesignConfig?.type == "solid"
              ? `background-color: ${buttonDesignConfig?.backgroundColor}`
              : `background-image: ${buttonDesignConfig?.backgroundColor}`};
          }
        `}
      </style>
      <style jsx>
        {`
          .theme {
            ${themeConfig?.backgroundType == "image"
              ? `
                background-image: url(${themeConfig?.backgroundImage?.url});
                background-size: cover;
                background-position: center;
                `
              : ""}

            ${themeConfig?.backgroundType == "gradient"
              ? `background-image: ${themeConfig?.backgroundGradient};`
              : ""}

            ${themeConfig?.backgroundType == "solid"
              ? `background-color: ${themeConfig?.backgroundColor};`
              : ""}
          }
        `}
      </style>
      <style jsx>
        {`
          .background-container {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        `}
      </style>
      <style jsx>
        {`
          .image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
          }
        `}
      </style>
      <style jsx>
        {`
          .content-container {
            position: relative;
            top: 50%;
            left: 50%;
            z-index: 100;
            transform: translate(-50%, -50%);
            color: red;
          }
        `}
      </style>
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
        {/* Left side. Customize Bio link */}
        <div className="col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="grid gap-2">
                <CardTitle>Customize bio link</CardTitle>
                <CardDescription>
                  Edit your bio link and track its performance
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="qr" className="w-full">
                <TabsList className="mb-4 w-full">
                  <TabsTrigger value="qr" className="w-full">QR Code</TabsTrigger>
                  <TabsTrigger value="blocks" className="w-full">Blocks</TabsTrigger>
                  <TabsTrigger value="profile" className="w-full">Profile</TabsTrigger>
                  <TabsTrigger value="design" className="w-full">Design</TabsTrigger>
                </TabsList>
                <TabsContent forceMount className="data-[state=inactive]:hidden" value="qr">
                  {/* Merged QR Code Customizer UI */}
                  <div className="w-full">
                    <Card className="h-full w-full">
                      <CardHeader>
                        <CardTitle>Customize your QR Code</CardTitle>
                        <CardDescription>
                          Give your QR Code a unique identity.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4">
                        <Tabs defaultValue="data" className="w-full">
                          <TabsList className="mb-4 w-full">
                            <TabsTrigger value="data" className="w-full">
                              Data
                            </TabsTrigger>
                            <TabsTrigger value="design" className="w-full">
                              Design
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent forceMount className="data-[state=inactive]:hidden" value="data">
                            <div className="grid gap-4">
                              <QrCodeInputFields
                                changeQrCodeType={handleMergedQrCodeTypeChange}
                                currentQrCodeType={mergedQrCodeType}
                                updateData={handleMergedQrCodeDataChange}
                              />
                            </div>
                          </TabsContent>
                          <TabsContent forceMount className="data-[state=inactive]:hidden" value="design">
                            <div className="grid gap-4">
                              <QrCodeCustomizer
                                changeDesign={changeMergedQrDesign}
                                currentDesign={mergedQrCodeDesign}
                              />
                            </div>
                          </TabsContent>
                        </Tabs>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent forceMount className="data-[state=inactive]:hidden" value="blocks">
                  {/* Bio link drag and drop link builder */}
                  <div className="grid gap-4">
                    <Button
                      variant="outline"
                      className="w-full border-primary"
                      onClick={handleAddNewBlock}
                      disabled={isLoading}
                    >
                      <Plus className="h-4 w-4" />
                      Add new block
                    </Button>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      id={uniqueId}
                    >
                      <SortableContext
                        items={items}
                        strategy={verticalListSortingStrategy}
                      >
                        {items?.map((item) => (
                          <SortableBioItem
                            key={item?.id}
                            item={item}
                            handleDeleteItem={handleDeleteItem}
                            handleChangeItemTitle={handleChangeItemTitle}
                            handleChangeItemLink={handleChangeItemLink}
                          />
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                </TabsContent>
                <TabsContent
                  forceMount
                  className="data-[state=inactive]:hidden"
                  value="profile"
                >
                  <ProfileInput
                    currentProfileInfo={profileInfo}
                    handleProfileArArNameChange={handleProfileArArNameChange}
                    handleProfileNameChange={handleProfileNameChange}
                    handleProfileArBioChange={handleProfileArBioChange}
                    handleProfileBioChange={handleProfileBioChange}
                    handleProfilePictureChange={handleProfilePictureChange}
                    handleSocialMediaLinkChange={handleSocialMediaLinkChange}
                  />
                </TabsContent>
                <TabsContent
                  forceMount
                  className="data-[state=inactive]:hidden"
                  value="design"
                >
                  {/* Design */}
                  <div>
                    <Tabs defaultValue="theme" className="w-full">
                      <TabsList className="mb-4 w-full">
                        <TabsTrigger value="theme" className="w-full">
                          Theme
                        </TabsTrigger>
                        <TabsTrigger value="button" className="w-full">
                          Button
                        </TabsTrigger>
                        <TabsTrigger value="custom" className="w-full">
                          Custom
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        forceMount
                        className="data-[state=inactive]:hidden"
                        value="theme"
                      >
                        <ThemePresets changeThemeDesign={changeThemeDesign} />
                      </TabsContent>
                      <TabsContent
                        forceMount
                        className="data-[state=inactive]:hidden"
                        value="button"
                      >
                        <div className="grid gap-4">
                          <strong>Presets</strong>
                          {/* Button Presets */}
                          <ButtonPresets
                            chnageButtonDesign={chnageButtonDesign}
                          />
                        </div>
                      </TabsContent>
                      <TabsContent
                        forceMount
                        className="data-[state=inactive]:hidden"
                        value="custom"
                      >
                        <div className="grid gap-12">
                          <div className="grid gap-4">
                            {/* Button customizer ⚙️🔧 */}
                            <strong>Customize Button</strong>
                            <ButtonCustomizer
                              chnageButtonDesign={chnageButtonDesign}
                              currentDesign={buttonDesign}
                            />
                          </div>
                          <div className="grid gap-4">
                            {/* Theme customizer ⚙️🔧 */}
                            <strong>Customize Background</strong>
                            <ThemeCustomizer
                              changeDesign={changeThemeBackground}
                              currentDesign={theme}
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  {/* Design end */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        {/* Right side. Preview 2️⃣*/}
        <div className="col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Preview your bio link</CardTitle>
              <CardDescription>
                Preview your bio link as your audience will see
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <div className="h-full min-h-[680px]">
                {/* Bio link preview */}
                {/* Render buttons based on the length of items */}
                <div className="sticky top-0">
                  {/* Preview inside phone mockup */}
                  <PhoneMockup>
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Image */}
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        {
                          // If background type is image, show the image
                          themeConfig?.backgroundType === "image" && (
                            <Image
                              src={themeConfig?.backgroundImage?.url}
                              alt={themeConfig?.backgroundImage?.alt}
                              width={300}
                              height={600}
                              unoptimized
                              className="object-cover w-auto h-full"
                            />
                          )
                        }
                        {
                          // If background type is gradient, show the gradient
                          themeConfig?.backgroundType === "gradient" && (
                            <div className="theme w-full h-full"></div>
                          )
                        }
                        {
                          // If background type is solid, show the solid color
                          themeConfig?.backgroundType === "solid" && (
                            <div className="theme w-full h-full"></div>
                          )
                        }
                      </div>
                      {/* Content */}
                      <div className="relative h-full">
                        <div className="flex flex-col gap-4 w-full p-4 bg-transparent h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                          {/* Profile Section */}
                          <ProfileSection profileInfo={profileInfo} />

                          {/* Show the merged QR code preview inside the phone mockup */}
                          {mergedQrCodeDesign && (
                            <div className="flex justify-center mb-4">
                              <QrCode currentDesign={mergedQrCodeDesign} />
                            </div>
                          )}

                          {/* Button Maps and QR Code Block */}
                          {items?.map((item) => {
                            if (item.type === "qr") {
                              return (
                                <QrCode
                                  key={item.id}
                                  currentDesign={{
                                    data:
                                      typeof window !== "undefined" && biolink?.username
                                        ? `${window.location.origin}/${biolink?.username}`
                                        : "",
                                    width: 200,
                                    height: 200,
                                  }}
                                />
                              );
                            } else if (item.type === "custom-qr") {
                              return (
                                <div key={item.id} className="flex flex-col items-center gap-2 p-2 border rounded-md bg-white">
                                  {/* Customizer UI */}
                                  <div className="w-full">
                                    <QrCodeInputFields
                                      currentQrCodeType={item.qrConfig.qrType || "text"}
                                      changeQrCodeType={(type) => handleCustomQrChange(item.id, "qrType", type)}
                                      updateData={(data) => handleCustomQrChange(item.id, "data", data)}
                                    />
                                    <QrCodeCustomizer
                                      changeDesign={(key, value) => handleCustomQrChange(item.id, key, value)}
                                      currentDesign={item.qrConfig}
                                    />
                                  </div>
                                  {/* QR Code Preview */}
                                  <QrCode currentDesign={item.qrConfig} />
                                </div>
                              );
                            } else {
                              return (
                                <button
                                  className={"block_button"}
                                  key={item?.id}
                                  title={item?.link}
                                >
                                  {item?.title}
                                </button>
                              );
                            }
                          })}

                          {/* If no block is added, ask for a block to add */}
                          {items?.length == 0 && (
                            <div className="text-center">
                              <p className="text-sm">
                                Add a new block to your bio link
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </PhoneMockup>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Content>
  );
}
