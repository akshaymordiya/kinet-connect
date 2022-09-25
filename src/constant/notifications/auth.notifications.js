export default {
  auth: {
    login: {
      error: "Failed to login!",
      success: "Logged In successfully!"
    },
    email: {
      error: {
        isTaken: "Email address already exist",
        invalid: "Invalid email address"
      }
    },
    otp: {
      error: {
        invalid: "Invalid OTP Entered!"
      },
      resend: "Resend OTP",
      sendMessage: "OTP send to your registered email address"
    },
    activationInfo: {
      password: {
        strong: "Strong Password",
        weak: "Weak Password",
        notMatched: "Password doesn't match"
      },
      userName: {
        isTaken: "Username already exist"
      },
      activated: "Account Activated!"
    }
  }
}