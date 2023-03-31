import { google } from "googleapis"

const YOUR_CLIENT_ID =
  "172241348711-52hmjh5burl9gh0jrs8rv7cp9rs4p2r4.apps.googleusercontent.com"
const YOUR_CLIENT_SECRET = "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"

const YOUR_REDIRECT_URL = "https://staging.gitple.io"

const code =
  "4/0AVHEtk7Bmd3JV-mFXMOx9Dnn2P-R5Jau8tEeinjSGMHHycKsVrtUy8hKSKrG6OVhLeTmuQ"

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
)

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  "https://www.googleapis.com/auth/blogger",
  "https://www.googleapis.com/auth/calendar",
]

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",

  // If you only need one scope you can pass it as a string
  scope: scopes,
})
// Retrieve access token
// With the code returned, you can ask for an access token as shown below:

// This will provide an object with the access_token and refresh_token.
// Save these somewhere safe so they can be used at a later time.
async function getToken(code) {
  const tokenResult = await oauth2Client.getToken(code).catch((e) => {
    return {
      result: "fail",
      error: e.response.data,
    }
  })

  if ('result' in tokenResult) {
    console.error("getToken error", tokenResult.error)
    return tokenResult
  }
  oauth2Client.setCredentials(tokenResult.tokens)

  return tokenResult.tokens
}

getToken(code).then((result) => {
  console.log("token result", result)
})
