export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}
export type LoginResponse = {
  accessToken: string
}
export type MeResponseType = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  success: boolean
  updated: string
}
export type SignUpRequestBody = {
  email: string
  html: string
  name: string
  password: string
  sendConfirmationEmail: boolean
  subject: string
}

export type SignUpResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}
export type UpdatedResponse = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: true
  name: string
  updated: string
}
