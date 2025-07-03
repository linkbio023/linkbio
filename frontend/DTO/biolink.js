export class LinkScheduleDTO {
  constructor() {
    this.enabled = false;
    this.startDate = null;
    this.endDate = null;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    return this;
  }

  setStartDate(startDate) {
    this.startDate = startDate;
    return this;
  }

  setEndDate(endDate) {
    this.endDate = endDate;
    return this;
  }

  build() {
    return {
      enabled: this.enabled,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}

export class LinkProtectedDTO {
  constructor() {
    this.enabled = false;
    this.password = null;
  }

  setEnabled(enabled) {
    this.enabled = enabled;
    return this;
  }

  setPassword(password) {
    this.password = password;
    return this;
  }

  build() {
    return {
      enabled: this.enabled,
      password: this.password,
    };
  }
}

export class LinkDTO {
  constructor() {
    this.id = null;
    this.biolink = null;
    this.design = null;
    this.layout = null;
    this.title = null;
    this.description = null;
    this.url = null;
    this.image = null;
    this.schedule = null;
    this.protected = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setBiolink(biolink) {
    this.biolink = biolink;
    return this;
  }

  setDesign(design) {
    this.design = design;
    return this;
  }

  setLayout(layout) {
    this.layout = layout;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setSchedule(schedule) {
    this.schedule = new LinkScheduleDTO()
      .setEnabled(schedule?.enabled)
      .setStartDate(schedule?.startDate)
      .setEndDate(schedule?.endDate)
      .build();
    return this;
  }

  setProtected(protectedLink) {
    this.protected = new LinkProtectedDTO()
      .setEnabled(protectedLink?.enabled)
      .setPassword(protectedLink?.password)
      .build();
    return this;
  }

  setImage(image) {
    this.image = image;
    return this;
  }

  setQrCode(qrCode) {
    this.qrCode = qrCode;
    return this;
  }

  setLinks(links) {
    this.links = links?.map((link) =>
      new LinkDTO()
        .setId(link.id)
        .setBiolink(link.biolink)
        .setDesign(link.design)
        .setLayout(link.layout)
        .setTitle(link.title)
        .setDescription(link.description)
        .setUrl(link.url)
        .setImage(link.image)
        .setSchedule(link.schedule)
        .setProtected(link.protected)
        .build()
    );
    return this;
  }

  build() {
    return {
      id: this.id,
      biolink: this.biolink,
      design: this.design,
      layout: this.layout,
      title: this.title,
      description: this.description,
      url: this.url,
      image: this.image,
      schedule: this.schedule,
      protected: this.protected,
      qrCode: this.qrCode,
      links: this.links,
    };
  }
}

export class BiolinkDTO {
  constructor() {
    this.id = null;
    this.user = null;
    this.username = null;
    this.name = null;
    this.ar_name = null;
    this.profilePicture = null;
    this.bio = null;
    this.ar_bio = null;
    this.socialMediaLinks = null;
    this.links = null;
    this.createdAt = null;
    this.updatedAt = null;
    this.qrCode = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setUser(user) {
    this.user = user;
    return this;
  }

  setUsername(username) {
    this.username = username;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setArName(ar_name) {
    this.ar_name = ar_name;
    return this;
  }

  setProfilePicture(profilePicture) {
    this.profilePicture = profilePicture;
    return this;
  }

  setBio(bio) {
    this.bio = bio;
    return this;
  }

  setArBio(ar_bio) {
    this.ar_bio = ar_bio;
    return this;
  }

  setSocialMediaLinks(socialMediaLinks) {
    this.socialMediaLinks = socialMediaLinks;
    return this;
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  setUpdatedAt(updatedAt) {
    this.updatedAt = updatedAt;
    return this;
  }

  setQrCode(qrCode) {
    this.qrCode = qrCode;
    return this;
  }

  // Array of LinkDTO
  setLinks(links) {
    this.links = links?.map((link) =>
      new LinkDTO()
        .setId(link.id)
        .setBiolink(link.biolink)
        .setDesign(link.design)
        .setLayout(link.layout)
        .setTitle(link.title)
        .setDescription(link.description)
        .setUrl(link.url)
        .setImage(link.image)
        .setSchedule(link.schedule)
        .setProtected(link.protected)
        .build()
    );
    return this;
  }

  build() {
    return {
      id: this.id,
      user: this.user,
      username: this.username,
      name: this.name,
      ar_name: this.ar_name,
      profilePicture: this.profilePicture,
      bio: this.bio,
      ar_bio: this.ar_bio,
      socialMediaLinks: this.socialMediaLinks,
      links: this.links,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      qrCode: this.qrCode,
    };
  }
}

export class BiolinkListDTO {
  constructor() {
    this.biolinks = [];
  }

  setBiolinks(biolinks) {
    this.biolinks = biolinks;
    return this;
  }

  build() {
    return this.biolinks?.map((biolink) =>
      new BiolinkDTO()
        .setId(biolink.id)
        .setUser(biolink.user)
        .setUsername(biolink.username)
        .setName(biolink.name)
        .setArName(biolink.ar_name)
        .setArBio(biolink.ar_bio)
        .setProfilePicture(biolink.profilePicture)
        .setSocialMediaLinks(biolink.socialMediaLinks)
        .setBio(biolink.bio)
        .setQrCode(biolink.qrCode)
        .setLinks(biolink.links)
        .build()
    );
  }
}

export class BiolinkUsernameAvailabilityCheckDTO {
  constructor() {
    this.isAvailable = null;
  }
  setIsAvailable(isAvailable) {
    this.isAvailable = isAvailable;
    return this;
  }

  build() {
    return {
      isAvailable: this.isAvailable,
    };
  }
}

export class BiolinkCountDTO {
  constructor() {
    this.count = null;
  }
  setCount(count) {
    this.count = count;
    return this;
  }

  build() {
    return {
      count: this.count,
    };
  }
}

// DTO for biolink design
export class BiolinkBackgroundDesignDTO {
  constructor() {
    this.backgroundType = null;
    this.backgroundImage = null;
    this.backgroundColor = null;
    this.backgroundGradient = null;
    this.themeTextColor = null;
  }
  setBackgroundType(backgroundType) {
    this.backgroundType = backgroundType;
    return this;
  }
  setBackgroundImage(backgroundImage) {
    this.backgroundImage = backgroundImage;
    return this;
  }
  setBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
    return this;
  }
  setBackgroundGradient(backgroundGradient) {
    this.backgroundGradient = backgroundGradient;
    return this;
  }
  setThemeTextColor(themeTextColor) {
    this.themeTextColor = themeTextColor;
    return this;
  }
  build() {
    return {
      backgroundType: this.backgroundType,
      backgroundImage: this.backgroundImage,
      backgroundColor: this.backgroundColor,
      backgroundGradient: this.backgroundGradient,
      themeTextColor: this.themeTextColor,
    };
  }
}

export class BiolinkButtonDesignDTO {
  constructor() {
    this.type = null;
    this.height = null;
    this.backgroundColor = null;
    this.borderWidth = null;
    this.borderRadius = null;
    this.borderColor = null;
    this.textColor = null;
    this.shadow = null;
    this.extra = null;
  }
  setType(type) {
    this.type = type;
    return this;
  }
  setHeight(height) {
    this.height = height;
    return this;
  }
  setBackgroundColor(backgroundColor) {
    this.backgroundColor = backgroundColor;
    return this;
  }
  setBorderWidth(borderWidth) {
    this.borderWidth = borderWidth;
    return this;
  }
  setBorderRadius(borderRadius) {
    this.borderRadius = borderRadius;
    return this;
  }
  setBorderColor(borderColor) {
    this.borderColor = borderColor;
    return this;
  }
  setTextColor(textColor) {
    this.textColor = textColor;
    return this;
  }
  setShadow(shadow) {
    this.shadow = shadow;
    return this;
  }
  setExtra(extra) {
    this.extra = extra;
    return this;
  }
  build() {
    return {
      type: this.type,
      height: this.height,
      backgroundColor: this.backgroundColor,
      borderWidth: this.borderWidth,
      borderRadius: this.borderRadius,
      borderColor: this.borderColor,
      textColor: this.textColor,
      shadow: this.shadow,
      extra: this.extra,
    };
  }
}

export class BiolinkDesignDTO {
  constructor() {
    this.biolink = null;
    this.backgroundDesign = null;
    this.buttonDesign = null;
    this.dimensionUnit = null;
  }

  setBiolink(biolink) {
    this.biolink = biolink;
    return this;
  }

  setBackgroundDesign(backgroundDesign) {
    this.backgroundDesign = new BiolinkBackgroundDesignDTO()
      .setBackgroundType(backgroundDesign?.backgroundType)
      .setBackgroundImage(backgroundDesign?.backgroundImage)
      .setBackgroundColor(backgroundDesign?.backgroundColor)
      .setBackgroundGradient(backgroundDesign?.backgroundGradient)
      .setThemeTextColor(backgroundDesign?.themeTextColor)
      .build();
    return this;
  }

  setButtonDesign(buttonDesign) {
    this.buttonDesign = new BiolinkButtonDesignDTO()
      .setType(buttonDesign?.type)
      .setHeight(buttonDesign?.height)
      .setBackgroundColor(buttonDesign?.backgroundColor)
      .setBorderWidth(buttonDesign?.borderWidth)
      .setBorderRadius(buttonDesign?.borderRadius)
      .setBorderColor(buttonDesign?.borderColor)
      .setTextColor(buttonDesign?.textColor)
      .setShadow(buttonDesign?.shadow)
      .setExtra(buttonDesign?.extra)
      .build();
    return this;
  }

  setDimensionUnit(dimensionUnit) {
    this.dimensionUnit = dimensionUnit;
    return this;
  }

  build() {
    return {
      biolink: this.biolink,
      backgroundDesign: this.backgroundDesign,
      buttonDesign: this.buttonDesign,
      dimensionUnit: this.dimensionUnit,
    };
  }
}
