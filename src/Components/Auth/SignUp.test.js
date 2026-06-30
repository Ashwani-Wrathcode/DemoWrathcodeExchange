import { buildSignupPayload } from "./signupPayload";

describe("buildSignupPayload", () => {
  it("includes the profile and referral fields required for registration", () => {
    const payload = buildSignupPayload({
      activeTab: "email",
      email: "ashwaniwrathcode@gmail.com",
      mobile: "9876565656",
      password: "Test@123",
      inviteCode: "",
      firstName: "ashwani",
      lastName: "danodia",
      countryCode: "+91",
    });

    expect(payload).toEqual(
      expect.objectContaining({
        email: "ashwaniwrathcode@gmail.com",
        password: "Test@123",
        referral_code: "",
        token: "",
        country_code: "+91",
        firstName: "ashwani",
        lastName: "danodia",
        mobileNumber: "",
        mobile: "",
      })
    );
  });
});
