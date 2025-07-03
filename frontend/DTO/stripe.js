export class StripeDTO {
  constructor() {
    this.platform = null;
    this.plan = null;
    this.billingPeriod = null;
  }

  setPlatform(platform) {
    this.platform = platform;
    return this;
  }

  setPlan(plan) {
    this.plan = plan;
    return this;
  }

  setBillingPeriod(billingPeriod) {
    this.billingPeriod = billingPeriod;
    return this;
  }

  build() {
    return {
      platform: this.platform,
      plan: this.plan,
      billingPeriod: this.billingPeriod,
    };
  }
}
