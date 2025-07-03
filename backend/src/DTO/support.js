export class SupportDTO {
  constructor() {
    this.id = null;
    this.user = null;
    this.title = null;
    this.details = null;
    this.status = null;
    this.createdAt = null;
    this.updatedAt = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setUser(user) {
    this.user = user;
    return this;
  }

  setTitle(title) {
    this.title = title;
    return this;
  }

  setDetails(details) {
    this.details = details;
    return this;
  }

  setStatus(status) {
    this.status = status;
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
      user: this.user,
      title: this.title,
      details: this.details,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class SupportListDTO {
  constructor() {
    this.supportList = [];
  }

  setSupportList(supportList) {
    this.supportList = supportList;
    return this;
  }

  build() {
    return {
      supportList: this.supportList,
    };
  }
}

export class SupportCountDTO {
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
