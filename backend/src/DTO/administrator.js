export class AdministratorDTO {
  constructor() {
    this.id = null;
    this.name = null;
    this.email = null;
    this.role = null;
    this.subscription = null;
    this.createdAt = null;
    this.updatedAt = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  setRole(role) {
    this.role = role;
    return this;
  }

  setSubscription(subscription) {
    this.subscription = subscription;
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
      name: this.name,
      email: this.email,
      role: this.role,
      subscription: this.subscription,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class AdministratorListDTO {
  constructor() {
    this.administratorList = [];
  }

  setAdministratorList(administratorList) {
    this.administratorList = administratorList;
    return this;
  }

  build() {
    return {
      administratorList: this.administratorList,
    };
  }
}

export class AdministratorCountDTO {
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
