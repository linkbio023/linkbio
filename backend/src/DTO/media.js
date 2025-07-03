export class MediaDTO {
  constructor() {
    this.id = null;
    this.url = null;
    this.publicId = null;
    this.userId = null;
    this.alt = null;
    this.title = null;
    this.createdAt = null;
    this.updatedAt = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setUrl(url) {
    this.url = url;
    return this;
  }

  setPublicId(publicId) {
    this.publicId = publicId;
    return this;
  }

  setUserId(userId) {
    this.userId = userId;
    return this;
  }

  setAlt(alt) {
    this.alt = alt;
    return this;
  }

  setTitle(title) {
    this.title = title;
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

  build() {
    return {
      id: this.id,
      url: this.url,
      publicId: this.publicId,
      userId: this.userId,
      alt: this.alt,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class MediaListDTO {
  constructor() {
    this.mediaList = [];
  }

  setMediaList(mediaList) {
    this.mediaList = mediaList;
    return this;
  }

  build() {
    return {
      mediaList: this.mediaList,
    };
  }
}

export class MediaCountDTO {
  constructor() {
    this.count = 0;
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
