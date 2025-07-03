export class UserDTO {
  constructor() {
    this.id = null;
    this.email = null;
    this.name = null;
    this.uid = null;
    this.role = null;
    this.subscription = null;
    this.createdAt = null;
    this.updatedAt = null;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setUid(uid) {
    this.uid = uid;
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
      email: this.email,
      name: this.name,
      uid: this.uid,
      role: this.role,
      subscription: this.subscription,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

// User List DTO
export class UserListDTO {
  constructor() {
    this.users = [];
  }

  setUsers(users) {
    this.users = users;
    return this;
  }

  build() {
    return this.users?.map((user) =>
      new UserDTO()
        .setId(user._id)
        .setEmail(user.email)
        .setName(user.name)
        .setUid(user.uid)
        .setRole(user.role)
        .setSubscription(user.subscription)
        .setCreatedAt(user.createdAt)
        .setUpdatedAt(user.updatedAt)
        .build()
    );
  }
}

// User Count DTO
export class UserCountDTO {
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
