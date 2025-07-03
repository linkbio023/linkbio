export class SubscriptionDTO {
  constructor() {
    this.id = null;
    this.user = null;
    this.plan = null;
    this.amount = null;
    this.currency = null;
    this.paymentPlatform = null;
    this.status = null;
    this.transactionId = null;
    this.paymentId = null;
    this.currentPeriodStartDate = null;
    this.currentPeriodEndDate = null;
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

  setPlan(plan) {
    this.plan = plan;
    return this;
  }

  setAmount(amount) {
    this.amount = amount;
    return this;
  }

  setCurrency(currency) {
    this.currency = currency;
    return this;
  }

  setPaymentPlatform(paymentPlatform) {
    this.paymentPlatform = paymentPlatform;
    return this;
  }

  setStatus(status) {
    this.status = status;
    return this;
  }

  setTransactionId(transactionId) {
    this.transactionId = transactionId;
    return this;
  }

  setPaymentId(paymentId) {
    this.paymentId = paymentId;
    return this;
  }

  setCurrentPeriodStartDate(currentPeriodStartDate) {
    this.currentPeriodStartDate = currentPeriodStartDate;
    return this;
  }

  setCurrentPeriodEndDate(currentPeriodEndDate) {
    this.currentPeriodEndDate = currentPeriodEndDate;
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
      plan: this.plan,
      amount: this.amount,
      currency: this.currency,
      paymentPlatform: this.paymentPlatform,
      status: this.status,
      transactionId: this.transactionId,
      paymentId: this.paymentId,
      currentPeriodStartDate: this.currentPeriodStartDate,
      currentPeriodEndDate: this.currentPeriodEndDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export class SubscriptionListDTO {
  constructor() {
    this.subscriptionList = [];
  }

  setSubscriptionList(subscriptionList) {
    this.subscriptionList = subscriptionList;
    return this;
  }

  build() {
    return {
      subscriptionList: this.subscriptionList,
    };
  }
}

export class SubscriptionCountDTO {
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
